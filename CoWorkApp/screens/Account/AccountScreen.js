import React from 'react';
import { StyleSheet, View , Text, InteractionManager} from 'react-native';
import Account from '../../components/Account/Account'

import {connect} from 'react-redux'

export default class AccountScreen extends React.Component{
 
    static navigationOptions = ({navigation}) => { 
        return {
            title: navigation.getParam('Title', 'Account'), 
            headerStyle: {
                backgroundColor: navigation.getParam('BackgroundColor'), 
            },
            headerTintColor: navigation.getParam('HeaderTintColor'), 
        };
    };

    buildContent(){ 
        let _content = [];
        _content.push(<Account key='1'></Account>)
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
 