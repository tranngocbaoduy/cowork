import { taskConstants } from '../constant/task.constant'
import { taskService } from '../service/task.service'
import { alertActions } from '../action/alert.action'
import { isEmpty } from '../../helper/String'
import sendNotification from '../../helper/notification'
import * as NavigationService from '../service/navigator.service'

export const taskAction = {
    getByIds,
    create, 
    update,
    remove,
};

function getByIds(info){  
    return dispatch => {  
        dispatch(request());   
        taskService.getByIds(info)
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
    function request() { return { type: taskConstants.GET_TASK_REQUEST} }
    function success(data) { return { type: taskConstants.GET_TASK_SUCCESS, data:data} }
    function failure(error) { return { type: taskConstants.GET_TASK_FAILED, error} }
}
 
function create(info){  
    return dispatch => {  
        dispatch(request());   
        taskService.create(info)
        .then(
            data => {       
                console.log(data)
                let tokens = data[0];
                let task = JSON.parse(data[1]); 
                for (let token of tokens) {
                    if (!isEmpty(token)) {
                        sendNotification(token, task.name, task.name + " have just created, go to see @@ !!!");
                    } 
                } 
                
                dispatch(success());
                NavigationService.navigate('TaskScreen', {
                    navigationName: 'Task',  
                    refresh:true,
                });
            },
            error => {  
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        ); 
    } 
    function request() { return { type: taskConstants.CREATE_TASK_REQUEST} }
    function success() { return { type: taskConstants.CREATE_TASK_SUCCESS} }
    function failure(error) { return { type: taskConstants.CREATE_TASK_FAILED, error} }
}

function update(info){  
    return dispatch => {   
        dispatch(request());   
        taskService.update(info)
        .then(
            data => {  
                let tokens = data[0];
                let task = JSON.parse(data[1]);  
                for (let token of tokens) {
                    if (!isEmpty(token)) {
                        sendNotification(token, task.name, task.name + " have just updated, go to check");
                    }
                } 
                dispatch(success());
                NavigationService.navigate('TaskScreen', {
                    navigationName: 'Task',  
                    refresh:true,
                });
            },
            error => {  
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        ); 
    } 
    function request() { return { type: taskConstants.UPDATE_TASK_REQUEST} }
    function success() { return { type: taskConstants.UPDATE_TASK_SUCCESS} }
    function failure(error) { return { type: taskConstants.UPDATE_TASK_FAILED, error} }
}

function remove(info){  
    return dispatch => {  
        dispatch(request());   
        taskService.remove(info)
        .then(
            data => {      
                let tokens = data[0];
                let task = JSON.parse(data[1]); 
                for (let token of tokens) {
                    if (!isEmpty(token)) {
                        sendNotification(token, task.name, task.name + " have just removed");
                    }
                } 
                NavigationService.navigate('TaskScreen', {
                    navigationName: 'Task',  
                    refresh:true,
                });
            },
            error => {  
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        ); 
    } 
    function request() { return { type: taskConstants.DELETE_TASK_REQUEST} }
    function success(data) { return { type: taskConstants.DELETE_TASK_SUCCESS, data} }
    function failure(error) { return { type: taskConstants.DELETE_TASK_FAILED, error} }
}