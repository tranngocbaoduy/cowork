import React from 'react';
import { StyleSheet, View} from 'react-native';
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

export default (SignUpScreen);