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
    return _request({
      url: '/1/users/me'
    });
  },

  updateUsers: function(objectId, data) {
    return _request({
      method: 'PUT',
      url: '/1/users/' + objectId
      params: data
    })
  },

  deleteUser: function(objectId) {
    return _request({
      method: 'DELETE',
      url: '/1/users/' + objectId
    })
  },

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
