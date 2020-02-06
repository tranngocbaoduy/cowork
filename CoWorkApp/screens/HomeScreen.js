import React from 'react';
import { StyleSheet, View , Text, InteractionManager} from 'react-native';
import Home from '../components/Home/Home' 

import { connect } from 'react-redux' 
import LoginScreen from './LoginScreen';

class HomeScreen extends React.Component{
 
    constructor(props){
        super(props);
        this.state = { 
        }
    }

    static navigationOptions = ({navigation}) => { 
        return {
            title: navigation.getParam('Title', 'Home'), 
            headerStyle: {
                backgroundColor: navigation.getParam('BackgroundColor'), 
            },
            headerTintColor: navigation.getParam('HeaderTintColor'), 
        };
    };

    buildContent(){ 
        let _content = [];
        const { loggedIn } = this.props;
        if(loggedIn){ 
            _content.push(<Home key='1'></Home>)
        }else{
            _content.push(<LoginScreen key='1'></LoginScreen>)
        }
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

function mapStateToProps(store) {
    const { loggedIn } = store.accountReducer;     
    return { 
        loggedIn,
    };
} 

export default connect(mapStateToProps)(HomeScreen);