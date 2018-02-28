var router = require('koa-router')();
import SQL from 'sql-template-strings';
import cities from '../constants/cities';
import utils from '../utils';


router.post('/login',async (ctx, next)=>{
	let {phone,password} = ctx.request.body;
	if(!phone||!password){
		ctx.body={success:false,error:{msg:'请填写手机号或密码'}}
		return
	}

	let pwdMd5 =utils.md5(password);
	
    let result = await ctx.mysqlQuery(
    	SQL`select * from auth where phone=${phone} and password=${pwdMd5}`
    );
    if(!result.success){
    	ctx.body = result;
    	return
    }
    if(result.data.length == 0){
    	ctx.body = {success:false,error:{msg:'手机号或密码错误'}}
    	return
    }
    if(result.data.length > 1){
    	ctx.body = {success:false,error:{msg:'您的账号存在异常，请联系管理员'}}
    	return
    }
    let user = {...result.data[0]};
    ctx.sess(utils.jwt(user));
    delete user.id;
    delete user.password;
    ctx.body ={success:true,data:user};
});

//初始化用户状态
router.post('/initLogin' , async (ctx,next) => {
	let user = utils.verifyJwt(ctx.token);
	if(!user){
		ctx.body ={success:false};
		return;
	}
	delete user.id;
    delete user.password;
	ctx.body ={success:true,data:user};
})

//退出
router.post('/logout',async (ctx,next) => {
    ctx.clearSess();
    ctx.body = {cd:0};
})





export default router;
