import React from 'react'
import {Text, View, StyleSheet,ActivityIndicator, Button, TouchableOpacity} from 'react-native' 
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import DateTimePicker from '@react-native-community/datetimepicker';
import MemberComponent from './MemberComponent';
import TagComponent from './TagComponent';
import AttachmentComponent from './AttachmentComponent';
import ImageComponent from './ImageComponent';
import CommentComponent from './CommentComponent';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {AsyncStorage} from 'react-native'
import Textarea from 'react-native-textarea';

var moment = require('moment');

class TaskDetail extends React.PureComponent{

    constructor(props){
        super(props); 
        this.state = {
            loaded: false,
            startTime: new Date(), 
            finishTime: new Date(), 
            showDatePickerStartTime: false,
            showDatePickerFinishTime: false,
            content:this.props.data.content,
            seletedCategory: null,
            selectedBoard: null,
            listImage: [],
            listTag: [],
            dataFriendChecked: [], 
            dataFriend:[]
        }
        this.buildContent = this.buildContent.bind(this);
    }

    buildContent = async () =>{ 
        const { data } = this.props;
        try { 
            let dateStart = new Date(data.date_start['$date']);  
            let dateEnd = new Date(data.date_end['$date']);   
            let listImage = data.images
            let listTag = data.tags
            let selectedBoard, selectedCategory = null; 
        
            selectedCategory = await AsyncStorage.getItem('selectedCategory');
            selectedBoard = await AsyncStorage.getItem('seletedBoard'); 

            this.setState({
                startTime: dateStart, 
                endTime: dateEnd,
                loaded: true,
                selectedBoard: JSON.parse(selectedBoard),
                selectedCategory: JSON.parse(selectedCategory),
                listImage: listImage,
                listTag: listTag,
                dataFriend: selectedBoard.list_user,
                dataFriendChecked: data.list_user_task, 
            }); 
        }catch(err) {
            console.log(err,'err');
        }  
     
    } 

    handlePhoto = async (listImage) => {
        this.setState({listImage:listImage});
    } 

    handleTag = async (listTag) => {
        this.setState({listTag:listTag}); 
    } 

    onChangeStartTime = (currentDate) => { 
        const { showDatePickerStartTime } = this.state;
        this.setState({startTime:currentDate, showDatePickerStartTime: !showDatePickerStartTime}); 
    };

    onChangeFinishTime = (currentDate) => {  
        const { showDatePickerFinishTime } = this.state;
        this.setState({finishTime:currentDate, showDatePickerFinishTime: !showDatePickerFinishTime}); 
    }; 
 

    changeOptionFriend = (i) => { 
        const { dataFriendChecked, dataFriend } = this.state;
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
        const { title, data, backgroundColor, headerTintColor, board } = this.props; 
        const { loaded, showDatePickerFinishTime, showDatePickerStartTime, selectedBoard} = this.state;
        console.log(data);
        const Icon = ({ name }) => (
            <Ionicons style={styles.inputIcon} size={25}
              name={`${Platform.OS === "ios" ? "ios" : "md"}-${name}`}
            />
        )   
        if(!loaded){
            console.log("Task detail");
            this.buildContent();
            return (
            <View key={1} style={[styles.containerLoading, styles.horizontal]}>
                <ActivityIndicator size="large" color={backgroundColor}  />
            </View>)
        }
        return(
            <View style={styles.container}> 
                <Text style={styles.titleTopic}>{title}</Text>
                <View style={styles.containerBoard} > 
                   <Textarea
                        containerStyle={styles.textareaContainer}
                        style={styles.textarea}
                        // onChangeText={(text) => this.setState({content:text})}
                        onChangeText={() => Alert.alert("Can't modify text")}
                        defaultValue={data.content}
                        maxLength={1000}
                        placeholder={'What will you do in this task ? Are you thinking ?'}
                        placeholderTextColor={'#c7c7c7'}
                        underlineColorAndroid={'transparent'}
                        editable={false}
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
                            // onConfirm={this.onChangeStartTime}
                            onConfirm={() => Alert.alert("Can't modify date")}
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
                            // onConfirm={this.onChangeFinishTime} 
                            onConfirm={() => Alert.alert("Can't modify date")}
                            onCancel={() =>  this.setState({showDatePickerFinishTime: !showDatePickerFinishTime})}
                        /> 
                    </TouchableOpacity> 
                </View>  
                <MemberComponent changeOptionFriend={this.changeOptionFriend} data={selectedBoard.list_user}  dataJoin={data.list_user_task}></MemberComponent>
                <TagComponent handleTag={this.handleTag} data={data.tags}></TagComponent>
                {/* <AttachmentComponent data={["ab","a"]}></AttachmentComponent> */}
                <ImageComponent handlePhoto={this.handlePhoto} type={0} isUpload={true} data={data.images}></ImageComponent>
                <CommentComponent data={["ab","a"]}></CommentComponent>
             
                {/* <View style={styles.inputContainer}> 
                    <Icon name="alarm"/>
                    <TextInput style={styles.inputs}
                        placeholder="Finish Time"
                        keyboardType="text"
                        underlineColorAndroid='transparent'
                        onChangeText={(username) => {}}                            
                    />
                </View>   */}
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
        // shadowOpacity:0.3,
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
});

function mapStateToProps(store) { 
    const { backgroundColor, headerTintColor } = store.themeReducer; 
    const { board } = store.boardReducer;
    return {
        backgroundColor, headerTintColor, board
    } 
}
   
export default connect(mapStateToProps)(TaskDetail);