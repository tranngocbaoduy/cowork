


import { taskConstants } from '../constant/task.constant'; 

let initalState = {};

export function taskReducer(state = initalState, action) {  
    switch (action.type) {
        case taskConstants.GET_TASK_REQUEST: 
            return {  
                loading: true,
            }  
        case taskConstants.GET_TASK_SUCCESS: 
            return {
                ...state,  
                task:action.data,
                loading: false
            }   
        case taskConstants.GET_TASK_FAILED: 
            return {
                error: action.error,
                failed: true,
            }    
        
        
        case taskConstants.CREATE_TASK_REQUEST: 
            return {  
                ...state,
                loading: true,
            }  
        case taskConstants.CREATE_TASK_SUCCESS: 
            return {  
                loading: false
            }    
        case taskConstants.CREATE_TASK_FAILED: 
            return {
                error: action.error,
                failed: true,
            }    
        
        case taskConstants.UPDATE_TASK_REQUEST: 
            return {  
                ...state,
                loading: true,
            }  
        case taskConstants.UPDATE_TASK_SUCCESS: 
            return {  
                loading: false
            }   
        case taskConstants.UPDATE_TASK_FAILED: 
            return {
                error: action.error,
                failed: true,
            }   
        
        case taskConstants.DELETE_TASK_REQUEST: 
            return {   
                loading: true,
            }  
        case taskConstants.DELETE_TASK_SUCCESS: 
            return {  
                task: null,
                loading: false
            }   
        case taskConstants.DELETE_TASK_FAILED: 
            return {
                error: action.error,
                failed: true,
            }       
        default:
            return state;
    }
}