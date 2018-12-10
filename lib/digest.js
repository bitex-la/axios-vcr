var md5 = require('md5')
var _ = require('lodash')

function key(axiosConfig) {
  //Content-Length is calculated automatically by Axios before sending a request
  //We don't want to include it here because it could be changed by axios

  var data = (_.isString(axiosConfig.data)) ?
    axiosConfig.data : JSON.stringify(axiosConfig.data)
  var baseConfig = {
    url: axiosConfig.url,
    method: axiosConfig.method,
    data: data,
    headers: _.pickBy(axiosConfig.headers, (value, key) => {
      return _.includes(
        [
          'Content-Type', 'content-type',
          'User-Agent', 'user-agent',
          'Authorization', 'authorization'
        ],
        key
      )
    })
  }

  return md5(JSON.stringify(baseConfig))
}

module.exports = key
