import React from 'react'
import {Text, View, TouchableHighlight, Button, StyleSheet} from 'react-native';

export default class TextSearch extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            message: '',
        }
    }


    clickSearch(key) {
        alert('abc' + key);
        this.state  = {}
        const { ti, text } = this.props;
        console.log(ti, text)
    } 

    render(){ 
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Hello world !!</Text>
                <Button 
                color="red"
                style={styles.button} title="Search"/>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} 
                        onPress={() => this.clickSearch('login')}>
                    <Text style={styles.loginText}>Sign up</Text>
                </TouchableHighlight> 
                {/* <Text>This is Search Screen</Text>  */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        padding:8, 
        backgroundColor:'#ffffff', 
        shadowOpacity:0.3,
        borderRadius:3, 
        marginBottom:10, 
        shadowOffset:{width:0,height:0},
        flexDirection: 'column',
        display:'none',
    },
    text:{
        margin:2,
        fontWeight:"500", 
        color:'red',
        backgroundColor:'black',
    },
    button:{
        display:'flex',
        color:'white',
        height:50,
        marginTop:100, 
        backgroundColor:'black',
        flex: 1,
    }, buttonContainer: {
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
});