
import React from 'react'
import {View, Text, Image, StyleSheet, TouchableHighlight, ActivityIndicator} from "react-native";
import { connect } from "react-redux"

class UserInfor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lis:[],
        };
    }

    render() {
        const { user, backgroundColor, headerTintColor } = this.props; 
        console.log(user);
        if (!user) {
            return (
                <View style={[styles.containerLoading, styles.horizontal]}>
                    <ActivityIndicator size="large" color={backgroundColor}/>
                </View>)
        }
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
                    <Image style={styles.images} source={require('../../assets/avatar/moew_avatar.jpg')}
                    />
                </View>
                <View style={{ flexDirection: 'col', marginLeft: 12, flex: 1 }}> 
                    <Text style={{ fontWeight: 'bold', marginTop: 8, fontSize: 20 }}>{user.name}</Text>
                    <Text style={{ color: '#00000080', fontSize: 12 }}>{user.email}</Text>
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
    }, 
    containerLoading: {
        flex: 1,
        justifyContent: "center"
    }, 
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
});

function mapStateToProps(store) {
    const { backgroundColor, headerTintColor } = store.themeReducer; 
    const { user } = store.accountReducer;
    return {
        backgroundColor, headerTintColor, user
    }
}

export default connect(mapStateToProps)(UserInfor);
