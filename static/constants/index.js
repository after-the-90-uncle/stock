//成员类型
const ROLE_TYPE = {
	1:'管理员',
	2:'项目管理人员',
	3:'业务经理',
	4:'业务员',
	5:'客服'
}

//短信类型
const SMS_TYPE = {
	1:'系统公告',
	2:'用户公告',
	3:'客服反馈'
}

//投资状态/资金流水
const INVEST_STATUS = {
	'-1':'待支付',
	0:'已支付',
	1:'待还款',//还款中
	2:'已还款',
	3:'已退款'
}

//筹款状态
const RAISE_STATUS = {
	0:'新建',
	1:'待审核(审核中)',//审核中
	2:'未通过',
	3:'已通过(筹款中)',//筹款中
	4:'',
	5:'终止',
	6:'',
	7:'到期未筹满',
	8:'',
	9:'筹款完成(筹款发放中)',//筹款发放中
	10:'',
	11:'筹款已发放',
	13:'还款逾期',
	15:'已还款',
	16:'今日还款',
	17:"已还款未分账"
}


//账户变动类型
const ACCOUNT_CHANGE_TYPE = {
	0:"支付",
	1:"退款",
	2:"充值",
	3:"转账",
	4:"提现",
	5:"结算划款",
	6:"项目支持",
	7:"调账", 
	8:"项目还款", 
	9:"确认放款转账",
	10:"项目回款"
}

//还款状态
const REPAY_STATUS = {
	1:'未还款',
	2:'已还款',
	3:'已逾期'
}

//审批意见
const APPROVE_STATUS = {
	0:'驳回',
	1:'通过'
}

//banner位置
const BANNER_POSITION = {
	1:'首页Banner',
	2:'注册页面Banner',
	3:'登录页面Banner'
}

//问题归类
const ISSUE_TYPE = {
	0:'系统BUG',
	1:'易用性',
	2:'用户投诉',
	3:'用户安全',
	4:'用户项目',
	5:'其他'
}

//协议类型
const PROTOCOL_TYPE = {
	1:"投资协议",
	2:"发起协议",
	invest:1,
	sponsor:2
}

//渠道类型
const CHANNEL_TYPE = {
	1:"医生",
	2:"其他"
}

//提现状态
const WITHDRAW_TYPE = {
	0:'待审核',
	3:'提现成功'
}





//手机站域名
const MOBILE_DOMAIN = "http://m.yinuochoukuan.com";

export {
	ROLE_TYPE,
	SMS_TYPE,
	INVEST_STATUS,
	RAISE_STATUS,
	ACCOUNT_CHANGE_TYPE,
	REPAY_STATUS,
	APPROVE_STATUS,
	BANNER_POSITION,
	ISSUE_TYPE,
	PROTOCOL_TYPE,
	CHANNEL_TYPE,
	WITHDRAW_TYPE,
	MOBILE_DOMAIN
};