# 文本生成视频技能 · text-to-remotion-video

把文字 / 文案 / 脚本一键生成**可编辑的 Remotion 短视频**，并自动渲染成 MP4。

> 基于 Remotion（用 React 写视频）的代码驱动视频生成方案。你给它一段文案，它就帮你拆场景、生成 React 视频工程、接上免费商用 BGM、渲染出 MP4。你最终拿到的是**能自己继续改的 React 代码**，不是黑盒视频。

---

## 一、安装

**方式一（手动复制，最通用）**

把解压后的 `text-to-remotion-video/` 文件夹整个放进你的 WorkBuddy 用户级技能目录：

- Windows：`C:\Users\<你的用户名>\.workbuddy\skills\`
- macOS / Linux：`~/.workbuddy/skills/`

放好后目录结构应为：

```
.workbuddy/skills/
└── text-to-remotion-video/
    ├── SKILL.md
    ├── README.md          ← 你正在看的这份
    ├── references/
    ├── assets/
    └── scripts/
```

**方式二（WorkBuddy 内导入）**

在 WorkBuddy 的「安装技能 / 导入技能」功能里，直接指向解压出来的 `text-to-remotion-video/` 文件夹即可。

---

## 二、前置条件

- 已安装 **WorkBuddy**（自带托管 Node，无需你自己装 Node / npm）。
- **首次使用需要联网**：技能会自动执行 `npm install` 安装依赖，并下载 Remotion 自带的 Chromium（首次约几分钟，后续复用）。

---

## 三、怎么用

在 WorkBuddy 对话里直接说，例如：

- "把这段产品介绍文案做成 60 秒解说视频（抖音竖屏）"
- "用文字生成一段 30 秒的 AI 产品 Demo"
- "把这段口播稿做成视频"
- "帮我把这个脚本拆成场景"

技能会主动问清**投放平台 / 视频尺寸**（抖音 9:16 / YouTube 16:9 / 小红书 3:4 等），然后走完整流程。

---

## 四、环境受限时的降级

如果当前环境无法联网安装依赖（比如在离线机器上），技能会**自动降级**为：

> 只交付可编辑的 Remotion 工程代码 + 一份渲染指引

你拿到代码后，在能联网的环境里手动 `npm install && npx remotion render` 即可出片，不会卡死。

---

## 五、目录结构说明

| 路径 | 作用 |
|------|------|
| `SKILL.md` | 技能编排逻辑（给 AI 看的，决定它怎么干活） |
| `references/` | 6 个细分流程文档：总流程 / 场景拆分 / 环境搭建 / 渲染 / BGM / 视觉规范 |
| `assets/remotion-template/` | 开箱即渲染的 Remotion 脚手架（Root / Video / 通用组件 / 示例场景） |
| `scripts/scaffold.py` | 一键把模板复制到你的工程目录 |
| `scripts/render.sh` | 用托管 Node 一键渲染成 MP4 |

---

## 六、版权与合规

- **BGM** 默认走免费商用资源（Pixabay Music / YouTube Audio Library 类），无版权风险。
- 视频中若用到第三方图片 / 视频素材，请自行确保其授权合规。

---

## 七、常见问题

**Q：第一次渲染特别慢？**
A：正常。Remotion 首次会下载自带 Chromium，且要 `npm install` 依赖；下载完成后后续渲染就快了。

**Q：想改视频画面怎么办？**
A：直接改 `assets/remotion-template/src/` 下的 React 组件，那是你的源工程，可无限迭代。

**Q：能输出除 MP4 外的格式吗？**
A：默认 MP4（H.264）。需要 MOV / WebM 等格式，在对话里特别说明即可。

---

作者：动画画（视频生成专家） · 仅供学习与非商业分享使用
