import authority from './authority/router';
import Home from './Home/router';
import user from './user/router';

function getRouter(arry){
	let routers =[]
	arry.forEach((item)=>{
		routers = routers.concat(item);
	});
	return routers;
}
export default getRouter([authority,Home,user]);