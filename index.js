var keyMirror = require('keymirror');
var request = require('koa-request');

var classes = keyMirror({
    "Chats": null,
    "Comments": null,
    "Follows": null,
    "Likes": null,
    "Messages": null,
    "Orders": null,
    "Products": null
});

var buildinService = keyMirror({
    "users": null,
    "roles": null,
    "files": null,
    "events": null,
    "push": null,
    "installations": null,
    "functions": null,
    "jobs": null
});

/**
 * constructor
 *
 */
function Parse(appId, restApiKey) {
    this.parseApi = 'https://api.parse.com/1';
    this.appId = appId;
    this.restApiKey = restApiKey;
    this.options = {
        headers: {
            'X-Parse-Application-Id': this.appId,
            'X-Parse-REST-API-Key': this.restApiKey,
            'Content-Type:': 'application/json'
        }
    };
};

Parse.prototype.classes = function (className) {
    if (classes[className] === undefined) {
        return new Error('className dose not exist');
    }

    var that = this;

    return {
        get: function (objectId, qs) {
            qs = qs || '';
            that.options.url = that.parseApi + '/classes/' + className + '/' + objectId + qs;
            return request(that.options)
        },

        getAll: function (qs) {
            qs = qs || '';
            that.options.url = that.parseApi + '/classes/' + className + qs;
            return request(that.options)
        },

        create: function () {
            console.log(className);
            console.log('i am create()');
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
};

Parse.prototype.users = function () {
    var that = this
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
            that.options.qs = userData;
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
}

module.exports = Parse;
