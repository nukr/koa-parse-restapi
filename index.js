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

    classes: function (className) {
        var that = this;
        return {
            get: function (objectId, qs) {
                qs = qs || '';
                return that._request({
                    method: 'GET',
                    url: '/1/classes/' + className + '/' + objectId,
                    params: qs
                });
            },

            getAll: function (qs) {
                qs = qs || '';
                return that._request({
                    method: 'GET',
                    url: '/1/classes/' + className,
                    params: qs
                });
            },

            create: function (data) {
                return that._request({
                    method: 'POST',
                    url: '/1/classes/' + className,
                    params: data
                });
            },

            del: function () {
                console.log(className);
                console.log('i am del()');
            },

            update: function () {
                console.log(className);
                console.log('i am update()');
            }

        }
    },

    users: function () {
        var that = this;
        return {
            login: function (userData) {
                that.options.url = that.parseApi + '/login?username=' + userData.username + '&password=' + userData.password
                return request(that.options);
            },

            requestPasswordReset: function (email) {
                that.options.url = that.parseApi + '/return requestPasswordReset';
                that.options.method = 'POST';
                that.options.qs = {email: email};
                return request(that.options);
            },

            create: function (userData) {
                that.options.method = 'POST';
                that.options.url = that.parseApi + '/users';
                that.options.json = userData;
                return request(that.options);
            },

            get: function (objectId) {
                that.options.url = that.parseApi + '/users/' + objectId;
                return request(that.options);
            },

            getAll: function () {
                that.options.url = that.parseApi + '/users';
                return request(that.options);
            },

            verify: function (sessToken) {
                that.options.url = that.parseApi + '/users/me'
                that.options.headers['X-Parse-Session-Token'] = sessToken;
                return request(that.options);
            },

            update: function (userData) {
                that.options.method = 'PUT';
                that.options.url = that.parseApi + '/users/' + userData.objectId;
                that.options.qs = userData;
                that.options.headers['X-Parse-Session-Token'] = sessToken;
                return request(that.options);
            },

            del: function (userData) {
                that.options.method = 'DELETE';
                that.options.url = that.parseApi + '/users/' + objectId;
                that.options.headers['X-Parse-Session-Token'] = sessToken;
                return request(that.options);
            }
        }
    },

    stringifyParamValues: function (params) {
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

    _request: function (opts) {
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
