import { accountConstants } from '../constant/account.constant';
import { AsyncStorage } from 'react-native';

let userToken = AsyncStorage.getItem('userToken');
const initalState = userToken ? { loggedIn: false } : { loggedIn: true, userToken }

export function accountReducer(state = initalState, action) {  
    switch (action.type) {
        case accountConstants.LOGIN_REQUEST: 
            return {
                ...state,
                loading: true
            }  
        case accountConstants.LOGIN_SUCCESS:
            return {
                ...state, 
                token: action.token, 
                loading: false
            }  
            
        case accountConstants.LOGIN_FAILURE: 
            return {
                error: action.error,
            }   
        case accountConstants.LOGOUT_SUCCESS:
            return { }
        case accountConstants.LOGOUT_FAILURE: 
            return {
                error: action.error,
            }  
        default:
            return state;
    }
}