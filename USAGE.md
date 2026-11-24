# Tree New Bee API Client — User Guide

A step-by-step guide for daily use. For a feature overview and technical details, see [README.md](README.md).

## 1. Open the panel

Click **Tree New Bee API Client** in the left sidebar. The panel has three areas:

```
┌─────────────┬──────────────────────────────┐
│ Sidebar      │ Main area                     │
│ Collection / │  ┌─ Request (URL + Params/    │
│ Envs /       │  │  Headers/Body/Scripts) ─┐ │
│ History/Log  │  └─ Response (Body/Headers/Tests)┘│
└─────────────┴──────────────────────────────┘
```

## 2. Send your first request

1. Enter a URL in the top bar, e.g. `https://jsonplaceholder.typicode.com/posts/1`
2. Keep method `GET`
3. Click **Send**
4. The response area shows status, duration, size, and Body / Headers tabs

> Only `http://` and `https://` URLs are accepted. The timeout (seconds) can be set in the field next to the URL.

## 3. Params

Open the **Params** tab and add key/value rows, e.g. `page=1`, `limit=20`. They are appended to the URL as `?page=1&limit=20` when sending.

## 4. Headers

Open the **Headers** tab to add key/value rows. You can also:
- Click **Add common headers** to expand a library of common headers; multi-select and click **Add selected**
- Define reusable custom headers (name, default value, description) at the bottom

## 5. Body

Open the **Body** tab and pick a type (this auto-sets the matching Content-Type header):

| Type | Usage |
|---|---|
| **none** | No request body |
| **form-data** | Key/value rows; click the `T` / `📎` chip at a row's start to switch text/file; file rows let you choose a file |
| **x-www-form-urlencoded** | Key/value rows serialized as `k=v` |
| **raw** | Text editor with a format dropdown: Text / JSON / JavaScript / HTML / XML |
| **binary** | Choose a single binary file as the request body |

> GET / HEAD requests do not send a body.

## 6. Environments

1. Switch the sidebar to the **Envs** tab
2. Click **New env**, name it, and add variables, e.g. `baseUrl = https://api.example.com`
3. Select that environment in the top dropdown
4. Reference variables as `{{baseUrl}}` in URL / Params / Headers / Body; they are replaced at send time

> Variables set by scripts are also substituted (see section 9).

## 7. Collection (saving requests)

1. In the **Save to** dropdown pick a folder (or root); create folders with **New folder**
2. Enter a request name in the field above (leave blank to use "method + URL")
3. Click **Save request**
4. Double-click a saved request in the collection tree to load it back
5. Double-click a folder/request to rename; use **Move to** to reorganize; use the search box to filter

## 8. History & Logs

- **History**: every send is recorded; click an entry to restore it. Search by URL/method.
- **Log**: click an entry to open a detail modal:
  - **Request log** tab: method, URL, headers, body
  - **Response log** tab: status, duration, size, headers, body
  - Copy buttons on each section; file uploads are shown by file name only

## 9. Pre-request Script

Open the **Pre-request Script** tab in the request editor. It runs **before** sending and can set variables:

```js
pm.environment.set("token", "abc123");
pm.environment.set("ts", String(Date.now()));
```

**Templates**: use the Template dropdown then click **+ Insert**. Four templates: set env var, set timestamp vars, generate random string, read & increment counter.

## 10. Tests & Test Results

Open the **Tests** tab; it runs **after** the response. Define assertions with `pm.test`:

```js
pm.test("status 200", function () {
  pm.expect(response.status).to.eql(200);
});

pm.test("ok is true", function () {
  var data = JSON.parse(response.body);
  pm.expect(data.ok).to.be.true();
});
```

The global `response` contains `status`, `body`, `headers`, `timeMs`, `size`, etc.

**Available assertions**:
- `pm.expect(x).to.eql(y)` — strict equality
- `.equal(y)` — loose equality
- `.to.be.ok()` / `.true()` / `.false()` — truth checks
- `.to.have.property("k")` — property exists

**Templates** (same dropdown): status 200, JSON body assertion, response time < 2s, header exists.

After sending, open the **Test Results** tab in the response area to see each assertion's pass/fail and errors.

> Scripts run in a restricted sandbox exposing only `pm` and `response`, and are saved with the request.

## 11. Import / Export

Header buttons:

- **Export**: the collection only, or the whole workspace (collection + environments + custom headers) as JSON
- **Import**: choose a JSON file to append to current data (ids regenerated to avoid collisions)
- **Swagger import**: see next section

## 12. Import from Swagger / OpenAPI

1. Click **Swagger import** in the header
2. Provide the document: paste Swagger 2.0 / OpenAPI 3.x JSON, or enter a URL and click **Fetch**
3. (Optional) Set baseUrl: blank uses the document's servers/host; `{{baseUrl}}` is supported
4. (Optional) Pick a target folder as the import root; blank imports at top level
5. Click **Import as collection**

Parsing: folders by tag, one request per HTTP method; `{id}` path params become `:id`; query params and body examples are filled in. Re-importing the same document replaces the previous same-source content.

## 13. Test endpoints (ready to use)

```text
GET  https://jsonplaceholder.typicode.com/posts/1
GET  https://postman-echo.com/get?foo=bar
POST https://postman-echo.com/post       Body: raw JSON  {"name":"test"}
POST https://postman-echo.com/post       Body: x-www-form-urlencoded  name=Tom&age=20
GET  https://dummyjson.com/products/1
GET  https://jsonplaceholder.typicode.com/posts/99999   (404, for failure logs)
```

Swagger documents:
```text
https://petstore3.swagger.io/api/v3/openapi.json
https://petstore.swagger.io/v2/swagger.json
```
