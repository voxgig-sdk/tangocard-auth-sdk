# TangocardAuth SDK feature factory

from tangocardauth_sdk.feature.base_feature import TangocardAuthBaseFeature
from tangocardauth_sdk.feature.debug_feature import TangocardAuthDebugFeature
from tangocardauth_sdk.feature.idempotency_feature import TangocardAuthIdempotencyFeature
from tangocardauth_sdk.feature.metrics_feature import TangocardAuthMetricsFeature
from tangocardauth_sdk.feature.paging_feature import TangocardAuthPagingFeature
from tangocardauth_sdk.feature.ratelimit_feature import TangocardAuthRatelimitFeature
from tangocardauth_sdk.feature.retry_feature import TangocardAuthRetryFeature
from tangocardauth_sdk.feature.test_feature import TangocardAuthTestFeature
from tangocardauth_sdk.feature.timeout_feature import TangocardAuthTimeoutFeature


_FEATURES = {
    "base": lambda: TangocardAuthBaseFeature(),
    "debug": lambda: TangocardAuthDebugFeature(),
    "idempotency": lambda: TangocardAuthIdempotencyFeature(),
    "metrics": lambda: TangocardAuthMetricsFeature(),
    "paging": lambda: TangocardAuthPagingFeature(),
    "ratelimit": lambda: TangocardAuthRatelimitFeature(),
    "retry": lambda: TangocardAuthRetryFeature(),
    "test": lambda: TangocardAuthTestFeature(),
    "timeout": lambda: TangocardAuthTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
