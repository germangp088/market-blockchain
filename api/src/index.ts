  
import * as Koa from "koa";
import * as Router from "koa-router";
import * as logger from "koa-logger";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser";
import * as config from 'config';
import connect from './persistence'

const app = new Koa();
const router = new Router();

interface HelloRequest {
  name: string;
}

// Hello world
router.post("/", async (ctx, next) => {
  const { name } = <HelloRequest>ctx.request.body;
  ctx.body = { name };
  await next();
});

router.get("/", async (ctx, next) => {
  ctx.body = { msg: "Hello world!" };

  await next();
});

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(router.routes()).use(router.allowedMethods());

const port: string | number = process.env.PORT || config.get('port');
app.listen(port, async () => {
  await connect();
  console.log("Koa started");
});