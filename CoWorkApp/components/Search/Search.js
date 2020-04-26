import React from 'react'
import {Text, View, ScrollView, Image, StyleSheet} from 'react-native';
import SearchBar from "./SearchBar";
import SearchRecentList from "./SearchRecentList";
import SearchResultList from "./SearchResutlList";

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            closeSearch: true,
        };
    }

    _closeSearch = () => { 
        this.setState({ 
            closeSearch: true,
            text: '' 
        });
    }

    render() {
        const {text, closeSearch} = this.state;
        return (
            <View style={styles.container}>
                <SearchBar  onSearch={(keyword) => this.setState({text: keyword, closeSearch:false})} closeSearch={closeSearch} handleCloseSearch={this._closeSearch}/> 
                { !closeSearch && (text === '' && <SearchRecentList style={styles.searchContainer} /> || <SearchResultList style={styles.searchContainer}/>) }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        // shadowOpacity:0.3,
        borderRadius: 3,
        // position: 'absolute',
        // zIndex:1,
        right:0,
        left:0, 
        shadowOffset: {width: 0, height: 0}, 
    },
    searchContainer:{ 
        zIndex: 2,
        position: 'absolute',
    },
    text: {
        margin: 2,
        fontWeight: "500",
    }
});

