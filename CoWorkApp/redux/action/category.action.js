import { categoryConstants } from '../constant/category.constant'
import { categoryService } from '../service/category.service'
import { alertActions } from '../action/alert.action'
 
import sendNotification from '../../helper/notification'
import * as NavigationService from '../service/navigator.service'

export const categoryAction = {
    getByIds, 
    create,
    update,
    remove,
};

function getByIds(info){  
    return dispatch => {  
        dispatch(request());   
        categoryService.getByIds(info)
            .then(
                data => { 
                    dispatch(success(data?data.map( item =>  JSON.parse(item)):[])); 
            //         NavigationService.navigate('App'); 
                },
                error => {  
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            ); 
    } 
    function request() { return { type: categoryConstants.GET_CATEGORY_REQUEST} }
    function success(data) { return { type: categoryConstants.GET_CATEGORY_SUCCESS, data:data} }
    function failure(error) { return { type: categoryConstants.GET_CATEGORY_FAILED, error} }
}
 
function create(info){  
    return dispatch => {  
        dispatch(request());   
        categoryService.create(info)
        .then(
            data => {       
                let tokens = data[0];
                let category = JSON.parse(data[1]); 
                for (let token of tokens) {
                    sendNotification(token, category.name, category.name + " have just created, check now!!!");
                } 
                dispatch(success());
                NavigationService.navigate('CategoryScreen', {
                    navigationName: 'Category',   
                    refresh: true,
                });
            },
            error => {  
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        ); 
    } 
    function request() { return { type: categoryConstants.CREATE_CATEGORY_REQUEST} }
    function success() { return { type: categoryConstants.CREATE_CATEGORY_SUCCESS} }
    function failure(error) { return { type: categoryConstants.CREATE_CATEGORY_FAILED, error} }
}
 
function update(info){  
    return dispatch => {  
        dispatch(request());   
        categoryService.update(info)
        .then(
            data => {       
                let tokens = data[0];
                let category = JSON.parse(data[1]); 
                for (let token of tokens) {
                    sendNotification(token, category.name, category.name + " have just updated, check now !!!");
                } 
                dispatch(success());
                NavigationService.navigate('CategoryScreen', {
                    navigationName:'Category',   
                    refresh: true,
                });
            },
            error => {  
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        ); 
    } 
    function request() { return { type: categoryConstants.UPDATE_CATEGORY_REQUEST} }
    function success() { return { type: categoryConstants.UPDATE_CATEGORY_SUCCESS} }
    function failure(error) { return { type: categoryConstants.UPDATE_CATEGORY_FAILED, error} }
}
 
function remove(info) {  
    return dispatch => {  
        dispatch(request());    
        categoryService.remove(info)
        .then(
            data => {         
                let tokens = data[0];
                let category = JSON.parse(data[1]); 
                for (let token of tokens) {
                    sendNotification(token, category.name, category.name + " have just removed");
                } 
                dispatch(success());  
                NavigationService.navigate('CategoryScreen', {
                    navigationName: 'Category',   
                    refresh: true,
                });
            },
            error => {  
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        ); 
    } 
    function request() { return { type: categoryConstants.DELETE_CATEGORY_REQUEST} }
    function success() { return { type: categoryConstants.DELETE_CATEGORY_SUCCESS} }
    function failure(error) { return { type: categoryConstants.DELETE_CATEGORY_FAILED, error} }
}
 