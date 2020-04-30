import { combineReducers } from 'redux'; 
import { themeReducer } from './theme.reducer';  
import { accountReducer } from './account.reducer';  
import { alertReducer } from './alert.reducer';  
import { boardReducer } from './board.reducer';
import { taskReducer } from './task.reducer';
import { categoryReducer } from './category.reducer';
import { notificationReducer } from './notification.reducer';
const rootReducer = combineReducers({ 
    accountReducer,
    alertReducer,
    themeReducer,
    boardReducer,
    categoryReducer,
    taskReducer,
    notificationReducer,
});

export default rootReducer;