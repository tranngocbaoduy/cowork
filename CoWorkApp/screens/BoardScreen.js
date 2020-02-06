import React from 'react';
import { StyleSheet, View , Text, InteractionManager} from 'react-native';
import Board from '../components/Board/Board'

import connect from 'react-redux'

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