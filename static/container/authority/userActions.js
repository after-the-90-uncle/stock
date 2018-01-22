import {USER_CHANGE} from 'selfRedux/actions/types';

function user_change(user){
	return async (dispatch) => {
		await dispatch({type:USER_CHANGE, user:{...user}});
	}
}

module.exports ={user_change}