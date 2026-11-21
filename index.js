/**
 * Host half of the API client bundle.
 * Performs HTTP requests with Node's built-in fetch. No third-party deps.
 */
export const name = 'dsh-tree-new-bee-api-client'
export const inject = ['connection']

const API = '/api/dsh-tree-new-bee-api-client'
const DEFAULT_TIMEOUT = 20000
const MAX_TIMEOUT = 120000
const MAX_BODY = 4 * 1024 * 1024

class ApiError extends Error {
  constructor(message, status = 400) { super(message); this.status = status }
}
function json(value, status = 200) {
  return Response.json(value, { status, headers: { 'cache-control': 'no-store' } })
}
function failure(error, fallback) {
  const message = error instanceof ApiError ? error.message : fallback
  const status = error instanceof ApiError ? error.status : 500
  return json({ error: message }, status)
}
function route(path, methods, fetch) {
  return { path: `${API}/${path}`, methods, requestBody: 'buffered', fetch }
}
async function readBody(request) {
  try { return JSON.parse((await request.text()) || '{}') }
  catch (_) { throw new ApiError('请求内容不是合法的 JSON。') }
}

export function apply(ctx) {
  ctx.effect(() => {
    const disposers = []
    const register = (entry) => {
      try {
        const dispose = ctx.connection.fetch.register(entry)
        if (typeof dispose === 'function') disposers.push(dispose)
      } catch (error) {
        console.warn(`[dsh-tree-new-bee-api-client] route ${entry.path} rejected: ${(error && error.message) || error}`)
      }
    }

    register(route('request', ['POST'], async (request) => {
      const started = Date.now()
      try {
        const body = await readBody(request)
        const method = String(body.method || 'GET').toUpperCase()
        const url = typeof body.url === 'string' ? body.url.trim() : ''
        if (!url) throw new ApiError('请输入请求地址。')
        if (!/^https?:\/\//i.test(url)) throw new ApiError('地址必须以 http:// 或 https:// 开头。')
        const timeout = Math.min(MAX_TIMEOUT, Math.max(1000, Number(body.timeout) || DEFAULT_TIMEOUT))
        const controller = new AbortController()
        const timer = setTimeout(() => controller.abort(), timeout)
        const headers = {}
        if (body.headers && typeof body.headers === 'object') {
          for (const [k, v] of Object.entries(body.headers)) {
            if (k && v !== undefined && v !== null && String(v).trim()) headers[String(k)] = String(v)
          }
        }
        const init = { method, headers, signal: controller.signal, redirect: 'follow' }
        if (!['GET', 'HEAD'].includes(method) && body.body && String(body.body).length) {
          init.body = String(body.body)
        }
        let res
        try { res = await fetch(url, init) }
        finally { clearTimeout(timer) }
        const text = await res.text()
        const truncated = text.length > MAX_BODY
        const responseHeaders = {}
        try { res.headers.forEach((v, k) => { responseHeaders[k] = v }) } catch (_) {}
        return json({
          ok: res.ok,
          status: res.status,
          statusText: res.statusText || '',
          headers: responseHeaders,
          body: truncated ? text.slice(0, MAX_BODY) : text,
          truncated,
          timeMs: Date.now() - started,
          size: text.length,
          url: res.url || url,
        })
      } catch (error) {
        let message = error && error.message ? error.message : String(error)
        if (/abort/i.test(message)) message = '请求超时。'
        return json({ error: message, timeMs: Date.now() - started }, 502)
      }
    }))

    return () => {
      for (const dispose of disposers) {
        try {
          const result = dispose()
          if (result && typeof result.then === 'function') result.catch(() => {})
        } catch (_) {}
      }
    }
  }, 'dsh-tree-new-bee-api-client: routes')
}
