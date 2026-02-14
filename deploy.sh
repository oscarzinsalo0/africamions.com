#!/bin/bash
# ============================================
#  AFRICAMIONS.COM — DÉPLOIEMENT COMPLET
#  Usage: bash deploy.sh
# ============================================

set -e

# --- Configuration ---
VPS_IP="82.112.240.58"
VPS_USER="root"
VPS_PASS="Oscobeat1?@@@"
REPO_URL="https://github.com/oscarzinsalo0/africamions.com.git"
APP_DIR="/var/www/africamions.com"
DOMAIN="africamions.com"
EMAIL="contact@africamions.com"

SSH_CMD="sshpass -p '$VPS_PASS' ssh -o StrictHostKeyChecking=no -o ConnectTimeout=30 $VPS_USER@$VPS_IP"

echo ""
echo "=========================================="
echo "  🚀 DÉPLOIEMENT AFRICAMIONS.COM"
echo "=========================================="

# --- 0. Vérifier sshpass ---
echo ""
echo "[0/8] Vérification de sshpass..."
if ! command -v sshpass &> /dev/null; then
  echo "  → Installation de sshpass via Homebrew..."
  brew install sshpass 2>/dev/null || brew install hudochenkov/sshpass/sshpass
fi
echo "  ✓ sshpass OK"

# --- 1. Push sur GitHub ---
echo ""
echo "[1/8] Push du code sur GitHub..."
cd "$(dirname "$0")"
git add -A
git diff --cached --quiet 2>/dev/null || git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M')"
git push origin main 2>&1 || true
echo "  ✓ Code poussé sur GitHub"

# --- 2. Test connexion SSH ---
echo ""
echo "[2/8] Connexion SSH au serveur $VPS_IP..."
eval $SSH_CMD "echo '  ✓ Connexion SSH OK'" 2>&1
if [ $? -ne 0 ]; then
  echo "  ✗ ERREUR: Impossible de se connecter en SSH."
  echo "    → Vérifie que le VPS est démarré dans Hostinger"
  echo "    → Vérifie que SSH est activé (systemctl start ssh)"
  exit 1
fi

# --- 3-9. Commandes sur le serveur ---
echo ""
echo "[3/8] Installation des dépendances système..."

eval $SSH_CMD "bash -s" << 'REMOTE_SCRIPT'
set -e

echo "  → Mise à jour apt..."
apt update -y -qq

# Node.js 20
if ! command -v node &> /dev/null; then
  echo "  → Installation de Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - > /dev/null 2>&1
  apt install -y -qq nodejs
fi
echo "  ✓ Node.js $(node -v)"

# Nginx
if ! command -v nginx &> /dev/null; then
  echo "  → Installation de Nginx..."
  apt install -y -qq nginx
fi
systemctl enable nginx --quiet
echo "  ✓ Nginx OK"

# PM2
if ! command -v pm2 &> /dev/null; then
  echo "  → Installation de PM2..."
  npm install -g pm2 --silent
fi
echo "  ✓ PM2 OK"

# Git
apt install -y -qq git > /dev/null 2>&1
echo "  ✓ Git OK"

# Certbot
if ! command -v certbot &> /dev/null; then
  echo "  → Installation de Certbot..."
  apt install -y -qq certbot python3-certbot-nginx
fi
echo "  ✓ Certbot OK"

# --- Clone ou pull ---
echo ""
echo "[4/8] Récupération du code..."
APP_DIR="/var/www/africamions.com"

if [ -d "$APP_DIR/.git" ]; then
  cd "$APP_DIR"
  git fetch origin main
  git reset --hard origin/main
  echo "  ✓ Code mis à jour (git pull)"
else
  rm -rf "$APP_DIR"
  mkdir -p /var/www
  git clone https://github.com/oscarzinsalo0/africamions.com.git "$APP_DIR"
  cd "$APP_DIR"
  echo "  ✓ Code cloné"
fi

# --- Env + Install + Build ---
echo ""
echo "[5/8] Installation npm + build production..."
cat > .env.production << 'ENVEOF'
NEXT_PUBLIC_SITE_URL=https://africamions.com
NEXT_PUBLIC_WHATSAPP_NUMBER=8618716342426
NEXT_PUBLIC_CONTACT_EMAIL=contact@africamions.com
ENVEOF

rm -rf node_modules package-lock.json
npm install --no-optional 2>&1 | tail -3
echo "  ✓ Dépendances installées"

npm run build 2>&1 | tail -5
echo "  ✓ Build production terminé"

# --- PM2 ---
echo ""
echo "[6/8] Démarrage avec PM2..."
cd "$APP_DIR"
pm2 delete africamions 2>/dev/null || true
pm2 start npm --name "africamions" -- start
pm2 save --force
pm2 startup systemd -u root --hp /root 2>/dev/null || true
echo "  ✓ Site lancé sur le port 3000"

# --- Nginx ---
echo ""
echo "[7/8] Configuration Nginx..."

# Supprimer anciennes configs
rm -f /etc/nginx/sites-enabled/default
rm -f /etc/nginx/sites-enabled/exporzy*
rm -f /etc/nginx/sites-available/exporzy*

# Supprimer toute config qui redirige vers exporzy
find /etc/nginx -name "*.conf" -exec grep -l "exporzy" {} \; 2>/dev/null | xargs rm -f 2>/dev/null || true

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
    return 301 http://africamions.com$request_uri;
}
NGINXEOF

ln -sf /etc/nginx/sites-available/africamions.com /etc/nginx/sites-enabled/africamions.com
nginx -t 2>&1
systemctl restart nginx
echo "  ✓ Nginx configuré"

# --- SSL ---
echo ""
echo "[8/8] Certificat SSL..."
certbot --nginx -d africamions.com -d www.africamions.com \
  --non-interactive --agree-tos -m contact@africamions.com \
  --redirect 2>&1 | tail -5 || echo "  ⚠ SSL échoué (DNS pas encore propagé ? Relance plus tard avec: bash deploy.sh)"

echo ""
echo "=========================================="
echo "  ✅ DÉPLOIEMENT TERMINÉ !"
echo "=========================================="
REMOTE_SCRIPT

echo ""
echo "=========================================="
echo "  ✅ TOUT EST FAIT !"
echo "=========================================="
echo ""
echo "  🌐 Site : https://africamions.com"
echo "  📊 Status : ssh root@$VPS_IP 'pm2 status'"
echo "  📋 Logs   : ssh root@$VPS_IP 'pm2 logs africamions'"
echo ""
echo "  📌 DNS (si pas encore fait dans Hostinger) :"
echo "     Type A     →  @    →  $VPS_IP"
echo "     Type CNAME →  www  →  africamions.com"
echo ""
echo "  🔄 Pour les futures mises à jour :"
echo "     bash update.sh"
echo ""
