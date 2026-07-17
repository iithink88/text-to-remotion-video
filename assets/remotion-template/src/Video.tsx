import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "./components/ui";
import { IntroScene, FeaturesScene } from "./scenes/ExampleScene";

// 场景数组：每个场景一个组件 + 起始帧(start) + 时长帧(duration)
// 用法：把下面两行示例替换成由文案推导出的真实场景。
export const Video: React.FC = () => {
  const scenes: { start: number; duration: number; Comp: React.FC }[] = [
    { start: 0, duration: 90, Comp: IntroScene },
    { start: 90, duration: 150, Comp: FeaturesScene },
  ];

  return (
    <AbsoluteFill>
      <Background />
      {scenes.map((s, i) => (
        <Sequence key={i} from={s.start} durationInFrames={s.duration}>
          <s.Comp />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
