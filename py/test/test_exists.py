# TangocardAuth SDK exists test

import pytest
from tangocardauth_sdk import TangocardAuthSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = TangocardAuthSDK.test(None, None)
        assert testsdk is not None
