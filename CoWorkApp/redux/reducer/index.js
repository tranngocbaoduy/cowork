import { combineReducers } from 'redux'; 
import { themeReducer } from './theme.reducer';  
import { accountReducer } from './account.reducer';  
import { alertReducer } from './alert.reducer';  

const rootReducer = combineReducers({ 
    accountReducer,
    alertReducer,
    themeReducer,
});

export default rootReducer;