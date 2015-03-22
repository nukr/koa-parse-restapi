var superagent = require("superagent");
var _ = require("lodash");

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
      method: "get",
      url: "/1/classes/" + className + "/" + objectId,
      params: qs
    });
  }

  getObjects (className, qs) {
    qs = qs || "";
    return this._request({
      method: "get",
      url: "/1/classes/" + className,
      params: qs
    });
  }

  createObject (className, data) {
    return this._request({
      method: "post",
      url: "/1/classes/" + className,
      params: data
    });
  }

  deleteObject (className, objectId) {
    return this._request({
      method: "del",
      url: `/1/classes/${ className }/${ objectId }`
    });
  }

  updateObject (className, objectId, data) {
    return this._request({
      method: "put",
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
      method: "post",
      url: "/1/requestPasswordReset",
      params: {
        "email": email
      }
    });
  }

  createUser (data) {
    return this._request({
      method: "post",
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
      method: "put",
      url: "/1/users/" + objectId,
      params: data
    });
  }

  deleteUser (objectId) {
    return this._request({
      method: "del",
      url: "/1/users/" + objectId
    });
  }

  _request (opts) {
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
      _.assign(reqOpts.headers, {"X-Parse-Session-Token": this.sessionToken});
    }

    if (opts.method === "put" || opts.method === "post") {
      queryOrSend = "send";
      _.assign(reqOpts.headers, {"Content-Type": "application/json"});
    }

    reqOpts.url = this.API_BASE_URL + opts.url;

    return new Promise(function (resolve, reject) {
      superagent[opts.method](reqOpts.url)
      .set(reqOpts.headers)
      [queryOrSend](opts.params)
      .end((err, res) => {
        if (err) {
          return reject({dump: err, message: JSON.parse( err.response.text )});
        }
        return resolve(res);
      });
    });
  }
}

module.exports = Parse;
