'use strict'

const HARError = require('../lib/error')
const invalid = require('./fixtures/request/invalid')
const tap = require('tap')
const valid = require('./fixtures/request/valid')
const validate = require('../lib/promise')

const errors = {
  object: new HARError([{ message: "must have required property 'method'" }]),
  array: new HARError([{ message: 'must be object' }]),
  undef: new HARError([{ message: "must have required property 'method'" }]),
  url: new HARError([{ message: 'must match format "uri"' }]),
  headers: new HARError([{ message: 'must be array' }]),
  malformed: new HARError([{ message: "must have required property 'name'" }])
}

tap.test('request', assert => {
  assert.plan(7)

  return Promise.all([
    validate.request({}).catch(err => assert.match(err, errors.object, 'should fail with empty object')),
    validate.request([]).catch(err => assert.match(err, errors.array, 'should fail with empty array')),
    validate.request(undefined).catch(err => assert.match(err, errors.undef, 'should fail with undefined')),
    validate.request(invalid.url).catch(err => assert.match(err, errors.url, 'should fail on bad "url"')),
    validate.request(invalid.headers).catch(err => assert.match(err, errors.headers, 'should fail on bad "headers"')),
    validate.request(invalid.malformed).catch(err => assert.match(err, errors.malformed, 'should fail on malformed "headers"')),
    validate.request(valid).then(out => assert.equal(out, valid, 'should not fail with full example'))
  ])
})
