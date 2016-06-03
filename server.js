const mongoose = require('mongoose'),
      koa      = require('koa'),
      logger   = require('koa-logger'),
      route    = require('koa-route'),
      body     = require('koa-body'),
      Pug      = require('koa-pug'),
      Quote    = require('./model.js');

const app = koa();
const pug = new Pug();

app.use(logger());
app.use(body());
pug.use(app);

app.use(function *(next) {
  if (this.request.body && this.request.body._method) {
    this.method = this.request.body._method;
  }
  yield next;
});

app.use(route.get('/', function *() {
  var quotes = yield Quote.find();
  this.render('client', quotes);
}));

app.use(route.post('/', function *() {
  console.log(this.request.body);
  var quote = new Quote(this.request.body);
  yield quote.save();
  this.redirect('/');
}));

app.use(route.delete('/', function *() {
  yield Quote.remove({ _id: this.request.body.id });
  this.redirect('/');
}));

mongoose
  .connect('mongodb://db/quotster')
  .then(() => console.log('database connection established'))
  .then(() => app.listen(3000, () => console.log('server listening on port 3000')));
