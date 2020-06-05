import * as Koa from "koa";
import * as logger from "koa-logger";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser";
import config from './config';
import connect from './persistence'
import userController from './controllers/user.controller'

const app = new Koa();

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(userController.routes()).use(userController.allowedMethods());

app.listen(config.port, async () => {
  await connect();
  console.log("Server started");
});