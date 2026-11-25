# Tree New Bee API Client

A Postman-like API testing tool for DeepSeek Harness (DSH). It adds a **Tree New Bee API Client** entry to the left sidebar: build and send HTTP requests, organize saved requests in a collection tree, manage environments and variables, import from Swagger/OpenAPI, and inspect full request/response logs — all inside the Harness Web UI.

Requests run on the Host via `fetch`; the client sends the method, URL, headers and body per request. Only `http://` and `https://` URLs are accepted.

> **Step-by-step guide:** [USAGE.md](USAGE.md) (English) · [USAGE.zh.md](USAGE.zh.md) (中文)

## Plugin Info

| Field | Value |
| --- | --- |
| Package | `@oakzhong/dsh-tree-new-bee-api-client` |
| Version | `1.3.1` |
| Entry | `index.js` (Host) · `client.js` (Client) |
| Type | DSH bundle plugin, ES module (`"type": "module"`, `"private": false`, public publish) |
| Sidebar entry | Tree New Bee API Client (left sidebar) |
| Description | A Postman-style API client with a collection tree, environments, Swagger import and request logs. |

## Tech Stack

| Layer | Technology | Role |
| --- | --- | --- |
| Client UI | React (via `window.__ModuleLoader__`) | Sidebar entry and the main React panel. |
| Host runtime | Node.js `fetch` | Executes HTTP requests with a timeout and response-size cap. |
| Plugin framework | Cordis (`slots`, `locale`, `connection`, `layout`) | UI injection, i18n dictionaries, HTTP routes and panel navigation. |
| Client storage | `window.localStorage` | Collection, environments, custom headers, history and active selection. |
| Module format | ES Modules | Entry points declared in `exports`. |

## Features

### 1. Request Construction
- Method selector and URL bar; `http://` / `https://` only, with a configurable timeout (seconds).
- **Params**: key/value rows appended to the URL query string automatically.
- **Headers**: key/value rows plus a library of common headers, multi-select add, and custom header definitions (name, default value, description).
- **Body** (Postman-style types; selecting a type auto-sets the matching `Content-Type` header):
  - **none** — no body
  - **form-data** — key/value rows with a text/file switch per row; binary file rows sent as multipart
  - **x-www-form-urlencoded** — key/value rows serialized as `k=v`
  - **raw** — text editor with a format selector: Text / JSON / JavaScript / HTML / XML (each sets its Content-Type)
  - **binary** — a single binary file uploaded as the request body
- **Environments**: create environments with variables, reference them as `{{name}}` in URL/params/headers/body; variables are resolved at send time.

### 2. Collection Tree
- Save requests into a nested folder tree; create/rename/delete folders and requests (double-click to rename).
- Move requests/folders via a "Move to" picker; search the tree by name.
- Double-click a saved request to load it back into the editor.

### 3. Response Viewer
- Status, elapsed time and response size metrics.
- Body view with a "pretty" JSON toggle and a scrollable area for long responses.
- Response headers tab.

### 4. History & Logs
- **History**: every send is recorded (URL, method, status, time); click an entry to restore it. Searchable by URL/method.
- **Log**: a detailed log of every request (method, URL, headers, body) and response (status, duration, size, headers, body; errors included). Keep the latest 200 entries. Searchable by URL/method/status. Click an entry to open a detail modal with Request/Response tabs and copy buttons. File uploads are logged by file name only.

### 5. Import / Export
- **Export** the collection only, or the whole workspace (collection + environments + custom headers) as JSON.
- **Import** JSON to append to the current data with regenerated ids to avoid collisions.

### 6. Swagger / OpenAPI Import
- Header **Swagger import** button: paste Swagger 2.0 / OpenAPI 3.x JSON, or enter a URL and fetch it.
- Parses `paths` into folders by tag (one request per HTTP method); `{id}` path params become `:id`; query parameters and body examples are filled in.
- Optional baseUrl override (blank uses the document's servers/host; `{{baseUrl}}` is supported).
- Choose a target folder as the import root; re-importing the same document replaces the previous same-source import instead of duplicating.

## Host API

Routes are registered under `/api/dsh-tree-new-bee-api-client` via the `connection` service: `request` (executes one HTTP call with method/url/headers/body/bodyBase64/timeout and returns status/headers/body/timeMs/size).

## Directory Structure

```
dsh-tree-new-bee-api-client/
├── index.js              # Host half: /request route via fetch
├── client.js             # Client half: sidebar entry, React panel and styles
├── cordis.patch.yml      # DSH bundle patch
├── icon.svg / icon.png   # Plugin icons
├── locale/               # zh.json / en.json metadata
├── package.json
├── README.md             # This document (English)
└── README.zh.md          # Chinese documentation
```

## Installation & Usage

1. Install this bundle into the target DSH profile and reload the Harness Web UI (it mounts immediately).
2. Open **Tree New Bee API Client** in the left sidebar.
3. Enter an `http://` or `https://` URL, set method/params/headers/body, and click **Send**.
4. Save useful requests into the collection, create environments for variables, and use **Swagger import** to bootstrap a collection from an API spec.
5. Use **History** / **Log** to review past calls and their full request/response data.

### Pre-request Script & Tests
- Two script tabs added to the request editor (Postman-style); scripts are saved with the request.
- **Pre-request Script**: runs before sending; use `pm.environment.set(name, value)` / `pm.variables.set()` to set variables that affect this request (resolved at send time).
- **Tests**: runs after the response; use `pm.test(name, fn)` for assertions and `pm.expect(value).to.eql(...)` / `.equal` / `.to.be.ok/true/false` / `.to.have.property()`. The response object is available as the global `response` (status/body/headers, etc.).
- A Test Results tab in the response area shows each assertion's pass/fail status and errors. Scripts run in a restricted Function scope exposing only `pm` and `response`.
- Script templates: both script editors have a Template dropdown with one-click insertion (appended to existing content). 8 verified templates: Pre-request (set env var, set timestamp vars, random string, increment counter) and Tests (status 200, JSON body assertion, response time < 2s, header exists).
