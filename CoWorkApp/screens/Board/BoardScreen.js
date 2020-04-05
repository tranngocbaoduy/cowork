import React from 'react';
import { StyleSheet, View , Button, InteractionManager} from 'react-native';
import Board from '../../components/Board/Board'

import connect from 'react-redux'

import * as NavigationService from '../../redux/service/navigator.service'


class BoardScreen extends React.Component{
 
    static navigationOptions = ({navigation}) => { 
        return {
            title: navigation.getParam('Title', 'Board'), 
            headerStyle: {
                backgroundColor: navigation.getParam('BackgroundColor'), 
            },
            headerTintColor: navigation.getParam('HeaderTintColor'), 
        };
    };

    buildContent(){ 
        let _content = [];
        _content.push(<Board key='1'></Board>);
        _content.push(<Board key='2'></Board>);
        _content.push(<Button key='3' title='abc'
            onPress={()=>{
                NavigationService.navigate('CategoryScreen')
            }}

        ></Button>);
        return _content;
    }

    render(){
        const { mode } = this.props;
        return (
            <View>
                {this.buildContent()} 
            </View> 
        );
    };
}  

export default (BoardScreen);