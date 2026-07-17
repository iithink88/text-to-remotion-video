# 视觉规范（Visual Style）

统一、克制、可读性优先。模板组件已内置这些规范，直接复用即可。

## 字体与字号

- 字体：粗体 Sans-Serif（系统默认即可，无需额外引入字体文件）。
- 基准（竖屏 1080 宽）：
  - 主标题 `fontSize: 84`，`fontWeight: 800`
  - 副标题 `fontSize: 40`，`fontWeight: 600`
  - 正文/列表 `fontSize: 44`，`fontWeight: 600`
  - 底部字幕 `fontSize: 38`，`fontWeight: 600`
- 规则：**正文字号 ≥ 24px**（按实际分辨率等比缩放）；小屏也清晰。
- 行高 `lineHeight: 1.1–1.3`，避免拥挤。

## 颜色与背景

- 默认科技暗色渐变：`linear-gradient(135deg, #0f172a, #1e293b)`（`Background` 组件）。
- 强调色：`#38bdf8`（天蓝）、`#22d3ee`、`#a78bfa`。
- 文字主色白 `#ffffff`，次要色 `#cbd5e1`。
- 亮色风格：背景 `#f8fafc`→`#e2e8f0`，文字 `#0f172a`。
- 大色块用渐变而非纯色，更有质感。

## 图标（Lucide）

- 引入：`import { Rocket, Zap, Shield } from "lucide-react";`
- 渲染：`<Rocket size={96} color="#38bdf8" />`，颜色用强调色。
- 列表项左边距留白，图标与文字垂直居中、间距 24px。

## 布局模式

- 居中标题：`AbsoluteFill` + `justifyContent/alignItems: center`。
- 列表：`flexDirection: column`，`gap: 28`，垂直居中。
- 功能三联：`flexDirection: row`，`justifyContent: space-around`。
- 字幕条：`AbsoluteFill` + `justifyContent: flex-end` + `paddingBottom`。

## 动画约定

- 进入：`opacity 0→1`（前 8–15 帧）+ `translateY 40→0`（spring，`damping 12, stiffness 120`）。
- 列表错峰：每项 `from={i*12}` 用 `<Sequence>` 错开。
- 图标依次弹入：`spring({ frame: frame - i*8, ... })`。
- 不要过度：旋转/缩放幅度克制，转场统一。

## 可复用组件（`src/components/ui.tsx`）

`Background` / `TitleCard` / `BulletList` / `Caption` / `IconRow` / `Bgm`。
新增场景时优先组合这些组件，避免重复造样式。
