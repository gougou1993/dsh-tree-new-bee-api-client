/**
 * Client half of the API client bundle.
 * Postman-style UI: request builder, collections, history and response viewer.
 */
window.__ModuleLoader__.load({
  id: '@oakzhong/dsh-tree-new-bee-api-client',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const { useState, useEffect, useRef, useCallback, useMemo } = React

    const NS = 'dsh-tree-new-bee-api-client'
    const PANEL_ID = 'api-client'
    const STYLE_ID = 'dsh-tree-new-bee-api-client/css'
    const API = '/api/dsh-tree-new-bee-api-client'
    const COLLECTION_KEY = 'dsh-tree-new-bee-api-client.collection.v1'
    const HISTORY_KEY = 'dsh-tree-new-bee-api-client.history.v1'
    const ENV_KEY = 'dsh-tree-new-bee-api-client.environments.v1'
    const ACTIVE_ENV_KEY = 'dsh-tree-new-bee-api-client.activeEnv.v1'
    const CUSTOM_HEADERS_KEY = 'dsh-tree-new-bee-api-client.customHeaders.v1'
    const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']
    // Common request headers, modeled after Postman's header autocomplete.
    const COMMON_HEADERS = [
      { key: 'Accept', value: 'application/json', desc: '响应类型' },
      { key: 'Content-Type', value: 'application/json', desc: '请求体类型' },
      { key: 'Authorization', value: 'Bearer {{token}}', desc: 'Bearer 令牌' },
      { key: 'User-Agent', value: 'dsh-tree-new-bee-api-client/1.0', desc: '客户端标识' },
      { key: 'Host', value: '', desc: '主机' },
      { key: 'Connection', value: 'keep-alive', desc: '连接模式' },
      { key: 'Cache-Control', value: 'no-cache', desc: '缓存控制' },
      { key: 'Accept-Language', value: 'zh-CN,zh;q=0.9', desc: '语言' },
      { key: 'Accept-Encoding', value: 'gzip, deflate', desc: '压缩' },
      { key: 'Origin', value: '', desc: '来源' },
      { key: 'Referer', value: '', desc: '来源页' },
      { key: 'Cookie', value: '', desc: 'Cookie' },
      { key: 'X-Requested-With', value: 'XMLHttpRequest', desc: 'Ajax 标识' },
      { key: 'X-API-Key', value: '', desc: 'API 密钥' },
    ]

    const zh = {
      title: 'Tree New Bee 接口请求', subtitle: '类 Postman 的接口调试工具：请求构造、集合树、环境变量、常用头与历史记录。',
      collection: '集合', history: '历史', save: '保存请求', saved: '已保存',
      log: '日志', logReq: '请求', logResp: '响应', logTime: '时间', logStatus: '状态', logDuration: '耗时',
      logHeaders: '请求头', logBody: '请求体', logRespBody: '响应体', logRespHeaders: '响应头',
      logMethod: '方法', logUrl: 'URL', logClear: '清空日志', logEmpty: '暂无日志记录',
      logReqTab: '请求日志', logRespTab: '返回日志', logCopy: '复制', logCopied: '已复制',
      logNoBody: '(无请求体)', logNoRespBody: '(无响应体)', logSearch: '搜索日志 (URL/方法/状态)',
      historySearch: '搜索历史 (URL/方法)', bodyFile: '文件', bodyFileChoose: '选择文件', bodyFileNone: '未选择文件', bodyFileInfo: '{name} ({size})', uploadFail: '读取文件失败',
      name: '请求名称', url: '请求地址', send: '发送', sending: '发送中…',
      params: 'Params', headers: 'Headers', body: 'Body', authorize: '授权',
      bodyMode: 'Body 类型', bodyModeHint: '选择类型会自动设置 Content-Type 请求头', bodyForm: '表单', bodyRaw: '原文', rawPlaceholder: '输入原始请求体内容…',
      bodyNone: '无', bodyFormData: 'form-data', bodyUrlencoded: 'x-www-form-urlencoded', bodyBinary: '二进制文件',
      rawSubtype: '格式', bodyTypeText: '文本', bodyTypeFile: '文件', addFile: '添加文件',
      bodyFiledName: '字段名', bodyFileFieldHint: '行类型：文本或文件',
      key: '键', value: '值', addRow: '添加一行', remove: '删除',
      response: '响应', status: '状态', time: '耗时', size: '大小',
      pretty: '格式化 JSON', raw: '原始', respHeaders: '响应头',
      noResponse: '发送请求后在此查看响应。', noCollection: '暂无保存的请求。',
      noHistory: '暂无历史记录。', confirmDel: '确定删除？',
      back: '返回', timeout: '超时(秒)', clearHistory: '清空历史',
      preRequest: '预请求脚本', tests: '测试脚本', testResults: '测试结果',
      scriptHint: 'Pre-request 发送前运行；Tests 响应后运行。可用 pm.environment.set / pm.variables.set / pm.test / pm.expect',
      scriptRun: '运行', testPassed: '通过', testFailed: '失败', testTotal: '{n} 项断言',
      testAllPass: '全部通过 ({n})', testSomeFail: '{p} 通过 / {f} 失败', noTests: '没有测试断言',
      scriptError: '脚本错误', scriptSetVar: '设置变量', scriptTemplate: '模板', scriptInsert: '插入模板', scriptChoose: '选择模板…',
      environment: '环境', envs: '环境', newEnv: '新建环境', envName: '环境名称',
      variables: '变量', variable: '变量名', noEnv: '暂无环境。新建环境后可设置专属变量。',
      noEnvSelected: '未选择环境', useVariable: '用 {{变量名}} 引用，如 {{baseUrl}}',
      confirmDelEnv: '确定删除该环境？', envSaved: '环境已保存', applyEnv: '变量将在发送时替换 {{key}}',
      import: '导入', export: '导出', exportAll: '导出全部数据', exportCollection: '仅导出集合',
      importOk: '导入成功：{summary}', importFail: '导入失败：文件格式不正确',
      confirmImport: '导入将合并到现有数据，继续？', nothingToExport: '没有可导出的数据',
      exported: '已导出 {summary}',
      commonHeaders: '添加常用请求头', selectHeader: '选择请求头…',
      addSelected: '添加选中', close: '收起', selectedN: '已选 {n} 项', clear: '清空选择',
      selectAll: '全选', unselectAll: '取消全选', customHeader: '自定义请求头',
      headerKeyName: '头名称', headerValue: '默认值', headerDesc: '说明(可选)', addCustom: '添加',
      noCustomHeaders: '还没有自定义请求头。',
      searchCollection: '搜索集合…', noMatches: '没有匹配的文件夹或请求。',
      newFolder: '新建文件夹', folderName: '文件夹名称', confirmDelFolder: '确定删除该文件夹及其内容？',
      moveTo: '移动到', root: '根目录', saveTo: '保存到', rename: '双击重命名',
      swaggerImport: '导入 Swagger', swaggerTitle: '从 Swagger/OpenAPI 导入',
      swaggerHint: '粘贴 Swagger 2.0 / OpenAPI 3.x 的 JSON，或填写 URL 拉取',
      swaggerUrl: '文档 URL (可选)', swaggerJson: 'JSON 内容', swaggerJsonPlaceholder: '粘贴 swagger.json / openapi.json 内容…',
      swaggerFetch: '拉取', swaggerFetching: '拉取中…', swaggerDoImport: '导入为集合',
      swaggerBaseUrl: '生成 URL 的 baseUrl (可选)', swaggerBaseHint: '留空用文档 servers/host，或填 {{baseUrl}}',
      swaggerTarget: '导入到（根集合）', swaggerTargetRoot: '根目录（顶层）',
      swaggerOk: '导入成功：{n} 个请求 / {g} 个分组', swaggerFail: '导入失败：{msg}',
      swaggerNoPaths: '未找到 paths 定义', swaggerPasteOrUrl: '请粘贴 JSON 或填写 URL',
    }
    const en = {
      title: 'Tree New Bee API Client', subtitle: 'Postman-style API testing: request builder, collection tree, environments, common headers and history.',
      collection: 'Collection', history: 'History', save: 'Save request', saved: 'Saved',
      log: 'Log', logReq: 'Request', logResp: 'Response', logTime: 'Time', logStatus: 'Status', logDuration: 'Duration',
      logHeaders: 'Request headers', logBody: 'Request body', logRespBody: 'Response body', logRespHeaders: 'Response headers',
      logMethod: 'Method', logUrl: 'URL', logClear: 'Clear log', logEmpty: 'No log entries',
      logReqTab: 'Request log', logRespTab: 'Response log', logCopy: 'Copy', logCopied: 'Copied',
      logNoBody: '(no request body)', logNoRespBody: '(no response body)', logSearch: 'Search logs (URL/method/status)',
      historySearch: 'Search history (URL/method)', bodyFile: 'File', bodyFileChoose: 'Choose file', bodyFileNone: 'No file chosen', bodyFileInfo: '{name} ({size})', uploadFail: 'Failed to read file',
      name: 'Request name', url: 'Request URL', send: 'Send', sending: 'Sending…',
      params: 'Params', headers: 'Headers', body: 'Body', authorize: 'Auth',
      bodyMode: 'Body type', bodyModeHint: 'Choosing a type auto-sets the Content-Type header', bodyForm: 'Form', bodyRaw: 'Raw', rawPlaceholder: 'Enter raw body…',
      bodyNone: 'none', bodyFormData: 'form-data', bodyUrlencoded: 'x-www-form-urlencoded', bodyBinary: 'binary',
      rawSubtype: 'Format', bodyTypeText: 'Text', bodyTypeFile: 'File', addFile: 'Add file',
      bodyFiledName: 'Field name', bodyFileFieldHint: 'Row type: text or file',
      key: 'Key', value: 'Value', addRow: 'Add row', remove: 'Remove',
      response: 'Response', status: 'Status', time: 'Time', size: 'Size',
      pretty: 'Pretty JSON', raw: 'Raw', respHeaders: 'Response headers',
      noResponse: 'Send a request to see the response here.', noCollection: 'No saved requests.',
      noHistory: 'No history yet.', confirmDel: 'Delete this?',
      back: 'Back', timeout: 'Timeout (s)', clearHistory: 'Clear history',
      preRequest: 'Pre-request Script', tests: 'Tests', testResults: 'Test Results',
      scriptHint: 'Pre-request runs before send; Tests run after response. Use pm.environment.set / pm.variables.set / pm.test / pm.expect',
      scriptRun: 'Run', testPassed: 'Pass', testFailed: 'Fail', testTotal: '{n} assertions',
      testAllPass: 'All passed ({n})', testSomeFail: '{p} passed / {f} failed', noTests: 'No test assertions',
      scriptError: 'Script error', scriptSetVar: 'Set variable', scriptTemplate: 'Template', scriptInsert: 'Insert', scriptChoose: 'Choose a template…',
      environment: 'Environment', envs: 'Environments', newEnv: 'New environment', envName: 'Environment name',
      variables: 'Variables', variable: 'Variable', noEnv: 'No environments. Create one to set scoped variables.',
      noEnvSelected: 'No environment selected', useVariable: 'Use {{key}} to reference, e.g. {{baseUrl}}',
      confirmDelEnv: 'Delete this environment?', envSaved: 'Environment saved', applyEnv: 'Variables replace {{key}} when sending',
      import: 'Import', export: 'Export', exportAll: 'Export everything', exportCollection: 'Export collection only',
      importOk: 'Imported: {summary}', importFail: 'Import failed: invalid file format',
      confirmImport: 'Import will merge into existing data. Continue?', nothingToExport: 'Nothing to export',
      exported: 'Exported {summary}',
      commonHeaders: 'Add common header', selectHeader: 'Select a header…',
      addSelected: 'Add selected', close: 'Close', selectedN: '{n} selected', clear: 'Clear selection',
      selectAll: 'Select all', unselectAll: 'Deselect all', customHeader: 'Custom header',
      headerKeyName: 'Header name', headerValue: 'Default value', headerDesc: 'Description (optional)', addCustom: 'Add',
      noCustomHeaders: 'No custom headers yet.',
      searchCollection: 'Search collection…', noMatches: 'No matching folders or requests.',
      newFolder: 'New folder', folderName: 'Folder name', confirmDelFolder: 'Delete this folder and its contents?',
      moveTo: 'Move to', root: 'Root', saveTo: 'Save to', rename: 'Double-click to rename',
      swaggerImport: 'Swagger import', swaggerTitle: 'Import from Swagger/OpenAPI',
      swaggerHint: 'Paste Swagger 2.0 / OpenAPI 3.x JSON, or provide a URL to fetch',
      swaggerUrl: 'Document URL (optional)', swaggerJson: 'JSON content', swaggerJsonPlaceholder: 'Paste swagger.json / openapi.json content…',
      swaggerFetch: 'Fetch', swaggerFetching: 'Fetching…', swaggerDoImport: 'Import as collection',
      swaggerBaseUrl: 'baseUrl for generated URLs (optional)', swaggerBaseHint: 'Leave blank to use servers/host, or use {{baseUrl}}',
      swaggerTarget: 'Import into (root collection)', swaggerTargetRoot: 'Root (top level)',
      swaggerOk: 'Imported: {n} requests / {g} groups', swaggerFail: 'Import failed: {msg}',
      swaggerNoPaths: 'No paths found', swaggerPasteOrUrl: 'Paste JSON or provide a URL',
    }
    let t = (k) => (zh[k] || k)
    const fmt = (s, v) => String(s || '').replace(/\{(\w+)\}/g, (_, k) => (v && v[k] != null ? v[k] : ''))
    function readJSON(key, fb) { try { const r = window.localStorage.getItem(key); return r ? JSON.parse(r) : fb } catch (_) { return fb } }
    function writeJSON(key, v) { try { window.localStorage.setItem(key, JSON.stringify(v)) } catch (_) {} }
    function makeId() { return 'r-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7) }
    // Built-in script templates (Postman-style snippets) for quick insertion.
    const SCRIPT_TEMPLATES = {
      pre: [
        {
          name: '设置环境变量',
          code: '// 设置环境变量，可在 URL/Params/Headers/Body 中用 {{token}} 引用\npm.environment.set("token", "your-token-here");',
        },
        {
          name: '设置时间戳变量',
          code: '// 生成当前时间戳，用于签名/防重放\npm.environment.set("ts", String(Date.now()));\npm.environment.set("date", new Date().toISOString());',
        },
        {
          name: '生成随机字符串',
          code: '// 生成随机字符串，可用作请求 ID / nonce\npm.variables.set("nonce", Math.random().toString(36).slice(2));',
        },
        {
          name: '读取并递增计数器',
          code: '// 从变量读取计数并 +1，写回（适合自增 ID 场景）\nvar n = Number(pm.variables.get("counter") || 0) + 1;\npm.variables.set("counter", n);',
        },
      ],
      tests: [
        {
          name: '状态码为 200',
          code: 'pm.test("Status code is 200", function () {\n  pm.expect(response.status).to.eql(200);\n});',
        },
        {
          name: 'JSON 响应断言',
          code: 'pm.test("Response is JSON with ok=true", function () {\n  var data = JSON.parse(response.body);\n  pm.expect(data).to.have.property("ok");\n  pm.expect(data.ok).to.be.true();\n});',
        },
        {
          name: '响应时间小于 2 秒',
          code: 'pm.test("Response time < 2000ms", function () {\n  pm.expect(response.timeMs < 2000).to.be.true();\n});',
        },
        {
          name: '存在指定响应头',
          code: 'pm.test("Has Content-Type header", function () {\n  pm.expect(response.headers["content-type"] || response.headers["Content-Type"]).to.be.ok();\n});',
        },
      ],
    }

    // Replace {{name}} placeholders using the given variable map.
    function resolveWith(s, map) {
      if (!s || typeof s !== 'string' || !map || !Object.keys(map).length) return s
      return String(s).replace(/\{\{\s*([\w.\-]+)\s*\}\}/g, (m, k) => (k in map ? String(map[k]) : m))
    }

    // Run a user script in a restricted Function scope with a small Postman-like `pm` API.
    // Returns { vars: {name:value}, tests: [{name, passed, error}], error }.
    function runScript(code, ctx) {
      const out = { vars: {}, tests: [], error: '' }
      if (!code || !String(code).trim()) return out
      const pm = {
        environment: {
          get: (name) => (ctx.env && ctx.env[name] != null ? ctx.env[name] : ''),
          set: (name, value) => { out.vars[name] = value == null ? '' : String(value) },
        },
        variables: {
          get: (name) => (ctx.vars && ctx.vars[name] != null ? ctx.vars[name] : ''),
          set: (name, value) => { out.vars[name] = value == null ? '' : String(value) },
        },
        test: (name, fn) => {
          try { fn(); out.tests.push({ name: String(name), passed: true, error: '' }) }
          catch (e) { out.tests.push({ name: String(name), passed: false, error: (e && e.message) || String(e) }) }
        },
        expect: (actual) => ({
          to: {
            eql: (expected) => { if (actual !== expected) throw new Error('expected ' + JSON.stringify(expected) + ' but got ' + JSON.stringify(actual)) },
            equal: (expected) => { if (actual != expected) throw new Error('expected ' + JSON.stringify(expected) + ' but got ' + JSON.stringify(actual)) },
            be: {
              ok: () => { if (!actual) throw new Error('expected truthy but got ' + JSON.stringify(actual)) },
              true: () => { if (actual !== true) throw new Error('expected true but got ' + JSON.stringify(actual)) },
              false: () => { if (actual !== false) throw new Error('expected false but got ' + JSON.stringify(actual)) },
            },
            have: {
              property: (key) => { if (!actual || !(key in actual)) throw new Error('expected property ' + key) },
            },
          },
          toBe: (expected) => { if (actual !== expected) throw new Error('expected ' + JSON.stringify(expected) + ' but got ' + JSON.stringify(actual)) },
        }),
      }
      const response = ctx.response || null
      try {
        // eslint-disable-next-line no-new-func
        const fn = new Function('pm', 'response', '"use strict";\n' + code)
        fn(pm, response)
      } catch (e) { out.error = (e && e.message) || String(e) }
      return out
    }

    function copyText(text) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text); return }
        const ta = document.createElement('textarea')
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'
        document.body.appendChild(ta); ta.select()
        try { document.execCommand('copy') } catch (_) {}
        ta.remove()
      } catch (_) {}
    }
    // Minimal object -> XML serializer for Swagger examples without a provided XML sample.
    function simpleToXml(obj, root) {
      root = root || 'root'
      if (obj === null || obj === undefined) return '<' + root + '/>'
      if (typeof obj !== 'object') return '<' + root + '>' + String(obj) + '</' + root + '>'
      if (Array.isArray(obj)) return obj.map((x) => simpleToXml(x, 'item')).join('\n')
      return Object.keys(obj).map((k) => '<' + k + '>' + (obj[k] && typeof obj[k] === 'object' ? '\n' + simpleToXml(obj[k], k) + '\n' : String(obj[k])) + '</' + k + '>').join('\n')
    }
    // Parse a Swagger 2.0 / OpenAPI 3.x document into collection folders + request nodes.
    // Returns { nodes, count, groups } or throws a human-readable error.
    function parseSwagger(doc, baseUrlOverride) {
      if (!doc || typeof doc !== 'object') throw new Error('invalid document')
      const paths = doc.paths
      if (!paths || typeof paths !== 'object') throw new Error('no paths')
      const isV3 = Boolean(doc.openapi) || (!doc.swagger && Boolean(doc.servers))
      // Determine a base URL.
      let base = ''
      if (baseUrlOverride && String(baseUrlOverride).trim()) {
        base = String(baseUrlOverride).trim()
      } else if (isV3 && Array.isArray(doc.servers) && doc.servers[0] && doc.servers[0].url) {
        base = String(doc.servers[0].url)
      } else if (!isV3 && doc.host) {
        const scheme = (Array.isArray(doc.schemes) && doc.schemes[0]) || 'https'
        base = scheme + '://' + doc.host + (doc.basePath || '')
      } else if (!isV3 && doc.basePath) {
        base = String(doc.basePath)
      }
      base = base.replace(/\/+$/, '')
      const joinUrl = (path) => {
        const p = String(path || '').replace(/\{([^}]+)\}/g, ':$1')
        if (!base) return p
        if (/^https?:\/\//i.test(base)) return base + (p.startsWith('/') ? p : '/' + p)
        return base + (p.startsWith('/') ? p : '/' + p)
      }
      const methods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace']
      const byTag = {}
      let count = 0
      for (const pathKey of Object.keys(paths)) {
        const item = paths[pathKey]
        if (!item || typeof item !== 'object') continue
        for (const method of methods) {
          const op = item[method]
          if (!op || typeof op !== 'object') continue
          const tags = Array.isArray(op.tags) && op.tags.length ? op.tags : ['default']
          const tag = String(tags[0] || 'default')
          if (!byTag[tag]) byTag[tag] = []
          // Build query params (v2 'query', v3 'query').
          const params = []
          const headers = []
          const paramExample = (pa) => {
            const schema = pa.schema || {}
            if (pa.example != null) return pa.example
            if (schema.example != null) return schema.example
            if (pa.default != null) return pa.default
            if (schema.default != null) return schema.default
            if (Array.isArray(schema['enum']) && schema['enum'].length) return schema['enum'][0]
            return ''
          }
          const addParam = (pa, target) => {
            if (!pa || typeof pa !== 'object') return
            const name = pa.name || ''
            if (!name) return
            const ex = paramExample(pa)
            target.push({ key: name, value: ex == null ? '' : String(ex), desc: pa.description || '' })
          }
          // Merge operation-level and path-level parameters (operation wins on the same name).
          const listParams = Array.isArray(op.parameters) ? op.parameters : []
          const pathParams = Array.isArray(item.parameters) ? item.parameters : []
          const allParams = pathParams.concat(listParams)
          // Query parameters become URL query params; header parameters become request headers.
          // Path parameters stay as :name placeholders in the URL (the plugin does not substitute them).
          for (const pa of allParams) if (pa && pa.in === 'query') addParam(pa, params)
          for (const pa of allParams) if (pa && pa.in === 'header') addParam(pa, headers)
          if (!params.length) params.push({ key: '', value: '' })
          // ---- request body + Content-Type ---------------------------------
          // Swagger may declare several media types (json / xml / form / text).
          // Pick a preferred one, serialize its example, and add a matching
          // Content-Type header if the spec did not already provide one.
          let body = ''
          let pickedType = ''
          let pickedExample = undefined
          if (op.requestBody && op.requestBody.content) {
            const contentMap = op.requestBody.content
            const keys = Object.keys(contentMap)
            const preferred = ['application/json', 'application/xml', 'text/xml', 'application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']
            pickedType = preferred.find((k) => keys.includes(k)) || keys[0] || ''
            const media = pickedType ? contentMap[pickedType] : null
            if (media) {
              if (media.example != null) pickedExample = media.example
              else if (media.schema && media.schema.example != null) pickedExample = media.schema.example
              else if (media.schema) {
                // Build a minimal sample from schema properties when no example is given.
                const props = media.schema.properties || {}
                const sample = {}
                for (const k of Object.keys(props)) sample[k] = props[k].example != null ? props[k].example : (props[k].type === 'integer' || props[k].type === 'number' ? 0 : '')
                if (Object.keys(sample).length) pickedExample = sample
              }
            }
            // honour an explicit Content-Type header declared in parameters
            const explicitCT = allParams.find((pa) => pa && pa.in === 'header' && pa.name && pa.name.toLowerCase() === 'content-type')
            if (!explicitCT && pickedType && !headers.some((h) => h.key && h.key.toLowerCase() === 'content-type')) {
              // Replace the leading empty placeholder, or append.
              const emptyIdx = headers.findIndex((h) => !h.key)
              if (emptyIdx >= 0) headers[emptyIdx] = { key: 'Content-Type', value: pickedType, desc: '' }
              else headers.push({ key: 'Content-Type', value: pickedType, desc: '' })
            }
          }
          // v2: body parameter + consumes
          const bodyParam = listParams.find((pa) => pa && pa.in === 'body')
          if (bodyParam && !pickedType) {
            const consumes = (op.consumes && op.consumes[0]) || (doc.consumes && doc.consumes[0]) || 'application/json'
            pickedType = consumes
            if (bodyParam.schema && bodyParam.schema.example != null) pickedExample = bodyParam.schema.example
            const explicitCT = allParams.find((pa) => pa && pa.in === 'header' && pa.name && pa.name.toLowerCase() === 'content-type')
            if (!explicitCT && !headers.some((h) => h.key && h.key.toLowerCase() === 'content-type')) {
              const emptyIdx = headers.findIndex((h) => !h.key)
              if (emptyIdx >= 0) headers[emptyIdx] = { key: 'Content-Type', value: pickedType, desc: '' }
              else headers.push({ key: 'Content-Type', value: pickedType, desc: '' })
            }
          }
          // Serialize according to media type (Postman-style body modes).
          let bodyMode = 'none'
          let rawSubtype = 'JSON'
          let bodyRows = [{ key: '', value: '', type: 'text' }]
          if (pickedExample !== undefined) {
            if (/json/i.test(pickedType)) { bodyMode = 'raw'; rawSubtype = 'JSON'; body = JSON.stringify(pickedExample, null, 2) }
            else if (/xml/i.test(pickedType)) { bodyMode = 'raw'; rawSubtype = 'XML'; body = (typeof pickedExample === 'string' ? pickedExample : simpleToXml(pickedExample)) }
            else if (/javascript/i.test(pickedType)) { bodyMode = 'raw'; rawSubtype = 'JavaScript'; body = String(pickedExample) }
            else if (/html/i.test(pickedType)) { bodyMode = 'raw'; rawSubtype = 'HTML'; body = String(pickedExample) }
            else if (/x-www-form-urlencoded/i.test(pickedType) && pickedExample && typeof pickedExample === 'object') {
              bodyMode = 'urlencoded'
              bodyRows = Object.keys(pickedExample).map((k) => ({ key: k, value: pickedExample[k] == null ? '' : String(pickedExample[k]), type: 'text' }))
              if (!bodyRows.length) bodyRows = [{ key: '', value: '', type: 'text' }]
            } else if (/multipart\/form-data/i.test(pickedType) && pickedExample && typeof pickedExample === 'object') {
              bodyMode = 'formdata'
              bodyRows = Object.keys(pickedExample).map((k) => ({ key: k, value: pickedExample[k] == null ? '' : String(pickedExample[k]), type: 'text' }))
              if (!bodyRows.length) bodyRows = [{ key: '', value: '', type: 'text' }]
            } else { bodyMode = 'raw'; rawSubtype = 'Text'; body = typeof pickedExample === 'string' ? pickedExample : JSON.stringify(pickedExample) }
          }
          if (!headers.length) headers.push({ key: '', value: '' })
          const name = String(op.summary || op.operationId || (method.toUpperCase() + ' ' + pathKey))
          byTag[tag].push({
            id: makeId(), type: 'request', name,
            method: method.toUpperCase(), url: joinUrl(pathKey),
            params, headers, body, bodyMode, bodyRows, rawSubtype, timeout: '20',
          })
          count += 1
        }
      }
      if (!count) throw new Error('no paths')
      // Source identity from info.title + version, used to replace prior imports of the same spec.
      const info = doc.info || {}
      const source = String(info.title || 'Swagger') + '|' + String(info.version || '')
      const nodes = Object.keys(byTag).map((tag) => ({
        id: makeId(), type: 'folder', name: tag, children: byTag[tag], swaggerSource: source,
      }))
      return { nodes, count, groups: nodes.length, source }
    }

    // Recursively remove any node (folder or request) carrying a given swaggerSource.
    function removeBySource(nodes, source) {
      if (!source) return nodes
      return nodes
        .filter((n) => n.swaggerSource !== source)
        .map((n) => n.type === 'folder' ? { ...n, children: removeBySource(n.children || [], source) } : n)
    }


    async function api(path, body) {
      const res = await fetch(API + path, {
        method: 'POST', credentials: 'same-origin',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      })
      let data = null
      try { data = await res.json() } catch (_) {}
      return data || { error: 'HTTP ' + res.status }
    }

    function SidebarIcon(props) {
      const size = typeof props.size === 'number' ? props.size : 20
      return h('svg', {
        viewBox: '0 0 24 24', width: size, height: size, fill: 'none',
        stroke: 'currentColor', strokeWidth: 1.6, 'aria-hidden': true,
        style: { opacity: props.active ? 1 : 0.82 },
      },
        h('path', { d: 'M4 7h16M4 12h10M4 17h13' }),
        h('circle', { cx: 19, cy: 12, r: 2.5 })
      )
    }

    function ApiPanel({ ctx }) {
      const [method, setMethod] = useState('GET')
      const [url, setUrl] = useState('')
      const [params, setParams] = useState([{ key: '', value: '' }])
      const [headers, setHeaders] = useState([{ key: '', value: '' }])
      const [body, setBody] = useState('')
      const [bodyMode, setBodyMode] = useState('none')  // none | formdata | urlencoded | raw | binary
      const [rawSubtype, setRawSubtype] = useState('JSON')  // Text | JSON | JavaScript | HTML | XML
      const [bodyRows, setBodyRows] = useState([{ key: '', value: '', type: 'text' }])
      const [bodyFile, setBodyFile] = useState(null)  // { name, size, base64 }
      const bodyFileRef = useRef(null)
      const bodyRowFileRef = useRef(null)
      const [fileRowIndex, setFileRowIndex] = useState(-1)
      const [timeout, setTimeoutV] = useState('20')
      const [tab, setTab] = useState('params')
      const [preScript, setPreScript] = useState('')
      const [testScript, setTestScript] = useState('')
      const [testResults, setTestResults] = useState(null)
      const [preTpl, setPreTpl] = useState('')
      const [testTpl, setTestTpl] = useState('')
      const [resp, setResp] = useState(null)
      const [sending, setSending] = useState(false)
      const [err, setErr] = useState('')
      const [collection, setCollection] = useState(() => readJSON(COLLECTION_KEY, []))
      const [currentFolder, setCurrentFolder] = useState('')   // '' = root; folder id
      const [folderName, setFolderName] = useState('')
      const [expandedFolders, setExpandedFolders] = useState({})
      const [editingNode, setEditingNode] = useState('')
      const [editValue, setEditValue] = useState('')
      const [collectionQuery, setCollectionQuery] = useState('')
      const fileRef = useRef(null)
      const [swaggerOpen, setSwaggerOpen] = useState(false)
      const [swaggerUrl, setSwaggerUrl] = useState('')
      const [swaggerText, setSwaggerText] = useState('')
      const [swaggerBase, setSwaggerBase] = useState('')
      const [swaggerTarget, setSwaggerTarget] = useState('')
      const [swaggerBusy, setSwaggerBusy] = useState(false)
      const [logSearch, setLogSearch] = useState('')
      const [historySearch, setHistorySearch] = useState('')
      const [selectedLog, setSelectedLog] = useState(null)
      const [logDetailTab, setLogDetailTab] = useState('req')
      const [history, setHistory] = useState(() => readJSON(HISTORY_KEY, []))
      const [saveName, setSaveName] = useState('')
      const [pretty, setPretty] = useState(true)
      const [sideTab, setSideTab] = useState('collection')
      const [respTab, setRespTab] = useState('body')
      const [environments, setEnvironments] = useState(() => readJSON(ENV_KEY, []))
      const [activeEnvId, setActiveEnvId] = useState(() => { try { return window.localStorage.getItem(ACTIVE_ENV_KEY) || '' } catch (_) { return '' } })
      const [envName, setEnvName] = useState('')
      const [showCommon, setShowCommon] = useState(false)
      const [selectedHeaders, setSelectedHeaders] = useState([])
      const [customHeaders, setCustomHeaders] = useState(() => readJSON(CUSTOM_HEADERS_KEY, []))
      const [customForm, setCustomForm] = useState({ key: '', value: '', desc: '' })

      useEffect(() => { writeJSON(COLLECTION_KEY, collection) }, [collection])
      useEffect(() => { writeJSON(HISTORY_KEY, history) }, [history])
      useEffect(() => { writeJSON(ENV_KEY, environments) }, [environments])
      useEffect(() => { writeJSON(CUSTOM_HEADERS_KEY, customHeaders) }, [customHeaders])
      useEffect(() => { try { window.localStorage.setItem(ACTIVE_ENV_KEY, activeEnvId) } catch (_) {} }, [activeEnvId])

      const activeEnv = useMemo(() => environments.find((e) => e.id === activeEnvId) || null, [environments, activeEnvId])
      const varMap = useMemo(() => {
        const m = {}
        if (activeEnv) for (const v of (activeEnv.variables || [])) if (v.key && v.key.trim()) m[v.key.trim()] = v.value || ''
        return m
      }, [activeEnv])
      // Replace {{key}} with the active environment's value.
      const resolveVars = useCallback((s) => resolveWith(s, varMap), [varMap])

      const buildUrl = useCallback((extraVars) => {
        const r = (v) => resolveWith(v, { ...varMap, ...(extraVars || {}) })
        const active = params.filter((p) => p.key.trim())
        const base = r(url)
        if (!active.length) return base
        try {
          const u = new URL(base)
          for (const p of active) u.searchParams.set(p.key.trim(), r(p.value || ''))
          return u.toString()
        } catch (_) {
          const q = active.map((p) => encodeURIComponent(p.key.trim()) + '=' + encodeURIComponent(r(p.value || ''))).join('&')
          return base + (base.includes('?') ? '&' : '?') + q
        }
      }, [url, params, varMap])

      const send = useCallback(async () => {
        if (!url.trim()) { setErr(t('url') + '?'); return }
        setSending(true); setErr(''); setResp(null); setTestResults(null)
        // Pre-request script: may set variables used by this request.
        const preResult = runScript(preScript, { env: varMap, vars: varMap })
        if (preResult.error) setErr(t('scriptError') + ': ' + preResult.error)
        const sendVars = { ...varMap, ...preResult.vars }
        const rv = (v) => resolveWith(v, sendVars)
        const headerObj = {}
        for (const hh of headers) if (hh.key.trim()) headerObj[hh.key.trim()] = rv(hh.value || '')
        const finalUrl = buildUrl(preResult.vars)
        const noBody = ['GET', 'HEAD'].includes(method)
        let payload = ''
        let bodyBase64
        if (!noBody) {
          if (bodyMode === 'none') {
            payload = ''
          } else if (bodyMode === 'urlencoded') {
            payload = bodyRows.filter((r) => r.key).map((r) => encodeURIComponent(r.key.trim()) + '=' + encodeURIComponent(rv(r.value || ''))).join('&')
          } else if (bodyMode === 'formdata') {
            // multipart/form-data: build a body with a random boundary; text rows and file rows.
            const boundary = '----dshForm' + Date.now().toString(36)
            const parts = []
            for (const r of bodyRows) {
              if (!r.key) continue
              if (r.type === 'file' && r.file) {
                parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + r.key + '"; filename="' + r.file.name + '"\r\nContent-Type: application/octet-stream\r\n\r\n')
                parts.push({ b64: r.file.base64 })
                parts.push('\r\n')
              } else {
                parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + r.key + '"\r\n\r\n' + rv(r.value || '') + '\r\n')
              }
            }
            parts.push('--' + boundary + '--\r\n')
            // Mixed text + binary: encode whole thing to base64 for the Host.
            let binary = ''
            for (const part of parts) {
              if (typeof part === 'string') binary += part
              else {
                const raw = part.b64.indexOf(',') >= 0 ? part.b64.slice(part.b64.indexOf(',') + 1) : part.b64
                const bytes = Uint8Array.from(atob(raw), (c) => c.charCodeAt(0))
                binary += String.fromCharCode.apply(null, bytes)
              }
            }
            bodyBase64 = btoa(binary)
            headerObj['Content-Type'] = 'multipart/form-data; boundary=' + boundary
          } else if (bodyMode === 'binary') {
            if (!bodyFile) { setErr(t('bodyFileNone')); setSending(false); return }
            bodyBase64 = bodyFile.base64
          } else {
            payload = rv(body)  // raw
          }
        }
        const result = await api('/request', {
          method, url: finalUrl, headers: headerObj,
          body: noBody ? '' : payload,
          bodyBase64,
          timeout: (Number(timeout) || 20),
        })
        if (result.error) { setErr(result.error); setResp({ timeMs: result.timeMs }) }
        else setResp(result)
        // Tests script: runs after the response is available.
        if (testScript.trim()) {
          const testResult = runScript(testScript, { env: sendVars, vars: sendVars, response: result })
          setTestResults(testResult)
        }
        setHistory((prev) => [{
          id: makeId(), method, url: finalUrl, time: new Date().toISOString(),
          status: result.status, error: result.error || '',
          // Full request + response detail for the log viewer.
          request: {
            method, url: finalUrl, headers: headerObj,
            body: noBody ? '' : (bodyMode === 'binary' ? '[binary] ' + (bodyFile ? bodyFile.name : '') : (bodyMode === 'formdata' ? '[form-data] ' + bodyRows.filter((r) => r.key).length + ' fields' : payload)),
            params, bodyMode,
          },
          response: result.error
            ? { error: result.error, timeMs: result.timeMs }
            : { status: result.status, statusText: result.statusText || '', headers: result.headers || {}, body: result.body || '', timeMs: result.timeMs, size: result.size },
          snapshot: { method, url, params, headers, body, bodyMode, bodyRows, rawSubtype, preScript, testScript, timeout },
        }, ...prev].slice(0, 200))
        setSending(false)
      }, [url, method, headers, body, bodyRows, bodyMode, bodyFile, rawSubtype, timeout, buildUrl, params, resolveVars, preScript, testScript, varMap])

      // ---- collection tree helpers ----
      const findFolder = useCallback((nodes, id) => {
        if (!id) return null
        for (const n of nodes) {
          if (n.type === 'folder') {
            if (n.id === id) return n
            const found = findFolder(n.children || [], id)
            if (found) return found
          }
        }
        return null
      }, [])
      // Breadcrumb path from root to a folder: array of { id, name }.
      const folderPath = useCallback((nodes, id, acc) => {
        acc = acc || []
        for (const n of nodes) {
          if (n.type !== 'folder') continue
          if (n.id === id) return [...acc, { id: n.id, name: n.name }]
          const sub = folderPath(n.children || [], id, [...acc, { id: n.id, name: n.name }])
          if (sub) return sub
        }
        return null
      }, [])
      // Flatten all folders with their breadcrumb path for the Swagger target selector.
      const allFolders = useMemo(() => {
        const out = []
        const walk = (nodes, path) => {
          for (const n of nodes || []) {
            if (n.type !== 'folder') continue
            const here = [...path, n.name]
            out.push({ id: n.id, label: here.join(' / ') })
            walk(n.children || [], here)
          }
        }
        walk(collection, [])
        return out
      }, [collection])

      // Fuzzy filter nodes by folder name / request name / method / URL.
      const filterTree = useCallback((nodes, q) => {
        if (!q) return nodes
        const needle = q.toLowerCase()
        const result = []
        for (const n of nodes) {
          if (n.type === 'folder') {
            const kids = filterTree(n.children || [], q)
            const selfMatch = (n.name || '').toLowerCase().indexOf(needle) >= 0
            if (kids.length || selfMatch) result.push({ ...n, children: kids, _searchOpen: true })
          } else {
            const hay = [n.name, n.method, n.url].filter(Boolean).join(' ').toLowerCase()
            if (hay.indexOf(needle) >= 0) result.push(n)
          }
        }
        return result
      }, [])
      const insertNode = useCallback((nodes, parentId, node) => {
        if (!parentId) return [...nodes, node]
        return nodes.map((n) => {
          if (n.type === 'folder') {
            if (n.id === parentId) return { ...n, children: [...(n.children || []), node] }
            return { ...n, children: insertNode(n.children || [], parentId, node) }
          }
          return n
        })
      }, [])
      const removeNode = useCallback((nodes, id) =>
        nodes.filter((n) => n.id !== id).map((n) =>
          n.type === 'folder' ? { ...n, children: removeNode(n.children || [], id) } : n
        ), [])
      const countRequests = useCallback((n) => {
        if (!n || n.type !== 'folder') return 0
        return (n.children || []).reduce((s, c) => s + (c.type === 'folder' ? countRequests(c) : 1), 0)
      }, [])

      // Count every node (folders + requests) in a collection tree.
      const countAllNodes = useCallback((nodes) => {
        let total = 0
        const walk = (list) => {
          for (const n of list || []) {
            total += 1
            if (n.type === 'folder') walk(n.children || [])
          }
        }
        walk(nodes)
        return total
      }, [])

      const addFolder = useCallback(() => {
        const name = folderName.trim() || t('newFolder')
        const node = { id: makeId(), type: 'folder', name, children: [] }
        setCollection((prev) => insertNode(prev, currentFolder, node))
        setExpandedFolders((prev) => ({ ...prev, [currentFolder || '__root']: true, [node.id]: true }))
        setFolderName('')
      }, [folderName, currentFolder, insertNode])

      const findNode = useCallback((nodes, id) => {
        for (const n of nodes) {
          if (n.id === id) return n
          if (n.type === 'folder') { const f = findNode(n.children || [], id); if (f) return f }
        }
        return null
      }, [])
      const renameNode = useCallback((nodes, id, name) => nodes.map((n) => {
        if (n.id === id) return { ...n, name }
        if (n.type === 'folder') return { ...n, children: renameNode(n.children || [], id, name) }
        return n
      }), [])
      const delNode = useCallback((id) => {
        const node = findNode(collection, id)
        const isFolder = node && node.type === 'folder'
        if (isFolder && !window.confirm(t('confirmDelFolder'))) return
        if (!isFolder && !window.confirm(t('confirmDel'))) return
        setCollection((prev) => removeNode(prev, id))
        if (currentFolder === id) setCurrentFolder('')
      }, [collection, findNode, currentFolder, removeNode])

      const startRename = useCallback((n) => {
        setEditingNode(n.id)
        setEditValue(n.name || n.url || '')
      }, [])
      const commitRename = useCallback(() => {
        const value = editValue.trim()
        if (editingNode && value) setCollection((prev) => renameNode(prev, editingNode, value))
        setEditingNode(''); setEditValue('')
      }, [editingNode, editValue, renameNode])

      const saveRequest = useCallback(() => {
        const name = saveName.trim() || (method + ' ' + url)
        if (!url.trim()) return
        const node = { id: makeId(), type: 'request', name, method, url, params, headers, body, bodyMode, bodyRows, rawSubtype, preScript, testScript, timeout }
        setCollection((prev) => insertNode(prev, currentFolder, node))
        if (currentFolder) setExpandedFolders((prev) => ({ ...prev, [currentFolder]: true }))
        setSaveName('')
      }, [saveName, method, url, params, headers, body, bodyMode, bodyRows, rawSubtype, preScript, testScript, timeout, currentFolder, insertNode])


      const loadSaved = useCallback((s) => {
        setMethod(s.method || 'GET'); setUrl(s.url || '')
        setParams(s.params && s.params.length ? s.params : [{ key: '', value: '' }])
        setHeaders(s.headers && s.headers.length ? s.headers : [{ key: '', value: '' }])
        setBody(s.body || ''); setTimeoutV(s.timeout || '20'); setResp(null)
        setBodyMode(s.bodyMode || 'none')
        setRawSubtype(s.rawSubtype || 'JSON')
        setPreScript(s.preScript || '')
        setTestScript(s.testScript || '')
        setTestResults(null)
        setBodyRows(s.bodyRows && s.bodyRows.length ? s.bodyRows : [{ key: '', value: '', type: 'text' }])
      }, [])

      // ---- environment management ----
      const addEnv = useCallback(() => {
        const name = envName.trim() || ('Environment ' + (environments.length + 1))
        const id = makeId()
        setEnvironments((prev) => [...prev, { id, name, variables: [{ key: 'baseUrl', value: '' }] }])
        setActiveEnvId(id)
        setEnvName('')
        setSideTab('envs')
      }, [envName, environments.length])

      const delEnv = useCallback((id) => {
        if (!window.confirm(t('confirmDelEnv'))) return
        setEnvironments((prev) => prev.filter((e) => e.id !== id))
        if (activeEnvId === id) setActiveEnvId('')
      }, [activeEnvId])

      const updateEnv = useCallback((id, patch) => {
        setEnvironments((prev) => prev.map((e) => e.id === id ? { ...e, ...patch } : e))
      }, [])

      const updateEnvVar = useCallback((envId, idx, field, val) => {
        setEnvironments((prev) => prev.map((e) => {
          if (e.id !== envId) return e
          const vars = (e.variables || []).map((v, i) => i === idx ? { ...v, [field]: val } : v)
          return { ...e, variables: vars }
        }))
      }, [])

      const envAddRow = useCallback((envId) => {
        setEnvironments((prev) => prev.map((e) => e.id === envId ? { ...e, variables: [...(e.variables || []), { key: '', value: '' }] } : e))
      }, [])

      const envDelRow = useCallback((envId, idx) => {
        setEnvironments((prev) => prev.map((e) => e.id === envId ? { ...e, variables: (e.variables || []).filter((_, i) => i !== idx) } : e))
      }, [])

      const allCommonHeaders = useMemo(() => [...COMMON_HEADERS, ...customHeaders], [customHeaders])

      // Decide how the Body editor should render: explicit override, else derive
      // from the Content-Type request header (default json).
      const insertPreTpl = useCallback(() => {
        const tpl = SCRIPT_TEMPLATES.pre.find((x) => x.name === preTpl)
        if (!tpl) return
        setPreScript((prev) => (prev ? prev + '\n\n' : '') + tpl.code)
        setPreTpl('')
      }, [preTpl])
      const insertTestTpl = useCallback(() => {
        const tpl = SCRIPT_TEMPLATES.tests.find((x) => x.name === testTpl)
        if (!tpl) return
        setTestScript((prev) => (prev ? prev + '\n\n' : '') + tpl.code)
        setTestTpl('')
      }, [testTpl])

      const chooseBodyFile = useCallback((e) => {
        const file = e.target.files && e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => {
          setBodyFile({ name: file.name, size: file.size, base64: String(reader.result || '') })
          setErr('')
        }
        reader.onerror = () => setErr(t('uploadFail'))
        reader.readAsDataURL(file)
        e.target.value = ''
      }, [])

      // Postman-style: the selected body type determines Content-Type automatically.
      const RAW_CT = { Text: 'text/plain', JSON: 'application/json', JavaScript: 'application/javascript', HTML: 'text/html', XML: 'application/xml' }
      const contentTypeFor = (mode, subtype) => {
        if (mode === 'formdata') return 'multipart/form-data'
        if (mode === 'urlencoded') return 'application/x-www-form-urlencoded'
        if (mode === 'raw') return RAW_CT[subtype] || 'text/plain'
        if (mode === 'binary') return 'application/octet-stream'
        return ''
      }
      const setHeaderKey = (key, value) => {
        setHeaders((prev) => {
          const idx = prev.findIndex((h) => h.key && h.key.trim().toLowerCase() === key.toLowerCase())
          if (value === '') return idx < 0 ? prev : prev.filter((_, i) => i !== idx)
          if (idx >= 0) return prev.map((h, i) => i === idx ? { ...h, key, value } : h)
          const empty = prev.findIndex((h) => !h.key)
          if (empty >= 0) return prev.map((h, i) => i === empty ? { key, value, desc: '' } : h)
          return [...prev, { key, value, desc: '' }]
        })
      }
      // Called when the user picks a body type / raw subtype: sync the Content-Type header.
      const pickBodyMode = (mode) => {
        setBodyMode(mode)
        setHeaderKey('Content-Type', contentTypeFor(mode, rawSubtype))
      }
      const pickRawSubtype = (subtype) => {
        setRawSubtype(subtype)
        if (bodyMode === 'raw') setHeaderKey('Content-Type', RAW_CT[subtype] || 'text/plain')
      }
      const updateRow = (setter, idx, field, val) => setter((prev) => prev.map((r, i) => i === idx ? { ...r, [field]: val } : r))
      const addRow = (setter) => setter((prev) => [...prev, { key: '', value: '' }])
      const delRow = (setter, idx) => setter((prev) => prev.filter((_, i) => i !== idx))
      const addCommonHeaders = useCallback((names) => {
        const defs = names.map((n) => allCommonHeaders.find((x) => x.key === n)).filter(Boolean)
        if (!defs.length) return
        setHeaders((prev) => {
          let next = prev.slice()
          for (const hdef of defs) {
            const idx = next.findIndex((r) => r.key.toLowerCase() === hdef.key.toLowerCase())
            if (idx >= 0) { if (!next[idx].value) next[idx] = { ...next[idx], value: hdef.value }; continue }
            const empty = next.findIndex((r) => !r.key.trim() && !r.value.trim())
            if (empty >= 0) next[empty] = { key: hdef.key, value: hdef.value }
            else next = [...next, { key: hdef.key, value: hdef.value }]
          }
          return next
        })
        setSelectedHeaders([])
        setShowCommon(false)
      }, [allCommonHeaders])

      const selectAllCommon = useCallback(() => setSelectedHeaders(allCommonHeaders.map((x) => x.key)), [allCommonHeaders])
      const addCustomHeader = useCallback(() => {
        const key = customForm.key.trim()
        if (!key) return
        setCustomHeaders((prev) => {
          const idx = prev.findIndex((x) => x.key.toLowerCase() === key.toLowerCase())
          const item = { key, value: customForm.value || '', desc: customForm.desc || '自定义' }
          if (idx >= 0) { const next = prev.slice(); next[idx] = item; return next }
          return [...prev, item]
        })
        setCustomForm({ key: '', value: '', desc: '' })
      }, [customForm])
      const delCustomHeader = useCallback((key) => {
        setCustomHeaders((prev) => prev.filter((x) => x.key !== key))
        setSelectedHeaders((prev) => prev.filter((x) => x !== key))
      }, [])
      const toggleSelectedHeader = useCallback((name) => {
        setSelectedHeaders((prev) => prev.indexOf(name) >= 0 ? prev.filter((x) => x !== name) : [...prev, name])
      }, [])

      const renderRows = (rows, setter) =>
        h('div', { className: 'dshApi-rows' },
          h('div', { className: 'dshApi-rowHead' },
            h('span', null, t('key')), h('span', null, t('value')), h('span', null, '')),
          rows.map((r, i) =>
            h('div', { key: i, className: 'dshApi-row' },
              h('input', { className: 'dshApi-input', value: r.key, placeholder: t('key'), onChange: (e) => updateRow(setter, i, 'key', e.target.value) }),
              h('input', { className: 'dshApi-input', value: r.value, placeholder: t('value'), onChange: (e) => updateRow(setter, i, 'value', e.target.value) }),
              h('button', { type: 'button', className: 'dshApi-mini', title: t('remove'), onClick: () => delRow(setter, i) }, '×')
            )
          ),
          h('button', { type: 'button', className: 'dshApi-btn dshApi-btnSm', onClick: () => addRow(setter) }, '+ ' + t('addRow'))
        )

      // Recursive collection tree with inline rename (double-click a name).
      const renderName = (n, suffix) => editingNode === n.id
        ? h('input', {
            className: 'dshApi-input dshApi-treeEdit', value: editValue, autoFocus: true,
            onChange: (e) => setEditValue(e.target.value),
            onBlur: commitRename,
            onKeyDown: (e) => {
              if (e.key === 'Enter') { e.preventDefault(); commitRename() }
              else if (e.key === 'Escape') { setEditingNode(''); setEditValue('') }
            },
          })
        : h('span', {
            className: 'dshApi-treeName', title: t('rename'),
            onDoubleClick: () => startRename(n),
          }, (n.name || n.url || '') + (suffix || ''))
      const renderTree = (nodes, depth) => nodes.map((n) => {
        if (n.type === 'folder') {
          const isOpen = n._searchOpen ? true : expandedFolders[n.id] !== false
          const isCurrent = currentFolder === n.id
          return h('div', { key: n.id, className: 'dshApi-treeFolder' },
            h('div', {
              className: 'dshApi-treeRow' + (isCurrent ? ' dshApi-treeRowOn' : ''),
              style: { paddingLeft: (depth * 12) + 'px' },
            },
              h('span', {
                className: 'dshApi-treeArrow',
                onClick: () => setExpandedFolders((prev) => ({ ...prev, [n.id]: !isOpen })),
              }, isOpen ? '▾' : '▸'),
              h('span', { className: 'dshApi-folderIco' }, '📁'),
              h('span', { className: 'dshApi-treePick', title: t('saveTo'), onClick: () => setCurrentFolder(n.id) },
                renderName(n, ' (' + countRequests(n) + ')')
              ),
              h('button', { type: 'button', className: 'dshApi-mini', title: t('remove'), onClick: () => delNode(n.id) }, '×')
            ),
            isOpen ? renderTree(n.children || [], depth + 1) : null
          )
        }
        return h('div', { key: n.id, className: 'dshApi-treeRequest' },
          h('div', { className: 'dshApi-treeRow', style: { paddingLeft: (depth * 12) + 'px' } },
            h('span', { className: 'dshApi-treeArrow' }, '·'),
            h('span', { className: 'dshApi-method dshApi-' + n.method }, n.method),
            h('span', { className: 'dshApi-treePick', onClick: () => { if (editingNode !== n.id) loadSaved(n) } }, renderName(n, '')),
            h('button', { type: 'button', className: 'dshApi-mini', title: t('remove'), onClick: () => delNode(n.id) }, '×')
          )
        )
      })

      const prettyBody = useMemo(() => {
        if (!resp || !resp.body) return ''
        if (!pretty) return resp.body
        try { return JSON.stringify(JSON.parse(resp.body), null, 2) } catch (_) { return resp.body }
      }, [resp, pretty])

      const statusColor = resp && resp.status >= 200 && resp.status < 300 ? 'dshApi-ok' : (resp && resp.status >= 400 ? 'dshApi-bad' : '')

      // ---- import / export -------------------------------------------------
      // Export writes a portable JSON document; import merges it back, regenerating
      // ids so imported entries never collide with existing ones.
      // ---- Swagger / OpenAPI import ---------------------------------------
      const fetchSwagger = useCallback(async () => {
        if (!swaggerUrl.trim()) { setErr(t('swaggerPasteOrUrl')); return }
        setSwaggerBusy(true); setErr('')
        try {
          const res = await fetch(swaggerUrl.trim())
          if (!res.ok) throw new Error('HTTP ' + res.status)
          const text = await res.text()
          setSwaggerText(text)
        } catch (e) { setErr(fmt(t('swaggerFail'), { msg: e.message })) }
        finally { setSwaggerBusy(false) }
      }, [swaggerUrl])

      const importSwagger = useCallback(() => {
        if (!swaggerText.trim()) { setErr(t('swaggerPasteOrUrl')); return }
        let parsed
        try { parsed = parseSwagger(JSON.parse(swaggerText), swaggerBase) }
        catch (e) { setErr(fmt(t('swaggerFail'), { msg: e.message === 'no paths' ? t('swaggerNoPaths') : e.message })); return }
        // Replace any previous import of the same source (info.title + version) so
        // re-importing the same spec updates in place instead of creating duplicates.
        setCollection((prev) => {
          const cleaned = removeBySource(prev, parsed.source)
          // If the previously chosen root was itself part of the replaced import,
          // fall back to the top level rather than inserting into a deleted folder.
          const targetExists = swaggerTarget ? findNode(cleaned, swaggerTarget) : true
          const target = targetExists ? swaggerTarget : ''
          if (!targetExists && swaggerTarget) setSwaggerTarget('')
          return parsed.nodes.reduce((acc, node) => insertNode(acc, target, node), cleaned)
        })
        if (swaggerTarget) setExpandedFolders((prev) => ({ ...prev, [swaggerTarget]: true }))
        setSwaggerOpen(false); setSwaggerText('')
        setErr(fmt(t('swaggerOk'), { n: parsed.count, g: parsed.groups }))
      }, [swaggerText, swaggerBase, swaggerTarget, insertNode, findNode])

      const buildExport = useCallback((scope) => {
        const doc = {
          app: 'dsh-tree-new-bee-api-client',
          version: 2,
          exportedAt: new Date().toISOString(),
          scope,
        }
        if (scope === 'collection') {
          doc.collection = collection
        } else {
          doc.collection = collection
          doc.environments = environments
          doc.customHeaders = customHeaders
        }
        return doc
      }, [collection, environments, customHeaders])

      const exportData = useCallback((scope) => {
        const doc = buildExport(scope)
        const hasCollection = Array.isArray(doc.collection) && doc.collection.length > 0
        const hasEnvs = Array.isArray(doc.environments) && doc.environments.length > 0
        const hasHeaders = Array.isArray(doc.customHeaders) && doc.customHeaders.length > 0
        if (scope === 'collection' ? !hasCollection : (!hasCollection && !hasEnvs && !hasHeaders)) {
          setErr(t('nothingToExport')); return
        }
        const summary = scope === 'collection'
          ? `${fmt(t('collection'))} ${countAllNodes(doc.collection)}`
          : `${fmt(t('collection'))} ${countAllNodes(doc.collection)} / ${fmt(t('envs'))} ${(doc.environments || []).length} / ${fmt(t('commonHeaders'))} ${(doc.customHeaders || []).length}`
        try {
          const blob = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json;charset=utf-8' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = scope === 'collection' ? 'api-collection.json' : 'api-workspace.json'
          document.body.appendChild(a); a.click(); a.remove()
          setTimeout(() => URL.revokeObjectURL(url), 1000)
          setErr(fmt(t('exported'), { summary }))
        } catch (e) { setErr(e.message) }
      }, [buildExport])

      const importData = useCallback(async (e) => {
        const file = e.target.files && e.target.files[0]
        if (!file) return
        try {
          const text = await file.text()
          const doc = JSON.parse(text)
          const coll = Array.isArray(doc) ? doc : (Array.isArray(doc.collection) ? doc.collection : null)
          const envs = doc && Array.isArray(doc.environments) ? doc.environments : null
          const heads = doc && Array.isArray(doc.customHeaders) ? doc.customHeaders : null
          if (!coll && !envs && !heads) { setErr(t('importFail')); return }
          if (!window.confirm(t('confirmImport'))) { e.target.value = ''; return }

          let nReq = 0
          const reId = (nodes) => (nodes || []).map((n) => {
            if (n.type === 'folder') return { ...n, id: makeId(), children: reId(n.children || []) }
            nReq += 1
            return { ...n, id: makeId() }
          })
          const parts = []
          if (coll) {
            setCollection((prev) => [...prev, ...reId(coll)])
            parts.push(`${fmt(t('collection'))} ${nReq}`)
          }
          if (envs) {
            const cleanEnvs = envs.filter((x) => x && x.name).map((x) => ({ ...x, id: makeId(), variables: Array.isArray(x.variables) ? x.variables : [] }))
            setEnvironments((prev) => [...prev, ...cleanEnvs])
            parts.push(`${fmt(t('envs'))} ${cleanEnvs.length}`)
          }
          if (heads) {
            const cleanHeads = heads.filter((x) => x && x.key).map((x) => ({ key: String(x.key), value: x.value || '', desc: x.desc || '' }))
            setCustomHeaders((prev) => {
              const merged = prev.slice()
              for (const item of cleanHeads) {
                const i = merged.findIndex((m) => m.key.toLowerCase() === item.key.toLowerCase())
                if (i >= 0) merged[i] = item
                else merged.push(item)
              }
              return merged
            })
            parts.push(`${fmt(t('commonHeaders'))} ${cleanHeads.length}`)
          }
          setErr(fmt(t('importOk'), { summary: parts.join(' / ') }))
        } catch (_) { setErr(t('importFail')) }
        e.target.value = ''
      }, [])

      const goBack = useCallback(() => {
        const layout = ctx && ctx.layout
        if (!layout || typeof layout.selectPanel !== 'function') return
        try { layout.selectPanel(null) } catch (_) {
          try { layout.selectPanel('conversation') } catch (_) {}
        }
      }, [ctx])

      const currentPath = currentFolder ? (folderPath(collection, currentFolder) || []) : []

      return h('div', { className: 'dshApi-root' },
        h('div', { className: 'dshApi-head' },
          h('div', null,
            h('div', { className: 'dshApi-title' }, t('title')),
            h('div', { className: 'dshApi-sub' }, t('subtitle'))
          ),
          h('div', { className: 'dshApi-headActions' },
            h('button', { type: 'button', className: 'dshApi-back', title: t('exportAll'), onClick: () => exportData('all') }, t('export')),
            h('button', { type: 'button', className: 'dshApi-back', title: t('import'), onClick: () => fileRef.current && fileRef.current.click() }, t('import')),
            h('button', { type: 'button', className: 'dshApi-back', title: t('swaggerImport'), onClick: () => { setSwaggerTarget(currentFolder); setSwaggerOpen(true) } }, t('swaggerImport')),
            h('button', { type: 'button', className: 'dshApi-back', onClick: goBack }, '‹ ' + t('back'))
          )
        ),
        h('input', { ref: fileRef, type: 'file', accept: '.json,application/json', style: { display: 'none' }, onChange: importData }),
        h('div', { className: 'dshApi-envBar' },
          h('span', { className: 'dshApi-envIcon' }, '◈'),
          h('span', null, t('environment') + '：'),
          h('select', {
            className: 'dshApi-select', value: activeEnvId,
            onChange: (e) => setActiveEnvId(e.target.value),
          },
            h('option', { value: '' }, t('noEnvSelected')),
            environments.map((e) => h('option', { key: e.id, value: e.id }, e.name))
          ),
          activeEnv
            ? h('span', { className: 'dshApi-envVars' }, (activeEnv.variables || []).filter((v) => v.key).map((v) => v.key).join(', ') || t('noEnv'))
            : null
        ),
        h('div', { className: 'dshApi-cols' },
          // left: collection + history
          h('div', { className: 'dshApi-col dshApi-side' },
            h('div', { className: 'dshApi-tabs' },
              h('button', { type: 'button', className: 'dshApi-tab' + (sideTab === 'collection' ? ' dshApi-tabOn' : ''), onClick: () => setSideTab('collection') }, t('collection')),
              h('button', { type: 'button', className: 'dshApi-tab' + (sideTab === 'envs' ? ' dshApi-tabOn' : ''), onClick: () => setSideTab('envs') }, t('envs')),
              h('button', { type: 'button', className: 'dshApi-tab' + (sideTab === 'history' ? ' dshApi-tabOn' : ''), onClick: () => setSideTab('history') }, t('history')),
              h('button', { type: 'button', className: 'dshApi-tab' + (sideTab === 'log' ? ' dshApi-tabOn' : ''), onClick: () => setSideTab('log') }, t('log'))
            ),
            sideTab === 'collection'
              ? h('div', { className: 'dshApi-sideList' },
                  h('div', { className: 'dshApi-saveTarget' },
                    h('span', null, t('saveTo') + ': '),
                    h('button', { type: 'button', className: 'dshApi-crumb', onClick: () => setCurrentFolder('') }, t('root')),
                    currentPath.map((seg, i) =>
                      h('span', { key: seg.id },
                        h('span', { className: 'dshApi-crumbSep' }, ' / '),
                        h('button', {
                          type: 'button',
                          className: 'dshApi-crumb' + (i === currentPath.length - 1 ? ' dshApi-crumbOn' : ''),
                          onClick: () => setCurrentFolder(seg.id),
                        }, seg.name)
                      )
                    )
                  ),
                  h('input', { className: 'dshApi-input', value: saveName, placeholder: t('name'), onChange: (e) => setSaveName(e.target.value) }),
                  h('button', { type: 'button', className: 'dshApi-btn dshApi-btnPrimary', onClick: saveRequest }, '+ ' + t('save')),
                  h('div', { className: 'dshApi-folderBar' },
                    h('input', { className: 'dshApi-input', value: folderName, placeholder: t('folderName'), onChange: (e) => setFolderName(e.target.value) }),
                    h('button', { type: 'button', className: 'dshApi-btn dshApi-btnSm', onClick: addFolder }, '+ ' + t('newFolder'))
                  ),
                  h('input', {
                    className: 'dshApi-input dshApi-search', type: 'search', value: collectionQuery,
                    placeholder: t('searchCollection'),
                    onChange: (e) => setCollectionQuery(e.target.value),
                  }),
                  h('div', { className: 'dshApi-tree' },
                    (collectionQuery ? filterTree(collection, collectionQuery) : collection).length === 0
                      ? h('div', { className: 'dshApi-note' }, collectionQuery ? t('noMatches') : t('noCollection'))
                      : renderTree(collectionQuery ? filterTree(collection, collectionQuery) : collection, 0)
                  )
                )
              : sideTab === 'envs'
                ? h('div', { className: 'dshApi-sideList' },
                    h('input', { className: 'dshApi-input', value: envName, placeholder: t('envName'), onChange: (e) => setEnvName(e.target.value) }),
                    h('button', { type: 'button', className: 'dshApi-btn dshApi-btnPrimary', onClick: addEnv }, '+ ' + t('newEnv')),
                    h('div', { className: 'dshApi-note' }, t('useVariable')),
                    environments.length === 0
                      ? h('div', { className: 'dshApi-note' }, t('noEnv'))
                      : environments.map((env) =>
                          h('div', { key: env.id, className: 'dshApi-envCard' + (activeEnvId === env.id ? ' dshApi-envCardOn' : '') },
                            h('div', { className: 'dshApi-envCardHead', onClick: () => setActiveEnvId(env.id) },
                              h('span', { className: 'dshApi-envDot' }),
                              h('input', { className: 'dshApi-input dshApi-envName', value: env.name, onChange: (e) => updateEnv(env.id, { name: e.target.value }) }),
                              h('button', { type: 'button', className: 'dshApi-mini', title: t('remove'), onClick: () => delEnv(env.id) }, '×')
                            ),
                            (env.variables || []).map((v, i) =>
                              h('div', { key: i, className: 'dshApi-row' },
                                h('input', { className: 'dshApi-input', value: v.key, placeholder: t('variable'), onChange: (e) => updateEnvVar(env.id, i, 'key', e.target.value) }),
                                h('input', { className: 'dshApi-input', value: v.value, placeholder: t('value'), onChange: (e) => updateEnvVar(env.id, i, 'value', e.target.value) }),
                                h('button', { type: 'button', className: 'dshApi-mini', onClick: () => envDelRow(env.id, i) }, '×')
                              )
                            ),
                            h('button', { type: 'button', className: 'dshApi-btn dshApi-btnSm', onClick: () => envAddRow(env.id) }, '+ ' + t('addRow'))
                          )
                        )
                  )
                : sideTab === 'log'
                  ? (() => {
                      const q = logSearch.trim().toLowerCase()
                      const shown = q ? history.filter((it) =>
                        String(it.url || '').toLowerCase().includes(q) ||
                        String(it.method || '').toLowerCase().includes(q) ||
                        String(it.status || '').includes(q) ||
                        String(it.error || '').toLowerCase().includes(q)
                      ) : history
                      return h('div', { className: 'dshApi-sideList' },
                        h('input', {
                          className: 'dshApi-input dshApi-logSearch', type: 'text', value: logSearch,
                          placeholder: t('logSearch'), onChange: (e) => setLogSearch(e.target.value),
                        }),
                        h('button', { type: 'button', className: 'dshApi-btn dshApi-btnSm', onClick: () => { setHistory([]); setLogSearch('') } }, t('logClear')),
                        shown.length === 0
                          ? h('div', { className: 'dshApi-note' }, history.length ? t('noMatches') : t('logEmpty'))
                          : shown.map((it) =>
                              h('div', { key: it.id, className: 'dshApi-sideItem', onClick: () => { setSelectedLog(it); setLogDetailTab('req') } },
                                h('span', { className: 'dshApi-method dshApi-' + it.method }, it.method),
                                h('span', { className: 'dshApi-sideName' }, (it.error ? '✗ ' : (it.status || '') + ' ') + it.url),
                                h('span', { className: 'dshApi-timeSmall' }, new Date(it.time).toLocaleTimeString())
                              )
                            )
                      )
                    })()
                  : (() => {
                      const q = historySearch.trim().toLowerCase()
                      const shown = q ? history.filter((it) =>
                        String(it.url || '').toLowerCase().includes(q) || String(it.method || '').toLowerCase().includes(q)
                      ) : history
                      return h('div', { className: 'dshApi-sideList' },
                        h('input', {
                          className: 'dshApi-input dshApi-logSearch', type: 'text', value: historySearch,
                          placeholder: t('historySearch'), onChange: (e) => setHistorySearch(e.target.value),
                        }),
                        h('button', { type: 'button', className: 'dshApi-btn dshApi-btnSm', onClick: () => { setHistory([]); setHistorySearch('') } }, t('clearHistory')),
                        shown.length === 0
                          ? h('div', { className: 'dshApi-note' }, history.length ? t('noMatches') : t('noHistory'))
                          : shown.map((it) =>
                              h('div', { key: it.id, className: 'dshApi-sideItem', onClick: () => { if (it.snapshot) loadSaved(it.snapshot) } },
                                h('span', { className: 'dshApi-method dshApi-' + it.method }, it.method),
                                h('span', { className: 'dshApi-sideName' }, (it.error ? '✗ ' : (it.status || '') + ' ') + it.url),
                                h('span', { className: 'dshApi-timeSmall' }, new Date(it.time).toLocaleTimeString())
                              )
                            )
                      )
                    })()
          ),
          // right: request + response
          h('div', { className: 'dshApi-col dshApi-main' },
            h('div', { className: 'dshApi-card' },
              h('div', { className: 'dshApi-urlRow' },
                h('select', { className: 'dshApi-select', value: method, onChange: (e) => setMethod(e.target.value) },
                  METHODS.map((m) => h('option', { key: m, value: m }, m))
                ),
                h('input', {
                  className: 'dshApi-input dshApi-url', value: url, spellCheck: false,
                  placeholder: '{{baseUrl}}/v1/resource',
                  onChange: (e) => setUrl(e.target.value),
                  onKeyDown: (e) => { if (e.key === 'Enter') send() },
                }),
                h('input', { className: 'dshApi-input dshApi-timeout', type: 'number', value: timeout, title: t('timeout'), onChange: (e) => setTimeoutV(e.target.value) }),
                h('button', { type: 'button', className: 'dshApi-btn dshApi-btnPrimary', disabled: sending, onClick: send }, sending ? t('sending') : t('send'))
              ),
              h('div', { className: 'dshApi-tabs' },
                h('button', { type: 'button', className: 'dshApi-tab' + (tab === 'params' ? ' dshApi-tabOn' : ''), onClick: () => setTab('params') }, t('params')),
                h('button', { type: 'button', className: 'dshApi-tab' + (tab === 'headers' ? ' dshApi-tabOn' : ''), onClick: () => setTab('headers') }, t('headers')),
                h('button', { type: 'button', className: 'dshApi-tab' + (tab === 'body' ? ' dshApi-tabOn' : ''), onClick: () => setTab('body') }, t('body')),
                h('button', { type: 'button', className: 'dshApi-tab' + (tab === 'pre' ? ' dshApi-tabOn' : ''), onClick: () => setTab('pre') }, t('preRequest')),
                h('button', { type: 'button', className: 'dshApi-tab' + (tab === 'tests' ? ' dshApi-tabOn' : ''), onClick: () => setTab('tests') }, t('tests'))
              ),
              tab === 'params' ? renderRows(params, setParams) : null,
              tab === 'headers'
                ? h('div', null,
                    h('div', { className: 'dshApi-commonBar' },
                      h('button', { type: 'button', className: 'dshApi-btn dshApi-btnSm', onClick: () => setShowCommon((v) => !v) },
                        (showCommon ? '▴ ' : '▾ ') + t('commonHeaders')),
                      selectedHeaders.length ? h('span', { className: 'dshApi-commonLabel' }, fmt(t('selectedN'), { n: selectedHeaders.length })) : null
                    ),
                    showCommon
                      ? h('div', { className: 'dshApi-commonPanel' },
                          h('div', { className: 'dshApi-commonGrid' },
                            allCommonHeaders.map((x) =>
                              h('div', { key: x.key, className: 'dshApi-commonItem' },
                                h('label', { className: 'dshApi-commonItemLabel' },
                                  h('input', {
                                    type: 'checkbox', checked: selectedHeaders.indexOf(x.key) >= 0,
                                    onChange: () => toggleSelectedHeader(x.key),
                                  }),
                                  h('span', { className: 'dshApi-commonName' }, x.key),
                                  h('span', { className: 'dshApi-commonDesc' }, x.desc + (x.value ? ' · ' + x.value : ''))
                                ),
                                customHeaders.some((c) => c.key === x.key)
                                  ? h('button', { type: 'button', className: 'dshApi-mini', title: t('remove'), onClick: () => delCustomHeader(x.key) }, '×')
                                  : null
                              )
                            )
                          ),
                          h('div', { className: 'dshApi-commonActions' },
                            h('button', { type: 'button', className: 'dshApi-btn dshApi-btnSm', onClick: selectAllCommon }, t('selectAll')),
                            h('button', { type: 'button', className: 'dshApi-btn dshApi-btnSm', onClick: () => setSelectedHeaders([]) }, t('unselectAll')),
                            h('button', { type: 'button', className: 'dshApi-btn dshApi-btnPrimary dshApi-btnSm', disabled: !selectedHeaders.length, onClick: () => addCommonHeaders(selectedHeaders) }, t('addSelected'))
                          ),
                          h('div', { className: 'dshApi-customBar' },
                            h('span', { className: 'dshApi-commonLabel' }, t('customHeader') + '：'),
                            h('input', { className: 'dshApi-input', value: customForm.key, placeholder: t('headerKeyName'), onChange: (e) => setCustomForm((f) => ({ ...f, key: e.target.value })) }),
                            h('input', { className: 'dshApi-input', value: customForm.value, placeholder: t('headerValue'), onChange: (e) => setCustomForm((f) => ({ ...f, value: e.target.value })) }),
                            h('input', { className: 'dshApi-input', value: customForm.desc, placeholder: t('headerDesc'), onChange: (e) => setCustomForm((f) => ({ ...f, desc: e.target.value })) }),
                            h('button', { type: 'button', className: 'dshApi-btn dshApi-btnSm', disabled: !customForm.key.trim(), onClick: addCustomHeader }, '+ ' + t('addCustom'))
                          )
                        )
                      : null,
                    renderRows(headers, setHeaders)
                  )
                : null,
              tab === 'body'
                ? h('div', { className: 'dshApi-bodyWrap' },
                    h('div', { className: 'dshApi-toolbar dshApi-bodyModeBar' },
                      h('span', { className: 'dshApi-cardTitle', title: t('bodyModeHint') }, t('bodyMode') + ':'),
                      [['none', t('bodyNone')], ['formdata', t('bodyFormData')], ['urlencoded', t('bodyUrlencoded')], ['raw', t('bodyRaw')], ['binary', t('bodyBinary')]].map(([v, label]) =>
                        h('button', {
                          type: 'button', className: 'dshApi-btn dshApi-btnSm' + (bodyMode === v ? ' dshApi-tabOn' : ''),
                          onClick: () => pickBodyMode(v),
                        }, label)
                      )
                    ),
                    bodyMode === 'none'
                      ? h('div', { className: 'dshApi-note' }, t('bodyNone'))
                      : bodyMode === 'raw'
                        ? h('div', { className: 'dshApi-rawWrap' },
                            h('div', { className: 'dshApi-toolbar' },
                              h('span', { className: 'dshApi-cardTitle' }, t('rawSubtype') + ':'),
                              h('select', { className: 'dshApi-select', value: rawSubtype, onChange: (e) => pickRawSubtype(e.target.value) },
                                ['Text', 'JSON', 'JavaScript', 'HTML', 'XML'].map((v) => h('option', { key: v, value: v }, v))
                              )
                            ),
                            h('textarea', {
                              className: 'dshApi-body', value: body, spellCheck: false,
                              placeholder: rawSubtype === 'JSON' ? '{ "key": "value" }' : t('rawPlaceholder'),
                              onChange: (e) => setBody(e.target.value),
                            })
                          )
                        : bodyMode === 'binary'
                          ? h('div', { className: 'dshApi-fileBody' },
                              h('input', { ref: bodyFileRef, type: 'file', style: { display: 'none' }, onChange: chooseBodyFile }),
                              h('button', { type: 'button', className: 'dshApi-btn', onClick: () => bodyFileRef.current && bodyFileRef.current.click() }, t('bodyFileChoose')),
                              h('span', { className: 'dshApi-fileInfo' }, bodyFile ? fmt(t('bodyFileInfo'), { name: bodyFile.name, size: bodyFile.size }) : t('bodyFileNone'))
                            )
                          : h('div', { className: 'dshApi-formRows' },
                              h('div', { className: 'dshApi-rowHead dshApi-formHead' },
                                h('span', null, t('key')),
                                h('span', null, t('value')),
                                h('span', null, '')
                              ),
                              bodyRows.map((r, i) =>
                                h('div', { key: i, className: 'dshApi-row' },
                                  h('div', { className: 'dshApi-formKey' },
                                    bodyMode === 'formdata'
                                      ? h('button', {
                                          type: 'button', className: 'dshApi-typeChip' + (r.type === 'file' ? ' dshApi-typeChipOn' : ''),
                                          title: t('bodyFileFieldHint'),
                                          onClick: () => setBodyRows((prev) => prev.map((x, j) => j === i ? { ...x, type: x.type === 'file' ? 'text' : 'file' } : x)),
                                        }, r.type === 'file' ? '📎' : 'T')
                                      : null,
                                    h('input', { className: 'dshApi-input', value: r.key, placeholder: t('bodyFiledName'), onChange: (e) => setBodyRows((prev) => prev.map((x, j) => j === i ? { ...x, key: e.target.value } : x)) })
                                  ),
                                  r.type === 'file' && bodyMode === 'formdata'
                                    ? h('button', {
                                        type: 'button', className: 'dshApi-input dshApi-filePick',
                                        onClick: () => { setFileRowIndex(i); bodyRowFileRef.current && bodyRowFileRef.current.click() },
                                      }, r.file ? r.file.name : t('bodyFileChoose'))
                                    : h('input', { className: 'dshApi-input', value: r.value, placeholder: t('value'), onChange: (e) => setBodyRows((prev) => prev.map((x, j) => j === i ? { ...x, value: e.target.value } : x)) }),
                                  h('button', { type: 'button', className: 'dshApi-mini', title: t('remove'), onClick: () => setBodyRows((prev) => prev.filter((_, j) => j !== i)) }, '×')
                                )
                              ),
                              h('button', { type: 'button', className: 'dshApi-btn dshApi-btnSm', onClick: () => setBodyRows((prev) => [...prev, { key: '', value: '', type: 'text' }]) }, '+ ' + t('addRow'))
                            ),
                    h('input', {
                      ref: bodyRowFileRef, type: 'file', style: { display: 'none' }, onChange: (e) => {
                        const f = e.target.files && e.target.files[0]; if (!f) return
                        const idx = fileRowIndex
                        const reader = new FileReader()
                        reader.onload = () => {
                          if (idx >= 0) setBodyRows((prev) => prev.map((x, j) => j === idx ? { ...x, file: { name: f.name, size: f.size, base64: String(reader.result || '') } } : x))
                          setFileRowIndex(-1)
                        }
                        reader.readAsDataURL(f); e.target.value = ''
                      }
                    })
                  )
                : null,
              tab === 'pre'
                ? h('div', { className: 'dshApi-scriptWrap' },
                    h('div', { className: 'dshApi-toolbar' },
                      h('span', { className: 'dshApi-cardTitle' }, t('scriptTemplate') + ':'),
                      h('select', { className: 'dshApi-select', value: preTpl, onChange: (e) => setPreTpl(e.target.value) },
                        h('option', { value: '' }, t('scriptChoose')),
                        SCRIPT_TEMPLATES.pre.map((x) => h('option', { key: x.name, value: x.name }, x.name))
                      ),
                      h('button', { type: 'button', className: 'dshApi-btn dshApi-btnSm', disabled: !preTpl, onClick: insertPreTpl }, '+ ' + t('scriptInsert'))
                    ),
                    h('div', { className: 'dshApi-note dshApi-scriptHint' }, t('scriptHint')),
                    h('textarea', {
                      className: 'dshApi-script', spellCheck: false, value: preScript,
                      placeholder: 'pm.environment.set("token", "abc");',
                      onChange: (e) => setPreScript(e.target.value),
                    })
                  )
                : tab === 'tests'
                  ? h('div', { className: 'dshApi-scriptWrap' },
                      h('div', { className: 'dshApi-toolbar' },
                        h('span', { className: 'dshApi-cardTitle' }, t('scriptTemplate') + ':'),
                        h('select', { className: 'dshApi-select', value: testTpl, onChange: (e) => setTestTpl(e.target.value) },
                          h('option', { value: '' }, t('scriptChoose')),
                          SCRIPT_TEMPLATES.tests.map((x) => h('option', { key: x.name, value: x.name }, x.name))
                        ),
                        h('button', { type: 'button', className: 'dshApi-btn dshApi-btnSm', disabled: !testTpl, onClick: insertTestTpl }, '+ ' + t('scriptInsert'))
                      ),
                      h('div', { className: 'dshApi-note dshApi-scriptHint' }, t('scriptHint')),
                      h('textarea', {
                        className: 'dshApi-script', spellCheck: false, value: testScript,
                        placeholder: 'pm.test("status 200", function () {\n  pm.expect(response.status).to.eql(200);\n});',
                        onChange: (e) => setTestScript(e.target.value),
                      })
                    )
                  : null
            ),
            h('div', { className: 'dshApi-card dshApi-grow' },
              h('div', { className: 'dshApi-toolbar' },
                h('span', { className: 'dshApi-cardTitle' }, t('response')),
                resp && !resp.error
                  ? h('div', { className: 'dshApi-metrics' },
                      h('span', { className: 'dshApi-metric ' + statusColor }, t('status') + ' ' + resp.status + (resp.statusText ? ' ' + resp.statusText : '')),
                      h('span', { className: 'dshApi-metric' }, t('time') + ' ' + (resp.timeMs || 0) + 'ms'),
                      h('span', { className: 'dshApi-metric' }, t('size') + ' ' + (resp.size || 0) + 'B')
                    )
                  : null
              ),
              err ? h('div', { className: 'dshApi-err' }, err) : null,
              resp && !resp.error
                ? h('div', null,
                    h('div', { className: 'dshApi-tabs' },
                      h('button', { type: 'button', className: 'dshApi-tab' + (respTab === 'body' ? ' dshApi-tabOn' : ''), onClick: () => setRespTab('body') }, t('body')),
                      h('button', { type: 'button', className: 'dshApi-tab' + (respTab === 'headers' ? ' dshApi-tabOn' : ''), onClick: () => setRespTab('headers') }, t('respHeaders')),
                      h('button', { type: 'button', className: 'dshApi-tab' + (respTab === 'tests' ? ' dshApi-tabOn' : ''), onClick: () => setRespTab('tests') }, t('testResults'))
                    ),
                    respTab === 'tests'
                      ? h('div', { className: 'dshApi-results' },
                          !testResults
                            ? h('div', { className: 'dshApi-note' }, t('noTests'))
                            : (() => {
                                const passed = testResults.tests.filter((x) => x.passed).length
                                const failed = testResults.tests.length - passed
                                return h('div', null,
                                  testResults.error ? h('div', { className: 'dshApi-err' }, t('scriptError') + ': ' + testResults.error) : null,
                                  h('div', { className: 'dshApi-resultSummary' + (failed ? ' dshApi-resultFail' : '') },
                                    failed ? fmt(t('testSomeFail'), { p: passed, f: failed }) : fmt(t('testAllPass'), { n: passed })
                                  ),
                                  testResults.tests.map((x, i) =>
                                    h('div', { key: i, className: 'dshApi-resultRow' },
                                      h('span', { className: x.passed ? 'dshApi-testPass' : 'dshApi-testFail' }, x.passed ? '✓' : '✗'),
                                      h('span', null, x.name),
                                      x.error ? h('span', { className: 'dshApi-errSmall' }, x.error) : null
                                    )
                                  )
                                )
                              })()
                        )
                      : respTab === 'body'
                        ? h('div', { className: 'dshApi-respBody' },
                            h('label', { className: 'dshApi-cb' }, h('input', { type: 'checkbox', checked: pretty, onChange: (e) => setPretty(e.target.checked) }), t('pretty')),
                            h('pre', { className: 'dshApi-response' }, prettyBody || '(empty)')
                          )
                        : h('div', { className: 'dshApi-headers' },
                          Object.entries(resp.headers || {}).map(([k, v]) => h('div', { key: k, className: 'dshApi-hrow' }, h('b', null, k + ': '), v))
                        )
                  )
                : h('div', { className: 'dshApi-note dshApi-center' }, t('noResponse'))
            )
          )
        ),
        // Swagger / OpenAPI import modal
        swaggerOpen
          ? h('div', { className: 'dshApi-modalMask', onClick: () => setSwaggerOpen(false) },
              h('div', { className: 'dshApi-modal', onClick: (e) => e.stopPropagation() },
                h('div', { className: 'dshApi-modalTitle' }, t('swaggerTitle')),
                h('div', { className: 'dshApi-modalHint' }, t('swaggerHint')),
                h('label', { className: 'dshApi-field' },
                  h('span', null, t('swaggerUrl')),
                  h('div', { className: 'dshApi-modalRow' },
                    h('input', {
                      className: 'dshApi-input', value: swaggerUrl, placeholder: 'https://api.example.com/swagger.json',
                      onChange: (e) => setSwaggerUrl(e.target.value),
                      onKeyDown: (e) => { if (e.key === 'Enter') fetchSwagger() },
                    }),
                    h('button', { type: 'button', className: 'dshApi-btn', disabled: swaggerBusy || !swaggerUrl.trim(), onClick: fetchSwagger }, swaggerBusy ? t('swaggerFetching') : t('swaggerFetch'))
                  )
                ),
                h('label', { className: 'dshApi-field' },
                  h('span', null, t('swaggerBaseUrl') + ' — ' + t('swaggerBaseHint')),
                  h('input', { className: 'dshApi-input', value: swaggerBase, placeholder: '{{baseUrl}}', onChange: (e) => setSwaggerBase(e.target.value) })
                ),
                h('label', { className: 'dshApi-field' },
                  h('span', null, t('swaggerTarget')),
                  h('select', {
                    className: 'dshApi-select', value: swaggerTarget,
                    onChange: (e) => setSwaggerTarget(e.target.value),
                  },
                    h('option', { value: '' }, t('swaggerTargetRoot')),
                    allFolders.map((f) => h('option', { key: f.id, value: f.id }, f.label))
                  )
                ),
                h('label', { className: 'dshApi-field' },
                  h('span', null, t('swaggerJson')),
                  h('textarea', {
                    className: 'dshApi-body dshApi-swaggerJson', spellCheck: false, value: swaggerText,
                    placeholder: t('swaggerJsonPlaceholder'), onChange: (e) => setSwaggerText(e.target.value),
                  })
                ),
                h('div', { className: 'dshApi-modalActions' },
                  h('button', { type: 'button', className: 'dshApi-btn', onClick: () => setSwaggerOpen(false) }, t('close')),
                  h('button', { type: 'button', className: 'dshApi-btn dshApi-btnPrimary', disabled: !swaggerText.trim(), onClick: importSwagger }, t('swaggerDoImport'))
                )
              )
            )
          : null,

        // request/response log detail modal
        selectedLog
          ? h('div', { className: 'dshApi-modalMask', onClick: () => setSelectedLog(null) },
              h('div', { className: 'dshApi-modal dshApi-modalWide', onClick: (e) => e.stopPropagation() },
                h('div', { className: 'dshApi-modalTitle' },
                  h('span', { className: 'dshApi-method dshApi-' + selectedLog.method }, selectedLog.method),
                  ' ' + selectedLog.url
                ),
                h('div', { className: 'dshApi-modalMeta' },
                  t('logTime') + ': ' + new Date(selectedLog.time).toLocaleString() +
                  (selectedLog.response && selectedLog.response.timeMs != null ? '  ·  ' + t('logDuration') + ': ' + selectedLog.response.timeMs + 'ms' : '')
                ),
                h('div', { className: 'dshApi-tabs' },
                  h('button', { type: 'button', className: 'dshApi-tab' + (logDetailTab === 'req' ? ' dshApi-tabOn' : ''), onClick: () => setLogDetailTab('req') }, t('logReqTab')),
                  h('button', { type: 'button', className: 'dshApi-tab' + (logDetailTab === 'resp' ? ' dshApi-tabOn' : ''), onClick: () => setLogDetailTab('resp') }, t('logRespTab'))
                ),
                logDetailTab === 'req'
                  ? h('div', { className: 'dshApi-logDetail' },
                      h('div', { className: 'dshApi-logBlock' },
                        h('div', { className: 'dshApi-logBlockHead' },
                          h('span', null, t('logHeaders')),
                          h('button', { type: 'button', className: 'dshApi-btn dshApi-btnSm', onClick: () => copyText(JSON.stringify((selectedLog.request && selectedLog.request.headers) || {}, null, 2)) }, t('logCopy'))
                        ),
                        h('pre', { className: 'dshApi-logPre' }, JSON.stringify((selectedLog.request && selectedLog.request.headers) || {}, null, 2))
                      ),
                      h('div', { className: 'dshApi-logBlock' },
                        h('div', { className: 'dshApi-logBlockHead' },
                          h('span', null, t('logBody')),
                          h('button', { type: 'button', className: 'dshApi-btn dshApi-btnSm', onClick: () => copyText((selectedLog.request && selectedLog.request.body) || '') }, t('logCopy'))
                        ),
                        h('pre', { className: 'dshApi-logPre' }, (selectedLog.request && selectedLog.request.body) || t('logNoBody'))
                      )
                    )
                  : h('div', { className: 'dshApi-logDetail' },
                      h('div', { className: 'dshApi-logBlock' },
                        h('div', { className: 'dshApi-logBlockHead' },
                          h('span', null,
                            t('logStatus') + ': ' + ((selectedLog.response && (selectedLog.response.status || selectedLog.response.error)) || '-') +
                            (selectedLog.response && selectedLog.response.size != null ? '  ·  ' + t('size') + ': ' + selectedLog.response.size + 'B' : '')
                          )
                        ),
                        h('pre', { className: 'dshApi-logPre' }, JSON.stringify((selectedLog.response && selectedLog.response.headers) || {}, null, 2))
                      ),
                      h('div', { className: 'dshApi-logBlock' },
                        h('div', { className: 'dshApi-logBlockHead' },
                          h('span', null, t('logRespBody')),
                          h('button', { type: 'button', className: 'dshApi-btn dshApi-btnSm', onClick: () => copyText((selectedLog.response && selectedLog.response.body) || (selectedLog.response && selectedLog.response.error) || '') }, t('logCopy'))
                        ),
                        h('pre', { className: 'dshApi-logPre' }, (selectedLog.response && (selectedLog.response.body || selectedLog.response.error)) || t('logNoRespBody'))
                      )
                    ),
                h('div', { className: 'dshApi-modalActions' },
                  h('button', { type: 'button', className: 'dshApi-btn', onClick: () => setSelectedLog(null) }, t('close'))
                )
              )
            )
          : null
      )
    }

    function apply(ctx) {
      ctx.effect(() => installStyles(), 'dsh-tree-new-bee-api-client: styles')
      if (ctx.locale !== undefined) {
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-tree-new-bee-api-client: dictionaries')
        t = ctx.locale.bind(NS)
      }
      ctx.effect(() => ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
        name: 'sidebar.panellist', id: PANEL_ID, order: 31, label: () => t('title'), locale: NS,
      }, SidebarIcon)), 'dsh-tree-new-bee-api-client: sidebar entry')
      ctx.effect(() => ctx.slots.inject('main', () => ctx.slots.register({
        name: 'main', key: PANEL_ID, locale: NS,
      }, (props) => h(ApiPanel, { ctx }))), 'dsh-tree-new-bee-api-client: panel')
    }

    function installStyles() {
      if (typeof document === 'undefined') return () => {}
      const existing = document.querySelector('style[data-plugin-css="' + STYLE_ID + '"]')
      if (existing) return () => {}
      const style = document.createElement('style')
      style.dataset.plugin = NS
      style.dataset.pluginCss = STYLE_ID
      style.textContent = `
.dshApi-root{display:flex;flex-direction:column;height:100%;box-sizing:border-box;padding:14px 18px 18px;gap:10px;overflow:hidden;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base)}
.dshApi-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex:0 0 auto}
.dshApi-title{font-size:20px;font-weight:700;line-height:1.3}
.dshApi-sub{font-size:12px;color:var(--dsw-alias-label-secondary);margin-top:3px}
.dshApi-back{display:inline-flex;align-items:center;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font-size:12px;padding:5px 11px;border-radius:8px;cursor:pointer;font-family:inherit;white-space:nowrap}
.dshApi-headActions{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.dshApi-cols{display:grid;grid-template-columns:minmax(220px,300px) minmax(0,1fr);gap:12px;flex:1 1 auto;min-height:0}
.dshApi-col{display:flex;flex-direction:column;gap:10px;min-height:0;overflow:hidden}
.dshApi-side{border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1);padding:10px}
.dshApi-tabs{display:flex;gap:4px;flex-wrap:wrap;flex:0 0 auto}
.dshApi-tab{padding:6px 12px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);font-size:12px;cursor:pointer;font-family:inherit}
.dshApi-tabOn{background:var(--dsw-alias-brand-primary);color:var(--dsw-alias-bg-base);border-color:transparent;font-weight:600}
.dshApi-sideList{display:flex;flex-direction:column;gap:5px;overflow-y:auto;flex:1 1 auto}
.dshApi-sideItem{display:flex;align-items:center;gap:6px;padding:7px 8px;border-radius:7px;border:1px solid var(--dsw-alias-border-l1);font-size:11.5px;cursor:pointer;flex-wrap:wrap}
.dshApi-sideItem:hover{background:var(--dsw-alias-bg-layer-2)}
.dshApi-sideItemMain{display:flex;align-items:center;gap:6px;flex:1 1 auto;min-width:0;cursor:pointer}
.dshApi-method{font-size:10px;font-weight:700;padding:2px 5px;border-radius:5px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);flex:0 0 auto}
.dshApi-GET{color:#2e7d32}.dshApi-POST{color:#e65100}.dshApi-PUT{color:#1565c0}.dshApi-PATCH{color:#6a1b9a}.dshApi-DELETE{color:#c62828}
.dshApi-sideName{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dshApi-timeSmall{font-size:9px;color:var(--dsw-alias-label-secondary)}
.dshApi-card{padding:12px;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1);display:flex;flex-direction:column;gap:8px}
.dshApi-grow{flex:1 1 auto;min-height:0}
.dshApi-urlRow{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.dshApi-input,.dshApi-select{padding:7px 9px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-size:12px;outline:none;font-family:inherit;min-width:0}
.dshApi-input:focus,.dshApi-select:focus{border-color:var(--dsw-alias-brand-primary)}
.dshApi-url{flex:1 1 260px}
.dshApi-timeout{width:66px}
.dshApi-btn{padding:7px 11px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font-size:12px;cursor:pointer;font-family:inherit;white-space:nowrap}
.dshApi-btn:hover{border-color:var(--dsw-alias-brand-primary)}
.dshApi-btn:disabled{opacity:.45;cursor:not-allowed}
.dshApi-btnPrimary{background:#2ecc71;color:#0b0e13;border-color:transparent;font-weight:700}
.dshApi-modalMask{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.45)}
.dshApi-modal{width:min(620px,94vw);max-height:86vh;overflow-y:auto;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:12px;padding:18px;box-shadow:0 8px 30px rgba(0,0,0,.3);display:flex;flex-direction:column;gap:12px}
.dshApi-modalTitle{font-size:14px;font-weight:700;color:var(--dsw-alias-label-primary)}
.dshApi-modalHint{font-size:11px;color:var(--dsw-alias-label-secondary);line-height:1.5}
.dshApi-modal .dshApi-field{display:flex;flex-direction:column;gap:5px;font-size:12px;color:var(--dsw-alias-label-secondary)}
.dshApi-modalRow{display:flex;gap:8px}
.dshApi-modalRow .dshApi-input{flex:1 1 auto;min-width:0}
.dshApi-swaggerJson{min-height:220px;font-family:ui-monospace,monospace}
.dshApi-modalActions{display:flex;justify-content:flex-end;gap:8px}
.dshApi-modalWide{width:min(760px,95vw);max-height:88vh;overflow-y:auto}
.dshApi-modalMeta{font-size:11px;color:var(--dsw-alias-label-secondary)}
.dshApi-logDetail{display:flex;flex-direction:column;gap:10px;min-height:0}
.dshApi-logBlock{border:1px solid var(--dsw-alias-border-l1);border-radius:8px;overflow:hidden;display:flex;flex-direction:column;max-height:260px}
.dshApi-logBlockHead{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:5px 9px;background:var(--dsw-alias-bg-layer-2);font-size:11px;font-weight:600;color:var(--dsw-alias-label-secondary)}
.dshApi-logPre{margin:0;padding:9px;font-size:11px;line-height:1.5;font-family:ui-monospace,monospace;white-space:pre-wrap;word-break:break-all;overflow:auto;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base)}
.dshApi-logSearch{width:100%;box-sizing:border-box;margin-bottom:6px;font-size:11px;padding:5px 8px}
.dshApi-btnSm{padding:4px 8px;font-size:11px}
.dshApi-mini{border:0;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:13px;padding:0 4px;font-family:inherit}
.dshApi-rows{display:flex;flex-direction:column;gap:4px}
.dshApi-rowHead,.dshApi-row{display:grid;grid-template-columns:1fr 1fr 24px;gap:6px;align-items:center}
.dshApi-rowHead{font-size:10px;color:var(--dsw-alias-label-secondary)}
.dshApi-body{width:100%;box-sizing:border-box;min-height:120px;resize:vertical;padding:10px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-family:ui-monospace,monospace;font-size:12px;outline:none}
.dshApi-bodyWrap{display:flex;flex-direction:column;gap:10px;min-height:0;flex:1 1 auto}
.dshApi-bodyModeBar{gap:4px;flex-wrap:wrap;padding:5px 6px;background:var(--dsw-alias-bg-layer-2);border-radius:8px}
.dshApi-scriptWrap{display:flex;flex-direction:column;gap:8px;flex:1 1 auto;min-height:0}
.dshApi-scriptHint{font-size:11px;line-height:1.5}
.dshApi-script{width:100%;box-sizing:border-box;flex:1 1 auto;min-height:180px;resize:vertical;padding:10px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-family:ui-monospace,monospace;font-size:12px;line-height:1.6;outline:none;tab-size:2}
.dshApi-script:focus{border-color:var(--dsw-alias-brand-primary)}
.dshApi-results{display:flex;flex-direction:column;gap:6px;overflow:auto}
.dshApi-resultSummary{font-size:12px;font-weight:600;color:#2e7d32;padding:6px 9px;background:rgba(46,125,50,.08);border-radius:6px}
.dshApi-resultFail{color:var(--dsw-alias-state-error-primary);background:rgba(216,44,32,.08)}
.dshApi-resultRow{display:flex;align-items:flex-start;gap:8px;font-size:12px;padding:5px 8px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.dshApi-testPass{color:#2e7d32;font-weight:700}
.dshApi-testFail{color:var(--dsw-alias-state-error-primary);font-weight:700}
.dshApi-errSmall{font-size:11px;color:var(--dsw-alias-state-error-primary);word-break:break-all}
.dshApi-bodyModeBar .dshApi-btn{border-color:transparent;background:transparent;font-size:11px;padding:5px 10px}
.dshApi-bodyModeBar .dshApi-tabOn{background:var(--dsw-alias-bg-base);border-color:var(--dsw-alias-border-l2)}
.dshApi-formRows{display:flex;flex-direction:column;gap:5px;overflow:auto}
.dshApi-formRows .dshApi-row,.dshApi-formRows .dshApi-rowHead{grid-template-columns:minmax(100px,1fr) minmax(100px,1.2fr) 24px}
.dshApi-formHead{padding:6px 9px;background:var(--dsw-alias-bg-layer-2);border-radius:6px;font-weight:600;letter-spacing:.3px}
.dshApi-formRows .dshApi-row{padding:2px 0}
.dshApi-formKey{display:flex;align-items:center;gap:5px;min-width:0}
.dshApi-formKey .dshApi-input{flex:1 1 auto;min-width:0}
.dshApi-typeChip{flex:0 0 auto;width:24px;height:26px;border:1px solid var(--dsw-alias-border-l2);border-radius:6px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);font-size:11px;cursor:pointer;font-family:inherit;padding:0}
.dshApi-typeChipOn{background:var(--dsw-alias-brand-primary);color:#fff;border-color:transparent}
.dshApi-filePick{text-align:left;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dshApi-rowType{max-width:110px}
.dshApi-rawWrap{display:flex;flex-direction:column;gap:8px;flex:1 1 auto;min-height:0}
.dshApi-fileBody{display:flex;align-items:center;gap:10px;padding:14px;border:1px dashed var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-base)}
.dshApi-fileInfo{font-size:11px;color:var(--dsw-alias-label-secondary);word-break:break-all}
.dshApi-bodyWrap .dshApi-body{flex:1 1 auto;min-height:140px}
.dshApi-toolbar{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}
.dshApi-cardTitle{font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary)}
.dshApi-metrics{display:flex;gap:8px;flex-wrap:wrap}
.dshApi-metric{font-size:11px;padding:3px 8px;border-radius:7px;background:var(--dsw-alias-bg-layer-2);font-variant-numeric:tabular-nums}
.dshApi-ok{color:var(--dsw-alias-state-success-primary)}.dshApi-bad{color:var(--dsw-alias-state-error-primary)}
.dshApi-err{font-size:11px;color:var(--dsw-alias-state-error-primary);padding:6px 8px;border-radius:7px;background:var(--dsw-alias-bg-layer-2)}
.dshApi-cb{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--dsw-alias-label-secondary)}
.dshApi-cb input{accent-color:var(--dsw-alias-brand-primary)}
.dshApi-respBody{display:flex;flex-direction:column;min-height:0;flex:1 1 auto;overflow:hidden}
.dshApi-response{flex:0 1 auto;min-height:120px;max-height:calc(100vh - 320px);overflow-y:auto;overflow-x:auto;margin:4px 0 0;padding:12px;border-radius:8px;background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);font-family:ui-monospace,monospace;font-size:12px;line-height:1.6;white-space:pre-wrap;word-break:break-all}
.dshApi-headers{display:flex;flex-direction:column;gap:4px;font-size:11px;max-height:240px;overflow:auto}
.dshApi-hrow{padding:4px 6px;border-radius:6px;background:var(--dsw-alias-bg-base);word-break:break-all}
.dshApi-note{font-size:12px;color:var(--dsw-alias-label-secondary);padding:8px}
.dshApi-center{flex:1 1 auto;display:flex;align-items:center;justify-content:center;text-align:center}
.dshApi-envBar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:12px;flex:0 0 auto;padding:7px 11px;border-radius:8px;background:var(--dsw-alias-bg-layer-2)}
.dshApi-envIcon{color:#9b59b6;font-size:14px}
.dshApi-envVars{color:var(--dsw-alias-label-secondary);font-size:10.5px;flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dshApi-envCard{display:flex;flex-direction:column;gap:5px;padding:8px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2)}
.dshApi-envCardOn{border-color:#9b59b6;box-shadow:inset 3px 0 0 #9b59b6}
.dshApi-envCardHead{display:flex;align-items:center;gap:6px;cursor:pointer}
.dshApi-envDot{width:8px;height:8px;border-radius:50%;background:var(--dsw-alias-border-l2);flex:0 0 auto}
.dshApi-envCardOn .dshApi-envDot{background:#9b59b6}
.dshApi-envName{flex:1 1 auto;font-weight:600}
.dshApi-commonBar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:6px 0}
.dshApi-commonLabel{font-size:11px;color:var(--dsw-alias-label-secondary)}
.dshApi-commonBar .dshApi-select{flex:1 1 240px}
.dshApi-commonPanel{border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-base);padding:8px;margin-bottom:6px}
.dshApi-commonGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:4px;max-height:180px;overflow:auto}
.dshApi-commonItem{display:flex;align-items:center;justify-content:space-between;gap:4px;font-size:11.5px;padding:4px 6px;border-radius:6px;cursor:pointer}
.dshApi-commonItem:hover{background:var(--dsw-alias-bg-layer-2)}
.dshApi-commonItemLabel{display:flex;align-items:center;gap:6px;flex:1 1 auto;min-width:0;cursor:pointer}
.dshApi-commonItem input{accent-color:var(--dsw-alias-brand-primary);flex:0 0 auto}
.dshApi-commonName{font-weight:600;color:var(--dsw-alias-label-primary);white-space:nowrap}
.dshApi-commonDesc{color:var(--dsw-alias-label-secondary);font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dshApi-commonActions{display:flex;gap:8px;padding-top:8px;margin-top:6px;border-top:1px solid var(--dsw-alias-border-l1)}
.dshApi-customBar{display:flex;gap:6px;align-items:center;flex-wrap:wrap;padding-top:8px;margin-top:6px;border-top:1px dashed var(--dsw-alias-border-l1)}
.dshApi-customBar .dshApi-input{flex:1 1 120px}
.dshApi-saveTarget{display:flex;align-items:center;gap:5px;font-size:11px;padding:4px 7px;border-radius:6px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);flex-wrap:wrap}
.dshApi-saveTargetName{font-weight:600;color:var(--dsw-alias-brand-primary)}
.dshApi-crumb{border:0;background:transparent;color:var(--dsw-alias-label-secondary);font-size:11px;cursor:pointer;padding:1px 3px;border-radius:4px;font-family:inherit}
.dshApi-crumb:hover{color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2)}
.dshApi-crumbOn{color:var(--dsw-alias-brand-primary);font-weight:600}
.dshApi-crumbSep{color:var(--dsw-alias-label-secondary);font-size:11px}
.dshApi-folderBar{display:flex;gap:5px;align-items:center}
.dshApi-folderBar .dshApi-input{flex:1 1 auto}
.dshApi-tree{flex:1 1 auto;overflow:auto;min-height:80px}
.dshApi-search{flex:0 0 auto}
.dshApi-treeFolder,.dshApi-treeRequest{font-size:12px}
.dshApi-treeRow{display:flex;align-items:center;gap:5px;padding:4px 6px;border-radius:6px;min-width:0}
.dshApi-treeRow:hover{background:var(--dsw-alias-bg-layer-2)}
.dshApi-treeRowOn{outline:1px solid var(--dsw-alias-brand-primary)}
.dshApi-treeArrow{width:12px;flex:0 0 auto;color:var(--dsw-alias-label-secondary);cursor:pointer;text-align:center}
.dshApi-folderIco{flex:0 0 auto;font-size:12px}
.dshApi-treeName{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer}
.dshApi-treePick{display:flex;align-items:center;flex:1 1 auto;min-width:0;cursor:pointer}
.dshApi-treeEdit{flex:1 1 auto;min-width:0;padding:2px 6px;font-size:11.5px}
@media(max-width:900px){.dshApi-cols{grid-template-columns:1fr;overflow-y:auto}.dshApi-col{overflow:visible}}
`
      document.head.appendChild(style)
      return () => { style.remove() }
    }

    return { inject: ['slots', 'locale', 'layout'], apply }
  },
})
