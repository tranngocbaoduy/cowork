import { accountConstants } from '../constant/account.constant'
import { accountService } from '../service/user.service'
import {alertActions} from '../action/alert.action'
 
import sendNotification from '../../helper/notification'
import * as NavigationService from '../service/navigator.service'

export const accountAction = {
    login,
    logout,
};

function login(info){  
    return dispatch => {  
        dispatch(request());  
        // handle call server 
        accountService.login(info)
        .then(
            data => {
                
                dispatch(success(data.token, data));
                NavigationService.navigate('App'); 
            },
            error => {  
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        ); 
    } 
    function request() { return { type: accountConstants.LOGIN_REQUEST} }
    function success(token, data) { return { type: accountConstants.LOGIN_SUCCESS, token, data} }
    function failure(error) { return { type: accountConstants.LOGIN_FAILURE, error} }
}
 
function logout(){  
    return dispatch => {  
        dispatch(request());
        // handle call server 
        accountService.logout()
        .then(
            data => {    
                dispatch(success())
                NavigationService.navigate('Auth');
            },
            error => { 
                NavigationService.navigate('Auth');
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        ); 
    } 
    function request() { return { type: accountConstants.LOGOUT_REQUEST} } 
    function success() { return { type: accountConstants.LOGOUT_SUCCESS} } 
    function failure() { return { type: accountConstants.LOGOUT_FAILURE} }
}
 