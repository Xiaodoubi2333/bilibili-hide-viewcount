# bilibili-hide-viewcount v1.0

Chrome 扩展（Manifest V3）：在哔哩哔哩播放页自动隐藏「正在观看人数」「弹幕数量」及其分隔符，让播放器信息条只保留必要项。实现方式是把目标节点 `outerHTML` 转成注释节点替换，因此页面功能不受影响，只是不再显示。

## 文件结构

```text
manifest.json     MV3 清单：content_scripts 注入 *.bilibili.com，权限 activeTab/scripting/storage/tabs
content.js        MutationObserver 监听 DOM，命中后替换为注释节点并 disconnect
icons/            bilibilix24.png、bilibilix128.png
LICENSE           Apache License 2.0
```

## 启动

**方式一：加载已解压目录（推荐，便于改动）**

1. 克隆或下载本仓库；
2. 打开 `chrome://extensions/`，右上角开启「开发者模式」；
3. 点「加载已解压的扩展程序」，选择仓库根目录；
4. 打开任意 B 站视频页，信息条上的观看人数与弹幕数量消失即生效。

**方式二：安装打包文件**

Release 页提供 `.crx` 与源码 `.zip`，crx 需在扩展页拖入安装（部分 Chrome 版本限制第三方 crx，建议用方式一）。

## 功能落点表

| # | 功能 | 状态 | 落点 |
|---|---|---|---|
| 1 | 监听动态插入的播放器信息条 | 完成 | `content.js` 的 `MutationObserver`（`childList` + `subtree`） |
| 2 | 隐藏「正在观看人数」 | 完成 | `.bpx-player-video-info-online` |
| 3 | 隐藏分隔符 | 完成 | `.bpx-player-video-info-divide` |
| 4 | 隐藏弹幕数量 | 完成 | `.bpx-player-video-info-dm` |
| 5 | 命中后停止观察，避免无谓开销 | 完成 | `observer.disconnect()` |
| 6 | 开关与配置界面 | 未实现 | 权限已申请 `storage`，尚未使用 |

## 版本记录

### v0.1 · 建库

- `chore: 初始化仓库（README / LICENSE / .gitignore）`：清单与图标入库。

### v1.0 · MutationObserver 方案

- `feat: 清单与脚本落地，MutationObserver 命中信息条即替换`：确定并落地「持续观察 + 命中即替换」的实现，同时补上设计说明。
  - **为什么不用单次查询**：B 站信息条由 JS 后注入，页面加载完成时节点通常还不存在，单次 `querySelector` 会落空。
  - **现在的做法**：`MutationObserver` 观察整个文档，回调里定位 `.bpx-player-sending-bar .bpx-player-video-info`，找到即替换并 `disconnect`。
  - **代价**：页面初始阶段会触发多次回调，但命中后立即停止，实际开销可忽略。

### v1.1 · 清理

- `chore: 移除误提交的 .idea，统一 README / License / .gitignore`。

## 已知限制

- 选择器绑定 B 站当前播放器结构（`bpx-player-*`），页面改版后需同步更新。
- 清单里同时申请了 `activeTab`、`scripting`、`storage`、`tabs`，其中 `scripting` 与 `tabs` 当前实现并未使用，可在下个版本收窄权限以降低审核风险。
- 仅做隐藏，不改变播放器布局间距，个别页面可能出现留白。
- 仓库内曾误提交 `.idea/` 目录，已移除并补充忽略规则。
