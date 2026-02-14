#!/bin/bash
echo "=== REPARATION COMPLETE AFRICAMIONS ==="

echo "[1/8] Arret de tout..."
pm2 delete all 2>/dev/null || true
systemctl stop nginx 2>/dev/null || true

echo "[2/8] Nettoyage Nginx COMPLET..."
rm -f /etc/nginx/sites-enabled/*
rm -f /etc/nginx/sites-available/default
rm -f /etc/nginx/sites-available/exporzy*
rm -f /etc/nginx/sites-available/opuxe*
for f in /etc/nginx/sites-available/*; do
  name=$(basename "$f")
  if [ "$name" != "africamions.com" ]; then
    rm -f "$f"
  fi
done
rm -f /etc/nginx/conf.d/*.conf 2>/dev/null
rm -rf /var/www/html 2>/dev/null
mkdir -p /var/www/html
echo "OK" > /var/www/html/index.html

echo "[3/8] Config Nginx africamions..."
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

echo "[4/8] Preparation code..."
cd /root
rm -rf /var/www/africamions.com
mkdir -p /var/www
git clone https://github.com/oscarzinsalo0/africamions.com.git /var/www/africamions.com
cd /var/www/africamions.com

echo "[5/8] Fichier .env..."
cat > .env.production << 'ENVEOF'
NEXT_PUBLIC_SITE_URL=https://africamions.com
NEXT_PUBLIC_WHATSAPP_NUMBER=8618716342426
NEXT_PUBLIC_CONTACT_EMAIL=contact@africamions.com
ENVEOF

echo "[6/8] npm install..."
npm install --no-optional 2>&1 | tail -3

echo "[7/8] npm run build..."
npm run build 2>&1 | tail -5

echo "[8/8] Demarrage..."
pm2 start npm --name africamions -- start
pm2 save --force
pm2 startup systemd -u root --hp /root 2>/dev/null || true
nginx -t && systemctl start nginx

echo "Attente 15 secondes..."
sleep 15

echo ""
echo "=== VERIFICATION ==="
pm2 list
echo ""
ss -tlnp | grep 3000
echo ""
curl -s -o /dev/null -w "Test local: HTTP %{http_code}\n" http://localhost:3000
curl -s -o /dev/null -w "Test Nginx: HTTP %{http_code}\n" http://localhost

echo ""
echo "=== TERMINE ==="
echo "Teste: http://africamions.com"
