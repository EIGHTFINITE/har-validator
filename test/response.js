'use strict'

const HARError = require('../lib/error')
const invalid = require('./fixtures/response/invalid')
const valid = require('./fixtures/response/valid')
const validate = require('../lib/promise')
const tap = require('tap')

const errors = {
  object: new HARError([{ message: "must have required property 'status'" }]),
  array: new HARError([{ message: 'must be object' }]),
  undef: new HARError([{ message: "must have required property 'status'" }]),
  bodySize: new HARError([{ message: 'must be integer' }]),
  headers: new HARError([{ message: 'must be array' }]),
  malformed: new HARError([{ message: "must have required property 'name'" }])
}

tap.test('response', assert => {
  assert.plan(7)

  return Promise.all([
    validate.response({}).catch(err => assert.match(err, errors.object, 'should fail with empty object')),
    validate.response([]).catch(err => assert.match(err, errors.array, 'should fail with empty array')),
    validate.response(undefined).catch(err => assert.match(err, errors.undef, 'should fail with undefined')),
    validate.response(invalid.bodySize).catch(err => assert.match(err, errors.bodySize, 'should fail on bad "bodySize"')),
    validate.response(invalid.headers).catch(err => assert.match(err, errors.headers, 'should fail on bad "headers"')),
    validate.response(invalid.malformed).catch(err => assert.match(err, errors.malformed, 'should fail on malformed "headers"')),
    validate.response(valid).then(out => assert.equal(out, valid, 'should not fail with full example'))
  ])
})
