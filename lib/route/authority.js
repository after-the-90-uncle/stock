var router = require('koa-router')();
import SQL from 'sql-template-strings';
import cities from '../constants/cities';


router.post('/login',async (ctx, next)=>{
    // let a = await ctx.mysqlQuery(SQL`select a from admin where id=1`);
    // console.log(a, "====a");
    ctx.body = {}

});

//退出
router.post('/logout',async (ctx,next) => {
    ctx.clearSess();
    ctx.body = {cd:0};
})





export default router;
