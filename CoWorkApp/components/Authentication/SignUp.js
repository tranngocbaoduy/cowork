import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Image, Alert} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';  
import Login from './Login';

export default class SignUp extends React.Component{

    static navigationOptions = ({navigation}) => { 
        return {
            title: navigation.getParam('Title', 'SignUp'), 
            headerShown: false,
            tabBarVisible :false,
        } 
    }
       
    constructor(props){
        super(props); 
        this.state = {
            email   : '',
            password: '',
        }
    }

    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId);
    }
 
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
                    placeholder="Email"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(email) => this.setState({email})}/>
                </View>
                
                <View style={styles.inputContainer}>
                <Icon name="lock"/>
                <TextInput style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(password) => this.setState({password})}/>
                </View>
 
                <View style={styles.inputContainer}>
                <Icon name="lock"/>
                <TextInput style={styles.inputs}
                    placeholder="Re-Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(password) => this.setState({password})}/>
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
                    <Text style={styles.loginText}>Sign in</Text>
                </TouchableHighlight> 

                <TouchableHighlight >
                    <Button style={styles.buttonContainer} onPress={() =>  navigation.navigate('LoginScreen', {
                            navigationName:'Login',
                            BackgroundColor: navigation.getParam('BackgroundColor'), 
                            HeaderTintColor: navigation.getParam('HeaderTintColor'),
                        })} title='Login'></Button>
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
   