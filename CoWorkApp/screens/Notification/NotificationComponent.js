import React from 'react';
import { Text, View, Button, Vibration, Platform, TextInput, TouchableHighlightBase } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import * as Location from 'expo-location';
import * as Network from 'expo-network';
import * as Application from 'expo-application';  
import axios from 'axios';
import { getDistanceFromLatLonInKm } from '../../helper/getDistance'
// import BluetoothState from 'react-native-bluetooth-state';
// import BluetoothStateManager from 'react-native-bluetooth-state-manager';

const DOMAIN = "https://c13ea1d8.ngrok.io"

export default class NotificationComponent extends React.Component {
  state = {
    expoPushToken: '',
    notification: {},
    done: false,
    location: null,
    show: false,
    showAround: false,
  };

    getLocation = async () => {
        const { location } = this.state;
        let  {status}  = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
        }

        let myLocation = await Location.getCurrentPositionAsync({});
        // console.log(myLocation);
        this.setState({
            done: true,
            location: myLocation,
        })
        return myLocation;
    }

    showLocation = () => {
      const {location} =this.state;  
      let _content = []
      let count = 0;
      if (location){
        for (let i in location){
            for (let j in location[i]){ 
                _content.push(
                <View key={count} style={{marginHorizontal:20, alignItems: 'center', justifyContent: 'space-between',flexDirection: 'row'}}>
                  <Text >{i}: {j}</Text>
                  <TextInput>{String(location[i][j])}</TextInput>
                </View>)
                count++;
            }
        }   
      }else{
        _content.push(<Text>'Nothing to get'</Text>);
      } 
      return (<View key='viewkk'>{_content}</View>);
    }

    sendData = async (expoPushToken, location) => { 
      let data = {
        token: expoPushToken,
        location: location
      }
      console.log('location',location)
      if (Platform.OS === 'android') {

      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }; 
      await axios.post(DOMAIN + '/api/sendData',JSON.stringify({data}), requestOptions) 
        .then(res => { 
          console.log(res.data.message);
        })
        .catch(function(err){
          console.log(err);
        });
      ; 
    }



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
     
        // await sendData(token, location);
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

  showTableDistance =  () => {
    const { position, location } = this.state;
    console.log(position);
    console.log("------ Distance -------");
    if (location){
      console.log()

      if(typeof(location)!= 'object'){ 
        let _content = [];
        let distance = 0;
        for (let item of location){
          distance = getDistanceFromLatLonInKm(location.coords.latitude,location.coords.longitude,item.latitude,item.longitude)
          _content.push(
            <View style={{marginHorizontal:20, alignItems: 'center', justifyContent: 'center'}}>
              <Text>latitude: {item.latitude}</Text>
              <Text>longitude: {item.longitude}</Text>
              <Text>distance: {distance * 1000} m</Text>
            </View>
          )
        }
      }else{
        let distance = getDistanceFromLatLonInKm(location.coords.latitude,location.coords.longitude,position.latitude,position.longitude)
        return(
          <View style={{marginHorizontal:20, alignItems: 'center', justifyContent: 'center'}}>
            <Text>latitude: {position.latitude}</Text>
            <Text>longitude: {position.longitude}</Text>
            <Text>distance: {distance * 1000} m</Text>
          </View>
        )
      }

    }else{
      return(<View><Text>Khong co location</Text></View>);
    }
  }

  getAroundDevices = async () => {
    const { expoPushToken, location } = this.state;
    let data = {
      token: expoPushToken, 
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }; 
    await axios.post(DOMAIN + '/api/getDevices',JSON.stringify({data}), requestOptions) 
      .then(res => { 
        let position = JSON.parse(res.data.payload);
        this.setState({
          position: position,
          showAround: true,
        })
     
      })
      .catch(function(err){
        console.log(err);
      });
     
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync(); 
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = notification => {
    Vibration.vibrate();
    console.log(notification);
    this.setState({ notification: notification });
  };

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
  sendPushNotification = async () => {
    this.setState({show:false}); 
    await this.getLocation();
    const { expoPushToken, location } = this.state;
    if (!expoPushToken ){
      this.registerForPushNotificationsAsync();
    } else {
      while(!location){
        if(location){break;}
      }
      await this.sendData(expoPushToken, location);
      const message = {
        to: 'ExponentPushToken[2ooeXwPk0P7dJYB-pX03Fx]',
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { data: 'goes here' },
        _displayInForeground: true,
      };
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
    } 
  };

  render() {
    const { show, showAround } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'space-around', }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Origin: {this.state.notification.origin}</Text>
          <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
        </View>
        { show && this.showLocation()}
        { showAround && this.showTableDistance()}
        <View>
          <Button title={'Press to Send Notification'} onPress={() => this.sendPushNotification()} />
          <Button title={'Press to get Info your location'} onPress={() => this.setState({show:true})} />
          <Button title={'Press to get Around Devices'} onPress={() => this.getAroundDevices()} />
        </View>
      </View>
    );
  }
}
