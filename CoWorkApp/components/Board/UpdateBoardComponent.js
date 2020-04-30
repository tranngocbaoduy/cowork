import React from 'react'
import {Text, View, StyleSheet,TouchableHighlight, Alert,
    Image, ImageStore, ActivityIndicator, TextInput, TouchableOpacity, Button} from 'react-native' 
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

class UpdateBoardComponent extends React.PureComponent{

    constructor(props){
        super(props); 
        this.state = {
            loaded: false,
            createTime: new Date(),
            codeBoard: '',  
            nameBoard: '',
            content: '',
            dataFriend:[],
            dataFriendChecked: [],
            showDatePickerCreateTime: false, 
            listImage: [],
            listInitImage : [],
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

    deleteBoard = async () => {
        const { dispatch, data } = this.props; 
        let info = {
            id_board: data['_id']['$oid']
        };
        Alert.alert(
            'Are you sure you want to delete ?',
            '',
            [ 
                {
                    text: 'Cancel',
                    onPress: () => console.log('OK Pressed'),
                },
                {
                    text: 'OK',
                    onPress: () => dispatch(boardAction.remove(info)),
                    style: 'cancel',
                },
             
            ],
            {cancelable: false},
        );
    }
 
    updateBoard = () => {
        const { nameBoard, content, codeBoard , createTime,  dataFriendChecked, listImage, listInitImage  } = this.state; 
        const { dispatch, dataFriend } = this.props; 
        if (!isEmpty(nameBoard) && !isEmpty(content) && !isEmpty(codeBoard) && !isEmpty(createTime) && listImage.length > 0){
            let info = {
                codeBoard: codeBoard,
                nameBoard: nameBoard,
                content: content,
                createTime: createTime,
                dataFriendChecked: dataFriendChecked, 
                dataFriend: dataFriend,
                listImage: [],
            }
            for (let item of listImage) {
                if (!listInitImage.includes(item)){ 
                    info = {
                        codeBoard: codeBoard,
                        nameBoard: nameBoard,
                        content: content,
                        createTime: createTime,
                        dataFriendChecked: dataFriendChecked,
                        dataFriend: dataFriend,
                        listImage: listImage,
                    }
                    break
                }
            }  
            dispatch(boardAction.update(info));
        }

        // console.log(nameBoard, content, codeBoard, createTime, dataFriendChecked, listImage);
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

    loadData = () => {
        const { data, dataFriend } = this.props;  
        this.setState({
            nameBoard: data.name,
            content: data.info,
            codeBoard: data.id_board,
            createTime: data.created_date['$date'],
            dataFriendChecked: data.list_user,
            listImage: data.images,
            dataFriend: dataFriend,
            listInitImage: data.images,
            loaded: true,
        })
    }
 
    render(){ 
        const { title, backgroundColor, headerTintColor } = this.props; 
        const { loaded, showDatePickerCreateTime, dataFriend, content,dataFriendChecked, nameBoard, codeBoard, createTime, listImage} = this.state;
        
        console.log("Update Board", dataFriendChecked,dataFriend)
        const Icon = ({ name }) => (
            <Ionicons style={styles.inputIcon} size={25}
              name={`${Platform.OS === "ios" ? "ios" : "md"}-${name}`}
            />
        )    
        if (!loaded){
            this.loadData();
            return (
            <View style={[styles.containerLoading, styles.horizontal]}>
                <ActivityIndicator size="large" color={backgroundColor}/>
            </View>)
        } 
        return(
            <View style={styles.container}>  
                <View style={styles.inputContainer}>  
                    <Icon name="information-circle-outline"/>  
                    <TextInput style={styles.inputs}
                        placeholder="Code board (use it to find quickly)" 
                        underlineColorAndroid="transparent"
                        value={codeBoard}
                        onChangeText={(txt) => this.setState({codeBoard:txt})}/>
                </View> 
                <View style={styles.inputContainer}>  
                    <Icon name="code-working"/>  
                    <TextInput style={styles.inputs}
                        value={nameBoard}
                        placeholder="Name board" 
                        underlineColorAndroid='transparent'
                        onChangeText={(txt) => this.setState({nameBoard:txt})}/>
                </View> 
                <View style={styles.containerBoard} >  
                    <Textarea
                        containerStyle={styles.textareaContainer}
                        style={styles.textarea}
                        onChangeText={(txt) => this.setState({content: txt})}
                        defaultValue={content}
                        maxLength={120}
                        placeholder={'Write somethings to description about board 。。。'}
                        placeholderTextColor={'#c7c7c7'}
                        underlineColorAndroid={'transparent'}
                    />
                </View>
                
                
                <MemberComponent changeOptionFriend={this.changeOptionFriend} data={dataFriend} dataJoin={dataFriendChecked}></MemberComponent>
                <ImageComponent handlePhoto={this.handlePhoto} isUpload={false} type={1} data={listImage}></ImageComponent>   
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
                <TouchableHighlight style={{backgroundColor:backgroundColor, marginTop:12}} >
                    <Button style={[styles.buttonContainer]} color={headerTintColor} onPress={() =>  this.updateBoard()} title='Update'></Button>
                </TouchableHighlight> 
                <TouchableHighlight style={{backgroundColor:headerTintColor, marginTop:12}} >
                    <Button style={[styles.buttonContainer]} color={backgroundColor} onPress={() =>  this.deleteBoard()} title='Delete'></Button>
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
    containerLoading: {
        flex: 1,
        justifyContent: "center"
    },  
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
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
   
export default connect(mapStateToProps)(UpdateBoardComponent);