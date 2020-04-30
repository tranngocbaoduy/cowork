import React from 'react'
import axios from 'axios'; 
import {ActivityIndicator, Modal, Alert, Text,View, StyleSheet, TouchableHighlight,TouchableWithoutFeedback, Image, FlatList, TouchableOpacity, SafeAreaView} from 'react-native' 
import { connect } from 'react-redux'; 
import Ionicons from 'react-native-vector-icons/Ionicons';   
import UploadImage from "./UploadImage";
import * as ImagePicker from 'expo-image-picker'; 
const moment = require('moment'); 
// import { dirPicutures } from '../../helper/dirStorage';
// import { base64toBlob } from '../../helper/dirStorage'
import * as FileSystem from 'expo-file-system';

import {DOMAIN } from '../../redux/service/index';

class ImageComponent extends React.PureComponent{

    constructor(props){
        super(props); 
        this.state = { 
            title: '',
            image: null,
            listImage: [],
            show:false,
            loading: false,
            loaded: false,
            modalVisible: false, 
            selected: null,
            isUpload: this.props.isUpload?this.props.isUpload:false,
            type: this.props.type?this.props.type:0,
        }
    }  

    convertFile = async (uri) => {  
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
        return base64;  
    }

    // ensureDirAsync = async () => {
    //     const props = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'avatar/');
    //     if (props.exists && props.isDirectory) {
    //         return props;
    //     } 
    //     try {
    //         await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'avatar/', { intermediates: true });
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }

    //     return await this.ensureDirAsync()
    // }

    // getAvatar = async () => {
    //     let dir = await this.ensureDirAsync(),
    //         filename = await FileSystem.readDirectoryAsync(dir.uri),
    //         data = null;
    //     const props = await FileSystem.getInfoAsync(dir.uri + filename[0])
    //     console.log(props)
    //     try {
    //         data = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'avatar/profile');
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    //     console.log(data)
    //     return data;
    // }

    // saveAvatar = async (uri) => {
    //     await FileSystem.moveAsync({
    //       from: uri,
    //       to: FileSystem.documentDirectory + 'avatar/profile'
    //     })
    // }

    isUpload = async (isUpload) => {
        const { listImage} = this.state;
        const { handlePhoto } = this.props;
        handlePhoto(listImage);
        if(isUpload){ 
            await this.handleUploadPhoto(result);
        }
    }


    handleUploadPhoto = async (photo) => { 
        this.setState({loading: true }); 
        let data = await this.convertFile(Platform.OS === "android" ? photo.uri : photo.uri);   
        
        await axios.post(DOMAIN+"upload",{photo:photo,data:data})  
            .then(response => response)
            .then(response => {
                console.log("upload succes", response);
                alert("Upload success!");
                this.setState({ photo: null, loading:false });
            })
            .catch(error => {
                console.log("upload error", error);
                alert("Upload failed!");
            });
    };

    _pickImageFromCamera = async () => {
        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
         
            if (!result.cancelled) { 
                const { listImage, isUpload } = this.state;
                listImage.push(result.uri);
                this.setState({ 
                    image: result.uri,
                    listImage: listImage,
                    show: true,
                });
                this.isUpload(isUpload);
            } 
            // console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    _pickImageFromLibrary = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });  
            if (!result.cancelled) {
                const { listImage, isUpload } = this.state; 
                listImage.push(result.uri);
                this.setState({ 
                    image: result.uri,
                    listImage: listImage,
                    show: true,
                });
                this.isUpload(isUpload);
            }  
        } catch (E) {
            console.log(E);
        }
    };  

    modalImage = () => {
        const { modalVisible, selected } = this.state;
        return ( 
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {Alert.alert("Modal has been closed.");}}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Image</Text>
                    {selected && <Image source={{ uri: selected }} style={{width:250, height:250}} />}
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => {
                            this.setState({modalVisible:!modalVisible});
                        }}>
                    <Text style={styles.textStyle}>Hide Modal</Text>
                    </TouchableHighlight>
                </View>
                </View>
            </Modal>
        );
    }

    loadData = () => {
        const { listImage } = this.state;  
        const { data } = this.props; 
        for (let uri of data){  
            listImage.push(DOMAIN.split('api/')[0] + uri);
        } 
        this.setState({ 
            listImage: listImage,
            loaded: true,
        }); 
    }

    renderItem(obj) {    
        const { modalVisible } = this.state;
        return (
            <TouchableOpacity key={obj} onPress={() => this.setState({
                    modalVisible:!modalVisible,
                    selected:obj.item})}> 
                <Image source={{uri:obj.item}} resizeMode='contain' style={{ width: 120, height: 120,marginTop:0}} />
            </TouchableOpacity>
        )
    }
    buildListImage = () => {
        const { listImage, image } = this.state;  
        let _content = [];
        if(listImage.length > 1){   
            _content = //listImage.map((item) => this.renderItem(item));
            <SafeAreaView style={{flex: 1,paddingVertical:14, paddingHorizontal: 10, borderBottomWidth:0.5,borderBottomColor:"#000"}} key='2'>
                <FlatList key='listImage' 
                        data={listImage}  
                        renderItem={(obj) =>  this.renderItem(obj)} 
                        keyExtractor={(uri, index) =>  `${index}`} 
                        horizontal={true}
            ></FlatList></SafeAreaView>
        }
        return <View style={{flex:1,flexDirection:'row'}}>{_content}</View>;
    }
     

    render(){ 
        const { image, listImage, loading, show } = this.state; 
        const Icon = ({ name }) => (
            <Ionicons style={styles.inputIcon} size={25}
              name={`${Platform.OS === "ios" ? "ios" : "md"}-${name}`}
            />
        )    
        const { loaded, type } = this.state;   
        return(   
                <View style={styles.container}>
                    <TouchableWithoutFeedback  onPress={()=> {this.setState({show:!show})}}>
                    <View style={styles.inputContainer}> 
                        <Icon name="image"/> 
                        {/* <TouchableOpacity style={{flex:1,}}
                                        onPress={() => this.setState({showDatePickerStartTime: !showDatePickerStartTime})}>  
                            <Text style={styles.inputs}
                                placeholder="Friends"
                            >{data.map(friend => friend + ", ")}</Text>
                        </TouchableOpacity>  */} 
                        <UploadImage title={ listImage.length == 0? 'No image' : listImage.length > 1 ? 'There\'re ' + listImage.length + ' image in task' :  type == 0 ?  'There\'is 1 image in task': 'Icon Image'}
                                image={image} listImage={listImage} 
                                pickImageFromCamera={this._pickImageFromCamera} 
                                pickImageFromLibrary={this._pickImageFromLibrary}> 
                        </UploadImage> 
                    </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.centeredView}>
                        {this.modalImage()}
                    </View>
                    { loading ? <ActivityIndicator size="large" color="#0000ff" />:
                        show && 
                        <View style={styles.imageContainer}>
                            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                        </View> } 
                    { !loaded ? this.loadData() : show && this.buildListImage() } 
                </View> 
        );
    }
}

const styles = StyleSheet.create({ 
    container:{
        justifyContent: 'center',
        alignItems: 'center', 
    },
    inputs:{ 
        marginLeft:16, 
        borderBottomColor: '#FFFFFF', 
    },
    scrollViewHorizontal:{
        flex:1,
        paddingRight:5,
        paddingLeft:5,
        padding:8,
    },
    image: {
        backgroundColor:'black',
        width:20, height:20,
        right:0,bottom:0
    },
    titleTopic:{
        margin:2,
        fontWeight:"600", 
        margin: 5,
        marginBottom: 10,
        fontSize: 15,
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
    containerLoading: {
        flex: 1,
        justifyContent: "center"
    },  
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center", 
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
    },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop:15,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
    
});

export default connect()(ImageComponent);