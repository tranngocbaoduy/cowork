// import { authHeader } from '../_helpers';
import axios from 'axios'; 
import { DOMAIN } from './' 

export const taskService = { 
    getByIds,
    create,
    update,
    remove,
    // errors, 
    // getPerPage,
    // getById, 
};
 
function errors(){
    return {
        message: 'Server isn\'t working, please try again after few minutes'
    }
}

async function getByIds(info){   
    console.log(info,"info");
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }; 
    return await axios.post(DOMAIN + 'task/get_by_ids',JSON.stringify({info}), requestOptions)
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
    return await axios.post(DOMAIN + 'task/create',JSON.stringify({info}), requestOptions)
            .then(handleResponse)
            .then(data => {  
                return data;
            });
} 


async function update(info){   
    let images = [];
    for (let uri of info.listImage){ 
        images.push(await convertFile(uri));
    } 
    info['images'] = images; 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }; 
    return await axios.post(DOMAIN + 'task/update',JSON.stringify({info}), requestOptions)
            .then(handleResponse)
            .then(data => {  
                return data;
            });
} 


async function remove(info){   
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }; 
    return await axios.post(DOMAIN + 'task/remove',JSON.stringify({info}), requestOptions)
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