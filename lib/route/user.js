var router = require('koa-router')();
import SQL from 'sql-template-strings';
import utils from '../utils';

import moment from 'moment'


router.post('/list',async (ctx, next)=>{
	let {page=1,size=10} = ctx.request.body;
    page = parseInt(page);
    size = Number(size);
    let result = await ctx.mysqlQuery(
        SQL`select * from user order by create_time desc limit ${size} offset ${page-1};`
    );
    let total = await ctx.mysqlQuery(
        SQL`select count(*) as total from user`
    );
    if(result.success && total.success){
        result.total = total.data[0].total;
    }
    // result.total = total;
    ctx.body = result;

});


router.post('/edit' , async (ctx,next) => {
    let {id,name,age,phone,amount,address,remark} = ctx.request.body;
    let time = moment().format('YYYY-MM-DD HH:mm:ss')
    let result  = null;
    if(id){
        result = await ctx.mysqlQuery(
            SQL`update user set name=${name},age=${age},phone=${phone},amount=${amount},address=${address}
                ,remark=${remark},update_time=${time} where id=${id}`
        );
    }else {
        result = await ctx.mysqlQuery(
            SQL`insert into user 
                (name,age,phone,amount,address,remark,create_time,update_time) 
                values(${name},${age},${phone},${amount},${address},${remark},${time},${time})`
        );
    }
    ctx.body = result;
})



export default router;
