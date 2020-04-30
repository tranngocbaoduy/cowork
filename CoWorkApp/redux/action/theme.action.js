import { themeConstants } from '../constant/theme.constant'
import { store} from '../store'
export const themeActions = {
    changeMode,
};

function changeMode(mode) {  
    console.log("action",mode);
    return dispatch => { 
        dispatch(request());
        dispatch(success(mode));
    };  
    function request() { return { type: themeConstants.CHANGE_MODE } }
    function success(mode) { return { type: themeConstants.CHANGE_MODE_SUCCESS, mode} }
}
 