const koa = require('koa');
const app = koa();

app.use(function *() {
  this.body = 'Hello World';
});

app.listen(3000, () => console.log('server listening on port 3000'));
