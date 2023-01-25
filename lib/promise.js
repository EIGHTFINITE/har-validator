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

function validate (name, data) {
  data = data || {}

  // validator config
  ajv = ajv || createAjvInstance()

  var validate = ajv.getSchema(name + '.json')

  return new Promise(function (resolve, reject) {
    var valid = validate(data)

    !valid ? reject(new HARError(validate.errors)) : resolve(data)
  })
}

exports.afterRequest = function (data) {
  return validate('afterRequest', data)
}

exports.beforeRequest = function (data) {
  return validate('beforeRequest', data)
}

exports.browser = function (data) {
  return validate('browser', data)
}

exports.cache = function (data) {
  return validate('cache', data)
}

exports.content = function (data) {
  return validate('content', data)
}

exports.cookie = function (data) {
  return validate('cookie', data)
}

exports.creator = function (data) {
  return validate('creator', data)
}

exports.entry = function (data) {
  return validate('entry', data)
}

exports.har = function (data) {
  return validate('har', data)
}

exports.header = function (data) {
  return validate('header', data)
}

exports.log = function (data) {
  return validate('log', data)
}

exports.page = function (data) {
  return validate('page', data)
}

exports.pageTimings = function (data) {
  return validate('pageTimings', data)
}

exports.postData = function (data) {
  return validate('postData', data)
}

exports.query = function (data) {
  return validate('query', data)
}

exports.request = function (data) {
  return validate('request', data)
}

exports.response = function (data) {
  return validate('response', data)
}

exports.timings = function (data) {
  return validate('timings', data)
}
