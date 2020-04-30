import React from 'react'
import {Text, View, StyleSheet, Image, Alert, TouchableHighlight} from 'react-native' ; 

import * as NavigationService from '../../redux/service/navigator.service';

import {DOMAIN } from '../../redux/service/index';
import { connect } from 'react-redux';

class BoardComponent extends React.PureComponent{

    constructor(props){
        super(props); 
    }

    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId); 
    }


    render(){   
        const { headerTintColor, backgroundColor, data, onChoose, dataFriend } = this.props;
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
                        navigationName:'Update Board', 
                        data:data, 
                        nameBoard: data.name,
                        dataFriend:dataFriend,
                        typeCreate: 3,
                        backgroundColor:backgroundColor, 
                        headerTintColor: headerTintColor,  })}
                activeOpacity={0.6} 
                underlayColor="#DDDDDD"
                onPress={(index) =>  
                    onChoose(data.id_board).then(
                        NavigationService.navigate('CategoryScreen', {
                            navigationName:'Category', 
                            data:data.list_category, 
                            refresh:true,
                            nameBoard: data.name,
                            backgroundColor:backgroundColor, 
                            headerTintColor: headerTintColor,  
                    })) 
                }>
                <View  style={styles.container} >
                    <Image style={styles.images}  source={{uri:url}}/>
                    <View style={{flexDirection: 'column', marginLeft: 10}}>
                        <Text style={styles.text}>{data.name}</Text>
                        <Text style={{marginLeft: 2, color: '#000', fontSize: 10, marginVertical: 3}}>{dateTime}</Text>
                        <Text style={{marginLeft: 2}}>{data.list_user.length} members in group</Text>
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
    text:{
        margin:2,
        fontWeight:"600", 
    },
    images:{
        width: 54,
        height: 54, 
        marginRight:3,
    }
});

function mapStateToProps(store) { 
    const { backgroundColor, headerTintColor } = store.themeReducer; 
    return {
        backgroundColor, headerTintColor
    } 
}

export default connect(mapStateToProps)(BoardComponent);