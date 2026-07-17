import React from "react";
import { Composition } from "remotion";
import { Video } from "./Video";

// 尺寸/时长按文案与投放平台调整：
//   抖音 9:16  -> 1080x1920
//   YouTube 16:9 -> 1920x1080
//   小红书 3:4 -> 1080x1440
// durationInFrames = 总秒数 × fps
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="TextToVideo"
      component={Video}
      durationInFrames={240}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
