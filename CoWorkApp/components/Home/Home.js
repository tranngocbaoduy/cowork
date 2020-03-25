import React from 'react';
import {Text, View, Image,StyleSheet} from 'react-native';
import { connect } from 'react-redux';

import { themeActions } from '../../redux/action/theme.action'

class Home extends React.Component{
    constructor(props){
        super(props);   
    }

    render(){ 
        return(
            <View style={styles.container}>
                <Text>This is Home Screen</Text> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        padding:8, 
        backgroundColor:'#ffffff', 
        shadowOpacity:0.3,
        borderRadius:3, 
        marginBottom:10, 
        shadowOffset:{width:0,height:0}
    },
    text:{
        margin:2,
        fontWeight:"500", 
    }
});


function mapStateToProps(store) {
  const { loggedIn } = store.accountReducer;      
  return { 
      loggedIn,
  };
} 

export default connect(mapStateToProps)(Home);