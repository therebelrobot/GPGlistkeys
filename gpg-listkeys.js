var debug = require('debug-log2')
var _ = require('lodash')
var _parseKey = require('gpg-parsekeys')
var spawnSync = require('child_process').spawnSync;

module.exports = function _utilGetKeys() {
  debug('_utilGetKeys entered')
  var listKeys = spawnSync('gpg', ['--fingerprint'])
  var output = listKeys.stdout.toString()
  output = output.split('\n\n')
  var secrets = spawnSync('gpg', ['--list-secret-keys']).stdout.toString()
  return _.sortBy(_parseKey(output, secrets), 'date')
}