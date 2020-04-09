import React from 'react'
import {View, Text, Image, StyleSheet, TouchableHighlight} from "react-native";

export default class UserInfor extends React.Component {
    render() {
        return (
            <View style={{
                flexDirection: 'row',
                height: 120,
                alignItems: 'center',
                backgroundColor: '#FFDD9B80',
                margin: 8,
                borderRadius: 9,
                paddingHorizontal: 8,
            }}>
                <View>
                    <Image style={styles.images} source={require('../../assets/moew_avatar.jpg')}
                    />
                </View>
                <View style={{flexDirection: 'col', marginLeft: 12, flex: 1}}>
                    <Text style={{fontWeight: 'bold', marginTop: 8, fontSize: 20}}>Chinh Dang</Text>
                    <Text style={{color: '#00000080', fontSize: 12}}>@Chinhdangkute</Text>
                    <TouchableHighlight style={[styles.buttonContainer, styles.settingsButton]}
                                        onPress={() => {
                                        }}>
                        <Text style={styles.settingsText}>Settings</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    images: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    buttonContainer: {
        width: '100%',
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    settingsButton: {
        backgroundColor: "#FF7847", marginTop: 8
    },
    settingsText: {
        color: 'white',
    }
});