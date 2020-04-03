import React from 'react'
import {View, Text} from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default class SearchRecentItem extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const {title } = this.props;
        return (
            <View style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
                <Text style={{flex: 1}}>{title}</Text>
                <Icon name={'x'} size={20} color='#000'/>
            </View>
        )
    }
}