
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { TangocardAuthSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('ServiceTokenManagementEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TANGOCARD_AUTH_TEST_LIVE=TRUE.
  afterEach(liveDelay('TANGOCARD_AUTH_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TangocardAuthSDK.test()
    const ent = testsdk.ServiceTokenManagement()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"access_token":{"a":true,"h":"Access Token","n":"access_token","r":false,"t":"`$STRING`","key$":"access_token","index$":0},"expires_in":{"a":true,"h":"Expires In","n":"expires_in","r":false,"t":"`$STRING`","key$":"expires_in","index$":1},"scope":{"a":true,"h":"Scope","n":"scope","r":false,"t":"`$STRING`","key$":"scope","index$":2},"token_type":{"a":true,"h":"Token Type","n":"token_type","r":false,"t":"`$STRING`","key$":"token_type","index$":3}},"name":"service_token_management","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /oauth/token","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"application/json","k":"header","n":"accept","or":"accept","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"application/x-www-form-urlencoded","k":"header","n":"content_type","or":"content_type","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/oauth/token","q":{"exist":["accept","content_type"]},"r":{},"s":[{"lit":"oauth"},{"lit":"token"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"service_token_management","name__orig":"service_token_management","Name":"ServiceTokenManagement","name_":"service_token_management","name-":"service-token-management","NAME":"SERVICE_TOKEN_MANAGEMENT","index$":0}, {"active":true,"entity":"service_token_management","key$":"BasicServiceTokenManagementFlow","kind":"basic","name":"BasicServiceTokenManagementFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"service_token_management_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'ServiceTokenManagement', {"POST /oauth/token":{"protocol":"http","requestBody":{"content":{"application/x-www-form-urlencoded":{"schema":{"type":"object","properties":{"client_id":{"type":"string","description":"Your client's ID","example":"<string>"},"client_secret":{"type":"string","description":"Your client's secret","example":"<string>"},"username":{"type":"string","description":"Service Accounts's username","example":"<string>"},"password":{"type":"string","description":"Service Accounts's password","example":"<string>"},"scope":{"type":"string","enum":["raas.all"],"description":"List of space-separated OAuth scopes. Always set to raas.all","example":"raas.all"},"audience":{"type":"string","description":"Audience for the token. For the 24 hour TTL set to https://api.tangocard.com/. For the 5 min TTL set to tango-api.bhn.com/fiveminute.","enum":["https://api.tangocard.com/","tango-api.bhn.com/fiveminute"],"example":"https://api.tangocard.com/"},"grant_type":{"type":"string","description":"Type of the OAuth flow in progress. Always set to password","enum":["password"],"example":"password"}},"required":["client_id","client_secret","username","password","scope","audience","grant_type"]}}}},"parameters":[{"name":"Content-Type","in":"header","schema":{"type":"string"},"description":"Optional.","example":"application/x-www-form-urlencoded","index$":0},{"name":"Accept","in":"header","schema":{"type":"string"},"description":"Optional.","example":"application/json","index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const service_token_management_ref01_ent = client.ServiceTokenManagement()
    let service_token_management_ref01_data = setup.data.new.service_token_management['service_token_management_ref01']

    service_token_management_ref01_data = (await service_token_management_ref01_ent.create(service_token_management_ref01_data)).data()
    assert(null != service_token_management_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/service_token_management/ServiceTokenManagementTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TangocardAuthSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['service_token_management01','service_token_management02','service_token_management03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TANGOCARD_AUTH_TEST_SERVICE_TOKEN_MANAGEMENT_ENTID': idmap,
    'TANGOCARD_AUTH_TEST_LIVE': 'FALSE',
    'TANGOCARD_AUTH_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TANGOCARD_AUTH_TEST_SERVICE_TOKEN_MANAGEMENT_ENTID']

  const live = 'TRUE' === env.TANGOCARD_AUTH_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TANGOCARD_AUTH_TEST_SERVICE_TOKEN_MANAGEMENT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new TangocardAuthSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.TANGOCARD_AUTH_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
