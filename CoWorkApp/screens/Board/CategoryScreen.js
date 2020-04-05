import React from 'react';
import { StyleSheet, View , Text, InteractionManager} from 'react-native';
import Board from '../../components/Board/Board'

import connect from 'react-redux'

class CategoryScreen extends React.PureComponent{
 
    static navigationOptions = ({navigation}) => { 
        return {
            title: navigation.getParam('Title', 'Category'), 
            headerStyle: {
                backgroundColor: navigation.getParam('BackgroundColor'), 
            },
            headerTintColor: navigation.getParam('HeaderTintColor'), 
        };
    };

    buildContent(){ 
        let _content = [];
        _content.push(<Text key='1'>this is category</Text>);
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

export default (CategoryScreen);