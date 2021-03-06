import React from 'react'
import {Text, View, StyleSheet,TouchableHighlight, ActivityIndicator, Alert, TextInput, TouchableOpacity, Button} from 'react-native' 
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';   
import MemberComponent from './MemberComponent';
import TagComponent from './TagComponent'; 
import ImageComponent from './ImageComponent'; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Textarea from 'react-native-textarea';

import {isEmpty} from '../../helper/String';
import {AsyncStorage} from 'react-native'
import {categoryAction} from '../../redux/action/category.action'
import { wait } from '../../helper/wait';

var moment = require('moment');

class NewCategoryComponent extends React.PureComponent{

    constructor(props){
        super(props); 
        this.state = {
            loaded: false,
            createTime: new Date(),   
            codeBoard: '',  
            nameBoard: '',  
            nameCategory: '',
            content: '',
            dataFriendChecked: [],
            showDatePickerCreateTime: false, 
            listImage: [],
            listInitImage: [],
            updating: false,
        }
        this.buildContent = this.buildContent.bind(this);
    }

    buildContent = async () =>{  
        this.setState({ 
            loaded: true,
        }); 
    }

    updateCategory = async () => {
        const { nameBoard, nameCategory, content, codeBoard, selectedBoard , createTime,  dataFriendChecked, listImage, listInitImage  } = this.state; 
        const { dispatch, data } = this.props;
        this.setState({
            updating: true,
        })
        
        if (!isEmpty(nameCategory) && !isEmpty(content) && !isEmpty(codeBoard) && !isEmpty(createTime) && listImage.length > 0){
            let info = {  
                codeBoard: selectedBoard['_id']['$oid'],
                codeCategory: data['_id']['$oid'],
                nameCategory: nameCategory,
                content: content,
                createTime: createTime, 
                dataFriendChecked:dataFriendChecked,
                listImage: [],
            }

            for (let item of listImage) {
                if (!listInitImage.includes(item)){ 
                    info = {
                        codeBoard: selectedBoard['_id']['$oid'],
                        codeCategory: data['_id']['$oid'],
                        nameCategory: nameCategory,
                        content: content,
                        createTime: createTime, 
                        dataFriendChecked:dataFriendChecked,
                        listImage: listImage,
                    }
                    break
                }
            } 
            await dispatch(categoryAction.update(info));
            wait(100).then(() => {
                this.setState({
                    updating: false,
                })
            }) 
        }else{
            Alert.alert("You need fill all input field");
        }

        console.log(nameBoard, nameCategory, content, codeBoard, createTime, dataFriendChecked, listImage);
    }

    getBoard = async () => {
        let selectedBoard = JSON.parse(await AsyncStorage.getItem('seletedBoard'));  
        this.setState({
            selectedBoard: selectedBoard,
            codeBoard: selectedBoard['id_board'],
            nameBoard: selectedBoard['name'],
            dataFriend: selectedBoard.list_user,
        });
    }

    removeCategory = async () => {
        const { dispatch, data } = this.props; 
        let info = {
            id_cate: data['_id']['$oid']
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
                    onPress: () => dispatch(categoryAction.remove(info)),
                    style: 'cancel',
                },
             
            ],
            {cancelable: false},
        );
    }

    loadData = () => {
        const { data } = this.props;      
        this.setState({ 
            nameCategory: data.name,
            content: data.content, 
            createTime: data.created_date['$date'], 
            listImage: data.images, 
            listInitImage: data.images,
            loaded: true,
        })
    }

    componentDidMount(){
        this.getBoard();
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
  
    onChangeStartTime = (currentDate) => { 
        const { showDatePickerStartTime } = this.state;
        this.setState({startTime:currentDate, showDatePickerStartTime: !showDatePickerStartTime}); 
    };

    onChangeFinishTime = (currentDate) => {  
        const { showDatePickerFinishTime } = this.state;
        this.setState({finishTime:currentDate, showDatePickerFinishTime: !showDatePickerFinishTime}); 
    }; 
 
    render(){ 
        const { title, backgroundColor, headerTintColor } = this.props; 
        const { loaded, listImage, updating, dataFriendChecked,showDatePickerCreateTime, selectedBoard, nameCategory, content, createTime ,nameBoard, codeBoard } = this.state;
        console.log("Update Categoryss")
        const Icon = ({ name }) => (
            <Ionicons style={styles.inputIcon} size={25}
              name={`${Platform.OS === "ios" ? "ios" : "md"}-${name}`}
            />
        )    
        if (!selectedBoard){
            this.getBoard();
            this.loadData();
            return(
                <View key={1} style={[styles.containerLoading, styles.horizontal]}>
                    <ActivityIndicator size="large" color={backgroundColor}  />
                </View>
            )
        } else if (updating) {
            return(
                <View key={1} style={[styles.containerLoading, styles.horizontal]}>
                    <ActivityIndicator size="large" color={backgroundColor}  />
                </View>
            )
        }
        
        else {
            console.log(selectedBoard);
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
                        <Icon name="bulb"/>  
                        <TextInput style={styles.inputs}
                            placeholder="Name category" 
                            underlineColorAndroid='transparent'
                            value={nameCategory}
                            onChangeText={(txt) => this.setState({nameCategory:txt})}/>
                    </View> 
                    <View style={styles.containerBoard} >  
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={(txt) => this.setState({content:txt})}
                            defaultValue={content}
                            maxLength={120}
                            placeholder={'Write somethings to description about category。。。'}
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                
                    {/* <MemberComponent changeOptionFriend={this.changeOptionFriend} data={dataFriend} dataJoin={dataFriendChecked}></MemberComponent> */}
                    <ImageComponent handlePhoto={this.handlePhoto} isUpload={false} type={1} data={listImage}></ImageComponent>  
                    {/* <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => Alert.alert("123")}
                        // style={[styles.floatingAddButton,{borderWidth:2,borderColor:backgroundColor}]}>
                        >
                        <Icon name="add" style={{backgroundColor:backgroundColor}}></Icon>
                    </TouchableOpacity>   */}
                    <View style={styles.inputContainer}> 
                        <Icon name="alarm"/>
                        <TouchableOpacity style={{flex:1,}}
                                        onPress={() => this.setState({showDatePickerCreateTime: !showDatePickerCreateTime})}>  
                            <Text style={styles.inputs}
                                placeholder="Create Time" 
                                underlineColorAndroid='transparent'              
                            >{moment(createTime).format('MMMM Do YYYY, h:mm:ss a')}</Text>   
                            <DateTimePickerModal
                                isVisible={showDatePickerCreateTime}
                                mode="datetime"
                                onConfirm={this.onChangeCreateTime}
                                onCancel={() =>  this.setState({showDatePickerCreateTime: !showDatePickerCreateTime})}
                            /> 
                        </TouchableOpacity>  
                    </View>  
                    <TouchableHighlight style={{backgroundColor:backgroundColor, marginTop:12}} >
                        <Button style={[styles.buttonContainer]} color={headerTintColor} onPress={() =>  this.updateCategory()} title='Update'></Button>
                    </TouchableHighlight> 
                    <TouchableHighlight style={{backgroundColor:headerTintColor, marginTop:12}} >
                        <Button style={[styles.buttonContainer]} color={backgroundColor} onPress={() =>  this.removeCategory()} title='Delete'></Button>
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
    containerLoading: {
        flex: 1,
        justifyContent: "center"
    },  
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
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
    containerLoading: {
        flex: 1,
        justifyContent: "center"
    },  
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
});

function mapStateToProps(store) { 
    const { backgroundColor, headerTintColor } = store.themeReducer; 
    return {
        backgroundColor, headerTintColor
    } 
}
   
export default connect(mapStateToProps)(NewCategoryComponent);