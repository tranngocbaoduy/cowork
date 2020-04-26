// import { authHeader } from '../_helpers';
import axios from 'axios'; 
import { DOMAIN } from './' 
import * as FileSystem from 'expo-file-system';
import convertFile from '../../helper/convertImage2Base64'
export const boardService = { 
    getAll,
    create,
    // errors, 
    // getPerPage,
    // getById, 
};
 


function errors(){
    return {
        message: 'Server isn\'t working, please try again after few minutes'
    }
}

async function getAll(info){   
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }; 
    return await axios.post(DOMAIN + 'board/get_all',JSON.stringify({info}), requestOptions)
            .then(handleResponse)
            .then(data => {  
                return data;
            });
} 

async function create(info){   
    let images = [];
    for (let uri of info.listImage){ 
        images.push(await convertFile(uri));
    }
    info['images'] = images; 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }; 
    return await axios.post(DOMAIN + 'board/create',JSON.stringify({info}), requestOptions)
            .then(handleResponse)
            .then(data => {  
                return data;
            });
} 

function handleResponse(response) {
    const data = response.data    
    if (!data.status) {  
        if (response.status === 401 || response.status === 500) { 
            errors(); 
        }   
        const error = (data && data.message) || response.statusText;  
        return Promise.reject(error);
    }     
    return data.payload; 
}