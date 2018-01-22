import * as constants from './types';


export const login = (data) => {
	return async (dispatch) => {
		// await dispatch({type: constants.USER_LOGGING_IN});
		// setTimeout(() => {
		//     dispatch({
		//       type: constants.USER_LOGGED_IN,
		//       payload: data
		//     })
		//   }, 2000)
		await dispatch({type: constants.USER_LOGGED_IN, payload: data})
	}
}

export function logout() {
  return {
    type: constants.USER_LOGGED_OUT
  }
}