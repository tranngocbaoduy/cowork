import React from 'react'
import {Text, View, ScrollView, Image, StyleSheet} from 'react-native';
import SearchBar from "./SearchBar";
import SearchRecentList from "./SearchRecentList";
import SearchResultList from "./SearchResutlList";
import SearchNoResult from "./SearchNoResult";

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    render() {
        const {text} = this.state;
        return (
            <View style={styles.container}>
                <SearchBar onSearch={(keyword) => this.setState({text: keyword})}/>
                <ScrollView>
                    {text === '' && <SearchRecentList/> || <SearchResultList/>}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        // backgroundColor: '#ffffff',
        // shadowOpacity:0.3,
        height:'100%',
        borderRadius: 3,
        marginBottom: 10,
        shadowOffset: {width: 0, height: 0}
    },
    text: {
        margin: 2,
        fontWeight: "500",
    }
});