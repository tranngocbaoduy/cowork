import React from 'react';
import { StyleSheet,ImageBackground, View} from 'react-native';
import SignUp from '../../components/Authentication/SignUp' 

import connect from 'react-redux'

class SignUpScreen extends React.Component{
 
    static navigationOptions = ({navigation}) => { 
        return {
            title: navigation.getParam('Title', 'Sign Up'), 
            headerStyle: {
                backgroundColor: navigation.getParam('BackgroundColor'), 
            },
            headerTintColor: navigation.getParam('HeaderTintColor'), 

        };
    }; 

    buildContent(){ 
        let _content = [];
        const { navigation } = this.props;
        _content.push(<SignUp key='1' navigation={navigation}></SignUp>)
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
    },image:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center", 
        backgroundColor:'rgba(255,0,0,0)',
    }
})

export default (SignUpScreen);