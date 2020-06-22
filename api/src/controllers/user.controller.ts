import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as HttpStatus from 'http-status-codes';
import UserRequest from '../models/user';
import userSchema from '../persistence/schemas/user'
import EtherAccesor from '../blockchain';

const routerOpts: Router.IRouterOptions = {
  prefix: '/user',
};

const router: Router = new Router(routerOpts);

  router.post("/", async (ctx: Koa.Context, next) => {
    const userRequest: UserRequest = <UserRequest>ctx.request.body;
    const etherAccesor = new EtherAccesor();
    let user: any;

    try {
      const wallet = await etherAccesor.newWallet();
      userRequest.privateKey = wallet.privateKey;
      user = await userSchema.create(userRequest);
    } catch (error) {
      console.error(error);
      ctx.throw(HttpStatus.BAD_GATEWAY);
    }

    ctx.body = user._id;
    await next();
  });

  router.post("/fund", async (ctx: Koa.Context, next) => {
    const userId: string = ctx.request.body.userId;
    let user: any;
    try {
      user = await userSchema.findById(userId);
      console.log({user})
      const etherAccesor = new EtherAccesor(user.privateKey);
      await etherAccesor.fund();
    } catch (error) {
      console.error(error);
      ctx.throw(HttpStatus.BAD_GATEWAY);
    }

    ctx.body = user._id;
    await next();
  });

  router.get("/:id", async (ctx: Koa.Context, next) => {
    let user: any;
    
    try {
      user = await userSchema.findById(ctx.params.id);
    } catch (error) {
      console.error(error);
      ctx.throw(HttpStatus.BAD_GATEWAY);
    }

    if(!user){
      ctx.throw(HttpStatus.NOT_FOUND);
    }

    ctx.body = user;
    await next();
  });

export default router;