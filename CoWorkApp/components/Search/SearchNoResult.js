import React from 'react'
import {View, Text, Image, StyleSheet} from "react-native";

export default class SearchNoResult extends React.Component {

    render() {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={styles.images} source={require('../../assets/saitama_vector.png')}
                    />
                <Text style={{fontSize:20}}>No result found!!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    images: {
        width: '60%',
        height: 250,
        resizeMode: 'contain',

    }
});