# 背景音乐（BGM）

音乐/音效只用**免费可商用**资源，规避版权风险。

## 推荐来源（免费商用）

- **Pixabay Music** (pixabay.com/music) — 免版税，可商用，无需署名（建议保留）。
- **YouTube Audio Library** — 登录后免费下载，标注"可商用"的可用。
- **ccMixter** (ccmixter.org) — Creative Commons 授权，注意署名要求。
- **Free Music Archive** (freemusicarchive.org) — 部分需署名。

> 使用前核对具体曲目的 license 与署名要求；本技能默认不自动下载第三方音乐，由用户提供文件或明确授权来源。

## 接入方式

1. 把音频文件（建议 `.mp3`，128–192kbps）放到工程 `public/` 目录，如 `public/bgm.mp3`。
2. 在场景/视频根部用 `<Audio>` 接入（模板已提供 `Bgm` 组件）：

   ```tsx
   import { Audio, staticFile } from "remotion";
   <Audio src={staticFile("bgm.mp3")} volume={0.4} />
   ```

   或直接使用模板组件：

   ```tsx
   import { Bgm } from "../components/ui";
   <Bgm src="bgm.mp3" volume={0.35} />
   ```

3. `volume` 建议 0.25–0.45，避免压过人声（若有配音）。
4. BGM 只需在视频根放**一次**，不要每个场景重复放，否则会叠加。

## 注意

- 模板默认场景**不含** Bgm（保证开箱即渲染）。需要时在 `src/Video.tsx` 或某场景里加 `<Bgm .../>`，并确保 `public/bgm.mp3` 存在，否则渲染报错。
- 若用户要"配音 + BGM 混音"，超出本技能范围，建议用剪映/PR 做混音。
