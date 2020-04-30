import axios from 'axios';

export default async function sendNotification(toPushToken, title, body) {
    const message = {
        to: toPushToken,
        sound: 'default',
        title: title,
        body: body,
        data: { data: 'goes here' },
        _displayInForeground: true,
    };   
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });  
}    
   