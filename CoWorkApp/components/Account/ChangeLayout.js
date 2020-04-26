import React from 'react'
import {Text, View, Image,StyleSheet, TouchableHighlight } from 'react-native' 
import { accountAction } from '../../redux/action/account.action'

import { isEmpty } from '../../helper/String'
import {connect} from 'react-redux'
import { themeConstants } from '../../redux/constant/theme.constant'

class ChangeLayout extends React.PureComponent{
    constructor(props){
        super(props); 
    }

    _logoutAsync = () => {
        const { dispatch, token } = this.props;
        dispatch(accountAction.logout()); 
    } 

    render(){ 
        const { onChangeLayout } = this.props;
        return(
            <View style={styles.container}> 
               <TouchableHighlight style={[styles.square, styles.styleBGI]} onPress={() => onChangeLayout(themeConstants.LIGHT)}>
                    <View >
                        <Text  style={styles.styleI} >Example</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.square, styles.styleBGII]} onPress={() => onChangeLayout(themeConstants.DARK)}>
                    <View >
                        <Text  style={styles.styleII} >Example</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.square, styles.styleBGIII]} onPress={() => onChangeLayout(themeConstants.ORANGE)}>
                    <View >
                        <Text style={styles.styleIII} >Example</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
    //   alignItems: 'center',
      backgroundColor: '#DCDCDC',
    }, 
    square:{
        borderColor: 'blue',
        width: 100, 
        height: 50,
        padding:10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'black'
    },
    styleBGI: {
        backgroundColor: '#fff', 
    },
    styleI: { 
        color:'#000',
    },
    styleBGII: {
        backgroundColor: '#000', 
    },
    styleII: { 
        color:'#fff',
    },
    styleBGIII: {
        backgroundColor: '#FFAA53' 
    },
    styleIII: { 
        color:'#fff',
    }
});

function mapStateToProps(store) {
    const { headerTintColor, backgroundColor} = store.themeReducer; 
    return { 
        headerTintColor, 
        backgroundColor
    };
} 

export default connect(mapStateToProps)(ChangeLayout);