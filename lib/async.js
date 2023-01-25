var Ajv = require('ajv')
var HARError = require('./error')
var schemas = require('har-schema')

var ajv

function createAjvInstance () {
  var ajv = new Ajv({
    allErrors: true
  })
  ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))
  ajv.addSchema(schemas)
  ajv.addVocabulary([
    "afterRequest",
    "beforeRequest",
    "browser",
    "cache",
    "content",
    "cookie",
    "creator",
    "entry",
    "har",
    "header",
    "log",
    "page",
    "pageTimings",
    "param",
    "postData",
    "query",
    "request",
    "response",
    "timings",
    "uri"
  ])
  // https://github.com/ajv-validator/ajv/blob/v6/lib/compile/formats.js#L37
  ajv.addFormat("date-time", /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i)
  // https://github.com/ajv-validator/ajv/blob/v6/lib/compile/formats.js#L39
  ajv.addFormat("uri", /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i)
  // https://github.com/ajv-validator/ajv/blob/v6/lib/compile/formats.js#L49
  ajv.addFormat("ipv4", /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/)
  // https://github.com/ajv-validator/ajv/blob/v6/lib/compile/formats.js#L51
  ajv.addFormat("ipv6", /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i)

  return ajv
}

function validate (name, data, next) {
  data = data || {}

  // validator config
  ajv = ajv || createAjvInstance()

  var validate = ajv.getSchema(name + '.json')

  var valid = validate(data)

  // callback?
  if (typeof next === 'function') {
    return next(!valid ? new HARError(validate.errors) : null, valid)
  }

  return valid
}

exports.afterRequest = function (data, next) {
  return validate('afterRequest', data, next)
}

exports.beforeRequest = function (data, next) {
  return validate('beforeRequest', data, next)
}

exports.browser = function (data, next) {
  return validate('browser', data, next)
}

exports.cache = function (data, next) {
  return validate('cache', data, next)
}

exports.content = function (data, next) {
  return validate('content', data, next)
}

exports.cookie = function (data, next) {
  return validate('cookie', data, next)
}

exports.creator = function (data, next) {
  return validate('creator', data, next)
}

exports.entry = function (data, next) {
  return validate('entry', data, next)
}

exports.har = function (data, next) {
  return validate('har', data, next)
}

exports.header = function (data, next) {
  return validate('header', data, next)
}

exports.log = function (data, next) {
  return validate('log', data, next)
}

exports.page = function (data, next) {
  return validate('page', data, next)
}

exports.pageTimings = function (data, next) {
  return validate('pageTimings', data, next)
}

exports.postData = function (data, next) {
  return validate('postData', data, next)
}

exports.query = function (data, next) {
  return validate('query', data, next)
}

exports.request = function (data, next) {
  return validate('request', data, next)
}

exports.response = function (data, next) {
  return validate('response', data, next)
}

exports.timings = function (data, next) {
  return validate('timings', data, next)
}
