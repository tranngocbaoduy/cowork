import React from 'react'
import {Text, View, Image,StyleSheet, TouchableHighlight } from 'react-native' 
import { accountAction } from '../../redux/action/account.action'

import { isEmpty } from '../../helper/String'
import {connect} from 'react-redux'
import UserInfor from "./UserInfor";

class Account extends React.Component{
    constructor(props){
        super(props); 
    }

    _logoutAsync = () => {
        const { dispatch, token } = this.props;
        dispatch(accountAction.logout()); 
    };

    render(){ 
        return(
            <View style={styles.container}>
                <UserInfor/>
               <TouchableHighlight style={[styles.buttonContainer, styles.logoutButton]} onPress={this._logoutAsync}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableHighlight>

            </View>
        );
    }
}

 
const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
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
      marginTop:100,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width:250,
      borderRadius:30,
    },
    logoutButton: {
      backgroundColor: "#00b5ec",
    },
    logoutText: {
      color: 'white',
    }
});

function mapStateToProps(store) {
    const { token } = store.accountReducer; 
    return { 
        token
    };
} 

export default connect(mapStateToProps)(Account);