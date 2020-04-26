import { themeConstants } from '../constant/theme.constant';

const initalState = { mode: themeConstants.LIGHT, backgroundColor:"#FFAA53", headerTintColor:"#fff",loading: false }

export function themeReducer(state = initalState, action) {   
    switch (action.type) {
        case themeConstants.CHANGE_MODE: 
            return {
                loading: true,
            }
        case themeConstants.CHANGE_MODE_SUCCESS:  
            if (action.mode === themeConstants.ORANGE){
                return { 
                    ...state,
                    loading: false,
                    backgroundColor:"#FFAA53", 
                    headerTintColor:"#fff" 
                } 
            } else if (action.mode === themeConstants.LIGHT){
                return { 
                    ...state,
                    loading: false,
                    backgroundColor:"#fff", 
                    headerTintColor:"#000" 
                } 
            } else  if (action.mode === themeConstants.DARK){
                return {
                    ...state,
                    loading: false,
                    backgroundColor:"#000", 
                    headerTintColor:"#fff" 
                } 
            } else {
                return { 
                    loading: false,
                    backgroundColor:"#FFAA53", 
                    headerTintColor:"#fff" 
                } 
            } 
        default:
            return state;
    }
}