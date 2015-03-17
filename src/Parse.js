var superagent = require("superagent");
var _ = require("underscore");

class Parse {
  constructor(appId, restApiKey, sessionToken = null) {
    this.API_BASE_URL = "https://api.parse.com";
    this.appId = appId;
    this.restApiKey = restApiKey;
    this.sessionToken = _.isUndefined(sessionToken) ? null : sessionToken;
  }

  getObject (className, objectId, qs) {
    qs = qs || "";
    return this._request({
      method: "GET",
      url: "/1/classes/" + className + "/" + objectId,
      params: qs
    });
  }

  getObjects (className, qs) {
    qs = qs || "";
    return this._request({
      method: "GET",
      url: "/1/classes/" + className,
      params: qs
    });
  }

  createObject (className, data) {
    return this._request({
      method: "POST",
      url: "/1/classes/" + className,
      params: data
    });
  }

  deleteObject (className, objectId) {
    return this._request({
      method: "DELETE",
      url: "/1/classes/" + className,
      params: qs
    });
  }

  updateObject (className, objectId, data) {
    return this._request({
      method: "PUT",
      url: "/1/classes/" + className,
      params: data
    });
  }

  loginUser (username, password) {
    return this._request({
      url: "/1/login",
      params: {
        username: username,
        password: password
      }
    });
  }

  requestPasswordReset (email) {
    return this._request({
      method: "POST",
      url: "/1/requestPasswordReset",
      params: {
        "email": email
      }
    });
  }

  createUser (data) {
    return this._request({
      method: "POST",
      url: "/1/users",
      params: data
    });
  }

  getUser (objectId, params) {
    return this._request({
      url: "/1/users/" + objectId,
      params: _.isFunction(params) ? null : params
    });
  }

  getUsers (params) {
    return this._request({
      url: "/1/users",
      params: _.isFunction(params) ? null : params
    });
  }

  getCurrentUser () {
    return this._request({
      url: "/1/users/me"
    });
  }

  updateUsers (objectId, data) {
    return this._request({
      method: "PUT",
      url: "/1/users/" + objectId,
      params: data
    });
  }

  deleteUser (objectId) {
    return this._request({
      method: "DELETE",
      url: "/1/users/" + objectId
    });
  }

  _request (opts) {
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

    if (this.sessionToken) {
      _.extend(reqOpts.headers, {"X-Parse-Session-Token": this.sessionToken});
    }

    reqOpts.url = this.API_BASE_URL + opts.url;

    return new Promise(function (resolve, reject) {
      superagent[reqOpts.method.toLowerCase()](reqOpts.url)
      .set(reqOpts.headers)
      .query(opts.params)
      .end((err, res) => {
        if (err) {
          throw new Error("error");
        }
        resolve(res);
      });
    });
  }
}

module.exports = Parse;
