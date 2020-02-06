import { themeConstants } from '../constant/theme.constant';

const initalState = { mode: themeConstants.LIGHT }

export function themeReducer(state = initalState, action) {  
    switch (action.type) {
        case themeConstants.CHANGE_MODE: 
            if (action.mode === themeConstants.DARK){
                return {
                    ...state,
                    mode: themeConstants.LIGHT
                } 
            }else{
                return {
                    ...state,
                    mode: themeConstants.DARK
                } 
            } 
        default:
            return state;
    }
}