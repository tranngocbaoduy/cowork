import React from 'react';
import { StyleSheet, View , Text, InteractionManager} from 'react-native';
import Home from '../../components/Home/Home' 

import { connect } from 'react-redux'  

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
        _content.push(<Home key='1'></Home>) 
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
        flex:1
    }
}

function mapStateToProps(store) {
    const { loggedIn } = store.accountReducer;     
    return { 
        loggedIn,
    };
} 

export default connect(mapStateToProps)(HomeScreen);