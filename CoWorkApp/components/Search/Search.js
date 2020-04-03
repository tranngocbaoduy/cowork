import React from 'react'
import {Text, View, Image,StyleSheet} from 'react-native';
import SearchBar from "./SearchBar";
import SearchRecentList from "./SearchRecentList";

export default class Search extends React.Component{
    constructor(props){
        super(props); 
    }

    render(){ 
        return(
            <View style={styles.container}>
                <SearchBar/>
                <SearchRecentList/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
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