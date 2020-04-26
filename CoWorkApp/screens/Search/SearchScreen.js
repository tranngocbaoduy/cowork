import React from 'react';
import { StyleSheet, View , SafeAreaView, ScrollView} from 'react-native';
import Search from '../../components/Search/Search' 
import TextSearch from '../../components/Search/TextSearch'
import { wait } from '../../helper/wait'
import {connect} from 'react-redux'

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

    constructor(props){
        super(props);
        this.state = {
            backgroundColorState: '',
        }
    }

    checkMode(){ 
        wait(100).then(() => {
            const { headerTintColor, backgroundColor, navigationName } = this.props;  
            this.setState({backgroundColor:this.props.backgroundColor});
            this.props.navigation.setParams({
                Title: 'Board',
                BackgroundColor: backgroundColor,
                HeaderTintColor: headerTintColor,
            }); 
        }) 
    }  

    buildContent(){ 
        let _content = [];
        _content.push(<Search key='1'></Search>)
        _content.push(<TextSearch key='2' text='what is it?' ti="abc"></TextSearch>)
        return _content
    } 

    componentDidMount(){
        const { backgroundColorState } = this.state; 
        const { backgroundColor } = this.props; 
        if( backgroundColorState != backgroundColor){
            this.checkMode();
        }  
    }

    render(){  
        return (
            <ScrollView style={{flex: 1}}>
                {this.buildContent()} 
            </ScrollView> 
        );
    };
}  
  
function mapStateToProps(store) {
    const { headerTintColor, backgroundColor, loading} = store.themeReducer;     
    return { 
        headerTintColor, backgroundColor, loading
    };
} 

export default connect(mapStateToProps)(SearchScreen);