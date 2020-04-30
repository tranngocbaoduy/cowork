import React from 'react'
import {View, Text, FlatList, StyleSheet, SafeAreaView} from "react-native";
import SearchRecentItem from "./SearchRecentItem";

export default class SearchRecentList extends React.Component {
    render() {
        let data = [
            {id: 1,key: 'Devin'},
            {id: 2,key: 'Dan'},
            {id: 3,key: 'Dominic'},
            {id: 4,key: 'Jackson'},
            {id: 5,key: 'James'},
            {id: 6,key: 'Joel'},
            {id: 7,key: 'John'},
            {id: 8,key: 'Jillian'},
            {id: 9,key: 'Jimmy'},
            {id: 10,key: 'Julie'},
        ] 
 
        return (
            <View style={styles.container}>
             
                <Text style={styles.text}>Recent searches</Text> 
                {/* <SafeAreaView style={{flex:1}}> */}
                    <FlatList
                        data={data}
                        renderItem={({item}) => <SearchRecentItem title={item.key}/>}
                        keyExtractor={(item) =>  `${item.id}`} 
                    ></FlatList> 
                {/* </SafeAreaView>  */}
            </View>
        )
    }
}
 
const styles = StyleSheet.create({
    container: { 
        flex: 1,  
        padding:0,  
        justifyContent: 'center',
        backgroundColor: '#FFEBE3',   

        borderWidth:0.5, 
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderTopWidth:0,
        
        margin: 9,
        marginTop:-10,
    },  
    text: {
        marginVertical:4,
        marginLeft: 2,
        fontWeight: "500",
    }
});