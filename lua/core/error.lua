-- TangocardAuth SDK error

local TangocardAuthError = {}
TangocardAuthError.__index = TangocardAuthError


function TangocardAuthError.new(code, msg, ctx)
  local self = setmetatable({}, TangocardAuthError)
  self.is_sdk_error = true
  self.sdk = "TangocardAuth"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function TangocardAuthError:error()
  return self.msg
end


function TangocardAuthError:__tostring()
  return self.msg
end


return TangocardAuthError
