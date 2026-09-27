-- Typed models for the TangocardAuth SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class ServiceTokenManagement
---@field access_token? string
---@field expires_in? string
---@field scope? string
---@field token_type? string

---@class ServiceTokenManagementCreateData
---@field access_token? string
---@field expires_in? string
---@field scope? string
---@field token_type? string

local M = {}

return M
