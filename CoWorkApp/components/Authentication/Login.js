import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableHighlight, ImageBackground, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import { accountAction } from '../../redux/action/account.action'
 
import { isEmpty } from '../../helper/String'
import { connect } from 'react-redux'
class Login extends React.PureComponent{

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
            messageUserName: '',
            messagePassword: '',
            messageLogin: '',
            errorLogin: false,
            errorUser: false,
            errorPassword: false,
        }
    }

    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId); 
    }

    _signInAsync = async () => {
        const {username, password} = this.state;  
        const {dispatch} = this.props;
        if (isEmpty(username)){
            this.setState({
                username: username,
                messageUserName:'Invalid username',
                errorUser: true,
                messageLogin:'',
                errorLogin: false,
            });
        }
        if (isEmpty(password)){
            this.setState({
                password: password,
                messagePassword:'Invalid password',
                errorPassword: true,
                messageLogin:'',
                errorLogin: false,
            });
        }
        
        if(!isEmpty(username) && !isEmpty(password)){
            const info = { username, password}; 
            dispatch(accountAction.login(info)); 
        }  
    };

    render(){   
        const { messageUserName, messagePassword, messageLogin , errorUser, errorPassword, errorLogin} = this.state;
        const { navigation, failed } = this.props;   
        if( failed ){ 
            this.setState({ 
                messageLogin:'Username or password isn\'t correct', 
                errorLogin: true,
            });
        }
        const Icon = ({ name }) => (
            <Ionicons style={styles.inputIcon} size={25}
              name={`${Platform.OS === "ios" ? "ios" : "md"}-${name}`}
            />
        ) 
        return(
            <View style={styles.container}> 
                <View style={errorUser?styles.inputContainerErrorUser:styles.inputContainer}> 
                    <Icon name="person"/>
                    <TextInput style={styles.inputs}
                        placeholder="Username"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(username) => {
                            if (isEmpty(username)){
                                this.setState({
                                    username: username,
                                    messageUserName:'Invalid username',
                                    errorUser: true,
                                });
                            }else{ 
                                this.setState({
                                    username: username,
                                    messageUserName:'',
                                    errorUser: false, 
                                    messageLogin:'',
                                    errorLogin: false,
                                });
                            }
                        }}/>
                </View>  
                <Text style={errorUser?styles.labelInActive:styles.labelActive}>{messageUserName}</Text>
                <View style={errorPassword?styles.inputContainerErrorUser:styles.inputContainer}>
                    <Icon name="lock"/>
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => { 
                            if (isEmpty(password)){
                                this.setState({
                                    password: password,
                                    messagePassword:'Invalid password',
                                    errorPassword: true,
                                });
                            }else{ 
                                this.setState({
                                    password: password,
                                    messagePassword:'',
                                    errorPassword: false, 
                                    messageLogin:'',
                                    errorLogin: false,
                                });
                            }
                        }}/> 
                </View>
                <Text style={errorPassword?styles.labelInActive:styles.labelActive}>{messagePassword}</Text>
                <Text style={errorLogin?styles.labelInActive:styles.labelActive}>{messageLogin}</Text>
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
      
    //   backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:5,
        flexDirection: 'row',
        alignItems:'center'
    },inputContainerErrorUser: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:0,
        flexDirection: 'row',
        alignItems:'center'
    },inputContainerErrorPassword: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:0,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    labelInActive:{
        margin:0,
        flexDirection: 'row',
        alignItems:'flex-start',
        marginBottom: 5,
        width:250,
        marginTop:2,
        color:'red',
        display:'flex',
    }, labelActive:{ 
        flexDirection: 'row',
        alignItems:'flex-start', 
        display:'flex',
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
    }, image:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
});

function mapStateToProps(store) {
    const { token, failed } = store.accountReducer; 
    return { 
        token, failed
    };
} 
  
export default connect(mapStateToProps)(Login);