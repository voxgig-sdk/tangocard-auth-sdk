
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { TangocardAuthSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await TangocardAuthSDK.test()
    equal(null !== testsdk, true)
  })

})
