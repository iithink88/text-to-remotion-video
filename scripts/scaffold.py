#!/usr/bin/env python3
"""Copy the Remotion template into a target project directory."""
import sys
import os
import shutil
import argparse

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

TEMPLATE = os.path.normpath(
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "remotion-template")
)


def main() -> int:
    ap = argparse.ArgumentParser(description="Scaffold a Remotion text-to-video project.")
    ap.add_argument("target", help="Target project directory to create")
    args = ap.parse_args()

    target = os.path.abspath(args.target)
    if os.path.exists(target) and os.listdir(target):
        print(f"错误：目标目录非空 -> {target}", file=sys.stderr)
        return 2

    os.makedirs(target, exist_ok=True)
    for name in os.listdir(TEMPLATE):
        src = os.path.join(TEMPLATE, name)
        dst = os.path.join(target, name)
        if os.path.isdir(src):
            shutil.copytree(src, dst)
        else:
            shutil.copy2(src, dst)

    print(f"已创建 Remotion 工程：{target}")
    print("下一步：npm install 然后 npx remotion render src/index.ts TextToVideo out/video.mp4")
    return 0


if __name__ == "__main__":
    sys.exit(main())
