#!/bin/bash
# ============================================
#  AFRICAMIONS.COM — MISE À JOUR RAPIDE
#  Usage: bash update.sh
# ============================================

set -e

VPS_IP="82.112.240.58"
VPS_USER="root"
VPS_PASS="Oscobeat1?@@@"
SSH_CMD="sshpass -p '$VPS_PASS' ssh -o StrictHostKeyChecking=no -o ConnectTimeout=30 $VPS_USER@$VPS_IP"

echo ""
echo "=========================================="
echo "  🔄 MISE À JOUR AFRICAMIONS.COM"
echo "=========================================="

# --- 1. Push local ---
echo ""
echo "[1/2] Push du code..."
cd "$(dirname "$0")"
git add -A
git diff --cached --quiet 2>/dev/null || git commit -m "Update: $(date '+%Y-%m-%d %H:%M')"
git push origin main 2>&1 || true
echo "  ✓ Code poussé"

# --- 2. Déployer sur le serveur ---
echo ""
echo "[2/2] Déploiement sur le serveur..."
eval $SSH_CMD "bash -s" << 'REMOTE'
set -e
cd /var/www/africamions.com
git fetch origin main
git reset --hard origin/main
rm -rf node_modules package-lock.json
npm install --no-optional 2>&1 | tail -3
npm run build 2>&1 | tail -5
pm2 restart africamions
echo "  ✓ Site mis à jour et redémarré"
REMOTE

echo ""
echo "=========================================="
echo "  ✅ MISE À JOUR TERMINÉE !"
echo "=========================================="
echo "  🌐 https://africamions.com"
echo ""
