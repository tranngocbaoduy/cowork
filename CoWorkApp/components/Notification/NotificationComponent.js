import React from 'react';
import { Text, View, Button, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import * as Location from 'expo-location';
import * as Network from 'expo-network';
import * as Application from 'expo-application';   
import sendNotification from '../../helper/notification';
import { connect } from 'react-redux';
import { DOMAIN } from '../../redux/service/index' 
import * as NavigationService from '../../redux/service/navigator.service'

class NotificationComponent extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            expoPushToken: '',  
        };
    }  
  
    render() { 
        const { data, board, backgroundColor, headerTintColor, onCheck } = this.props; 
        let url = DOMAIN.split('api/')[0];
        let b = [];
        if (board && data) {
            console.log(data)
          
            let dateTime = Date.now() - (7*60*60*1000) 
            let created_date = (new Date(data.created_date['$date'])).getTime()
            let strTime = ""
            let time = new Date(dateTime - created_date).getHours() 
            strTime = time.toString() + (parseInt(time) > 1 ?" hours ago" :" hour ago")
            if (time === 0){
                time = new Date(dateTime - created_date).getMinutes() 
                strTime = time.toString() + (parseInt(time) > 1 ?" minutes ago" :" minute ago")
                if (time === 0) {
                    time = new Date(dateTime - created_date).getSeconds()  
                    strTime = time.toString() + (parseInt(time) > 1 ?" seconds ago" :" second ago")
                }
            } 
            // if (data.activity != "remove") {  
                // try {
                //     if (data.obj == 'board') { 
                //         b = board.find((item) => item[0]['_id']['$oid'] == data['id_board'])[0]  
                //         url = DOMAIN.split('api/')[0] + b['images'][0];
                //     } else if (data.obj == 'categoy') {
                        
                //     } else if (data.obj == 'task') {

                //     }
                // } catch (Exception) {
                //     url = require('../../assets/avatar/saitama.jpg') 
                // } 
                url = DOMAIN.split('api/')[0] + data.image
            // }   
            return (
                <TouchableHighlight 
                    onPress={() => { 
                        onCheck(data['_id']['$oid']);
                        if (data.obj == 'board') {
                            NavigationService.navigate('BoardScreen', {
                                navigationName: 'Board',
                                backgroundColor: backgroundColor,
                                headerTintColor: headerTintColor,
                            });
                        } else if (data.obj == 'category') {
                            NavigationService.navigate('CategoryScreen', {
                                navigationName: 'Category',
                                backgroundColor: backgroundColor,
                                headerTintColor: headerTintColor,
                            });
                        } else if (data.obj == 'task') {
                            NavigationService.navigate('TaskScreen', {
                                navigationName: 'Task',
                                backgroundColor: backgroundColor,
                                headerTintColor: headerTintColor,
                            });
                        }
                    }}
                > 
                    <View style={data.is_checked?styles.container:styles.containerChecked} >
                        <Image style={styles.images} source={{ uri: url }} />
                        <View style={{flexDirection: 'column', marginLeft: 10}}>
                            <Text style={styles.text}>{data.name}</Text>
                                <Text style={styles.content}>{data.message}</Text>     
                        </View>
                        
                            <Text style={styles.contentTime}>{strTime}</Text>  
                    </View>    
                </TouchableHighlight> 
            );
        } 
        return (<View ></View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding:4,
        marginRight: 2,
        marginLeft: 2,
        marginBottom: 4,
        marginTop: 4, 
        backgroundColor:'#fff2e5',
    },
    containerChecked: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'center',
        marginHorizontal: 2,
        marginVertical: 0,
        marginTop: 4, 
        padding:4,
        backgroundColor:'#ffce99',
    },
    text: {
        fontSize: 13,
        margin: 2,
        fontWeight: "600", 
    },
    contentTime: {
        position: "absolute",
        right: 7,  
        fontSize: 9,
        top: 4,
        fontWeight:"500"
    },
    content: {
        marginLeft: 2,
        color: '#000',
        fontSize: 13,
        width: "70%",
        left:0,
        // marginVertical: 5, backgroundColor: 'black',
        flex: 1, 
    },
    images: { 
        width: 54,
        height: 54, 
        marginHorizontal: 3, 
    }
});

function mapStateToProps(store) {
    const { backgroundColor, headerTintColor } = store.themeReducer;
    const { user } = store.accountReducer;
    const { notification } = store.notificationReducer;
    const { board } = store.boardReducer;
    return { 
        user, notification, backgroundColor, headerTintColor, board
    }
}

export default connect(mapStateToProps)(NotificationComponent);