/**
 * Client half of the API client bundle.
 * Postman-style UI: request builder, collections, history and response viewer.
 */
window.__ModuleLoader__.load({
  id: 'dsh-tree-new-bee-api-client',
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
      name: '请求名称', url: '请求地址', send: '发送', sending: '发送中…',
      params: 'Params', headers: 'Headers', body: 'Body', authorize: '授权',
      key: '键', value: '值', addRow: '添加一行', remove: '删除',
      response: '响应', status: '状态', time: '耗时', size: '大小',
      pretty: '格式化 JSON', raw: '原始', respHeaders: '响应头',
      noResponse: '发送请求后在此查看响应。', noCollection: '暂无保存的请求。',
      noHistory: '暂无历史记录。', confirmDel: '确定删除？',
      tip: 'Params 会自动拼到 URL；Body 用于 POST/PUT/PATCH。支持 http/https。',
      back: '返回', timeout: '超时(秒)', clearHistory: '清空历史',
      environment: '环境', envs: '环境', newEnv: '新建环境', envName: '环境名称',
      variables: '变量', variable: '变量名', noEnv: '暂无环境。新建环境后可设置专属变量。',
      noEnvSelected: '未选择环境', useVariable: '用 {{变量名}} 引用，如 {{baseUrl}}',
      confirmDelEnv: '确定删除该环境？', envSaved: '环境已保存', applyEnv: '变量将在发送时替换 {{key}}',
      commonHeaders: '添加常用请求头', selectHeader: '选择请求头…',
      addSelected: '添加选中', close: '收起', selectedN: '已选 {n} 项', clear: '清空选择',
      selectAll: '全选', unselectAll: '取消全选', customHeader: '自定义请求头',
      headerKeyName: '头名称', headerValue: '默认值', headerDesc: '说明(可选)', addCustom: '添加',
      noCustomHeaders: '还没有自定义请求头。',
      searchCollection: '搜索集合…', noMatches: '没有匹配的文件夹或请求。',
      newFolder: '新建文件夹', folderName: '文件夹名称', confirmDelFolder: '确定删除该文件夹及其内容？',
      moveTo: '移动到', root: '根目录', saveTo: '保存到', rename: '双击重命名',
    }
    const en = {
      title: 'Tree New Bee API Client', subtitle: 'Postman-style API testing: request builder, collection tree, environments, common headers and history.',
      collection: 'Collection', history: 'History', save: 'Save request', saved: 'Saved',
      name: 'Request name', url: 'Request URL', send: 'Send', sending: 'Sending…',
      params: 'Params', headers: 'Headers', body: 'Body', authorize: 'Auth',
      key: 'Key', value: 'Value', addRow: 'Add row', remove: 'Remove',
      response: 'Response', status: 'Status', time: 'Time', size: 'Size',
      pretty: 'Pretty JSON', raw: 'Raw', respHeaders: 'Response headers',
      noResponse: 'Send a request to see the response here.', noCollection: 'No saved requests.',
      noHistory: 'No history yet.', confirmDel: 'Delete this?',
      tip: 'Params are appended to the URL; Body is used for POST/PUT/PATCH. http/https supported.',
      back: 'Back', timeout: 'Timeout (s)', clearHistory: 'Clear history',
      environment: 'Environment', envs: 'Environments', newEnv: 'New environment', envName: 'Environment name',
      variables: 'Variables', variable: 'Variable', noEnv: 'No environments. Create one to set scoped variables.',
      noEnvSelected: 'No environment selected', useVariable: 'Use {{key}} to reference, e.g. {{baseUrl}}',
      confirmDelEnv: 'Delete this environment?', envSaved: 'Environment saved', applyEnv: 'Variables replace {{key}} when sending',
      commonHeaders: 'Add common header', selectHeader: 'Select a header…',
      addSelected: 'Add selected', close: 'Close', selectedN: '{n} selected', clear: 'Clear selection',
      selectAll: 'Select all', unselectAll: 'Deselect all', customHeader: 'Custom header',
      headerKeyName: 'Header name', headerValue: 'Default value', headerDesc: 'Description (optional)', addCustom: 'Add',
      noCustomHeaders: 'No custom headers yet.',
      searchCollection: 'Search collection…', noMatches: 'No matching folders or requests.',
      newFolder: 'New folder', folderName: 'Folder name', confirmDelFolder: 'Delete this folder and its contents?',
      moveTo: 'Move to', root: 'Root', saveTo: 'Save to', rename: 'Double-click to rename',
    }
    let t = (k) => (zh[k] || k)
    const fmt = (s, v) => String(s || '').replace(/\{(\w+)\}/g, (_, k) => (v && v[k] != null ? v[k] : ''))
    function readJSON(key, fb) { try { const r = window.localStorage.getItem(key); return r ? JSON.parse(r) : fb } catch (_) { return fb } }
    function writeJSON(key, v) { try { window.localStorage.setItem(key, JSON.stringify(v)) } catch (_) {} }
    function makeId() { return 'r-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7) }

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
      const [timeout, setTimeoutV] = useState('20')
      const [tab, setTab] = useState('params')
      const [resp, setResp] = useState(null)
      const [sending, setSending] = useState(false)
      const [err, setErr] = useState('')
      const [collection, setCollection] = useState(() => {
        const raw = readJSON(COLLECTION_KEY, [])
        // Migrate old flat request list into typed tree nodes.
        return (raw || []).map((x) => x && x.type === 'folder' ? x : { ...x, type: x.type || 'request' })
      })
      const [currentFolder, setCurrentFolder] = useState('')   // '' = root; folder id
      const [folderName, setFolderName] = useState('')
      const [expandedFolders, setExpandedFolders] = useState({})
      const [editingNode, setEditingNode] = useState('')
      const [editValue, setEditValue] = useState('')
      const [collectionQuery, setCollectionQuery] = useState('')
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
      const resolveVars = useCallback((s) => {
        if (!s || typeof s !== 'string' || !Object.keys(varMap).length) return s
        return s.replace(/\{\{\s*([\w.\-]+)\s*\}\}/g, (match, k) => (k in varMap ? varMap[k] : match))
      }, [varMap])

      const buildUrl = useCallback(() => {
        const active = params.filter((p) => p.key.trim())
        const base = resolveVars(url)
        if (!active.length) return base
        try {
          const u = new URL(base)
          for (const p of active) u.searchParams.set(p.key.trim(), resolveVars(p.value || ''))
          return u.toString()
        } catch (_) {
          const q = active.map((p) => encodeURIComponent(p.key.trim()) + '=' + encodeURIComponent(resolveVars(p.value || ''))).join('&')
          return base + (base.includes('?') ? '&' : '?') + q
        }
      }, [url, params, resolveVars])

      const send = useCallback(async () => {
        if (!url.trim()) { setErr(t('url') + '?'); return }
        setSending(true); setErr(''); setResp(null)
        const headerObj = {}
        for (const hh of headers) if (hh.key.trim()) headerObj[hh.key.trim()] = resolveVars(hh.value || '')
        const finalUrl = buildUrl()
        const result = await api('/request', {
          method, url: finalUrl, headers: headerObj,
          body: ['GET', 'HEAD'].includes(method) ? '' : resolveVars(body),
          timeout: (Number(timeout) || 20),
        })
        if (result.error) { setErr(result.error); setResp({ timeMs: result.timeMs }) }
        else setResp(result)
        setHistory((prev) => [{
          id: makeId(), method, url: finalUrl, time: new Date().toISOString(),
          status: result.status, error: result.error || '',
          snapshot: { method, url, params, headers, body, timeout },
        }, ...prev].slice(0, 100))
        setSending(false)
      }, [url, method, headers, body, timeout, buildUrl, params, resolveVars])

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
        const node = { id: makeId(), type: 'request', name, method, url, params, headers, body, timeout }
        setCollection((prev) => insertNode(prev, currentFolder, node))
        if (currentFolder) setExpandedFolders((prev) => ({ ...prev, [currentFolder]: true }))
        setSaveName('')
      }, [saveName, method, url, params, headers, body, timeout, currentFolder, insertNode])


      const loadSaved = useCallback((s) => {
        setMethod(s.method || 'GET'); setUrl(s.url || '')
        setParams(s.params && s.params.length ? s.params : [{ key: '', value: '' }])
        setHeaders(s.headers && s.headers.length ? s.headers : [{ key: '', value: '' }])
        setBody(s.body || ''); setTimeoutV(s.timeout || '20'); setResp(null)
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
          h('button', { type: 'button', className: 'dshApi-back', onClick: goBack }, '‹ ' + t('back'))
        ),
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
              h('button', { type: 'button', className: 'dshApi-tab' + (sideTab === 'history' ? ' dshApi-tabOn' : ''), onClick: () => setSideTab('history') }, t('history'))
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
                : h('div', { className: 'dshApi-sideList' },
                    h('button', { type: 'button', className: 'dshApi-btn dshApi-btnSm', onClick: () => setHistory([]) }, t('clearHistory')),
                  history.length === 0
                    ? h('div', { className: 'dshApi-note' }, t('noHistory'))
                    : history.map((it) =>
                        h('div', { key: it.id, className: 'dshApi-sideItem', onClick: () => { if (it.snapshot) loadSaved(it.snapshot) } },
                          h('span', { className: 'dshApi-method dshApi-' + it.method }, it.method),
                          h('span', { className: 'dshApi-sideName' }, (it.error ? '✗ ' : (it.status || '') + ' ') + it.url),
                          h('span', { className: 'dshApi-timeSmall' }, new Date(it.time).toLocaleTimeString())
                        )
                      )
                )
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
                h('button', { type: 'button', className: 'dshApi-tab' + (tab === 'body' ? ' dshApi-tabOn' : ''), onClick: () => setTab('body') }, t('body'))
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
                ? h('textarea', {
                    className: 'dshApi-body', value: body, spellCheck: false,
                    placeholder: '{ "key": "value" }',
                    onChange: (e) => setBody(e.target.value),
                  })
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
                      h('button', { type: 'button', className: 'dshApi-tab' + (respTab === 'headers' ? ' dshApi-tabOn' : ''), onClick: () => setRespTab('headers') }, t('respHeaders'))
                    ),
                    respTab === 'body'
                      ? h('div', null,
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
        h('div', { className: 'dshApi-foot' }, t('tip'))
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
.dshApi-btnSm{padding:4px 8px;font-size:11px}
.dshApi-mini{border:0;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:13px;padding:0 4px;font-family:inherit}
.dshApi-rows{display:flex;flex-direction:column;gap:4px}
.dshApi-rowHead,.dshApi-row{display:grid;grid-template-columns:1fr 1fr 24px;gap:6px;align-items:center}
.dshApi-rowHead{font-size:10px;color:var(--dsw-alias-label-secondary)}
.dshApi-body{width:100%;box-sizing:border-box;min-height:120px;resize:vertical;padding:10px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-family:ui-monospace,monospace;font-size:12px;outline:none}
.dshApi-toolbar{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}
.dshApi-cardTitle{font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary)}
.dshApi-metrics{display:flex;gap:8px;flex-wrap:wrap}
.dshApi-metric{font-size:11px;padding:3px 8px;border-radius:7px;background:var(--dsw-alias-bg-layer-2);font-variant-numeric:tabular-nums}
.dshApi-ok{color:var(--dsw-alias-state-success-primary)}.dshApi-bad{color:var(--dsw-alias-state-error-primary)}
.dshApi-err{font-size:11px;color:var(--dsw-alias-state-error-primary);padding:6px 8px;border-radius:7px;background:var(--dsw-alias-bg-layer-2)}
.dshApi-cb{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--dsw-alias-label-secondary)}
.dshApi-cb input{accent-color:var(--dsw-alias-brand-primary)}
.dshApi-response{flex:1 1 auto;min-height:120px;max-height:100%;overflow:auto;margin:4px 0 0;padding:12px;border-radius:8px;background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);font-family:ui-monospace,monospace;font-size:12px;line-height:1.6;white-space:pre-wrap;word-break:break-all}
.dshApi-headers{display:flex;flex-direction:column;gap:4px;font-size:11px;max-height:240px;overflow:auto}
.dshApi-hrow{padding:4px 6px;border-radius:6px;background:var(--dsw-alias-bg-base);word-break:break-all}
.dshApi-note{font-size:12px;color:var(--dsw-alias-label-secondary);padding:8px}
.dshApi-center{flex:1 1 auto;display:flex;align-items:center;justify-content:center;text-align:center}
.dshApi-foot{font-size:11px;color:var(--dsw-alias-label-secondary);flex:0 0 auto}
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
