# Tree New Bee 接口请求 — 操作手册

一份面向日常使用的逐步操作指南。功能总览与技术说明见 [README.zh.md](README.zh.md)。

## 1. 打开面板

左侧侧边栏点击「Tree New Bee 接口请求」即可打开。面板分为三部分：

```
┌─────────────┬──────────────────────────────┐
│ 左侧栏       │ 右侧主区                       │
│ 集合/环境    │  ┌─ 请求编辑（URL + Params/    │
│ 历史/日志    │  │  Headers/Body/脚本）────┐  │
│             │  └─ 响应查看（Body/头/测试结果）┘ │
└─────────────┴──────────────────────────────┘
```

## 2. 发送第一个请求

1. 在顶部 URL 输入框填入地址，例如 `https://jsonplaceholder.typicode.com/posts/1`
2. 方法下拉保持 `GET`
3. 点右侧「发送」
4. 下方响应区显示：状态码、耗时、大小，以及 Body / 响应头

> 仅支持 `http://` 与 `https://` 开头的地址。超时时间可在 URL 右侧的输入框设置（秒）。

## 3. Params（查询参数）

在请求编辑区点「Params」标签，添加键值行，例如：

| 键 | 值 |
|---|---|
| page | 1 |
| limit | 20 |

发送时会自动拼到 URL：`?page=1&limit=20`。

## 4. Headers（请求头）

点「Headers」标签添加键值对。也可以：
- 点「添加常用请求头」展开常用头库，多选后点「添加选中」批量加入
- 在底部「自定义请求头」区域定义常用头（名称、默认值、说明），之后可复用

## 5. Body（请求体）

点「Body」标签，选择类型（选择后会自动设置 Content-Type 头）：

| 类型 | 用法 |
|---|---|
| **none** | 无请求体 |
| **form-data** | 每行填键和值；点行首的 `T` / `📎` 按钮切换文本或文件；文件行点「选择文件」上传 |
| **x-www-form-urlencoded** | 每行填键和值，发送时序列化为 `k=v` |
| **raw** | 在文本框输入原文；用「格式」下拉选 Text / JSON / JavaScript / HTML / XML |
| **binary** | 点「选择文件」选一个二进制文件作为请求体 |

> GET / HEAD 请求不发送 Body。

## 6. 环境变量

1. 左侧栏切到「环境」标签
2. 点「新建环境」，命名后添加变量，例如：

   | 变量名 | 值 |
   |---|---|
   | baseUrl | https://api.example.com |

3. 在顶部下拉选中该环境
4. 在 URL / Params / Headers / Body 中用 `{{baseUrl}}` 引用，发送时自动替换

> 脚本里设置的变量也参与替换（见第 9 节）。

## 7. 集合（保存请求）

1. 在「保存到」下拉选择目标文件夹（或根目录），可点「新建文件夹」创建
2. 在上方输入框填请求名称（留空则用「方法 + URL」）
3. 点「保存请求」
4. 之后在左侧「集合」树里双击该请求即可重新载入编辑器
5. 双击文件夹/请求可重命名；用「移动到」下拉可整理位置；顶部搜索框可过滤

## 8. 历史与日志

- **历史**：每次发送都记录一条，点条目可回填请求表单；顶部搜索框按 URL / 方法过滤
- **日志**：记录每次请求的完整信息。点条目弹出详情框：
  - 「请求日志」标签：方法、URL、请求头、请求体
  - 「返回日志」标签：状态、耗时、大小、响应头、响应体
  - 各部分有「复制」按钮；文件上传只记录文件名

## 9. Pre-request Script（预请求脚本）

请求编辑区点「预请求脚本」标签，在**发送前**运行。可设置变量影响本次请求：

```js
// 设置环境变量，用 {{token}} 引用
pm.environment.set("token", "abc123");

// 设置时间戳（签名场景）
pm.environment.set("ts", String(Date.now()));
```

**快捷模板**：编辑器顶部「模板」下拉选择后点「+ 插入模板」，共 4 个：
- 设置环境变量
- 设置时间戳变量
- 生成随机字符串
- 读取并递增计数器

## 10. Tests（测试脚本）与测试结果

请求编辑区点「测试脚本」标签，在**响应后**运行。用 `pm.test` 定义断言：

```js
pm.test("状态码 200", function () {
  pm.expect(response.status).to.eql(200);
});

pm.test("返回 ok=true", function () {
  var data = JSON.parse(response.body);
  pm.expect(data.ok).to.be.true();
});
```

响应对象 `response` 包含 `status`、`body`、`headers`、`timeMs`、`size` 等。

**可用断言**：
- `pm.expect(x).to.eql(y)` — 严格相等
- `.equal(y)` — 宽松相等
- `.to.be.ok()` / `.true()` / `.false()` — 真值判断
- `.to.have.property("k")` — 属性存在

**快捷模板**（同样在「模板」下拉）：状态码为 200、JSON 响应断言、响应时间小于 2 秒、存在指定响应头。

发送后，在响应区点「测试结果」标签查看每项断言的通过/失败与错误信息。

> 脚本在受限沙箱中执行，只暴露 `pm` 和 `response`。脚本随请求一起保存。

## 11. 导入 / 导出

面板头部按钮：

- **导出**：导出集合，或整个工作区（集合 + 环境 + 自定义头）为 JSON 文件
- **导入**：选择 JSON 文件，追加到现有数据（重新生成 id 避免冲突）
- **导入 Swagger**：见下一节

## 12. 从 Swagger / OpenAPI 导入

1. 点头部「导入 Swagger」打开对话框
2. 两种方式获取文档：
   - 粘贴 Swagger 2.0 / OpenAPI 3.x 的 JSON 到文本框
   - 或在「文档 URL」填入地址点「拉取」
3. （可选）填 baseUrl：留空用文档自带的 servers/host；也可填 `{{baseUrl}}` 引用环境变量
4. （可选）在「导入到」下拉选择已有文件夹作为根，留空则导入到顶层
5. 点「导入为集合」

解析规则：按 tag 分组生成文件夹，每个 HTTP 方法一个请求；`{id}` 路径参数转为 `:id`；query 参数与 body 示例自动填入。重复导入同一文档会替换旧内容，不会堆叠。

## 13. 测试地址（可直接用）

```text
GET  https://jsonplaceholder.typicode.com/posts/1
GET  https://postman-echo.com/get?foo=bar
POST https://postman-echo.com/post       Body: raw JSON  {"name":"test"}
POST https://postman-echo.com/post       Body: x-www-form-urlencoded  name=Tom&age=20
GET  https://dummyjson.com/products/1
GET  https://jsonplaceholder.typicode.com/posts/99999   （404，测失败日志）
```

Swagger 文档测试地址：
```text
https://petstore3.swagger.io/api/v3/openapi.json
https://petstore.swagger.io/v2/swagger.json
```
