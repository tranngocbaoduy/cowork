import { accountConstants } from '../constant/account.constant';
import { AsyncStorage } from 'react-native';

let userToken = AsyncStorage.getItem('userToken');
const initalState = userToken ? { loggedIn: false, friend } : { loggedIn: true, userToken,friend:friend }

const friend = [
    {
        id:"01",
        name:'Alaska',
        email:'alaska@example.com'
    },
    {
        id:"02",
        name:'Hikari',
        email:'hikari@example.com'
    },
    {
        id:"03",
        name:'Valdimir',
        email:'vald@example.com'
    },
    {
        id:"04",
        name:'Axe',
        email:'axe@example.com'
    }

]

export function accountReducer(state = initalState, action) {  
    switch (action.type) {
        case accountConstants.LOGIN_REQUEST: 
            return {
                ...state,
                loading: true,
            }  
        case accountConstants.LOGIN_SUCCESS:
            return {
                ...state, 
                user: action.data,
                token: action.token, 
                loading: false
            }  
            
        case accountConstants.LOGIN_FAILURE: 
            return {
                error: action.error,
                failed: true,
            }   
        case accountConstants.LOGOUT_SUCCESS:
            return { 
                failed: false,
                token: "",
            }
        case accountConstants.LOGOUT_FAILURE: 
            return {
                error: action.error,
            }  
        default:
            return state;
    }
}