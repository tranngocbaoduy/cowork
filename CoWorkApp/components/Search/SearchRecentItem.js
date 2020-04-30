import React from 'react'
import {View, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default class SearchRecentItem extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const {title } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
                <Icon name={'x'} size={20} color='#000'/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        height: 40, 
        alignItems: 'center',
        padding: 4,
    }, 
    text: {
        flex: 1,
        margin: 4, 
    }
});