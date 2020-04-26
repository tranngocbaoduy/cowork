import { boardConstants } from '../constant/board.constant'
import { boardService } from '../service/board.service'
import { alertActions } from '../action/alert.action'
 
import * as NavigationService from '../service/navigator.service'

export const boardAction = {
    getAll, 
    create,
};

function getAll(info){  
    return dispatch => {  
        dispatch(request());   
        boardService.getAll(info)
        .then(
            data => {      
                dispatch(success(data.map( item =>  JSON.parse(item))));
        //         NavigationService.navigate('App'); 
            },
            error => {  
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        ); 
    } 
    function request() { return { type: boardConstants.GET_BOARD_REQUEST} }
    function success(data) { return { type: boardConstants.GET_BOARD_SUCCESS, data} }
    function failure(error) { return { type: boardConstants.GET_BOARD_FAILED, error} }
} 

function create(info){  
    return dispatch => {  
        dispatch(request());   
        boardService.create(info)
        .then(
            data => {       
                let dataParse = JSON.parse(data);
                dispatch(success(dataParse));  
                NavigationService.navigate('BoardScreen', {
                    navigationName:'Board', 
                    refresh: true,  
                });
            },
            error => {  
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        ); 
    } 
    function request() { return { type: boardConstants.CREATE_BOARD_REQUEST} }
    function success(data) { return { type: boardConstants.CREATE_BOARD_SUCCESS, data} }
    function failure(error) { return { type: boardConstants.CREATE_BOARD_FAILED, error} }
}
 