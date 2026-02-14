#!/bin/bash
echo "=== REPARATION TOTALE AFRICAMIONS ==="

# ETAPE 1 - TUER ABSOLUMENT TOUT
echo "[1/9] Arret TOTAL de tous les processus..."
pm2 kill 2>/dev/null || true
pkill -f node 2>/dev/null || true
pkill -f npm 2>/dev/null || true
pkill -f next 2>/dev/null || true
pkill -f opuxe 2>/dev/null || true
systemctl stop nginx 2>/dev/null || true
sleep 2
# Verifier que le port 3000 est libre
echo "Processes sur port 3000:"
ss -tlnp | grep 3000 || echo "  Port 3000 libre OK"
# Forcer si necessaire
fuser -k 3000/tcp 2>/dev/null || true
sleep 1

# ETAPE 2 - SUPPRIMER TOUTE TRACE D'OPUXEAI
echo "[2/9] Suppression OpuxeAI..."
rm -rf /var/www/opuxe* 2>/dev/null
rm -rf /var/www/html 2>/dev/null
rm -rf /opt/opuxe* 2>/dev/null
rm -rf /home/*/opuxe* 2>/dev/null
rm -rf /root/opuxe* 2>/dev/null
# Trouver et supprimer tout fichier opuxeai
find / -maxdepth 4 -type d -name "*opuxe*" -exec rm -rf {} + 2>/dev/null
find / -maxdepth 4 -type d -name "*exporzy*" -exec rm -rf {} + 2>/dev/null
# Supprimer les services systemd opuxeai
systemctl stop opuxe* 2>/dev/null || true
systemctl disable opuxe* 2>/dev/null || true
rm -f /etc/systemd/system/opuxe* 2>/dev/null
systemctl daemon-reload 2>/dev/null
echo "  OpuxeAI supprime"

# ETAPE 3 - NETTOYAGE NGINX COMPLET
echo "[3/9] Nettoyage Nginx COMPLET..."
rm -f /etc/nginx/sites-enabled/*
rm -f /etc/nginx/sites-available/*
rm -f /etc/nginx/conf.d/*.conf 2>/dev/null
# Verifier nginx.conf pour des includes parasites
echo "  Contenu nginx.conf:"
cat /etc/nginx/nginx.conf
echo ""
mkdir -p /var/www/html
echo "africamions en cours" > /var/www/html/index.html

# ETAPE 4 - CREER CONFIG NGINX
echo "[4/9] Config Nginx africamions..."
cat > /etc/nginx/sites-available/africamions.com << 'NGINXEOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name africamions.com www.africamions.com _;
    location / {
        proxy_pass http://127.0.0.1:3000;
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
NGINXEOF
ln -sf /etc/nginx/sites-available/africamions.com /etc/nginx/sites-enabled/africamions.com
echo "  Config Nginx OK"

# ETAPE 5 - CLONER LE CODE
echo "[5/9] Clone du code..."
cd /root
rm -rf /var/www/africamions.com
mkdir -p /var/www
git clone https://github.com/oscarzinsalo0/africamions.com.git /var/www/africamions.com 2>&1 | tail -2
cd /var/www/africamions.com
echo "  Code clone OK"

# ETAPE 6 - ENV
echo "[6/9] Fichier .env..."
cat > .env.production << 'ENVEOF'
NEXT_PUBLIC_SITE_URL=https://africamions.com
NEXT_PUBLIC_WHATSAPP_NUMBER=8618716342426
NEXT_PUBLIC_CONTACT_EMAIL=contact@africamions.com
ENVEOF
echo "  .env OK"

# ETAPE 7 - NPM INSTALL
echo "[7/9] npm install (peut prendre 2-3 min)..."
rm -rf node_modules package-lock.json
npm install --no-optional 2>&1 | tail -5
echo "  npm install OK"

# ETAPE 8 - BUILD
echo "[8/9] npm run build (peut prendre 2-3 min)..."
npm run build 2>&1 | tail -10
if [ ! -d ".next" ]; then
  echo "ERREUR: Le build a echoue!"
  echo "Logs complets:"
  npm run build 2>&1
  exit 1
fi
echo "  Build OK"

# ETAPE 9 - DEMARRAGE
echo "[9/9] Demarrage..."
cd /var/www/africamions.com
pm2 start npm --name africamions -- start
pm2 save --force 2>/dev/null
pm2 startup systemd -u root --hp /root 2>/dev/null || true

echo "Test Nginx config..."
nginx -t 2>&1
systemctl start nginx

echo ""
echo "Attente demarrage app (20 secondes)..."
sleep 20

echo ""
echo "========== VERIFICATION FINALE =========="
echo ""
echo "--- PM2 Status ---"
pm2 list
echo ""
echo "--- PM2 Logs ---"
pm2 logs africamions --nostream --lines 10 2>&1
echo ""
echo "--- Port 3000 ---"
ss -tlnp | grep 3000
echo ""
echo "--- Test localhost:3000 ---"
curl -s -o /dev/null -w "HTTP %{http_code}" http://localhost:3000 2>&1
echo ""
echo "--- Test localhost:80 ---"
curl -s -o /dev/null -w "HTTP %{http_code}" http://localhost 2>&1
echo ""
echo "--- Contenu reponse ---"
curl -s http://localhost:3000 2>&1 | head -3
echo ""
echo ""
echo "========== FIN =========="
