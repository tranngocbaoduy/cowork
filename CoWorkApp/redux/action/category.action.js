import { categoryConstants } from '../constant/category.constant'
import { categoryService } from '../service/category.service'
import { alertActions } from '../action/alert.action'
 
import * as NavigationService from '../service/navigator.service'

export const categoryAction = {
    getByIds, 
    create,
};

function getByIds(info){  
    return dispatch => {  
        dispatch(request());   
        categoryService.getByIds(info)
            .then(
                data => {
                    dispatch(success(data.map( item =>  JSON.parse(item)))); 
            //         NavigationService.navigate('App'); 
                },
                error => {  
            //         dispatch(failure(error.toString()));
            //         dispatch(alertActions.error(error.toString()));
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
                let dataParse = JSON.parse(data);
                dispatch(success(dataParse));
                NavigationService.navigate('CategoryScreen', {
                    navigationName:'Category',   
                });
            },
            error => {  
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        ); 
    } 
    function request() { return { type: categoryConstants.CREATE_CATEGORY_REQUEST} }
    function success(data) { return { type: categoryConstants.CREATE_CATEGORY_SUCCESS, data} }
    function failure(error) { return { type: categoryConstants.CREATE_CATEGORY_FAILED, error} }
}
 