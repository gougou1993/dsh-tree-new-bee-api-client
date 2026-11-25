# Tree New Bee 接口请求

一个类似 Postman 的接口调试工具，面向 DeepSeek Harness（DSH）。它在左侧侧边栏添加「Tree New Bee 接口请求」入口：构造并发送 HTTP 请求、用集合树管理保存的请求、管理环境与变量、从 Swagger/OpenAPI 导入、查看完整的请求/响应日志——全部在 Harness Web UI 内完成。

请求由宿主端通过 `fetch` 执行；客户端每次携带方法、URL、请求头和请求体。仅支持 `http://` 与 `https://` 地址。

> **操作手册：** [USAGE.zh.md](USAGE.zh.md)（中文） · [USAGE.md](USAGE.md)（英文）

## 插件信息

| 字段 | 值 |
| --- | --- |
| 包名 | `@oakzhong/dsh-tree-new-bee-api-client` |
| 版本 | `1.3.1` |
| 入口 | `index.js`（宿主）· `client.js`（客户端） |
| 类型 | DSH bundle 插件，ES 模块（`"type": "module"`、`"private": false`、公开发布） |
| 侧边栏入口 | Tree New Bee 接口请求（左侧） |
| 描述 | 具备集合树、环境变量、Swagger 导入与请求日志的类 Postman 接口客户端。 |

## 技术栈

| 层 | 技术 | 作用 |
| --- | --- | --- |
| 客户端 UI | React（通过 `window.__ModuleLoader__`） | 侧边栏入口与主面板。 |
| 宿主运行时 | Node.js `fetch` | 执行 HTTP 请求，带超时与响应大小上限。 |
| 插件框架 | Cordis（`slots`、`locale`、`connection`、`layout`） | UI 注入、国际化字典、HTTP 路由与面板导航。 |
| 客户端存储 | `window.localStorage` | 集合、环境、自定义请求头、历史与当前选择。 |
| 模块格式 | ES Modules | 入口在 `exports` 中声明。 |

## 功能

### 1. 请求构造
- 方法选择与 URL 输入框；仅支持 `http://` / `https://`，可设置超时（秒）。
- **Params**：键值对，自动拼到 URL 查询串。
- **Headers**：键值对，外加常用请求头库、多选批量添加、自定义请求头定义（名称、默认值、说明）。
- **Body**（Postman 风格类型，选择后自动设置对应的 `Content-Type` 头）：
  - **none** — 无请求体
  - **form-data** — 键值对，每行可切换文本/文件；文件行按 multipart 发送
  - **x-www-form-urlencoded** — 键值对序列化为 `k=v`
  - **raw** — 文本编辑器，带格式下拉：Text / JSON / JavaScript / HTML / XML（各自设置 Content-Type）
  - **binary** — 单个二进制文件作为请求体上传
- **环境**：创建环境并设置变量，在 URL / Params / Headers / Body 中用 `{{名称}}` 引用，发送时替换。

### 2. 集合树
- 把请求保存到嵌套文件夹树；新建/重命名/删除文件夹与请求（双击重命名）。
- 通过「移动到」选择器整理请求/文件夹；支持按名称搜索集合树。
- 双击已保存请求可加载回编辑器。

### 3. 响应查看
- 状态码、耗时、响应大小指标。
- Body 视图带「格式化 JSON」开关，长内容可在区域内滚动。
- 响应头标签页。

### 4. 历史与日志
- **历史**：每次发送都记录（URL、方法、状态、时间），点击条目可回填；按 URL / 方法搜索。
- **日志**：记录每次请求的完整信息（方法、URL、请求头、请求体）与返回（状态、耗时、大小、响应头、响应体，含错误），保留最近 200 条；按 URL / 方法 / 状态搜索。点击条目弹出详情框，请求/响应标签切换，各部分带复制按钮。文件上传只记录文件名。

### 5. 导入 / 导出
- **导出**：仅集合，或整个工作区（集合 + 环境 + 自定义请求头）为 JSON。
- **导入**：JSON 追加到现有数据，导入时重新生成 id 避免冲突。

### 6. Swagger / OpenAPI 导入
- 头部「导入 Swagger」按钮：粘贴 Swagger 2.0 / OpenAPI 3.x 的 JSON，或填 URL 拉取。
- 解析 `paths` 按 tag 分组（每个 HTTP 方法一个请求）；`{id}` 路径参数转为 `:id`；自动填入 query 参数与 body 示例。
- 可指定 baseUrl（留空用文档的 servers/host，支持 `{{baseUrl}}`）。
- 可选择目标文件夹作为导入根；重复导入同一文档会替换同源旧内容，不会堆叠。

## Host API

路由通过 `connection` 服务注册在 `/api/dsh-tree-new-bee-api-client` 下：`request`（执行一次 HTTP 调用，携带 method/url/headers/body/bodyBase64/timeout，返回 status/headers/body/timeMs/size）。

## 目录结构

```
dsh-tree-new-bee-api-client/
├── index.js              # 宿主端：/request 路由（fetch）
├── client.js             # 客户端：侧边栏入口、React 面板与样式
├── cordis.patch.yml      # DSH bundle patch
├── icon.svg / icon.png   # 插件图标
├── locale/               # zh.json / en.json 元数据
├── package.json
├── README.md             # 本文档（英文）
└── README.zh.md          # 中文文档
```

## 安装与使用

1. 将本 bundle 安装到目标 DSH profile 并刷新 Harness Web UI（会立即挂载）。
2. 在左侧侧边栏打开「Tree New Bee 接口请求」。
3. 输入 `http://` 或 `https://` 地址，设置方法/Params/Headers/Body，点「发送」。
4. 把常用请求保存到集合，用环境管理变量，或用「导入 Swagger」从接口文档快速生成集合。
5. 用「历史」/「日志」查看过往调用及完整的请求/响应数据。

### Pre-request Script 与 Tests
- 请求编辑器新增两个脚本标签（类似 Postman），脚本随请求保存。
- **Pre-request Script**：发送前运行，可用 `pm.environment.set(name, value)` / `pm.variables.set()` 设置变量，影响本次请求（变量替换在发送时完成）。
- **Tests**：响应后运行，可用 `pm.test(name, fn)` 定义断言、`pm.expect(value).to.eql(...)` / `.equal` / `.to.be.ok/true/false` / `.to.have.property()` 校验；响应对象通过全局变量 `response` 提供（含 status/body/headers 等）。
- 响应区新增「测试结果」标签，展示每项断言的通过/失败与错误信息。脚本在受限 Function 沙箱中执行，仅暴露 pm 与 response。
- 脚本内置模板：Pre-request 与 Tests 编辑器顶部有「模板」下拉，选择后可一键插入到脚本（追加到现有内容后），共 8 个经过验证的模板：
  - Pre-request：设置环境变量、设置时间戳变量、生成随机字符串、读取并递增计数器。
  - Tests：状态码为 200、JSON 响应断言、响应时间小于 2 秒、存在指定响应头。
