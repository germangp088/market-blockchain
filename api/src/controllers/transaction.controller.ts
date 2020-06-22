import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as HttpStatus from 'http-status-codes';
import userSchema from '../persistence/schemas/user'
import EtherAccesor from '../blockchain';
import articuleSchema from '../persistence/schemas/articule';

const routerOpts: Router.IRouterOptions = {
  prefix: '/transaction',
};

const router: Router = new Router(routerOpts);

router.post("/", async (ctx: Koa.Context, next) => {
  const userId: string = ctx.request.body.userId;
  const articuleId: string = ctx.request.body.articuleId;

  try {
    const user: any = await userSchema.findById(userId);
    const articule: any = await (await articuleSchema.findById(articuleId)).populated("users");

    console.log({articule});

    const fromWallet = new EtherAccesor(user.privateKey);
    const toWallet = new EtherAccesor(articule.user.privateKey);

    const from: string = await fromWallet.getAddress();
    const to: string = await toWallet.getAddress();

    await fromWallet.transaction(from, to, articule.price);
      
    await articuleSchema.findByIdAndDelete(articuleId);
  } catch (error) {
    console.error(error);
    ctx.throw(HttpStatus.BAD_GATEWAY);
  }

  await next();
});

export default router;