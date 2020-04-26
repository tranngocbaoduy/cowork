


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
                ...state,  
                ...state.task,
                task:state.task.push(action.data), 
                taskCreated: action.data,
                loading: false
            }   
        case taskConstants.CREATE_TASK_FAILED: 
            return {
                error: action.error,
                failed: true,
            }        
        default:
            return state;
    }
}