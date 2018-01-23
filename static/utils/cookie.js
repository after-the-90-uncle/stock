
function cookie (str){
	if(Array.isArray(str)){
		return
	}
	if(/[=;]/g.test(str) || isObject(str)){
		setCookie(str);
		return
	}
	if(typeof str != 'string') return getCookie();
	return getCookie(str);

}

function getCookie(name){
	let coo = document.cookie;
	if(!coo) return '';
	let cok = cookieStrCovertObject(coo);
	return name?cok[name]:cok;
}

function setCookie(str){
	let cok = getCookie();
	if(isObject(str)){
		str = {...cok , ...str};
	}else{
		str = cookieStrCovertObject(str);
		str = {...cok , ...str}
	}
	str = ObjectCovertArray(str).join(';');
	document.cookie =str;
}

function cookieStrCovertObject(str){
	if(typeof str != 'string') return {};
	let obj = {};
	try{
		str.split(';').forEach((item,index) => {
			let it = item.split('=')
			obj[it[0].trim()] = it[1];
		})
	}catch(e){
		obj = {};
		console.error(e)
	}
	
	return obj;
}

function ObjectCovertArray(obj){
	if(!isObject(obj)) return [];
	let coo = [];
	Object.keys(obj).forEach((key , index) => {
		coo.push(`${key}=${covertStr(obj[key])}`)
	});
	return coo;
}

function covertStr(str){
	if(typeof str == 'string'){
		return str
	}
	try{
		return JSON.stringify(str);
	}catch(e){
		console.error(e);
	}
	return '';
}

function isObject(obj){
	return Object.prototype.toString.call(obj) == '[object Object]';
}



export default cookie;