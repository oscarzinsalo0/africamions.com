#!/bin/bash
echo "=== FIX NGINX AFRICAMIONS ==="

# Supprimer TOUTES les configs sauf africamions
echo "[1/4] Nettoyage des anciennes configs..."
rm -f /etc/nginx/sites-enabled/*
rm -f /etc/nginx/sites-available/default
rm -f /etc/nginx/sites-available/exporzy*
rm -f /etc/nginx/sites-available/opuxeai*
rm -f /etc/nginx/sites-available/opuxe*

# Lister et supprimer tout ce qui n'est pas africamions
for f in /etc/nginx/sites-available/*; do
  name=$(basename "$f")
  if [ "$name" != "africamions.com" ]; then
    echo "  Suppression: $name"
    rm -f "$f"
  fi
done

# Supprimer les configs dans conf.d aussi
rm -f /etc/nginx/conf.d/*.conf 2>/dev/null
find /etc/nginx -type f -name "*.conf" -exec grep -l -i "opuxe\|exporzy" {} \; 2>/dev/null | while read f; do
  echo "  Suppression: $f"
  rm -f "$f"
done

# Recrire la config africamions proprement
echo "[2/4] Creation config Nginx africamions.com..."
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

# Verifier aussi nginx.conf pour des includes parasites
echo "[3/4] Verification nginx.conf..."
# S'assurer que nginx.conf inclut sites-enabled
grep -q "include /etc/nginx/sites-enabled" /etc/nginx/nginx.conf && echo "  sites-enabled OK" || echo "  ATTENTION: sites-enabled non inclus dans nginx.conf"

# Verifier PM2
echo "[4/4] Verification PM2..."
pm2 list
echo ""

# Redemarrer
nginx -t && systemctl restart nginx && echo "" && echo "=== NGINX CORRIGE ===" && echo "Teste: http://africamions.com" || echo "ERREUR nginx -t"
