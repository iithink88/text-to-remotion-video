# 文本生成视频 · Remotion 模板

由 `text-to-remotion-video` 技能复制生成。代码即视频——所有画面都是可编辑的 React 组件。

## 目录结构

```
.
├── package.json
├── tsconfig.json
├── remotion.config.ts
├── public/            # 放静态资源（如 bgm.mp3）
└── src/
    ├── index.ts       # 入口（registerRoot）
    ├── Root.tsx       # 定义 Composition（尺寸/时长/fps）
    ├── Video.tsx      # 场景数组 + <Sequence> 拼装
    ├── components/
    │   └── ui.tsx      # 复用组件：Background/TitleCard/BulletList/Caption/IconRow/Bgm
    └── scenes/
        └── ExampleScene.tsx  # 示例场景
```

## 自定义步骤

1. 改 `src/Root.tsx`：设置尺寸（抖音 1080×1920 / YouTube 1920×1080）、`durationInFrames` = 总秒数×fps。
2. 改 `src/Video.tsx`：把 `scenes` 数组换成你的真实场景（每个场景一个组件 + start + duration）。
3. 在 `src/scenes/` 下新增场景组件，复用 `components/ui.tsx` 的组件。
4. （可选）放 `public/bgm.mp3` 并加 `<Bgm src="bgm.mp3" />`。

## 运行

预览（浏览器）：
```bash
npm run dev
```

渲染 MP4：
```bash
npx remotion render src/index.ts TextToVideo out/video.mp4
```

详见技能 `references/` 下的 workflow / scene-planning / rendering / bgm / visual-style。
