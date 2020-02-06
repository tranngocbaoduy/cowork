import React from 'react';
import { StyleSheet, View , Text, InteractionManager} from 'react-native';
import Notification from '../components/Notification/Notification' 

import connect from 'react-redux'

class NotificationScreen extends React.Component{
 
    static navigationOptions = ({navigation}) => { 
        return {
            title: navigation.getParam('Title', 'Notification'), 
            headerStyle: {
                backgroundColor: navigation.getParam('BackgroundColor'), 
            },
            headerTintColor: navigation.getParam('HeaderTintColor'), 
        };
    };

    buildContent(){ 
        let _content = [];
        _content.push(<Notification key='1'></Notification>)
        return _content
    }

    render(){ 
        return (
            <View>
                {this.buildContent()} 
            </View> 
        );
    };
}  

export default (NotificationScreen);