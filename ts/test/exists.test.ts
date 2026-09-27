
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TangocardAuthSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = TangocardAuthSDK.test()
    equal(testsdk instanceof TangocardAuthSDK, true,
      'TangocardAuthSDK.test() must return a client synchronously')
  })

})
