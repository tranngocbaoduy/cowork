import { taskConstants } from '../constant/task.constant'
import { taskService } from '../service/task.service'
import { alertActions } from '../action/alert.action'
 
import * as NavigationService from '../service/navigator.service'

export const taskAction = {
    getByIds,
    create, 
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
                let dataParse = JSON.parse(data);
                dispatch(success(dataParse));
                NavigationService.navigate('TaskScreen', {
                    navigationName:'Task',   
                });
            },
            error => {  
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        ); 
    } 
    function request() { return { type: taskConstants.CREATE_TASK_REQUEST} }
    function success(data) { return { type: taskConstants.CREATE_TASK_SUCCESS, data} }
    function failure(error) { return { type: taskConstants.CREATE_TASK_FAILED, error} }
}