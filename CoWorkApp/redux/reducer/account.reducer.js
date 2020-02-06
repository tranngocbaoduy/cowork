import { accountConstants } from '../constant/account.constant';
import { AsyncStorage } from 'react-native';

let user = AsyncStorage.getItem('user');
console.log(user)
const initalState = user ? { loggedIn: false } : { loggedIn: true, user }

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
        default:
            return state;
    }
}