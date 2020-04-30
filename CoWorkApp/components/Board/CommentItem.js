import React from 'react'
import {Text, View, StyleSheet,Image, TextInput} from 'react-native' 
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';   
import { Divider } from 'react-native-elements';
class CommentItem extends React.PureComponent{

    constructor(props){
        super(props); 
        this.state = {  
        }
    } 
 
    render(){ 
        const { order } = this.props; 
        const Icon = ({ name }) => (
            <Ionicons style={styles.inputIcon} 
              name={`${Platform.OS === "ios" ? "ios" : "md"}-${name}`}
            />
        )    
        return( 
            <View style={[styles.inputContainer,{paddingLeft:12,marginLeft: (45*order)},
                    order? {borderLeftWidth: 0.2, borderLeftColor: '#000'}:{}]
                }>  

                <Divider style={{ backgroundColor: 'blue' }} />
                <Image style={styles.images}  source={require('../../assets/category/comment.png')}/>
                <View style={{ marginLeft: 10, paddingLeft:2}}>
                    <Text style={styles.text}>Tamaki</Text>  
                    <Text style={styles.inputs} >We should finish this task quickly !!!</Text>   
                    {/* <Icon name="lock" size={16}></Icon> */}
                    {/* <Text style={{marginLeft: 2}}>{data.list_task.length} tasks in category</Text> */}
                </View> 
            </View>    
        );
    }
}

const styles = StyleSheet.create({ 
    inputs:{  
        borderBottomColor: '#000000',   
    },
    containerBoard:{
        flex:1, 
        borderRadius:3,    
        borderWidth: 0.5,
        backgroundColor:'#ffffff',  
        borderRadius:3, 
        padding:8,  
    }, 
    text:{
        fontWeight:"600",
        fontSize: 15,
        marginBottom:2,
    },
    titleTopic:{
        margin:2,
        fontWeight:"600", 
        margin: 5,
        marginBottom: 10,
        fontSize: 15,
    }, 
    scrollViewHorizontal:{
        flex:1, 
        justifyContent:'flex-start', 
    },
    inputContainer: {
        flex:1, 
        backgroundColor: '#FFFFFF',  
        // height:50,
        marginBottom:5, 
        marginHorizontal:2, 
        marginVertical:6,
        flexDirection: 'row',
        alignItems:'center', 
    },
    images:{
        width:24, height:24, 
        borderRadius:30,  
    },
    inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
    },
});

export default connect()(CommentItem);