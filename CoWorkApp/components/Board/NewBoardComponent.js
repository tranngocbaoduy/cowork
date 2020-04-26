import React from 'react'
import {Text, View, StyleSheet,TouchableHighlight, 
    Image, ImageStore, ImageEditor, TextInput, TouchableOpacity, Button} from 'react-native' 
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import DateTimePicker from '@react-native-community/datetimepicker';
import MemberComponent from './MemberComponent';
import TagComponent from './TagComponent'; 
import ImageComponent from './ImageComponent'; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Textarea from 'react-native-textarea';
import {isEmpty} from '../../helper/String';
import {boardAction} from '../../redux/action/board.action';
import { resize } from '../../helper/resize';
var moment = require('moment');
var resizebase64 = require('resize-base64');  
import * as FileSystem from 'expo-file-system';

class NewBoardComponent extends React.PureComponent{

    constructor(props){
        super(props); 
        this.state = {
            loaded: false,
            createTime: new Date(),
            codeBoard: '',  
            nameBoard: '',
            content: '',
            dataFriendChecked: [],
            showDatePickerCreateTime: false, 
            listImage:[],
        }
        this.buildContent = this.buildContent.bind(this);
    }

    buildContent = async () =>{  
        this.setState({ 
            loaded: true,
        }); 
    }
  
    onChangeCreateTime = (currentDate) => { 
        const { showDatePickerCreateTime } = this.state;
        this.setState({createTime:currentDate, showDatePickerCreateTime:!showDatePickerCreateTime}); 
    };  
 
    createBoard = () => {
        const { nameBoard, content, codeBoard , createTime,  dataFriendChecked, listImage  } = this.state; 
        const { dispatch} = this.props;
        
        if (!isEmpty(nameBoard) && !isEmpty(content) && !isEmpty(codeBoard) && !isEmpty(createTime) && listImage.length > 0){
            let info = {
                codeBoard: codeBoard,
                nameBoard: nameBoard,
                content: content,
                createTime: createTime,
                dataFriendChecked: dataFriendChecked,
                listImage: listImage,
            }
            dispatch(boardAction.create(info));
        }

        console.log(nameBoard, content, codeBoard, createTime, dataFriendChecked, listImage);
    }

    handlePhoto = async (listImage) => { 
        this.setState({listImage:listImage});
    }
 
    changeOptionFriend = (i) => {
        const { dataFriend } = this.props;
        const { dataFriendChecked } = this.state;
        if (dataFriendChecked.includes(dataFriend[i])){
            dataFriendChecked.splice(dataFriendChecked.indexOf(dataFriend[i]),1);
        }else{
            dataFriendChecked.push(dataFriend[i])
        } 
        this.setState({
            dataFriendChecked: dataFriendChecked
        }) 
    }
 
    render(){ 
        const { title, dataFriend, backgroundColor, headerTintColor } = this.props;
        console.log("Create New Board")
        const { loaded, showDatePickerCreateTime} = this.state;
        const Icon = ({ name }) => (
            <Ionicons style={styles.inputIcon} size={25}
              name={`${Platform.OS === "ios" ? "ios" : "md"}-${name}`}
            />
        )    
        return(
            <View style={styles.container}>  
                <View style={styles.inputContainer}>  
                    <Icon name="information-circle-outline"/>  
                    <TextInput style={styles.inputs}
                        placeholder="Code board (use it to find quickly)" 
                        underlineColorAndroid="transparent"
                        onChangeText={(txt) => this.setState({codeBoard:txt})}/>
                </View> 
                <View style={styles.inputContainer}>  
                    <Icon name="code-working"/>  
                    <TextInput style={styles.inputs}
                        placeholder="Name board" 
                        underlineColorAndroid='transparent'
                        onChangeText={(txt) => this.setState({nameBoard:txt})}/>
                </View> 
                <View style={styles.containerBoard} >  
                    <Textarea
                        containerStyle={styles.textareaContainer}
                        style={styles.textarea}
                        onChangeText={(txt) => this.setState({content: txt})}
                        defaultValue={this.state.text}
                        maxLength={120}
                        placeholder={'Write somethings to description about board 。。。'}
                        placeholderTextColor={'#c7c7c7'}
                        underlineColorAndroid={'transparent'}
                    />
                </View>
                
                
                <MemberComponent changeOptionFriend={this.changeOptionFriend} data={dataFriend} dataJoin={[]}></MemberComponent>
                <ImageComponent handlePhoto={this.handlePhoto} isUpload={false} type={1} data={[]}></ImageComponent>  
                <View style={styles.inputContainer}> 
                    <Icon name="alarm"/>
                    <TouchableOpacity style={{flex:1,}}
                                    onPress={() => this.setState({showDatePickerCreateTime: !showDatePickerCreateTime})}>  
                        <Text style={styles.inputs}
                            placeholder="Create Time" 
                            underlineColorAndroid='transparent'              
                        >{moment(this.state.createTime).format('MMMM Do YYYY, h:mm:ss a')}</Text>   
                        <DateTimePickerModal
                            isVisible={showDatePickerCreateTime}
                            mode="datetime"
                            onConfirm={this.onChangeCreateTime}
                            onCancel={() =>  this.setState({showDatePickerCreateTime: !showDatePickerCreateTime})}
                        /> 
                    </TouchableOpacity>  
                </View>  
                <TouchableHighlight style={{backgroundColor:backgroundColor, marginTop:10}} >
                    <Button style={[styles.buttonContainer]} color={headerTintColor} onPress={() =>  this.createBoard()} title='Create'></Button>
                </TouchableHighlight> 
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
        flexDirection:'column',
        justifyContent:'flex-start',  
    },
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
    textareaContainer: {
        height: 180,
        padding: 5,
        backgroundColor: '#F5FCFF',
    },
    textarea: {
        textAlignVertical: 'top',
        height: 170,
        fontSize: 14,
        color: '#333',
    },
    floatingAddButton: {
        flex:1,
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20, 
        borderRadius:50,
    },  
    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,  
    },
});

function mapStateToProps(store) { 
    const { backgroundColor, headerTintColor } = store.themeReducer; 
    return {
        backgroundColor, headerTintColor
    } 
}
   
export default connect(mapStateToProps)(NewBoardComponent);