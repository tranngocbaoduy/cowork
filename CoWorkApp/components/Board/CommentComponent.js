import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native' 
import { connect } from 'react-redux';
import  CommentItem  from './CommentItem';
import Ionicons from 'react-native-vector-icons/Ionicons';   

class CommentComponent extends React.PureComponent{

    constructor(props){
        super(props); 
        this.state = {  
        }
    } 
 
    render(){ 
        const { data } = this.props; 
        const Icon = ({ name }) => (
            <Ionicons style={styles.inputIcon} size={25}
              name={`${Platform.OS === "ios" ? "ios" : "md"}-${name}`}
            />
        )   
        return( 
            <View>
                <View style={styles.inputContainer}> 
                    <Icon name="chatbubbles"/> 
                    <View style={styles.inputs}> 
                        <Text>Comment</Text>
                    </View>
                </View>    
                <CommentItem order={0}></CommentItem>
                <CommentItem order={1}></CommentItem>

                <CommentItem order={0}></CommentItem>
                <CommentItem order={1}></CommentItem>
                <CommentItem order={1}></CommentItem>
            </View>
        );
    }
}

const styles = StyleSheet.create({ 
    inputs:{ 
        marginLeft:16, 
        borderBottomColor: '#FFFFFF', 
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

export default connect()(CommentComponent);