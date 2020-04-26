import React from 'react';
import { StyleSheet,ImageBackground, View, Image} from 'react-native';
import Login from '../../components/Authentication/Login' 
 
import { wait } from '../../helper/wait'
import { connect,Provider } from 'react-redux'

class LoginScreen extends React.Component{
 
    static navigationOptions = ({navigation}) => { 
        return {
            title: navigation.getParam('Title', 'Login'), 
            headerStyle: {
                backgroundColor: navigation.getParam('BackgroundColor'), 
            },
            headerTintColor: navigation.getParam('HeaderTintColor'), 
            headerShown: false,
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
            this.setState({backgroundColor:this.props.backgroundColor});
            const { headerTintColor, backgroundColor, navigationName } = this.props;  
            this.props.navigation.setParams({
                Title: 'Board',
                BackgroundColor: backgroundColor,
                HeaderTintColor: headerTintColor,
            }); 
        }); 
    }   

    buildContent(){ 
        let _content = [];
        const { navigation } = this.props;
        _content.push(<Login key='1' navigation={navigation}></Login>)
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
        const { backgroundColor } = this.state; 
        if(backgroundColor != this.props.backgroundColor){
            this.checkMode();
        } 
        let image = require('../../assets/bg.jpeg')
        return (  
            <View style={styles.container}>
                <ImageBackground source={image} style={styles.image} imageStyle={{opacity: 0.5}}> 
                    {this.buildContent()}  
                </ImageBackground>
            </View>  
        );
    };
}  


const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    image:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center", 
        backgroundColor:'rgba(255,0,0,0)',
    }, 
})
  

function mapStateToProps(store) {
    const { backgroundColor, headerTintColor,loading } = store.themeReducer;
    return {
        backgroundColor, headerTintColor, loading
    }
}
 
export default connect(mapStateToProps)(LoginScreen);