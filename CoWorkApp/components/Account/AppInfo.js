import React, {Component} from 'react'
import { Text, View, InteractionManager,Switch, StyleSheet, Alert,AsyncStorage } from 'react-native'
import { themeActions } from '../../redux/action/theme.action'
import { connect } from 'react-redux'
import { themeConstants } from '../../redux/constant/theme.constant'
import ChangeLayout from './ChangeLayout'
// import applyMode from '../../utils/ColorNavigator'

class AppInfo extends Component{

    constructor(props){
        super(props); 
        this.state = {
            switchValue:false,
        } 
    } 
  
    
    render() {
        const { onChangeLayout } = this.props;
        return( 
            
            <View style={styles.container}> 
                <Text style={styles.title}>App Information</Text>
                <View style={styles.container_info}> 
                    <View style={styles.element}>
                        <Text style={styles.paragraph}>Product Date: 29/12/2019</Text>
                        <Text style={styles.paragraph}>Version: 1.0.0</Text>
                        <Text style={styles.paragraph}>Design by Tamaki</Text>
                    </View> 

                    <Text style={[styles.title]}>Change layout</Text>
                    <ChangeLayout style={styles.changeLayout} onChangeLayout={onChangeLayout}></ChangeLayout>    
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
        borderRadius:3,    
        borderWidth: 0.5,
        backgroundColor:'#ffffff', 
        // shadowOpacity:0.3,
        borderRadius: 3, 
        margin: 8,
        padding: 8,
    }, 
    changeLayout: {
        marginTop:30,
    },  
    title:{
        margin:2,
        fontWeight:"600", 
        margin: 5,
        marginVertical: 10,
        fontSize: 15,
    },
    paragraph:{ 
        marginVertical:4,
       
    },
    container_info:{ 
        flex:1,  
    },
    element:{
        padding:4,
    }
});
 
function mapStateToProps(store) {
    const { mode } = store.themeReducer;    
    const { backgroundColor, headerTintColor, loading } = store.themeReducer;
    return {
        backgroundColor, headerTintColor, loading,mode
    } 
}
  

export default connect(mapStateToProps)(AppInfo);