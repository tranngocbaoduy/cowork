import React from 'react'
import {View, Text, SectionList, StyleSheet, SafeAreaView} from "react-native";
import SearchResultItem from "./SearchResultItem";

const data = [{
    title: 'Board',
    data: [
        {title: 'Study', date: '21/03/2020, 9:30', memberCount: 5},
        {title: 'Study', date: '21/03/2020, 9:30', memberCount: 5},
        {title: 'Study', date: '21/03/2020, 9:30', memberCount: 5},
    ],
}, {
    title: 'Task',
    data: [
        {title: 'Study English - Listening Category ', date: '21/03/2020, 9:30', memberCount: 5},
        {title: 'Study English - Listening Category ', date: '21/03/2020, 9:30', memberCount: 5},
    ],
}];

export default class SearchResultList extends React.Component {
    render() {
        return (
            <View style={styles.container}> 
                <SectionList
                    ItemSeparatorComponent={({_}) => (
                        <View style={{height: 1, backgroundColor: '#80808080'}} />
                        )}
                    keyExtractor={(item, index) => item + index}
                    sections={data}
                    renderItem={({item}) => <SearchResultItem item={item}/>}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={{padding: 8, backgroundColor: 'white'}}>{title}</Text>
                    )}
                /> 
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
        // paddingTop:10,
        // borderRadiusTop:0,

    }, 
    text: {
        margin: 2,
        fontWeight: "500",
    }
});