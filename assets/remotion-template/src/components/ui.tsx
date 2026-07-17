import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Sequence,
  Audio,
  staticFile,
} from "remotion";

/** 渐变背景。默认科技暗色。 */
export const Background: React.FC<{ colors?: [string, string] }> = ({
  colors = ["#0f172a", "#1e293b"],
}) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
    }}
  />
);

/** 居中标题卡。进入时淡入 + 上滑。 */
export const TitleCard: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const slide = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });
  const y = interpolate(slide, [0, 1], [40, 0]);
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <h1
        style={{
          fontSize: 84,
          fontWeight: 800,
          color: "white",
          textAlign: "center",
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p style={{ fontSize: 40, color: "#cbd5e1", textAlign: "center", marginTop: 24 }}>
          {subtitle}
        </p>
      )}
    </AbsoluteFill>
  );
};

/** 要点列表，每条带可选图标，错峰进入。 */
export const BulletList: React.FC<{
  items: { icon?: React.ReactNode; text: string }[];
}> = ({ items }) => (
  <AbsoluteFill
    style={{
      justifyContent: "center",
      padding: 100,
      gap: 28,
      flexDirection: "column",
    }}
  >
    {items.map((it, i) => (
      <Sequence key={i} from={i * 12}>
        <BulletItem icon={it.icon} text={it.text} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

const BulletItem: React.FC<{ icon?: React.ReactNode; text: string }> = ({
  icon,
  text,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const x = interpolate(frame, [0, 12], [-40, 0], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      {icon && <div style={{ flexShrink: 0, color: "#38bdf8" }}>{icon}</div>}
      <span style={{ fontSize: 44, color: "white", fontWeight: 600 }}>{text}</span>
    </div>
  );
};

/** 底部字幕条。 */
export const Caption: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 80,
        opacity,
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.55)",
          color: "white",
          fontSize: 38,
          fontWeight: 600,
          padding: "16px 32px",
          borderRadius: 16,
          maxWidth: "85%",
          textAlign: "center",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

/** 横向三联图标功能展示，依次弹入。 */
export const IconRow: React.FC<{
  items: { icon: React.ReactNode; label: string }[];
}> = ({ items }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 80,
      }}
    >
      {items.map((it, i) => {
        const enter = spring({
          frame: frame - i * 8,
          fps,
          config: { damping: 14, stiffness: 100 },
        });
        const scale = interpolate(enter, [0, 1], [0.6, 1], {
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              transform: `scale(${scale})`,
            }}
          >
            <div style={{ color: "#38bdf8" }}>{it.icon}</div>
            <span style={{ color: "white", fontSize: 36, fontWeight: 700 }}>
              {it.label}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/** 背景音乐。需把音频放到 public/ 并在 Root 中引用。 */
export const Bgm: React.FC<{ src: string; volume?: number }> = ({
  src,
  volume = 0.4,
}) => <Audio src={staticFile(src)} volume={volume} />;
