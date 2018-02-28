import md5 from 'md5';
import jwt from 'jsonwebtoken';
const key ='duhuijie';
const key2 = 'stock';
export default {
	md5:function(value){
		return md5(`${key}${value}${key2}`)
	},
	verifyMd5:function(val,md5Val){
		return this.md5(val) == md5Val;
	},
	jwt:function(value){
		return	jwt.sign(value, key);
	},
	verifyJwt:function(token){
		try{
			return jwt.verify(token,key);
		}catch(e){
			return null
		}
		
	}
}