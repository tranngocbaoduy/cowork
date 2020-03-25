// import { authHeader } from '../_helpers';
import axios from 'axios'; 
import { DOMAIN } from './' 

export const accountService = {
    login, 
    logout,
    // getAll,
    // errors, 
    // getPerPage,
    // getById, 
};
 
function errors(){
    return {
        message: 'Server isn\'t working, please try again after few minutes'
    }
}

async function login(info){  
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }; 
    return await axios.post(DOMAIN + 'login',JSON.stringify({info}), requestOptions)
            .then(handleResponse)
            .then(data => {  
                return data;
            });
}

async function logout(){  
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }; 
    return await axios.post(DOMAIN + 'logout',{}, requestOptions)
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
    
    console.log(data)
    return data.payload; 
}