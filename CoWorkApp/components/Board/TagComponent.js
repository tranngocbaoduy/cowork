import React from 'react'
import {Text, View, StyleSheet,Image, ScrollView, Button, TouchableHighlight, TouchableWithoutFeedback} from 'react-native' 
import { CheckBox } from 'react-native-elements'
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import DropDownItem from 'react-native-drop-down-item';
 
const IC_ARR_DOWN = require('../../assets/icons/ic_arr_down.png');
const IC_ARR_UP = require('../../assets/icons/ic_arr_up.png');
class TagComponent extends React.Component{

    constructor(props){
        super(props); 
        this.state = { 
            text: '',
            show :false,
            checked: false,
            color : ['#FFDD9B','#FFAA53','#B4FF3A','#668EF6','#F064C9', '#F43759','#FFDE9B','#FFAB53','#B4FE1A','#FFBB53'], 
            checked: ['#FFDD9B','#FFAA53','#B4FF3A','#668EF6','#F064C9', '#F43759','#FFDE9B','#FFAB53','#B4FE1A','#FFBB53'].map((color)=> this.props.data.includes(color)?true:false),
        }
    }
    
    changeOption = (i) => {
        const { checked, color} = this.state;
        checked[i] = !checked[i]; 
        this.setState({checked: checked});
         
        const { handleTag } =  this.props; 
        let filterColor = color.filter((c, i) => checked[i]);
        handleTag(filterColor);
    }

    buildContent = () => {   
        const { checked, color } = this.state;  
        return (<View style={styles.container}> 
            {
                color?   
                    <View style={styles.header}>
                        <Text style={{fontSize: 15,width:"100%", color: 'black',paddingHorizontal:12,  }}>
                            { 
                                color.filter((c, i) => checked[i]).map((c,index) => {
                                return( 
                                    <View key={index} style={{width:20, height:20, borderRadius:20,backgroundColor:`${color[color.indexOf(c)]}`,alignItems: 'center', justifyContent:'center'}}> 
                                        {/* {checked[color.indexOf(c)] && <Image style={{ width: 12, height: 12 }} source={require('../../assets/icons/checked.png')}/>} */}
                                    </View>
                                )}
                            )} 
                        </Text>
                    </View> 
                : null
            }  
        </View>); 
    }
 
    render(){    
        const { color, checked, show } = this.state;  
        let a = color.map((param, i) => { 
            return (
            <TouchableHighlight                
                underlayColor="#EEEEEE"
                style={{marginHorizontal:10}}  key={i} onPress={()=> {this.changeOption(i)}}> 
                <View style={{width:20,height:20, borderRadius:20,backgroundColor:`${color[i]}`,alignItems: 'center', justifyContent:'center'}}> 
                    {checked[i] && <Image style={{ width: 12, height: 12 }} source={require('../../assets/icons/checked.png')}/>} 
                </View>
            </TouchableHighlight>)});   
        const Icon = ({ name }) => (
            <Ionicons style={styles.inputIcon} size={25}
              name={`${Platform.OS === "ios" ? "ios" : "md"}-${name}`}
            />
        )   
        return(   
            <View>
                <TouchableWithoutFeedback  onPress={()=> {this.setState({show:!show})}}> 
                    <View style={styles.inputContainer}>  
                        <Icon name="pricetag"/>   
                        {this.buildContent()}  
                    </View>  
                </TouchableWithoutFeedback>
                {show &&  <View style={{flex:1,flexDirection: 'row',right:0,width:"100%", alignItems:"space-between" , height:30}} >{a}</View>    }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dropDownItem:{
    //   paddingHorizontal:10,  
    },
    container:{
        flex:1,
        // justifyContent:'center',
        paddingHorizontal: 8, 
        paddingVertical: 12,
        paddingBottom: 15, 
    },
    txt:{ 
        color: 'rgb(74,74,74)',
    },
    inputs:{ 
        // marginLeft:16, 
        borderBottomColor: '#FFFFFF', 
    }, 
    header: {
        width: '100%',  
        paddingHorizontal: 8,
        flexWrap: 'wrap', 
        color: 'rgb(74,74,74)',
        flexDirection: 'row',
        alignItems: 'center', 
    },
        headerTxt: {
        fontSize: 12,
        color: 'rgb(74,74,74)',
        marginRight: 60,
        flexWrap: 'wrap',
    },
    containerBoard:{
        flex:1, 
        borderRadius:3,    
        borderWidth: 0.5,
        backgroundColor:'#ffffff',  
        borderRadius:3, 
        padding:8,  
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
        justifyContent:'flex-start', 
    },
    inputContainer: {
        flex:1, 
        backgroundColor: '#FFFFFF', 
        borderBottomWidth: 1, 
        height:50,
        marginBottom:5, 
        marginHorizontal:2,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
    },
});

function mapStateToProps(store) {
    const { friend } = store.boardReducer; 
    return {
        friend,
    }
}

export default connect(mapStateToProps)(TagComponent);