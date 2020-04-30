import { notificationConstants } from '../constant/notification.constant'; 

let initalState = {};

export function notificationReducer(state = initalState, action) {  
    switch (action.type) {
        case notificationConstants.GET_NOTIFICATION_REQUEST: 
            return {  
                loading: true, 
            }  
        case notificationConstants.GET_NOTIFICATION_SUCCESS:  
            return {   
                notification: action.data,
                loading: false
            }   
        case notificationConstants.GET_NOTIFICATION_FAILED: 
            return {
                error: action.error,
                failed: true,
            }     
        default:
            return state;
    }
}