import React from 'react';
import { StyleSheet, Button, View , Text, ActivityIndicator, SafeAreaView, FlatList, RefreshControl} from 'react-native';
import Notification from '../../components/Notification/Notification' 
import { wait } from '../../helper/wait'
import {connect} from 'react-redux'
import * as Location from 'expo-location';
import * as Network from 'expo-network';
import * as Application from 'expo-application';
import { notificationAction } from '../../redux/action/notification.action'
import NotificationComponent from './NotificationComponent'
// import Beacon from './Beacon'
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
            done: false,
            loadedData: false,
        }
        this.onGetLocation = this.onGetLocation.bind(this);
    }

    buildContent() { 
        const { loadedData } = this.state;
        const { notification } = this.props; 
        let _content = [];
        _content.push( 
            <SafeAreaView key='notification' style={styles.container}>
                <FlatList 
                    data={[notification]}
                    renderItem={({item})=> (< Notification onCheck={this.onCheck} key = '1' data={item}></Notification >)}
                    keyExtractor={(item,index)=> `${index}`}
                    refreshControl={<RefreshControl refreshing={!loadedData} onRefresh={this.onRefresh}/> }> 
                </FlatList> 
            </SafeAreaView>  ) 
        return _content
    }

    getNetwork = async () => {
       let ip = await Network.getIpAddressAsync();
    //    let ss = await Network.NetworkStateType.BLUETOOTH;
       let s = await Network.getNetworkStateAsync();
       let ss = await Application.getIosIdForVendorAsync(); 
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
        this.loadData();
    } 

    onRefresh = () => {   
        this.setState({ loadedData: false })
        this.loadData();
        console.log("Refresh ... ");  
    } 

    onCheck = (id) => {
        console.log(id)
        const { dispatch, user } = this.props;
        let info = {
            idNoti: id,
            username: user.username,
        }
        dispatch(notificationAction.check(info));
    }

    loadData = async () => {   
        const { dispatch, user, notification } = this.props;     
        if (user) { 
            let info = { username: user.username }
            console.log("notification loading ...");
            dispatch(notificationAction.getById(info)); 
            wait(200).then(() => {
                if (notification) {
                    this.setState({
                        notification: notification, 
                        loadedData:true,
                    });  
                } else {
                    this.setState({
                        loadedData:true,
                    })  
                }
            })
            
        } 
    } 
    

    render() {      
        const { done,location } = this.state;
        const { notification, backgroundColor, headerTintColor } = this.props;
        console.log(notification)
        if (!notification) { 
            wait(1000).then(() => {
                return (
                <View style={[styles.containerLoading, styles.horizontal]}>
                    <Text>You must reload</Text>
                </View>)
            })
            return (
            <View style={[styles.containerLoading, styles.horizontal]}>
                <ActivityIndicator size="large" color={backgroundColor}/>
            </View>)
        } 
        return (
            <View style={[styles.container]}>
                {this.buildContent()}
            </View>
            // <NotificationComponent></NotificationComponent> 
            // <Beacon></Beacon>
        );
    };
}  

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        paddingVertical: 4,
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
      containerInfo:{   
        flexDirection: 'row',
        shadowRadius:10,
        shadowOpacity:0.2, 
        shadowOffset:{width:0,height:0},  
        borderRadius:6,
        marginHorizontal:10, 
        backgroundColor: "#fff", 
 
    },
})


function mapStateToProps(store) {
    const { headerTintColor, backgroundColor, loading } = store.themeReducer;
    const { notification } = store.notificationReducer;
    const { user } = store.accountReducer;
    return { 
        headerTintColor, backgroundColor, loading, notification, user
    };
} 

export default connect(mapStateToProps)(NotificationScreen);