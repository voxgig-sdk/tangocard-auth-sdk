# TangocardAuth SDK utility: make_context

from projectname_sdk.core.context import TangocardAuthContext


def make_context_util(ctxmap, basectx):
    return TangocardAuthContext(ctxmap, basectx)
