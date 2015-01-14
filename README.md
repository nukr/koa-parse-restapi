koa-parse-restapi
=================

To install simply run:
```bash
npm install koa-parse-restapi
```

Require koa first and will only work on node v0.11.7 or newer.

You must run node with --harmony flag (--harmony-generators works as well)

```bash
node --harmony example.js
```

```js
var koa = require('koa');
var Parse = require('koa-parse-restapi');
var meepbee = new Parse('application_id', 'rest_api_key');

var app = koa();

app.use(function *() {

    var products = yield meepbee.classes('Products').getAll();
    console.log(JSON.parse(products.body));

    var users = yield meepbee.users().getAll();
    console.log(JSON.parse(users.body));

    var comments = yield meepbee.classes('Comments').getAll('?include=commenter');
    console.log(JSON.parse(comments.body));



    this.body = products;
});

app.listen(process.env.PORT || 8080);
```
