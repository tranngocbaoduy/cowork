
import * as FileSystem from 'expo-file-system';
export default convertFile = async (uri) => {  
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
    return base64;  
}
