import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as HttpStatus from 'http-status-codes';
import UserRequest from '../models/user';

const routerOpts: Router.IRouterOptions = {
  prefix: '/user',
};

const router: Router = new Router(routerOpts);

router.post("/", async (ctx: Koa.Context, next) => {
    const { name } = <UserRequest>ctx.request.body;
    ctx.body = { name };
    await next();
  });
  
  router.get("/", async (ctx: Koa.Context, next) => {
    ctx.body = { msg: "Hello world!" };
  
    await next();
});

export default router;