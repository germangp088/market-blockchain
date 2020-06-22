import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as HttpStatus from 'http-status-codes';
import ArticuleRequest from '../models/articule';
import userSchema from '../persistence/schemas/user';
import articuleSchema from '../persistence/schemas/articule';

const routerOpts: Router.IRouterOptions = {
  prefix: '/articule',
};

const router: Router = new Router(routerOpts);

router.post("/", async (ctx: Koa.Context, next) => {
    const articuleRequest: ArticuleRequest = <ArticuleRequest>ctx.request.body;
    const userId: number = ctx.request.body.userId;
    let articule: any;

    try {
        let user: any = await userSchema.findById(userId);
        articule = await articuleSchema.create(articuleRequest);
        user.articules.push(articule);
        await userSchema.findByIdAndUpdate(userId, user);
    } catch (error) {
        console.error(error);
        ctx.throw(HttpStatus.BAD_GATEWAY);
    }

    ctx.body = articule._id;
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