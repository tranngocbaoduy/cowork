import React from 'react'
import {View, Text, Image, StyleSheet} from "react-native";

export default class SearchResultItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {title, date, memberCount} = this.props.item;
        return (
            <View style={{
                backgroundColor: '#FFEBE3',
                padding: 8,
                flexDirection: 'row',
                height: 70,
                alignItems: 'center'
            }}>
                <View>
                    <Image style={styles.images} source={require('../../assets/1779.jpg')}
                    />
                </View>
                <View style={{flexDirection: 'col', marginLeft: 10}}>
                    <Text style={{marginLeft: 2, fontWeight: 'bold'}}>{title}</Text>
                    <Text style={{marginLeft: 2, color: '#00000080', fontSize: 10, marginVertical: 3}}>{date}</Text>
                    <Text style={{marginLeft: 2}}>{memberCount} members in group</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    images: {
        width: 54,
        height: 54,
        borderRadius: 150,
    }
});