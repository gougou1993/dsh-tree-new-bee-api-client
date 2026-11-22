# Tree New Bee 接口请求

一款运行在 DSH（DeepSeek Harness）中的类 Postman HTTP 接口调试插件。左侧栏提供统一入口，可在面板中构造请求、查看响应、管理集合/环境/历史，所有数据保存在浏览器本地。

## 插件信息

- **包名**：`@oakzhong/dsh-tree-new-bee-api-client`（插件 ID `dsh-tree-new-bee-api-client`）
- **版本**：1.1.0
- **入口**：左侧栏「Tree New Bee 接口请求」
- **类型**：Host + Client 双半部插件（bundle）

## 使用技术

| 层面 | 技术 |
|---|---|
| 插件框架 | DSH Cordis bundle（`cordis.patch.yml` 插入 Loader 行） |
| Host 半部 | ESM `apply(ctx)`，通过 `ctx.connection.fetch.register` 注册 `/api/dsh-tree-new-bee-api-client/request` 路由 |
| HTTP 请求 | Node.js 内置 `fetch` + `AbortController` 超时控制，零第三方依赖 |
| Client 半部 | `window.__ModuleLoader__` 注册的前端模块，React 无 JSX（`React.createElement`） |
| UI 样式 | 组件内联 `<style>`（data-plugin-css 标识），使用 DSH 主题 token，自动适配明暗主题 |
| 国际化 | `ctx.locale.register` / `bind`，中英双语（zh / en） |
| 本地存储 | 浏览器 `localStorage`，集合、历史、环境、自定义头均持久化 |
| 数据解析 | URL 标准 `URL` / `searchParams`，JSON 格式化 `JSON.parse/stringify` |

## 功能

### 1. 请求构造与发送
- 支持 `GET / POST / PUT / PATCH / DELETE / HEAD / OPTIONS` 七种方法
- URL 输入、超时设置（秒）
- **Params**：键值对自动拼接到 URL（支持 `URL` 编码兜底）
- **Headers**：键值对编辑
- **Body**：原始文本，用于 POST/PUT/PATCH，支持 JSON
- 回车或点击「发送」执行，Host 侧返回状态码、状态文本、响应头、响应体、耗时、大小

### 2. 响应查看
- 状态 / 耗时 / 大小指标卡，状态码按成功/失败着色
- 响应 Body：可切换「格式化 JSON」与原始文本
- 响应 Headers 标签页
- 超大响应截断保护（4MB）

### 3. 集合管理（Postman 风格树形）
- 支持**文件夹嵌套层级**，文件夹可展开/折叠
- 保存请求到当前文件夹（面包屑展示路径：`根目录 / 父级 / 子级`，每段可点击跳转）
- 文件夹、请求**双击重命名**；删除均需用户确认（文件夹会连带内容）
- 集合**模糊搜索**：匹配文件夹名、请求名、方法、URL，自动展开命中节点
- 点击请求一键回填编辑器

### 4. 环境管理（变量替换）
- 多环境管理，每个环境有专属 K-V 变量
- 用 `{{变量名}}` 引用，如 `{{baseUrl}}/users`
- 发送时自动替换 **URL / Params / Headers / Body** 中的变量；未定义变量保持原样
- 顶部环境选择器，显示当前环境的变量名

### 5. 常用请求头
- 内置 14 个常用头（Accept、Content-Type、Authorization、User-Agent 等），带默认值
- **多选**：全选/取消全选、勾选多个后一次性插入，自动去重、填充空行
- **自定义请求头**：可新增自己的常用头（名称/默认值/说明），持久化保存，可删除

### 6. 导入 / 导出
- **导出**：将整个工作区（集合树、环境、自定义请求头）或仅集合导出为可移植的 JSON 文件
- **导入**：合并先前导出的 JSON 文件；每个文件夹与请求都会重新生成 id，避免与现有条目冲突；环境为追加，自定义请求头按 key 合并（同 key 覆盖）
- 两个按钮位于面板头部「返回」按钮旁
### 7. 历史记录
- 最近 100 条请求（状态、时间、URL、错误），点击回填完整请求快照
- 一键清空历史

## 数据存储

全部保存在浏览器 `localStorage`，键名：

- `dsh-tree-new-bee-api-client.collection.v1` — 集合树
- `dsh-tree-new-bee-api-client.history.v1` — 请求历史
- `dsh-tree-new-bee-api-client.environments.v1` — 环境列表
- `dsh-tree-new-bee-api-client.activeEnv.v1` — 当前环境
- `dsh-tree-new-bee-api-client.customHeaders.v1` — 自定义请求头

## 目录结构

```
dsh-tree-new-bee-api-client/
├── package.json          # 清单、bundle 配置、client 注入声明
├── cordis.patch.yml      # Loader 插入行
├── index.js              # Host 半部：HTTP 请求路由
├── client.js             # Client 半部：完整 UI 与交互
├── locale/
│   ├── zh.json           # 中文显示元信息
│   └── en.json           # 英文显示元信息
├── icon.svg              # 插件图标
├── README.md             # 英文文档
└── README.zh.md          # 中文文档
```

## 安装与使用

1. 通过插件管理器安装该 bundle（`install_bundle` 指向本目录）
2. 左侧栏点击「Tree New Bee 接口请求」
3. 输入请求地址与方法，按需填写 Params / Headers / Body
4. 点击「发送」查看响应
5. 用集合保存常用请求、用环境管理不同服务器的变量
