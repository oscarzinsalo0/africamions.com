#!/bin/bash
set -e
echo "=========================================="
echo "  DEPLOIEMENT AFRICAMIONS.COM"
echo "=========================================="

echo "[1/7] Mise a jour systeme..."
apt update -y -qq > /dev/null 2>&1

echo "[2/7] Installation Node.js 20..."
if ! command -v node &> /dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - > /dev/null 2>&1
  apt install -y -qq nodejs > /dev/null 2>&1
fi
echo "  Node $(node -v) OK"

echo "[3/7] Installation Nginx, PM2, Certbot..."
apt install -y -qq nginx git certbot python3-certbot-nginx > /dev/null 2>&1
npm install -g pm2 --silent > /dev/null 2>&1
systemctl enable nginx --quiet
echo "  Nginx, PM2, Certbot OK"

echo "[4/7] Recuperation du code..."
rm -rf /var/www/africamions.com
mkdir -p /var/www
cd /var/www
git clone https://github.com/oscarzinsalo0/africamions.com.git > /dev/null 2>&1
cd /var/www/africamions.com
echo "  Code clone OK"

echo "[5/7] npm install + build..."
cat > .env.production << 'ENVEOF'
NEXT_PUBLIC_SITE_URL=https://africamions.com
NEXT_PUBLIC_WHATSAPP_NUMBER=8618716342426
NEXT_PUBLIC_CONTACT_EMAIL=contact@africamions.com
ENVEOF
rm -rf node_modules package-lock.json
npm install --no-optional 2>&1 | tail -1
npm run build 2>&1 | tail -3
echo "  Build OK"

echo "[6/7] Lancement PM2 + Nginx..."
pm2 delete africamions > /dev/null 2>&1 || true
cd /var/www/africamions.com
pm2 start npm --name "africamions" -- start
pm2 save --force > /dev/null 2>&1
pm2 startup systemd -u root --hp /root > /dev/null 2>&1 || true

rm -f /etc/nginx/sites-enabled/default
rm -f /etc/nginx/sites-enabled/exporzy*
rm -f /etc/nginx/sites-available/exporzy*
find /etc/nginx -type f -exec grep -l "exporzy" {} \; 2>/dev/null | xargs rm -f 2>/dev/null || true

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
nginx -t > /dev/null 2>&1
systemctl restart nginx
echo "  PM2 + Nginx OK"

echo "[7/7] Certificat SSL..."
certbot --nginx -d africamions.com -d www.africamions.com \
  --non-interactive --agree-tos -m contact@africamions.com \
  --redirect 2>&1 | tail -3 || echo "  SSL pas encore possible (DNS en cours de propagation)"

echo ""
echo "=========================================="
echo "  DEPLOIEMENT TERMINE !"
echo "=========================================="
echo "  Site: http://africamions.com"
echo "  SSL:  https://africamions.com"
echo "=========================================="
