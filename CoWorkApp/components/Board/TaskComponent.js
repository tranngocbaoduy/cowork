import React from 'react'
import {Text, View, StyleSheet, Image, Alert, TouchableHighlight} from 'react-native'  

import * as NavigationService from '../../redux/service/navigator.service'
import {DOMAIN } from '../../redux/service/index'
import { connect } from 'react-redux'
class TaskComponent extends React.PureComponent{

    constructor(props){
        super(props); 
    }

    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId); 
    }

    buildTags(){  
        const{ data } = this.props;   
        // console.log(data.tags.map((color, index) => (<View key={index} style={[styles.task, {color: {color}}]}></View>)));
        return data.tags.map((color, index) => (<View key={index} style={[styles.task, {backgroundColor: `${color}`}]}></View>));
    }


    render(){   
        const{ headerTintColor, backgroundColor, data} = this.props;  
        console.log("Task Component");  
        let dateTime = null;
        let url = ""
        if (data) { 
            dateTime = new Date(data.created_date['$date']).toDateString();   
            url = DOMAIN.split('api/')[0] + data.images[0]; 
        }
        return(
            
            <TouchableHighlight 
                onLongPress={() =>
                NavigationService.navigate('MiddleScreen', {
                    navigationName:'Update Task', 
                    data:data,  
                    typeCreate: 5,
                    backgroundColor:backgroundColor, 
                    headerTintColor: headerTintColor,  })}
                activeOpacity={0.6} 
                underlayColor="#DDDDDD"
                onPress={(index) =>   
                    NavigationService.navigate('TaskDetailScreen', {
                    navigationName:'Detail', 
                    data:data, 
                    backgroundColor:backgroundColor, 
                    headerTintColor: headerTintColor,  
                })}
                >
                <View  style={styles.container} >
                    <Image style={styles.images}  source={{uri:url}}/>
                    <View style={{flexDirection: 'column', marginLeft: 10}}>
                        <Text style={styles.text}>{data.name}</Text>
                        <Text style={styles.text}>Date: {dateTime}</Text>
                        <Text style={styles.part}>Tags: {this.buildTags()}</Text>
                        {/* <Text style={{marginLeft: 2}}>{data.tags.length} members in group</Text> */}
                        
                    </View>
                </View>
            </TouchableHighlight> 
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,    
        flexDirection: 'row', 
        justifyContent:'flex-start', 
        marginRight: 2,
        marginLeft: 2,
        marginBottom: 4,
        marginTop: 4,  
    },
    part:{
        margin:2, 
        flex:1,  
        // paddingHorizontal:8,
        // marginHorizontal:8,
    },
    text:{
        margin:2,
        fontWeight:"600", 
    },
    images:{
        width: 54,
        height: 54, 
        marginRight:3,
    },
    task:{
        borderRadius: 100, 
        marginHorizontal:8,
        width:14,
        height:14,
    }
});

function mapStateToProps(store) { 
    const { backgroundColor, headerTintColor } = store.themeReducer;
    return {
        backgroundColor, headerTintColor
    } 
}

export default connect(mapStateToProps)(TaskComponent);