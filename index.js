var request = require('koa-request');
var _ = require('underscore');

/**
 * constructor
 *
 */
function Parse(appId, restApiKey, sessionToken) {
  this.appId = appId;
  this.restApiKey = restApiKey;
  this.sessionToken = _.isUndefined(sessionToken) ? null : sessionToken;
  this.masterKey = null;
};

Parse.prototype = {

  API_BASE_URL: 'https://api.parse.com',
  appId: null,
  restApiKey: null,
  masterKey: null,
  sessionToken: null,
  getObject: function(className, objectId, qs) {
    qs = qs || '';
    return this._request({
      method: 'GET',
      url: '/1/classes/' + className + '/' + objectId,
      params: qs
    });
  },

  getObjects: function(className, qs) {
    qs = qs || '';
    return this._request({
      method: 'GET',
      url: '/1/classes/' + className,
      params: qs
    });
  },

  createObject: function(className, data) {
    return this._request({
      method: 'POST',
      url: '/1/classes/' + className,
      params: data
    });
  },

  deleteObject: function(className, objectId) {
    return this._request({
      method: 'DELETE',
      url: '/1/classes/' + className,
      params: qs
    });
  },

  updateObject: function(className, objectId, data) {
    return this._request({
      method: 'PUT',
      url: '/1/classes/' + className,
      params: data
    });
  },

  loginUser: function(username, password) {
    return this._request({
      url: '/1/login',
      params: {
        username: username,
        password: password
      }
    })
  },

  requestPasswordReset: function(email) {
    return this._request({
      method: 'POST',
      url: '/1/requestPasswordReset',
      params: {
        'email': email
      }
    });
  },

  createUser: function(data) {
    return this._request({
      method: 'POST',
      url: '/1/users',
      params: data
    });
  },

  getUser: function(objectId, params) {
    return this._request({
      url: '/1/users/' + objectId,
      params: _.isFunction(params) ? null : params
    });
  },

  getUsers: function(params) {
    return this._request({
      url: '/1/users',
      params: _.isFunction(params) ? null : params
    });
  },

  getCurrentUser: function() {
    return this._request({
      url: '/1/users/me'
    });
  },

  updateUsers: function(objectId, data) {
    return this._request({
      method: 'PUT',
      url: '/1/users/' + objectId,
      params: data
    })
  },

  deleteUser: function(objectId) {
    return this._request({
      method: 'DELETE',
      url: '/1/users/' + objectId
    })
  },

  createRole: function (data) {
    return this._request({
      method: 'POST',
      url: '/1/roles',
      params: data
    });
  },

  getRole: function (objectId, params) {
    return this._request({
      url: '/1/roles/' + objectId,
      params: _.isFunction(params) ? null : params
    });
  },

  getRoles: function (params) {
    return this._request({
      url: '/1/roles',
      params: _.isFunction(params) ? null : params
    });
  },

  updateRole: function (objectId, data) {
    return this._request({
      method: 'PUT',
      url: '/1/roles/' + objectId,
      params: data
    });
  },

  deleteRole: function (objectId) {
    return this._request({
      method: 'DELETE',
      url: '/1/roles/' + objectId
    });
  },

  /**
   * 從這以下還沒測!!!
   * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   */

  uploadFile: function (filePath, fileName) {
    if (_.isFunction(fileName)) {
      return fileName;
      fileName = null;
    }
    var contentType = require('mime').lookup(filePath);
    if (!fileName) {
      fileName = filePath.replace(/^.*[\\\/]/, ''); //http://stackoverflow.com/a/423385/246142
    }
    var buffer = require('fs').readFileSync(filePath);
    this.uploadFileBuffer(buffer, contentType, fileName);
  },

  uploadFileBuffer: function (buffer, contentType, fileName) {
    return this._request({
      method: 'POST',
      url: '/1/files/' + fileName,
      body: buffer,
      headers: {'Content-type': contentType}
    });
  },

  deleteFile: function (name) {
    return this._request({
      method: 'DELETE',
      url: '/1/files' + name,
    });
  },

  sendPushNotification: function (data) {
    return this._request({
      method: 'POST',
      url: '/1/push',
      params: data
    });
  },

  sendAnalyticsEvent: function (eventName, dimensionsOrCallback) {
    return this._request({
      method: 'POST',
      url: '/1/events/' + eventName,
      params: _.isFunction(dimensionsOrCallback) ? {} : dimensionsOrCallback
    });
  },

  cloudRun: function () {
    return this._request({
      method: 'POST',
      url: '/1/functions/' + functionName,
      params: data
    });
  },

  /**
   * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   */

  stringifyParamValues: function(params) {
    if (!params || _.isEmpty(params))
      return null;
    var values = _(params).map(function(value, key) {
      if (_.isObject(value) || _.isArray(value))
        return JSON.stringify(value);
      else
        return value;
    });
    var keys = _(params).keys();
    var ret = {};
    for (var i = 0; i < keys.length; i++)
      ret[keys[i]] = values[i];
    return ret;
  },

  _request: function(opts) {
    opts = _.extend({
      method: 'GET',
      url: null,
      params: null,
      body: null,
      headers: null,
    }, opts)

    var reqOpts = {
      method: opts.method,
      headers: {
        'X-Parse-Application-Id': this.appId,
        'X-Parse-REST-API-Key': this.restApiKey
      }
    }
    if (this.sessionToken) reqOpts.headers['X-Parse-Session-Token'] = this.sessionToken;
    if (this.masterKey) reqOpts.headers['X-Parse-Master-Key'] = this.masterKey;
    if (opts.headers) _.extend(reqOpts.headers, opts.headers);
    if (opts.params) {
      if (opts.method === 'GET') {
        opts.params = this.stringifyParamValues(opts.params);
      }

      var key = 'qs';
      if (opts.method === 'POST' || opts.method === 'PUT') {
        key = 'json';
      }
      reqOpts[key] = opts.params
    } else if (opts.body) {
      reqOpts[key] = opts.body;
    }

    reqOpts['url'] = this.API_BASE_URL + opts.url

    return request(reqOpts)
  }
}

module.exports = Parse;
