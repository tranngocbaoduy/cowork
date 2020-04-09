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
        return (
            <Account key='1'></Account>
        );
    }

    render(){ 
        return (
            <View>
                {this.buildContent()} 
            </View> 
        );
    };
}  
 