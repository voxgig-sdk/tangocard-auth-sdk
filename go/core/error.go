package core

type TangocardAuthError struct {
	IsTangocardAuthError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewTangocardAuthError(code string, msg string, ctx *Context) *TangocardAuthError {
	return &TangocardAuthError{
		IsTangocardAuthError: true,
		Sdk:              "TangocardAuth",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *TangocardAuthError) Error() string {
	return e.Msg
}
