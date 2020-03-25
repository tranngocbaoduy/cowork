import { themeConstants } from '../constant/theme.constant'
import { store} from '../store'
export const themeActions = {
    changeMode,
};

function changeMode(mode) {  
    return dispatch => { 
        dispatch(request(mode))
    
    }; 
    // } 
    function request(mode) { return { type: themeConstants.CHANGE_MODE, mode } }
}
 