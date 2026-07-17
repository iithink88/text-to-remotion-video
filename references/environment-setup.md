# 环境搭建（Environment Setup）

本技能使用本机**托管 Node** 运行 Remotion，避免污染用户全局环境。

## 托管 Node 路径

```
C:/Users/lenovo/.workbuddy/binaries/node/versions/22.22.2/node.exe
```

配套 npm 通过把该目录加入 PATH 使用：

```bash
export PATH="/c/Users/lenovo/.workbuddy/binaries/node/versions/22.22.2:$PATH"
node -v   # 应为 22.x
npm -v
```

> 若技能在其它机器使用，先用 `node -v` 探测托管 Node；找不到再回退系统 Node（`C:/Program Files/nodejs/node.exe`）。

## 脚手架步骤

1. 复制模板到用户工程目录（推荐放在当前工作区或用户指定目录）：

   ```bash
   python "$HOME/.workbuddy/skills/text-to-remotion-video/scripts/scaffold.py" "<目标目录>"
   ```

   该脚本把 `assets/remotion-template/` 完整复制到目标目录（含 `package.json`、`src/`、`public/`）。

2. 进入工程目录，用托管 Node 安装依赖（依赖装在工程本地 `node_modules`，不污染全局）：

   ```bash
   export PATH="/c/Users/lenovo/.workbuddy/binaries/node/versions/22.22.2:$PATH"
   cd "<目标目录>"
   npm install
   ```

3. 依赖说明（模板已写进 `package.json`）：
   - `remotion` + `@remotion/cli`：核心与渲染 CLI
   - `react` / `react-dom`：UI
   - `lucide-react`：图标
   - `typescript` / `@types/react`：类型（dev）

## 渲染所需额外组件

- **Chromium**：Remotion 渲染用自带无头浏览器。首次渲染时自动下载（较慢，约数十 MB~百 MB），之后复用。
- **ffmpeg**：Remotion 自带，无需单独安装。

## 常见问题

- 安装慢/超时：确认网络可访问 npm registry；可加 `--registry https://registry.npmmirror.com`。
- 首次渲染卡在下载浏览器：属正常，耐心等待；CI/离线环境需预置 Chromium（超出本技能范围）。
- 依赖装到全局：务必在**工程目录内**执行 `npm install`，不要加 `-g`。
