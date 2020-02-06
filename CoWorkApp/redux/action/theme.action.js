import { themeConstants } from '../constant/theme.constant'

export const themeActions = {
    changeMode,
};

function changeMode(mode){
    return dispatch => { 
        dispatch(request(mode)); 
    } 
    function request(mode) { return { type: themeConstants.CHANGE_MODE, mode } }
}
 