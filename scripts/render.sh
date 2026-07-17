#!/usr/bin/env bash
# Render a Remotion text-to-video project to MP4 using the managed Node.
set -euo pipefail

NODE_DIR="/c/Users/lenovo/.workbuddy/binaries/node/versions/22.22.2"
export PATH="$NODE_DIR:$PATH"

PROJECT="${1:?用法: render.sh <工程目录> [CompositionId] [输出文件]}"
COMP_ID="${2:-TextToVideo}"
OUT="${3:-out/video.mp4}"

cd "$PROJECT"
echo "==> 工程目录: $PROJECT"

if [ ! -d node_modules ]; then
  echo "==> 安装依赖 (npm install) ..."
  npm install
fi

echo "==> 渲染 $COMP_ID -> $OUT"
npx remotion render src/index.ts "$COMP_ID" "$OUT"
echo "==> 完成: $OUT"
