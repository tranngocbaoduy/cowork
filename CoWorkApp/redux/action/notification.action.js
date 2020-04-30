import { notificationConstants } from '../constant/notification.constant'
import { notificationService } from '../service/notification.service'
import { alertActions } from '../action/alert.action'
import { isEmpty } from '../../helper/String'
import sendNotification from '../../helper/notification'
import * as NavigationService from '../service/navigator.service'

export const notificationAction = {
    getById,
    check,
};

function getById(info){  
    return dispatch => {  
        dispatch(request()); 
        notificationService.getById(info)
            .then(
                data => {  
                    console.log(data)
                    dispatch(success(data.map( item =>  JSON.parse(item)))); 
            //         NavigationService.navigate('App'); 
                },
                error => {  
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            ); 
    } 
    function request() { return { type: notificationConstants.GET_NOTIFICATION_REQUEST} }
    function success(data) { return { type: notificationConstants.GET_NOTIFICATION_SUCCESS, data:data} }
    function failure(error) { return { type: notificationConstants.GET_NOTIFICATION_FAILED, error} }
}
 
function check(info){  
    return dispatch => {  
        dispatch(request()); 
        notificationService.check(info)
            .then(
                data => {   
                    dispatch(success(data.map( item =>  JSON.parse(item)))); 
            //         NavigationService.navigate('App'); 
                },
                error => {  
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            ); 
    } 
    function request() { return { type: notificationConstants.GET_NOTIFICATION_REQUEST} }
    function success(data) { return { type: notificationConstants.GET_NOTIFICATION_SUCCESS, data:data} }
    function failure(error) { return { type: notificationConstants.GET_NOTIFICATION_FAILED, error} }
}