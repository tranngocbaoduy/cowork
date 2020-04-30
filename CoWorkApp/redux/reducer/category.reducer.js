import { categoryConstants } from '../constant/category.constant'; 

let initalState = {};

export function categoryReducer(state = initalState, action) {   
    switch (action.type) {
        case categoryConstants.GET_CATEGORY_REQUEST: 
            return {  
                loading: true, 
            }  
        case categoryConstants.GET_CATEGORY_SUCCESS:  
            return {   
                category:action.data, 
                loading: false
            }   
        case categoryConstants.GET_CATEGORY_FAILED: 
            return {
                error: action.error,
                failed: true,
            }    
        case categoryConstants.CREATE_CATEGORY_REQUEST: 
            return {  
                ...state,
                loading: true,
            }  
        case categoryConstants.CREATE_CATEGORY_SUCCESS: 
            return { 
                loading: false
            }   
        case categoryConstants.CREATE_CATEGORY_FAILED: 
            return {
                error: action.error,
                failed: true,
            }        
        case categoryConstants.UPDATE_CATEGORY_REQUEST: 
            return {   
                loading: true,
            }  
        case categoryConstants.UPDATE_CATEGORY_SUCCESS: 
            return {  
                loading: false
            }   
        case categoryConstants.UPDATE_CATEGORY_FAILED: 
            return {
                error: action.error,
                failed: true,
            }        
        case categoryConstants.DELETE_CATEGORY_REQUEST: 
            return {   
                loading: true,
            }  
        case categoryConstants.DELETE_CATEGORY_SUCCESS: 
            return {  
                loading: false
            }   
        case categoryConstants.DELETE_CATEGORY_FAILED: 
            return {
                error: action.error,
                failed: true,
            }        
            
        default:
            return state;
    }
}