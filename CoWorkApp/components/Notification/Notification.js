import React from 'react';
import { Text, View, Button, Vibration, Platform, StyleSheet, TouchableHighlightBase } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import * as Location from 'expo-location';
import * as Network from 'expo-network';
import * as Application from 'expo-application';   
import sendNotification from '../../helper/notification';
import { connect } from 'react-redux';
import NotificationComponent from './NotificationComponent';

class Notification extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            expoPushToken: '',
            notification: {},
            done: false,
            location: null,
            show: false,
            showAround: false,
        };
        this.buildContent = this.buildContent.bind(this);
    }  

    _handleNotification = notification => {
        Vibration.vibrate();
        console.log(notification);
        this.setState({ notification: notification });
    };
 
    registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            let token = await Notifications.getExpoPushTokenAsync();   
            this.setState({ expoPushToken: token }); 
        } else {
            alert('Must use physical device for Push Notifications');
        }
  
        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('default', {
                name: 'default',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            });
        }
    };
 
    componentDidMount() {
        this.registerForPushNotificationsAsync();  
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    sendPushNotification = async () => {
        const { user } = this.props;  
        if (user) {
            sendNotification(user.expoToken, user.name, user.email);    
        } else {
            console.log("User not found"); 
        } 
    }; 

    buildContent = () => {
        const { data, onCheck} = this.props;
        let _content = [];  
        if (data){
            if (data.length == 0) { 
                    _content.push(<Text key="1">No board. Create a new one !!!</Text>)
            } else {
                // let k = data.reverse();
                for (let index in data){ 
                    _content.push(<NotificationComponent
                        onCheck={onCheck}
                        key={index}  
                        data={data[index]} ></NotificationComponent>)
                } 
            }
        } 
        return _content.reverse();
    }

    render() {  
        return(
            <View style={styles.container}> 
                <Text style={styles.titleTopic}>Notification</Text>
                <View style={styles.containerBoard} >
                    {this.buildContent()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal: 8, 
        paddingTop: -3,
        paddingBottom: 4, 
        backgroundColor:'#ffffff', 
        // shadowOpacity:0.3,,
        // height:'auto',
        flexDirection:'column',
        justifyContent:'flex-start',  
        // alignItems:'flex-start'
    },
    containerBoard:{
        flex:1, 
        borderRadius:3,    
        borderWidth: 0.5,
        backgroundColor:'#ffffff', 
        // shadowOpacity:0.3,
        borderRadius:3, 
        padding:6,  
    }, 
    titleTopic:{
        margin:2,
        fontWeight:"600", 
        margin: 5,
        marginBottom: 10,
        fontSize: 15,
    },
    scrollView:{
        // padding:8,
    },
    scrollViewHorizontal:{
        flex:1,
        // marginLeft:5,
        // marginRight:5,
        // padding:8, 
        justifyContent:'flex-start', 
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
    const { user } = store.accountReducer;
    const { notification } = store.notificationReducer;
    return { 
        user, notification
    }
}

export default connect(mapStateToProps)(Notification);