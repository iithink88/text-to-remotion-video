# 渲染与输出（Rendering）

把 Remotion 工程渲染成 MP4。默认开启；环境不可用时降级为"交付代码 + 渲染指引"。

## 一键渲染（推荐）

```bash
bash "$HOME/.workbuddy/skills/text-to-remotion-video/scripts/render.sh" "<工程目录>" [CompositionId] [输出路径]
# 例：
bash "$HOME/.workbuddy/skills/text-to-remotion-video/scripts/render.sh" "./my-video" TextToVideo out/video.mp4
```

`render.sh` 会自动：切托管 Node → `npm install`（若缺 `node_modules`）→ `npx remotion render`。

## 手动渲染命令

```bash
export PATH="/c/Users/lenovo/.workbuddy/binaries/node/versions/22.22.2:$PATH"
cd "<工程目录>"
npx remotion render src/index.ts TextToVideo out/video.mp4
```

- `src/index.ts`：入口文件（registerRoot）。
- `TextToVideo`：`<Composition id="...">`，在 `src/Root.tsx` 定义。
- `out/video.mp4`：输出路径（会自动建目录）。

## 性能与质量

- 图片格式：在 `remotion.config.ts` 设 `Config.setVideoImageFormat("jpeg")` 提速。
- 覆盖输出：设 `Config.setOverwriteOutput(true)`（模板已设）。
- 并发：长视频渲染慢属正常。预估：30s/30fps ≈ 900 帧，普通机器约 1–3 分钟（含首次浏览器下载会更久）。
- 断点续渲染：Remotion 支持 `--recover` 但本技能默认整段渲染。

## 输出格式

- 默认 **MP4 (H.264)**，最通用。
- 需 **WebM / MOV / GIF / 透明通道**：在 `npx remotion render` 后加对应扩展名或 `--codec`，并单独告知用户兼容性。

## 降级策略（重要）

出现以下情况**不要阻塞交付**：
- 托管 Node 缺失 / npm 安装失败
- 首次浏览器下载超时 / 网络受限
- 渲染中途报错

此时：
1. 已完成的可编辑工程照常交付。
2. 向用户输出"渲染指引"：依赖安装命令 + `npx remotion render` 命令 + 预计耗时。
3. 明确说明：代码已就绪，本地按指引即可出片。
