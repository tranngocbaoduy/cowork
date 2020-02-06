import { accountConstants } from '../constant/account.constant'

export const accountAction = {
    login,
};
 
function login(user, password){
    return dispatch => { 
        dispatch(request());  
        // handle call server
        loginService.login(user, password)
        .then(
            data => {   
                AsyncStorage.setItem('loggedIn',true);
                AsyncStorage.setItem('user',data.user);
                dispatch(success(data.token)); 
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        ); 
    } 
    function request() { return { type: accountConstants.LOGIN_REQUEST} }
    function success(token) { return { type: accountConstants.LOGIN_SUCCESS, token} }
    function failure(error) { return { type: accountConstants.LOGIN_FAILURE, error} }
}
 