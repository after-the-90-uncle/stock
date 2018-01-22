var router = require('koa-router')();

import cities from '../constants/cities';


router.post('/login',async (ctx, next)=>{
    var {name,passwd,code} = ctx.request.body;
    var result = await ctx.post('/admin/login',{phone:name,password:passwd,code});
    ctx.sess(result.data);
    ctx.body = result;
});


router.post('/send-code',async (ctx, next)=>{
    var {name} = ctx.request.body;
    var result = await ctx.post('/admin/sendCode',{phone:name})
    if(process.env.NODE_ENV=="dev"&&result.cd==0){
        result.code = result.msg.replace(/[^\d]/g,"");
    }
    ctx.body = result;
});


/** 员工管理 start **/

//员工列表
router.post('/staff/list',async (ctx,next) => {
    let {name='',department='',phone='',page=1,size=10} = ctx.request.body;
    //查询总条数
    let count = await ctx.post('/admin/countEmployee',{name,department,phone});
    let result = await ctx.post('/admin/listEmployee',{name,department,phone,page,size});
    if(result.cd==0&&count.cd==0){
        result.total = count.data
    }
    ctx.body = result;
});

//删除
router.post('/staff/delete',async (ctx,next) => {
    let {id} = ctx.request.body;
    ctx.body = await ctx.post('/admin/deleteEmployee',{id});
});

//get
router.post('/staff/get',async (ctx,next) => {
    let {id} = ctx.request.body;
    var staffResult = {}
    if(id){
        staffResult = await ctx.post('/admin/findEmployeeById',{id});
    }

    var dutyResult = await ctx.post('/admin/listDuty'),
        departmentResult = await ctx.post('/admin/listDepartment'),
        areaResult = await ctx.post('/admin/listArea'),
        managerResult = await ctx.post('/admin/listManager');
    ctx.body = {
        staffResult,
        dutyResult,
        departmentResult,
        areaResult,
        managerResult
    }
});

//添加职务
router.post('/save/duty',async (ctx,next) => {
    let {name} = ctx.request.body;
    let addResult = await ctx.post('/admin/insertDuty',{name});
    let result = await ctx.post('/admin/listDuty');
    ctx.body = {result:result,addResult:addResult}
});

//添加部门
router.post('/save/department',async (ctx,next) => {
    let {name} = ctx.request.body;
    let addResult = await ctx.post('/admin/insertDepartment',{name});
    let result = await ctx.post('/admin/listDepartment');
    ctx.body = {result:result,addResult:addResult}
});
//部门列表
router.post('/department/list',async (ctx,next) => {
    ctx.body = await ctx.post('/admin/listDepartment');
});

//添加区域
router.post('/save/area',async (ctx,next) => {
    let {name} = ctx.request.body;
    let addResult = await ctx.post('/admin/insertArea',{name});
    let result = await ctx.post('/admin/listArea');
    ctx.body = {result:result,addResult:addResult}
});

//保存
router.post('/staff/save',async (ctx,next) => {
    let params = ctx.request.body;
    let result = null;
    if(params.id){
        result = await ctx.post('/admin/updateEmployee',{...params});
    }else{
        result = await ctx.post('/admin/createEmployee',{...params});
    }
    ctx.body = result
});

//重置密码
router.post('/staff/resetpwd', async (ctx,next) => {
    let {id,password} = ctx.request.body;
    ctx.body = await ctx.post('/admin/resetPassword',{id})
})

//修改员工状态
router.post('/staff/status', async (ctx,next) => {
    let {id,isActive=0} = ctx.request.body;
    isActive = (isActive == 'true'?1:0);
    ctx.body = await ctx.post('/admin/updateEmployeeStatus',{id,isActive})
})

/** 员工管理 end **/



//检查是否登录
router.post('/check/login',async (ctx,next) => {
    
    ctx.body = await ctx.sess();
})

//修改密码
router.post('/changepwd' , async (ctx,next) => {
    let {newPwd,newPwd2} = ctx.request.body;
    let result = await ctx.sess();
    if(!result.userPassport){
        ctx.body = result;
        return
    }
    if(result.userPassport&&result.userPassport.userId){
        ctx.body = await ctx.post('/admin/changePassword',{id:result.userPassport.userId,newPwd});
    }else{
        ctx.body = {cd:1,msg:'修改失败'}
    }
    
})

//退出
router.post('/logout',async (ctx,next) => {
    ctx.clearSess();
    ctx.body = {cd:0};
})





export default router;
