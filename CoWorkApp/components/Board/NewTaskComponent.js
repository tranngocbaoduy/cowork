import React from 'react'
import {Text, View, ActivityIndicator, StyleSheet,TouchableHighlight, Alert, TextInput, TouchableOpacity, Button} from 'react-native' 
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';   
import MemberComponent from './MemberComponent';
import TagComponent from './TagComponent'; 
import ImageComponent from './ImageComponent'; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Textarea from 'react-native-textarea';
import { AsyncStorage } from 'react-native'
var moment = require('moment');

import { taskAction } from '../../redux/action/task.action'
import { isEmpty } from '../../helper/String';

class NewTaskComponent extends React.PureComponent{

    constructor(props){
        super(props); 
        this.state = {
            creating: false,
            loaded: false,
            startTime: new Date(), 
            finishTime: new Date(), 
            codeBoard: '',
            nameBoard: '',
            nameCategory:'', 
            nameTask:'',
            content:'',
            dataFriendChecked: [], 
            listImage: [],
            listTag: [],
            showDatePickerStartTime: false,
            showDatePickerFinishTime: false,
        }
        this.buildContent = this.buildContent.bind(this);
    }

    buildContent = async () =>{  
        this.setState({ 
            loaded: true,
        }); 
    } 

    handlePhoto = async (listImage) => {
        this.setState({listImage:listImage});
    } 

    handleTag = async (listTag) => {
        this.setState({listTag:listTag}); 
    } 

    createTask = () => {
        const { nameBoard, nameCategory, content, listTag, codeBoard, selectedBoard, selectedCategory,
            nameTask, startTime, finishTime,  dataFriendChecked, listImage  } = this.state; 
        const { dispatch} = this.props;
        
        if (!isEmpty(nameCategory) && !isEmpty(content) && !isEmpty(codeBoard) && !isEmpty(startTime)&& !isEmpty(finishTime) && listImage.length > 0){
            let info = {
                codeBoard: selectedBoard['_id']['$oid'],
                codeCategory: selectedCategory['_id']['$oid'],
                nameTask: nameTask,
                content: content,
                startTime: startTime, 
                finishTime: finishTime,
                dataFriendChecked:dataFriendChecked,
                listImage: listImage,
                listTag: listTag,
            }
            dispatch(taskAction.create(info));
            this.setState({
                creating:true,
            })
        }else{
            Alert.alert("You need fill all input field");
        }
        // console.log(selectedBoard['_id']['$oid'], nameBoard,  selectedCategory['_id']['$oid'], 
        // nameCategory, content, codeBoard , startTime, finishTime,  dataFriendChecked, listImage, listTag );
    }
 
    getBoard = async () => {
        let selectedBoard = JSON.parse(await AsyncStorage.getItem('seletedBoard')); 
        this.setState({
            selectedBoard: selectedBoard,
            codeBoard: selectedBoard['id_board'],
            nameBoard: selectedBoard['name'],
        });
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

    getCategory = async () => {
        let selectedCategory = JSON.parse(await AsyncStorage.getItem('selectedCategory')); 
        this.setState({
            selectedCategory: selectedCategory, 
            nameCategory: selectedCategory['name'],
        });
    }
  
    onChangeStartTime = (currentDate) => { 
        const { showDatePickerStartTime } = this.state;
        this.setState({startTime:currentDate, showDatePickerStartTime: !showDatePickerStartTime}); 
    };

    onChangeFinishTime = (currentDate) => {  
        const { showDatePickerFinishTime } = this.state;
        this.setState({finishTime:currentDate, showDatePickerFinishTime: !showDatePickerFinishTime}); 
    }; 
 
    render(){ 
        const { title, dataFriend, backgroundColor, headerTintColor } = this.props;
        console.log("Create New Task")
        const { creating, nameBoard, nameCategory, codeBoard, showDatePickerFinishTime, showDatePickerStartTime, selectedBoard, selectedCategory} = this.state;
        const Icon = ({ name }) => (
            <Ionicons style={styles.inputIcon} size={25}
              name={`${Platform.OS === "ios" ? "ios" : "md"}-${name}`}
            />
        )   
        // if(!loaded){
        //     this.buildContent();
        //     return (
        //     <View key={1} style={[styles.containerLoading, styles.horizontal]}>
        //         <ActivityIndicator size="large" color={backgroundColor}  />
        //     </View>)
        // }
        if (!selectedBoard){
            this.getBoard();
            return(
                <View key={1} style={[styles.containerLoading, styles.horizontal]}>
                    <ActivityIndicator size="large" color={backgroundColor}  />
                </View>
            )
        } else if (!selectedCategory){
            this.getCategory();
            return(
                <View key={1} style={[styles.containerLoading, styles.horizontal]}>
                    <ActivityIndicator size="large" color={backgroundColor}  />
                </View>
            )
        }else if (creating) {
            return (
            <View style={[styles.containerLoading, styles.horizontal]}>
                <ActivityIndicator size="large" color={backgroundColor}/>
            </View>)
        } else {

            return(
                <View style={styles.container}>  
                    <View style={styles.inputContainer}>  
                        <Icon name="information-circle-outline"/> 
                        <TouchableOpacity style={{flex:1,}}
                            onPress={() => Alert.alert("Can't modify this flied")}>
                            <Text style={styles.inputs} underlineColorAndroid='transparent' >{codeBoard}</Text>
                        </TouchableOpacity>
                    </View> 
                    <View style={styles.inputContainer}>  
                        <Icon name="code-working"/>  
                        <TouchableOpacity style={{flex:1,}}
                            onPress={() => Alert.alert("Can't modify this flied")}>
                            <Text style={styles.inputs}  
                            underlineColorAndroid='transparent'>{nameBoard}</Text>
                        </TouchableOpacity> 
                    </View> 
                    <View style={styles.inputContainer}>  
                        <Icon name="code-working"/>  
                        <TouchableOpacity style={{flex:1,}}
                            onPress={() => Alert.alert("Can't modify this flied")}>
                            <Text style={styles.inputs}  
                            underlineColorAndroid='transparent'>{nameCategory}</Text>
                        </TouchableOpacity> 
                    </View> 
                    <View style={styles.inputContainer}>  
                        <Icon name="information-circle-outline"/>  
                        <TextInput style={styles.inputs}
                            placeholder="Name task" 
                            underlineColorAndroid='transparent'
                            onChangeText={(txt) => this.setState({nameTask:txt})}/>
                    </View> 
                    <View style={styles.containerBoard} >  
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={(txt) => this.setState({content:txt})}
                            defaultValue={this.state.text}
                            maxLength={120}
                            placeholder={'Write somethings to description about task。。。'}
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                    <View style={styles.inputContainer}> 
                        <Icon name="alarm"/>
                        <TouchableOpacity style={{flex:1,}}
                                        onPress={() => this.setState({showDatePickerStartTime: !showDatePickerStartTime})}>  
                            <Text style={styles.inputs}
                                placeholder="Start Time" 
                                underlineColorAndroid='transparent'              
                            >{moment(this.state.startTime).format('MMMM Do YYYY, h:mm:ss a')}</Text>   
                            <DateTimePickerModal
                                isVisible={showDatePickerStartTime}
                                mode="datetime"
                                onConfirm={this.onChangeStartTime}
                                onCancel={() =>  this.setState({showDatePickerStartTime: !showDatePickerStartTime})}
                            /> 
                        </TouchableOpacity>  
                    </View>  
                    <View style={styles.inputContainer}> 
                        <Icon name="alarm"/> 
                        <TouchableOpacity style={{flex:1,}}
                                        onPress={() => this.setState({showDatePickerFinishTime: !showDatePickerFinishTime})}>  
                            <Text style={styles.inputs}
                                placeholder="Finish Time"
                                // keyboardType="phone-pad"
                                underlineColorAndroid='transparent'              
                            >{moment(this.state.finishTime).format('MMMM Do YYYY, h:mm:ss a')}</Text>   
                            <DateTimePickerModal
                                isVisible={showDatePickerFinishTime}
                                mode="datetime"
                                onConfirm={this.onChangeFinishTime}
                                onCancel={() =>  this.setState({showDatePickerFinishTime: !showDatePickerFinishTime})}
                            /> 
                        </TouchableOpacity> 
                    </View>   
                    <MemberComponent changeOptionFriend={this.changeOptionFriend} data={dataFriend} dataJoin={[]}></MemberComponent>
                    <ImageComponent handlePhoto={this.handlePhoto} isUpload={false} type={1} data={[]}></ImageComponent>  
                    <TagComponent handleTag={this.handleTag} data={[]} ></TagComponent>
                    {/* <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => Alert.alert("123")}
                        // style={[styles.floatingAddButton,{borderWidth:2,borderColor:backgroundColor}]}>
                        >
                        <Icon name="add" style={{backgroundColor:backgroundColor}}></Icon>
                    </TouchableOpacity>   */}
                    <TouchableHighlight style={{backgroundColor:backgroundColor, marginTop:10}} >
                        <Button style={[styles.buttonContainer]} color={headerTintColor} onPress={() =>  this.createTask()} title='Create'></Button>
                    </TouchableHighlight> 
                </View>
            );
        }
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
        textAlignVertical: 'top',  // hack android
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
   
export default connect(mapStateToProps)(NewTaskComponent);