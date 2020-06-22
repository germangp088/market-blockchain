import * as Koa from "koa";
import * as logger from "koa-logger";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser";
import config from './config';
import connect from './persistence';
import userController from './controllers/user.controller';
import articuleController from './controllers/articule.controller';
import transactionController from './controllers/transaction.controller';

const app = new Koa();

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(transactionController.routes()).use(transactionController.allowedMethods());
app.use(articuleController.routes()).use(articuleController.allowedMethods());
app.use(userController.routes()).use(userController.allowedMethods());

app.listen(config.port, async () => {
  await connect();
  console.log("Server started");
});