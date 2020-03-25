import React from 'react';
import { StyleSheet, View} from 'react-native';
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
        return (  
            <View style={styles.container}>
                {this.buildContent()} 
            </View>  
        );
    };
}  
const styles = {
    container:{
        flex:1,
    }
}
 