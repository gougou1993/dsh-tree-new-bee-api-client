# Tree New Bee API Client

A Postman-style HTTP API testing plugin that runs inside DSH (DeepSeek Harness). A unified sidebar entry opens a panel where you can build requests, inspect responses and manage collections, environments and history. All data is stored locally in the browser.

## Plugin Info

- **Package**: `@oakzhong/dsh-tree-new-bee-api-client` (plugin ID `dsh-tree-new-bee-api-client`)
- **Version**: 1.0.3
- **Entry**: Sidebar "Tree New Bee API Client"
- **Type**: Host + Client dual-half plugin (bundle)

## Tech Stack

| Layer | Technology |
|---|---|
| Plugin framework | DSH Cordis bundle (`cordis.patch.yml` inserts the Loader line) |
| Host half | ESM `apply(ctx)`, registers the `/api/dsh-tree-new-bee-api-client/request` route via `ctx.connection.fetch.register` |
| HTTP requests | Node.js built-in `fetch` + `AbortController` timeout, zero third-party dependencies |
| Client half | Frontend module registered via `window.__ModuleLoader__`, React without JSX (`React.createElement`) |
| UI styling | Inline `<style>` (tagged with data-plugin-css), uses DSH theme tokens and adapts to light/dark themes |
| i18n | `ctx.locale.register` / `bind`, Chinese and English (zh / en) |
| Local storage | Browser `localStorage`; collections, history, environments and custom headers are persisted |
| Data parsing | Standard `URL` / `searchParams` for URLs, `JSON.parse` / `stringify` for pretty JSON |

## Features

### 1. Request Builder & Sending
- Supports seven methods: `GET / POST / PUT / PATCH / DELETE / HEAD / OPTIONS`
- URL input and timeout setting (seconds)
- **Params**: key-value pairs automatically appended to the URL (with URL-encoding fallback)
- **Headers**: key-value editor
- **Body**: raw text for POST/PUT/PATCH, supports JSON
- Press Enter or click "Send" to execute; the Host side returns status code, status text, response headers, response body, elapsed time and size

### 2. Response Viewer
- Metric cards for status / time / size; status code colored by success or failure
- Response body: switch between "Pretty JSON" and raw text
- Response Headers tab
- Oversized-response truncation guard (4 MB)

### 3. Collection Management (Postman-style Tree)
- Supports **nested folders** that can be expanded or collapsed
- Save requests into the current folder, with a breadcrumb path (`Root / Parent / Child`, each segment clickable)
- **Double-click to rename** folders and requests; deletions require confirmation (deleting a folder also removes its contents)
- **Fuzzy search** across the collection: matches folder names, request names, methods and URLs, and auto-expands matching nodes
- Click a request to load it back into the editor

### 4. Environment Management (Variable Substitution)
- Multiple environments, each with its own K-V variables
- Reference variables with `{{variable}}`, e.g. `{{baseUrl}}/users`
- On send, variables in **URL / Params / Headers / Body** are replaced automatically; undefined variables are left unchanged
- Top environment selector displays the current environment's variable names

### 5. Common Request Headers
- 14 built-in common headers (Accept, Content-Type, Authorization, User-Agent, etc.) with default values
- **Multi-select**: select all / deselect all, insert several at once with automatic deduplication and empty-row filling
- **Custom headers**: add your own common headers (name / default value / description), persisted and deletable

### 6. History
- The most recent 100 requests (status, time, URL, errors); click to restore the full request snapshot
- Clear history with one click

## Data Storage

Everything is stored in the browser `localStorage` under these keys:

- `dsh-tree-new-bee-api-client.collection.v1` — collection tree
- `dsh-tree-new-bee-api-client.history.v1` — request history
- `dsh-tree-new-bee-api-client.environments.v1` — environments
- `dsh-tree-new-bee-api-client.activeEnv.v1` — active environment
- `dsh-tree-new-bee-api-client.customHeaders.v1` — custom request headers

## Directory Structure

```
dsh-tree-new-bee-api-client/
├── package.json          # Manifest, bundle config, client injection declaration
├── cordis.patch.yml      # Loader insertion line
├── index.js              # Host half: HTTP request route
├── client.js             # Client half: full UI and interactions
├── locale/
│   ├── zh.json           # Chinese display metadata
│   └── en.json           # English display metadata
├── icon.svg              # Plugin icon
├── README.md             # English documentation
└── README.zh.md          # Chinese documentation
```

## Installation & Usage

1. Install the bundle via Plugin Manager (`install_bundle` pointing to this directory)
2. Click "Tree New Bee API Client" in the sidebar
3. Enter the request URL and method, then fill in Params / Headers / Body as needed
4. Click "Send" to view the response
5. Use collections to save frequent requests and environments to manage variables across different servers
