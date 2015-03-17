"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var superagent = require("superagent");
var _ = require("underscore");

var Parse = (function () {
  function Parse(appId, restApiKey) {
    var sessionToken = arguments[2] === undefined ? null : arguments[2];

    _classCallCheck(this, Parse);

    this.API_BASE_URL = "https://api.parse.com";
    this.appId = appId;
    this.restApiKey = restApiKey;
    this.sessionToken = _.isUndefined(sessionToken) ? null : sessionToken;
  }

  _prototypeProperties(Parse, null, {
    getObject: {
      value: function getObject(className, objectId, qs) {
        qs = qs || "";
        return this._request({
          method: "GET",
          url: "/1/classes/" + className + "/" + objectId,
          params: qs
        });
      },
      writable: true,
      configurable: true
    },
    getObjects: {
      value: function getObjects(className, qs) {
        qs = qs || "";
        return this._request({
          method: "GET",
          url: "/1/classes/" + className,
          params: qs
        });
      },
      writable: true,
      configurable: true
    },
    createObject: {
      value: function createObject(className, data) {
        return this._request({
          method: "POST",
          url: "/1/classes/" + className,
          params: data
        });
      },
      writable: true,
      configurable: true
    },
    deleteObject: {
      value: function deleteObject(className, objectId) {
        return this._request({
          method: "DELETE",
          url: "/1/classes/" + className,
          params: qs
        });
      },
      writable: true,
      configurable: true
    },
    updateObject: {
      value: function updateObject(className, objectId, data) {
        return this._request({
          method: "PUT",
          url: "/1/classes/" + className,
          params: data
        });
      },
      writable: true,
      configurable: true
    },
    loginUser: {
      value: function loginUser(username, password) {
        return this._request({
          url: "/1/login",
          params: {
            username: username,
            password: password
          }
        });
      },
      writable: true,
      configurable: true
    },
    requestPasswordReset: {
      value: function requestPasswordReset(email) {
        return this._request({
          method: "POST",
          url: "/1/requestPasswordReset",
          params: {
            email: email
          }
        });
      },
      writable: true,
      configurable: true
    },
    createUser: {
      value: function createUser(data) {
        return this._request({
          method: "POST",
          url: "/1/users",
          params: data
        });
      },
      writable: true,
      configurable: true
    },
    getUser: {
      value: function getUser(objectId, params) {
        return this._request({
          url: "/1/users/" + objectId,
          params: _.isFunction(params) ? null : params
        });
      },
      writable: true,
      configurable: true
    },
    getUsers: {
      value: function getUsers(params) {
        return this._request({
          url: "/1/users",
          params: _.isFunction(params) ? null : params
        });
      },
      writable: true,
      configurable: true
    },
    getCurrentUser: {
      value: function getCurrentUser() {
        return _request({
          url: "/1/users/me"
        });
      },
      writable: true,
      configurable: true
    },
    updateUsers: {
      value: function updateUsers(objectId, data) {
        return _request({
          method: "PUT",
          url: "/1/users/" + objectId,
          params: data
        });
      },
      writable: true,
      configurable: true
    },
    deleteUser: {
      value: function deleteUser(objectId) {
        return _request({
          method: "DELETE",
          url: "/1/users/" + objectId
        });
      },
      writable: true,
      configurable: true
    },
    stringifyParamValues: {
      value: function stringifyParamValues(params) {
        if (!params || _.isEmpty(params)) {
          return null;
        }
        var values = _(params).map(function (value, key) {
          if (_.isObject(value) || _.isArray(value)) {
            return JSON.stringify(value);
          } else {
            return value;
          }
        });
        var keys = _(params).keys();
        var ret = {};
        for (var i = 0; i < keys.length; i++) {
          ret[keys[i]] = values[i];
        }
        return ret;
      },
      writable: true,
      configurable: true
    },
    _request: {
      value: function _request(opts) {
        opts = _.extend({
          method: "GET",
          url: null,
          params: null,
          body: null,
          headers: null
        }, opts);

        var reqOpts = {
          method: opts.method,
          headers: {
            "X-Parse-Application-Id": this.appId,
            "X-Parse-REST-API-Key": this.restApiKey
          }
        };

        if (opts.headers) {
          _.extend(reqOpts.headers, opts.headers);
        }

        if (opts.params) {
          if (opts.method === "GET") {
            opts.params = this.stringifyParamValues(opts.params);
          }

          var key = "qs";
          if (opts.method === "POST" || opts.method === "PUT") {
            key = "json";
          }
          reqOpts[key] = opts.params;
        } else if (opts.body) {
          reqOpts[key] = opts.body;
        }

        reqOpts.url = this.API_BASE_URL + opts.url;

        return new Promise(function (resolve, reject) {
          superagent[reqOpts.method.toLowerCase()](reqOpts.url).set(reqOpts.headers).end(function (err, res) {
            if (err) {
              throw new Error("error");
            }
            resolve(res.body.results);
          });
        });
      },
      writable: true,
      configurable: true
    }
  });

  return Parse;
})();

module.exports = Parse;

