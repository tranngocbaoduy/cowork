import React from 'react';
import { StyleSheet,ImageBackground, View, Image} from 'react-native';
import Login from '../../components/Authentication/Login' 
 
import { connect,Provider } from 'react-redux'

export default class LoginScreen extends React.Component{
 
    static navigationOptions = ({navigation}) => { 
        return {
            title: navigation.getParam('Title', 'Login'), 
            headerStyle: {
                backgroundColor: navigation.getParam('BackgroundColor'), 
            },
            headerTintColor: navigation.getParam('HeaderTintColor'), 
            headerShown: false,
        };
    }; 

    buildContent(){ 
        let _content = [];
        const { navigation } = this.props;
        _content.push(<Login key='1' navigation={navigation}></Login>)
        return _content
    }

    render(){ 
        let image = require('../../assets/bg.jpeg')
        return (  
            <View style={styles.container}>
                <ImageBackground source={image} style={styles.image} imageStyle={{opacity: 0.5}}> 
                    {this.buildContent()}  
                </ImageBackground>
            </View>  
        );
    };
}  
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    image:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center", 
        backgroundColor:'rgba(255,0,0,0)',
    }, 
})
 