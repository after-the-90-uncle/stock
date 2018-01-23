export default {
	//判断是否是对象
	isObject:function(value){
		return Object.prototype.toString.call(value) == '[object Object]'
	},
	//是数组
	isArray:function (value){
		return Object.prototype.toString.call(value) == '[object Array]'
	},
	//是否是函数
	isFunction:function (value){
		return Object.prototype.toString.call(value) == '[object Function]'
	},
	isNull:function(value){
		return Object.prototype.toString.call(value) == '[object Null]'
	},
	isUndefined:function(value){
		return Object.prototype.toString.call(value) == '[object Undefined]'
	},
	//是否是空对象
	isEmpty:function (value){
		if(Array.isArray(value) && value.length ==0) return true;
		if(this.isObject(value) && Object.values(value).length == 0) return true;
		if(typeof value == 'string') {
			if(/(undefined|null)/g.test(value)) return true;
			if(value.replace(/\s/g , "") =="")  return true
		}

		if(this.isNull(value) || this.isUndefined(value)) return true;
		return false;
	},
	//深度拷贝
	clone:function (data){
		if(this.isObject(data) || this.isArray(data)){
			return JSON.parse(JSON.stringify(data))
		}
		return data;
	},
}