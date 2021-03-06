"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var superagent = require("superagent");
var _ = require("lodash");

var Parse = (function () {
  function Parse(appId, restApiKey) {
    var sessionToken = arguments[2] === undefined ? null : arguments[2];

    _classCallCheck(this, Parse);

    this.API_BASE_URL = "https://api.parse.com";
    this.appId = appId;
    this.restApiKey = restApiKey;
    this.sessionToken = _.isUndefined(sessionToken) ? null : sessionToken;
  }

  _createClass(Parse, {
    getObject: {
      value: function getObject(className, objectId, qs) {
        qs = qs || "";
        return this._request({
          method: "get",
          url: "/1/classes/" + className + "/" + objectId,
          params: qs
        });
      }
    },
    getObjects: {
      value: function getObjects(className, qs) {
        qs = qs || "";
        return this._request({
          method: "get",
          url: "/1/classes/" + className,
          params: qs
        });
      }
    },
    createObject: {
      value: function createObject(className, data) {
        return this._request({
          method: "post",
          url: "/1/classes/" + className,
          params: data
        });
      }
    },
    deleteObject: {
      value: function deleteObject(className, objectId) {
        return this._request({
          method: "del",
          url: "/1/classes/" + className + "/" + objectId
        });
      }
    },
    updateObject: {
      value: function updateObject(className, objectId, data) {
        return this._request({
          method: "put",
          url: "/1/classes/" + className,
          params: data
        });
      }
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
      }
    },
    requestPasswordReset: {
      value: function requestPasswordReset(email) {
        return this._request({
          method: "post",
          url: "/1/requestPasswordReset",
          params: {
            email: email
          }
        });
      }
    },
    createUser: {
      value: function createUser(data) {
        return this._request({
          method: "post",
          url: "/1/users",
          params: data
        });
      }
    },
    getUser: {
      value: function getUser(objectId, params) {
        return this._request({
          url: "/1/users/" + objectId,
          params: _.isFunction(params) ? null : params
        });
      }
    },
    getUsers: {
      value: function getUsers(params) {
        return this._request({
          url: "/1/users",
          params: _.isFunction(params) ? null : params
        });
      }
    },
    getCurrentUser: {
      value: function getCurrentUser() {
        return this._request({
          url: "/1/users/me"
        });
      }
    },
    updateUsers: {
      value: function updateUsers(objectId, data) {
        return this._request({
          method: "put",
          url: "/1/users/" + objectId,
          params: data
        });
      }
    },
    deleteUser: {
      value: function deleteUser(objectId) {
        return this._request({
          method: "del",
          url: "/1/users/" + objectId
        });
      }
    },
    _request: {
      value: function _request(opts) {
        opts = _.assign({
          method: "get",
          url: null,
          params: null,
          body: null,
          headers: null
        }, opts);

        var queryOrSend = "query";
        var reqOpts = {
          method: opts.method,
          headers: {
            "X-Parse-Application-Id": this.appId,
            "X-Parse-REST-API-Key": this.restApiKey
          }
        };

        if (this.sessionToken) {
          _.assign(reqOpts.headers, { "X-Parse-Session-Token": this.sessionToken });
        }

        if (opts.method === "put" || opts.method === "post") {
          queryOrSend = "send";
          _.assign(reqOpts.headers, { "Content-Type": "application/json" });
        }

        reqOpts.url = this.API_BASE_URL + opts.url;

        return new Promise(function (resolve, reject) {
          superagent[opts.method](reqOpts.url).set(reqOpts.headers)[queryOrSend](opts.params).end(function (err, res) {
            if (err) {
              return reject({ dump: err, body: err.response.body });
            }
            return resolve(res);
          });
        });
      }
    }
  });

  return Parse;
})();

module.exports = Parse;