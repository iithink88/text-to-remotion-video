---
name: text-to-remotion-video
description: 把文字/文案/脚本一键生成可编辑的 Remotion 短视频（代码即视频），并尽量自动渲染为 MP4。当用户说"把这段文案做成视频""文本生成视频""用文字生成短视频""remotion 视频""文案转视频""把脚本做成解说视频"等时使用。基于 React + TypeScript + Remotion，支持抖音竖屏 9:16、YouTube 16:9、小红书 3:4 等尺寸，内置场景拆分、Lucide 图标、渐变背景与免费商用 BGM 集成。
agent_created: true
---

# 文本生成视频（Remotion）

把用户的文字内容（口播文案、产品介绍、知识点、故事板）转化为一个**可编辑的 Remotion 工程**，并尽量自动渲染成 MP4。核心理念：**好的视频不是堆特效，是信息传达的效率；代码即视频，用户拿到的永远是能自己改的 React 代码。**

## 何时使用

- 用户给出一段文字/文案/主题，想变成视频（解说、产品演示、数据可视化、社媒短视频、Logo Intro、教程片段）。
- 用户明确要求 "Remotion 视频""代码驱动视频""可编辑的视频工程"。
- 触发语示例：把这段文案做成视频、文本生成视频、文案转视频、用文字生成短视频、做个 30 秒的产品 Demo。

## 工作流（按顺序执行）

1. **锁定脚本与投放平台**（必做，先问清再动手）
   - 确认：文案内容、视频时长、投放平台与尺寸（抖音 9:16 1080×1920 / YouTube 16:9 1920×1080 / 小红书 3:4 1080×1440 / 宽屏 21:9）。
   - 尺寸未指定时默认抖音竖屏 9:16。
   - 继续前阅读 `references/workflow.md`。

2. **场景拆分**（scene-planner）
   - 把脚本切成 3–8 秒的场景，单场景不超过 10 秒；设计转场与节奏。
   - 规则与模板见 `references/scene-planning.md`。

3. **脚手架搭建**（environment-setup）
   - 用 `scripts/scaffold.py <目标目录>` 复制 Remotion 模板到用户工程目录。
   - 依赖/Node 环境用本机托管的 Node（`C:/Users/lenovo/.workbuddy/binaries/node/versions/22.22.2/node.exe`）。
   - 详见 `references/environment-setup.md`。

4. **编写视频组件**（video-generator）
   - 基于 `assets/remotion-template/` 的模板与 `src/components/ui.tsx` 复用组件，按场景数组在 `src/Video.tsx` 里用 `<Sequence>` 拼装。
   - 每个场景一个组件，遵循视觉规范（见 `references/visual-style.md`）。

5. **接入 BGM**（可选）
   - 用免费商用音乐，放入 `public/`，通过 `<Audio src={staticFile("bgm.mp3")} />` 接入。
   - 来源与规范见 `references/bgm.md`。

6. **渲染 MP4**（默认开启，失败降级）
   - 用 `scripts/render.sh <工程目录>` 渲染；或按 `references/rendering.md` 手敲命令。
   - 渲染失败/环境缺失时**不阻塞**：交付完整工程代码 + 渲染指引，并告知用户如何本地渲染。

## 关键原则

- **脚本先于画面**：先把要表达的信息写清楚，再决定视觉。
- **可读性第一**：正文字号 ≥ 24px（竖屏模板基准 1080 宽，正文 38–44px），粗体 Sans-Serif，小屏也看清。
- **文字零错字**：视频里改字成本极高，输出前逐帧校对文案。
- **版权友好**：音乐/图片只用免费商用资源（Pixabay Music / YouTube Audio Library 类）。
- **预估渲染时间**：视频越长越慢，交付前告知用户大致渲染耗时。
- **不替代专业剪辑**：复杂转场/混音/调色建议用剪映/PR/达芬奇；本技能擅长数据驱动、可程序化生成的场景。

## 交付物

- 一个完整 Remotion 工程（位于用户指定目录），含 `src/Video.tsx`、各场景组件、`package.json` 等。
- 成功时额外产出 `out/video.mp4`（H.264）。
- 失败时产出工程代码 + 渲染指引（如何安装依赖、跑 `npx remotion render`）。

## 边界

- 输出默认 MP4 H.264；需要 MOV/WebM 时单独说明。
- 渲染依赖托管 Node + Remotion 自带 Chromium（首次渲染会下载，较慢）。环境不可用时自动降级。
