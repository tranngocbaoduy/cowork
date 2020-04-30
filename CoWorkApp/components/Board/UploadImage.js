import * as React from 'react';
import { Button, Image, View, Text, StyleSheet,TouchableWithoutFeedback,TouchableHighlight } from 'react-native';

import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class UploadImage extends React.PureComponent {
    
    constructor(props) {
        super(props);
        this.state = { 
        };
    }

    render() { 
        const { title, image, pickImageFromLibrary, pickImageFromCamera  } = this.props;
        return (
        <View style={styles.container}>
            <Text style={styles.txt}>{title}</Text>
            <View style={styles.iconContainer}>
                <TouchableWithoutFeedback  onPress={()=> pickImageFromLibrary()}> 
                    <Image style={styles.image} source={require('../../assets/icons/photo.png')}/> 
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback  onPress={()=> pickImageFromCamera()}> 
                    <Image style={styles.image} source={require('../../assets/icons/camera.png')}/>
                </TouchableWithoutFeedback>
            </View>
          {/* <Button title="Pick an image from library" onPress={this._pickImage} />
            <Button title="Pick an image from camera" onPress={this._pickOpenCamera} /> */}
          
            
        </View>
        );
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) { 
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            await Permissions.getAsync(Permissions.CAMERA)
            console.log(status)
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }   
        }
    };
    
}


const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        
    },
    imageContainer: {
        flex:1,
        flexDirection: 'row',
    },
    iconContainer: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent:'flex-end',
        paddingHorizontal:8,
    },
    image: {
        width:30, 
        height:30, 
        marginLeft:10,
    },
    txt:{
        marginLeft:8,
        fontSize: 15,
        fontWeight: '500',
    }
});