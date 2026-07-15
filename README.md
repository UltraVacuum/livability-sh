# 城市区县宜居度对比

国内版 [niche.com](https://www.niche.com) —— 多城市区县六维宜居度对比，带**自定义权重实时
重排**与**地图可视化**。当前覆盖 **上海（16 区）** 与 **银川（6 区县）**，各城市独立评分。
按 [设计文档](../utools/docs/superpowers/specs/2026-06-28-livability-mvp-design.md) 实现。

> ℹ️ **数据现状**：**教育 / 医疗 / 交通 / 生活** 四维 + **人口** 维为**真实数据**（高德 POI
> 密度 + 第七次人口普查 2020 ÷ 行政区面积，由 `scripts/collect-poi.mjs` 采集）。仅 **经济**
> 维（人均可支配收入）为示例 —— 区县级数据未统一公开，待逐区接入统计年鉴。

## 功能

| 路由 | 说明 |
| --- | --- |
| `/` | 城市选择落地页（上海 / 银川） |
| `/[city]/` | 该城市排行榜 + 边界地图（choropleth）+ 自定义权重滑块（实时重排） |
| `/[city]/district/[adcode]` | 区详情：综合等级 + 六维雷达图 + 原始值/评分/排名/来源明细表 |
| `/[city]/compare` | 选 2–3 个区并排对比（叠加雷达图 + 对比表） |
| `/[city]/rankings/[dimension]` | 单维度排行榜（SEO 长尾入口） |
| `/methodology` | 评分算法、等级划分、数据来源、局限性声明 |

加城市：在 `src/data/cities.ts` 的 `CITIES` 加一项（key/name/adcode），跑 `npm run collect:fresh`
采集该城市 POI，即自动生成全部页面（路由、地图、排行榜均为城市参数化）。

## 评分引擎（核心）

`src/lib/scoring.ts` —— 纯函数，复刻 Niche 的 z-score 法并改进：

```
z = (value - μ) / σ · direction        // 各维度跨「同一城市」区县标准化
score = 100 × Φ(z)                      // 标准正态 CDF → 0-100 百分位分
composite = Σ(weight × score) / Σ(weight)
grade = 按城市内百分位排名分 S/A/B/C/D
```

- **每维分数构建时算一次**；综合分与排名从权重算出 → 自定义权重只需重算加权求和（毫秒级）。
- 算法、等级、来源全部在 `/methodology` 公开 → 可解释。

## 运行

```bash
cd /Users/vicvinc/Desktop/codespace/yijudu
npm install
cp .env.example .env   # 填入高德 Web服务 key（AMAP_KEY=...）
npm run dev            # http://localhost:4321
npm run build          # → dist/（40 页静态站 + sitemap）
npm run check          # 类型检查
```

### 采集真实 POI 数据（教育/医疗/交通/生活四维）

```bash
npm run collect          # 读缓存（首次自动采集所有城市）
npm run collect:fresh    # 强制重新采集
```

脚本从 `.env` 读 `AMAP_KEY`，遍历 `cities.ts` 中每个城市，按 区县 × POI 类型 分页去重计数
（节流 ~2 QPS + QPS 限流重试 + 断点缓存），

### 修正 600 上限（大区 POI 细分）

`/place/text` 计数约 600 封顶，大区（如浦东）会低估。命中上限的条目会标 `capped`，
跑 `npm run refine` 用**网格细分 + `/place/polygon` + 点在多边形过滤**重算真实计数：

```bash
npm run refine   # 只重算 poi.json 里标了 capped 的 (区,类型)
```

原理：把区 bbox 切成 5×5 网格，每格查 `/place/polygon`，再用点在多边形（PIP）把落在本区
轮廓内的 POI 筛出来（避免边缘格漏到邻区），跨格按 POI id 去重。典型：浦东医疗 450→847、交通 225→509。
除以行政区面积（DataV GeoJSON 球面面积）得密度，写入 `src/data/poi.json`。评分引擎无需改动。

地图依赖免费的 [DataV.GeoAtlas](https://datav.aliyun.com/portal/school/atlas/area_selector) 边界 GeoJSON（运行时浏览器拉取，**无需 API key**），底图用 CARTO 浅色瓦片。

## 技术栈

- **Astro 7**（静态 SSG，内容/排行榜/详情页零 JS）
- **Tailwind CSS v4**（CSS-first `@theme`）
- **React 19** islands：`Explorer`（地图+权重+排行榜）、`CompareTool`、`RadarChart`
- **Leaflet**（动态 `await import`，SSR 安全 —— 不碰 `window`）

> 关键工程点：Leaflet 在模块加载时访问 `window`，SSR 会崩。用 `import type` + 组件内
> `await import('leaflet')` 解决，既保留排行榜 SSR（利于 SEO），又只在浏览器加载地图。

## 接入真实数据（替换示例数据）

数据层集中在 `src/data/districts.ts` 的 `RAW_DISTRICTS`（每区 6 维原始值 + 来源）。
按设计文档 §6 替换：

| 维度 | 真实来源 | 获取 |
| --- | --- | --- |
| 经济 / 人口 | [上海统计年鉴](https://tjj.sh.gov.cn/)、七普 | 下载 |
| 教育 / 医疗 | [上海开放数据](https://data.sh.gov.cn/) + 高德 POI | API/POI |
| 交通 / 生活 | [高德 POI](https://lbs.amap.com/)（按区 polygon 聚合密度） | POI API |

POI 密度需高德 key：注册后把 key 放进采集脚本，按行政区 polygon 统计各类 POI 计数 ÷ 面积。
评分引擎无需改动 —— 只换 `RAW_DISTRICTS` 的数值与 `source` 字段。

## 部署

改 `astro.config.mjs` 的 `SITE` 域名（影响 canonical/OG/sitemap）→ 静态部署到 Vercel /
Cloudflare Pages → 上线前 ICP 备案。

---

© 2026 · 示例数据，仅展示评分模型，不构成任何决策建议。
