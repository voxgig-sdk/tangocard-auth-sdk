-- TangocardAuth SDK exists test

local sdk = require("tangocard-auth_sdk")

describe("TangocardAuthSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
