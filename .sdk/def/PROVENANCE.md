# API definition provenance

## tangocard-auth-openapi.json

- **Source:** https://tangocard.readme.io/llms.txt → the `developers.tangocard.com/reference`
  page carrying the `Auth Token acquisition` OpenAPI fragment.
- **Publisher:** Tango (Tango Card)
- **Retrieved:** 2026-09-17
- **Format:** OpenAPI 3.x
- **Size:** 3674 bytes
- **Coverage:** 1 path — `POST /oauth/token`, the whole of this API.

## Why this is its own SDK

Tango's reference pages carry two `info.title` values. This one,
`Auth Token acquisition`, is served from a **different host**
(`sandbox-auth.tangocard.com`) than the Tango API
(`integration-api.tangocard.com/raas/v2`). A single generated client cannot
have two base URLs, so merging them would give one of the two paths a server
it is not on. They are separate SDKs: the Tango API is `tangocard-sdk`.
