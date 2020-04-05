import React from 'react';
import { StyleSheet, View , Text, InteractionManager} from 'react-native';
import Search from '../../components/Search/Search' 
import TextSearch from '../../components/Search/TextSearch'

import connect from 'react-redux'

class SearchScreen extends React.Component{
 
    static navigationOptions = ({navigation}) => { 
        return {
            title: navigation.getParam('Title', 'Search'), 
            headerStyle: {
                backgroundColor: navigation.getParam('BackgroundColor'), 
            },
            headerTintColor: navigation.getParam('HeaderTintColor'), 
        };
    };

    buildContent(){ 
        let _content = [];
        _content.push(<Search key='1'></Search>)
        _content.push(<TextSearch key='2' text='what is it?' ti="abc"></TextSearch>)
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
  
export default (SearchScreen);