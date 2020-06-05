import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as HttpStatus from 'http-status-codes';
import UserRequest from '../models/user';
import userSchema from '../persistence/schemas/user'

const routerOpts: Router.IRouterOptions = {
  prefix: '/user',
};

const router: Router = new Router(routerOpts);

router.post("/", async (ctx: Koa.Context, next) => {
    const userRequest: UserRequest = <UserRequest>ctx.request.body;
    let user: any;
    try {
      user = await userSchema.create(userRequest)
    } catch (error) {
			console.error(error)
      ctx.throw(HttpStatus.BAD_GATEWAY);
    }
    ctx.body = { user };
    await next();
  });
  
  router.get("/", async (ctx: Koa.Context, next) => {
    ctx.body = { msg: "Hello world!" };
  
    await next();
});

export default router;