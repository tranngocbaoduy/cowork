import { boardConstants } from '../constant/board.constant'
import { boardService } from '../service/board.service'
import { alertActions } from '../action/alert.action'
 
import { isEmpty } from '../../helper/String'
import sendNotification from '../../helper/notification' 
import * as NavigationService from '../service/navigator.service'

export const boardAction = {
    getAll, 
    create,
    update,
    remove,
    searchAll,
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
                let tokens = data[0];
                for (let token of tokens) {
                    if (!isEmpty(token)) { 
                        let board = JSON.parse(data[1]); 
                        sendNotification(token, board.name, board.name + " have just created, go to check ... !!!");
                    } 
                }  
                dispatch(success());
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
    function success() { return { type: boardConstants.CREATE_BOARD_SUCCESS, } }
    function failure(error) { return { type: boardConstants.CREATE_BOARD_FAILED, error} }
}
  
function update(info) {  
    return dispatch => {  
        dispatch(request());    
        boardService.update(info)
        .then(
            data => {         
                let tokens = data[0];  
                for (let token of tokens) {
                    console.log(token);
                    if (!isEmpty(token)) { 
                        let board = JSON.parse(data[1]);
                        sendNotification(token, board.name, board.name + " have just updated, check now !!!");
                    }
                } 
                dispatch(success());  
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
    function request() { return { type: boardConstants.UPDATE_BOARD_REQUEST} }
    function success() { return { type: boardConstants.UPDATE_BOARD_SUCCESS} }
    function failure(error) { return { type: boardConstants.UPDATE_BOARD_FAILED, error} }
} 

function remove(info) {  
    return dispatch => {  
        dispatch(request());    
        boardService.remove(info)
        .then(
            data => {      
                let tokens = data[0];
                for (let token of tokens) {
                    console.log(token);
                    if (!isEmpty(token)) {
                        let board = JSON.parse(data[1]); 
                        sendNotification(token, board.name, board.name + " have just deleted by admin !!!");
                    }
                }  
                dispatch(success());  
                NavigationService.navigate('BoardScreen', {
                    navigationName: 'Board',  
                    refresh: true,  
                });
            },
            error => {  
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        ); 
    } 
    function request() { return { type: boardConstants.DELETE_BOARD_REQUEST} }
    function success() { return { type: boardConstants.DELETE_BOARD_SUCCESS} }
    function failure(error) { return { type: boardConstants.DELETE_BOARD_FAILED, error} }
}
 
function searchAll(info){  
    return dispatch => {  
        dispatch(request());   
        boardService.searchAll(info)
        .then(
            data => {      
                let board = data['boards'].map(item=>JSON.parse(item));;
                let category = data['cates'].map(item=>JSON.parse(item));
                let task = data['tasks'].map(item => JSON.parse(item));; 
                let result = {
                    board: board,
                    category: category,
                    task: task
                }
                dispatch(success(result)); 
            },
            error => {  
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        ); 
    } 
    function request() { return { type: boardConstants.SEARCH_REQUEST} }
    function success(data) { return { type: boardConstants.SEARCH_SUCCESS, data} }
    function failure(error) { return { type: boardConstants.SEARCH_FAILED, error} }
} 