const koa    = require('koa'),
      logger = require('koa-logger'),
      route  = require('koa-route'),
      body   = require('koa-body'),
      Pug    = require('koa-pug');

const app = koa();
const pug = new Pug();

app.use(logger());
app.use(body());
pug.use(app);

let quotes = [
  { id: 1, quote: 'You can do anything, but not everything.', author: 'David Allen' },
  { id: 2, quote: 'Always forgive your enemies; nothing annoys them so much.', author: 'Oscar Wilde' },
  { id: 3, quote: 'Choose a job you love, and you will never have to work a day in your life.', author: 'Confucius' }
];

app.use(route.get('/', function *() {
  this.render('client', quotes);
}));

app.listen(3000, () => console.log('server listening on port 3000'));
