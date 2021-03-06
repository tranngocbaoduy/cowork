import React from 'react'
import {Text, TextInput, View, StyleSheet} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

export default class SearchInBoard extends React.PureComponent {
    constructor(props) {
        super(props); 
    } 

    _handleSearch(){ 
        const { handleCloseSearch } = this.props;
        handleCloseSearch();  
    }

    render() {
        const { onSearch, closeSearch, keyWord  } = this.props;  
        return (
            <View style={styles.container}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="md-search" size={20} color={"#000"}/>
                    <TextInput
                        placeholder="Search"
                        style={{flex: 1, marginLeft: 12, height: 40, color: '#000'}}
                        onChangeText={(txt) => onSearch(txt)}
                    >{keyWord}</TextInput>  
                    { !closeSearch && <Icon size={20} color='#000' onPress={() => { this._handleSearch()}}><Text>x</Text></Icon> }
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 8,
        margin: 8,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderColor: '#9C9C9C',
        borderWidth: 1,
        marginBottom: 10,
        height: 40
    },
    text: {
        margin: 2,
        fontWeight: "500",
    }
});