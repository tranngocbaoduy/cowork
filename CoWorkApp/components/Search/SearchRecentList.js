import React from 'react'
import {View, Text, FlatList} from "react-native";
import SearchRecentItem from "./SearchRecentItem";

export default class SearchRecentList extends React.Component {
    render() {
        return (
            <View style={{backgroundColor: '#FFEBE3', padding: 8}}>
                <Text style={{marginLeft: 2}}>Recent searches</Text>
                <FlatList
                    data={[
                        {key: 'Devin'},
                        {key: 'Dan'},
                        {key: 'Dominic'},
                        {key: 'Jackson'},+
                        {key: 'James'},
                        {key: 'Joel'},
                        {key: 'John'},
                        {key: 'Jillian'},
                        {key: 'Jimmy'},
                        {key: 'Julie'},
                    ]}
                    renderItem={({item}) => <SearchRecentItem title={item.key}/>}
                />
            </View>
        )
    }
}