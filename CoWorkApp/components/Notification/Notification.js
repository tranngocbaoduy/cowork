import React from 'react'
import {Text, View, Image,StyleSheet} from 'react-native';

export default class Notification extends React.Component{
    constructor(props){
        super(props); 
    }

    render(){ 
        return(
            <View style={styles.container}>
                <Text>This is Notification Screen</Text> 
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
        shadowOffset:{width:0,height:0}
    },
    text:{
        margin:2,
        fontWeight:"500", 
    }
});