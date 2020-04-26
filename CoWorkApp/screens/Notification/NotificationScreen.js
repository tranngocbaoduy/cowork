import React from 'react';
import { StyleSheet, Button, View , Text, InteractionManager} from 'react-native';
import Notification from '../../components/Notification/Notification' 
import { wait } from '../../helper/wait'
import {connect} from 'react-redux'
import * as Location from 'expo-location';
import * as Network from 'expo-network';
import * as Application from 'expo-application';

import NotificationComponent from './NotificationComponent'
import Beacon from './Beacon'
class NotificationScreen extends React.Component{
 
    static navigationOptions = ({navigation}) => { 
        return {
            title: navigation.getParam('Title', 'Notification'), 
            headerStyle: {
                backgroundColor: navigation.getParam('BackgroundColor'), 
            },
            headerTintColor: navigation.getParam('HeaderTintColor'), 
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            backgroundColorState: '',
            location: null,
            done:false,
        }
        this.onGetLocation = this.onGetLocation.bind(this);
    }

    buildContent(){ 
        let _content = [];
        _content.push(<Notification key='1'></Notification>)
        return _content
    }

    getNetwork = async () => {
       let ip = await Network.getIpAddressAsync();
    //    let ss = await Network.NetworkStateType.BLUETOOTH;
       let s = await Network.getNetworkStateAsync();
       let ss = await Application.getIosIdForVendorAsync();
       console.log(ip);
       console.log(s);
       console.log(ss);
    }

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
    
    onGetLocation = () => {
        this.getNetwork();
        // let myLocation = this.getLocation();
        // this.setState({location:myLocation});
        // let count  = 100;
        // let _content = []
        // for (let i in myLocation){
        //     for (let j in myLocation[i]){ 
        //         _content.push(<Text key={count}>{i}+': '+{j}{String(myLocation[i][j])}</Text>)
        //         count++;
        //     }
        // }
        // // console.log(_content)
        // return (<View key='viewkk'>{_content}</View>);
    }

    checkMode(){ 
        wait(100).then(() => {
            const { headerTintColor, backgroundColor, navigationName } = this.props;  
            this.setState({backgroundColor:this.props.backgroundColor});
            this.props.navigation.setParams({
                Title: 'Board',
                BackgroundColor: backgroundColor,
                HeaderTintColor: headerTintColor,
            }); 
        }) 
    }   

    componentDidMount(){
        const { backgroundColorState } = this.state; 
        const { backgroundColor } = this.props; 
        if( backgroundColorState != backgroundColor){
            this.checkMode();
        }  
    }

    render(){     
        const { done,location } = this.state;
        return (
            // <NotificationComponent></NotificationComponent> 
            <Beacon></Beacon>
        );
    };
}  

function mapStateToProps(store) {
    const { headerTintColor, backgroundColor, loading} = store.themeReducer;     
    return { 
        headerTintColor, backgroundColor, loading
    };
} 

export default connect(mapStateToProps)(NotificationScreen);