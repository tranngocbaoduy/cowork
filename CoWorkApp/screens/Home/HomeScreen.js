import React from 'react';
import { StyleSheet, View , Text, InteractionManager} from 'react-native';
import Home from '../../components/Home/Home'  
import { wait } from '../../helper/wait'
import { connect } from 'react-redux'  

class HomeScreen extends React.Component{
 
    constructor(props){
        super(props);
        this.state = {
            backgroundColorState: '',
        }
        this.checkMode = this.checkMode.bind(this); 
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

    checkMode(){ 
        wait(100).then(() => { 
            this.setState({backgroundColor:this.props.backgroundColor});
            const { headerTintColor, backgroundColor, navigationName } = this.props;  
            this.props.navigation.setParams({
                Title: 'Board',
                BackgroundColor: backgroundColor,
                HeaderTintColor: headerTintColor,
            }); 
        }) 
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
    const { headerTintColor, backgroundColor, loading} = store.themeReducer;     
    return { 
        headerTintColor, backgroundColor, loading
    };
} 

export default connect(mapStateToProps)(HomeScreen);