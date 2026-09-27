-- ServiceTokenManagement entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("tangocard-auth_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("ServiceTokenManagementEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:ServiceTokenManagement(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = service_token_management_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "service_token_management." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set TANGOCARD_AUTH_TEST_SERVICE_TOKEN_MANAGEMENT_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local service_token_management_ref01_ent = client:ServiceTokenManagement(nil)
    local service_token_management_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.service_token_management"), "service_token_management_ref01"))

    local service_token_management_ref01_data_result, err = service_token_management_ref01_ent:create(service_token_management_ref01_data, nil)
    assert.is_nil(err)
    service_token_management_ref01_data = helpers.to_map(type(service_token_management_ref01_data_result) == 'table' and service_token_management_ref01_data_result.data_get and service_token_management_ref01_data_result:data_get() or service_token_management_ref01_data_result)
    assert.is_not_nil(service_token_management_ref01_data)

  end)
end)

function service_token_management_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/service_token_management/ServiceTokenManagementTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read service_token_management test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "service_token_management01", "service_token_management02", "service_token_management03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("TANGOCARD_AUTH_TEST_SERVICE_TOKEN_MANAGEMENT_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["TANGOCARD_AUTH_TEST_SERVICE_TOKEN_MANAGEMENT_ENTID"] = idmap,
    ["TANGOCARD_AUTH_TEST_LIVE"] = "FALSE",
    ["TANGOCARD_AUTH_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["TANGOCARD_AUTH_TEST_SERVICE_TOKEN_MANAGEMENT_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["TANGOCARD_AUTH_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["TANGOCARD_AUTH_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["TANGOCARD_AUTH_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
