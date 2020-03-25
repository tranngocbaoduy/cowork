import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableHighlight, Image, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import { accountAction } from '../../redux/action/account.action'
 
import { isEmpty } from '../../helper/String'
import { connect } from 'react-redux'
class Login extends React.Component{

    static navigationOptions = ({navigation}) => { 
        return {
            headerShown: false,
            tabBarVisible :false,
        } 
    }
       
    constructor(props){
        super(props); 
        this.state = {
            username : '',
            password: '',
        }
    }

    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId); 
    }
    _signInAsync = async () => {
        const {username, password} = this.state;  
        const {dispatch, token} = this.props;
        if(!isEmpty(username) && !isEmpty(password)){
            const info = { username, password}; 
            dispatch(accountAction.login(info));
        } 
    };
    render(){   
        const { navigation } = this.props;  
        const Icon = ({ name }) => (
            <Ionicons style={styles.inputIcon} size={25}
              name={`${Platform.OS === "ios" ? "ios" : "md"}-${name}`}
            />
          )
        return(
            <View style={styles.container}>
                <View style={styles.inputContainer}> 
                <Icon name="person"/>
                <TextInput style={styles.inputs}
                    placeholder="Username"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(username) => this.setState({username})}/>
                </View>
                
                <View style={styles.inputContainer}>
                <Icon name="lock"/>
                <TextInput style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(password) => this.setState({password})}/>
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this._signInAsync}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
                    <Text>Forgot your password?</Text>
                </TouchableHighlight>

                <TouchableHighlight >
                    <Button style={styles.buttonContainer} onPress={() =>  navigation.navigate('SignUpScreen', {
                            navigationName:'SignUp',
                            BackgroundColor: navigation.getParam('BackgroundColor'), 
                            HeaderTintColor: navigation.getParam('HeaderTintColor'),
                        })} title='SignUp'></Button>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
    loginButton: {
      backgroundColor: "#00b5ec",
    },
    loginText: {
      color: 'white',
    }
});

function mapStateToProps(store) {
    const { token } = store.accountReducer; 
    return { 
        token
    };
} 
  
export default connect(mapStateToProps)(Login);