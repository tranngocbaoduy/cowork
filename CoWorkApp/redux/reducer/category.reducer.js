


import { categoryConstants } from '../constant/category.constant'; 

let initalState = {};

export function categoryReducer(state = initalState, action) {   
    switch (action.type) {
        case categoryConstants.GET_CATEGORY_REQUEST: 
            return {  
                loading: true,
                loadedData: false,
            }  
        case categoryConstants.GET_CATEGORY_SUCCESS: 
            return {
                ...state,  
                category:action.data,
                loadedData: true,
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
                ...state,  
                ...state.category,
                category:state.category.push(action.data), 
                categoryCreated: action.data,
                loading: false
            }   
        case categoryConstants.CREATE_CATEGORY_FAILED: 
            return {
                error: action.error,
                failed: true,
            }        
        default:
            return state;
    }
}