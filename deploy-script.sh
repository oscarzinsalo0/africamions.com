#!/bin/bash
# ============================================
# SCRIPT DE DÉPLOIEMENT AFRICAMIONS
# Coller dans le Browser Terminal Hostinger
# ============================================

set -e
echo "=========================================="
echo "  DÉPLOIEMENT AFRICAMIONS.COM"
echo "=========================================="

# --- 1. Mise à jour système ---
echo ""
echo "[1/9] Mise à jour du système..."
apt update -y && apt upgrade -y

# --- 2. Installer Node.js 20 LTS ---
echo ""
echo "[2/9] Installation de Node.js 20..."
if ! command -v node &> /dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt install -y nodejs
fi
echo "Node.js: $(node -v)"
echo "npm: $(npm -v)"

# --- 3. Installer Nginx ---
echo ""
echo "[3/9] Installation de Nginx..."
apt install -y nginx
systemctl enable nginx

# --- 4. Installer PM2 ---
echo ""
echo "[4/9] Installation de PM2..."
npm install -g pm2

# --- 5. Installer Git + Certbot ---
echo ""
echo "[5/9] Installation de Git et Certbot..."
apt install -y git certbot python3-certbot-nginx

# --- 6. Cloner le projet ---
echo ""
echo "[6/9] Clonage du projet..."
# Supprimer l'ancien dossier s'il existe
rm -rf /var/www/africamions.com
mkdir -p /var/www
cd /var/www
git clone https://github.com/oscarzinsalo0/africamions.com.git
cd africamions.com

# --- 7. Installer, configurer et build ---
echo ""
echo "[7/9] Installation des dépendances et build..."
cat > .env.production << 'ENVEOF'
NEXT_PUBLIC_SITE_URL=https://africamions.com
NEXT_PUBLIC_WHATSAPP_NUMBER=8618716342426
NEXT_PUBLIC_CONTACT_EMAIL=contact@africamions.com
ENVEOF

rm -f package-lock.json
npm install
npm run build

# --- 8. Configurer Nginx ---
echo ""
echo "[8/9] Configuration de Nginx..."

# Supprimer les anciennes configs qui redirigent vers exporzy
rm -f /etc/nginx/sites-enabled/default
rm -f /etc/nginx/sites-enabled/exporzy*
rm -f /etc/nginx/sites-available/exporzy*

cat > /etc/nginx/sites-available/africamions.com << 'NGINXEOF'
server {
    listen 80;
    server_name africamions.com www.africamions.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80 default_server;
    server_name _;
    return 301 https://africamions.com$request_uri;
}
NGINXEOF

ln -sf /etc/nginx/sites-available/africamions.com /etc/nginx/sites-enabled/africamions.com

# Tester et redémarrer Nginx
nginx -t && systemctl restart nginx

# --- 9. Lancer avec PM2 ---
echo ""
echo "[9/9] Démarrage du site avec PM2..."
cd /var/www/africamions.com
pm2 delete africamions 2>/dev/null || true
pm2 start npm --name "africamions" -- start
pm2 save
pm2 startup systemd -u root --hp /root 2>/dev/null || true

echo ""
echo "=========================================="
echo "  DÉPLOIEMENT TERMINÉ !"
echo "=========================================="
echo ""
echo "Le site est accessible sur :"
echo "  http://africamions.com"
echo ""
echo "Pour activer HTTPS (SSL), exécute :"
echo "  certbot --nginx -d africamions.com -d www.africamions.com --non-interactive --agree-tos -m contact@africamions.com"
echo ""
echo "Pour vérifier le status :"
echo "  pm2 status"
echo "  pm2 logs africamions"
echo ""
