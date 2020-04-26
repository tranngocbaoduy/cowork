import React from 'react';
import { StyleSheet, ScrollView , View, ActivityIndicator, TouchableOpacity} from 'react-native'; 
import Task from '../../components/Board/Task'

import { wait } from '../../helper/wait';
import { taskAction } from '../../redux/action/task.action';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { AsyncStorage } from 'react-native';
import * as NavigationService from '../../redux/service/navigator.service'; 

class TaskScreen extends React.PureComponent{
    
    static navigationOptions = ({navigation}) => {     
        const { headerTintColor, backgroundColor, navigationName} = navigation.state.params;  
        return {
            title: navigation.getParam('Title', navigationName), 
            headerStyle: {
                backgroundColor: navigation.getParam('BackgroundColor', backgroundColor), 
            },
            headerTintColor: navigation.getParam('HeaderTintColor', headerTintColor), 
        };
    }; 

    constructor(props){
        super(props); 
        this.state = {
            backgroundColor: '',
            loadedData:false,
        }
        this.buildContent = this.buildContent.bind(this);
    }

    apply_Orange = () => { 
        this.props.navigation.setParams({
          Title: 'Orange Activity',
          BackgroundColor: '#FF3D00',
          HeaderTintColor: '#fff',
        });
    };

    floatingAddButton = () => {
        const { backgroundColor,headerTintColor, board } = this.props;  
        if (board){ 
            let filterFriend = []; 
            board.reduce((res,item) => res.concat(item[0].list_user),[])
                .filter(item=> filterFriend.includes(item)? null : filterFriend.push(item)); 
            const Icon = ({ name }) => (
                <Ionicons style={{backgroundColor:headerTintColor,color:backgroundColor, borderRadius:10}} size={38}
                name={`${Platform.OS === "ios" ? "ios" : "md"}-${name}`}
                />
            )    
            return(
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>  
                    NavigationService.navigate('MiddleScreen', {
                        navigationName:'New Task',   
                        typeCreate:2,
                        dataFriend: filterFriend,
                        backgroundColor:backgroundColor, 
                        headerTintColor: headerTintColor,  })}
                style={[styles.floatingAddButton,{borderWidth:2,borderColor:backgroundColor}]}>
                <Icon name="add"></Icon>
            </TouchableOpacity>
            )
        } 
    }

    

    buildContent(){ 
        const { task, navigation } = this.props;   
        let nameCategory = navigation.getParam('nameCategory');  
        let _content = []; 
        _content.push(<Task key='1' title={nameCategory} data={task}>Task</Task>);
        return _content;
    }

  
    loadData = async () => {  
        const { navigation, dispatch, task } = this.props; 
        let data = navigation.getParam('data');    
        let mapId = data.map(id => id["$oid"]);  
        console.log("Task loading ...");
        await dispatch(taskAction.getByIds(mapId));
        wait(200).then(() => {
            if(task){  
                this.setState({
                    task:task,
                    loadedData: true,
                });
            }
        }); 
    }

    render(){   
        const { loadedData } = this.state; 
        const { backgroundColor } = this.props;
        if (!loadedData){
            this.loadData();
            return (<View style={[styles.containerLoading, styles.horizontal]}><ActivityIndicator size="large" color={backgroundColor} /></View>)
        } else {
            return (
                <View style={styles.container}>

                    <ScrollView >
                        {this.buildContent()}
                    </ScrollView>
                    {this.floatingAddButton() }
                </View> 
            );
        }  
    };
}  

const styles = StyleSheet.create({ 
    container:{
        backgroundColor:"#fff", 
        flex:1,
        paddingVertical:4,
    }, button: {
        width: '100%',
        height: 40,
        padding: 10,
        backgroundColor: '#808080',
        borderRadius: 2,
        marginTop: 12,
    }, 
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
    },
    containerInfo:{   
        flexDirection: 'row',
        shadowRadius:10,
        shadowOpacity:0.2, 
        shadowOffset:{width:0,height:0},  
        borderRadius:6,
        marginHorizontal:10, 
        backgroundColor: "#fff", 
 
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
});

function mapStateToProps(store) { 
    const { backgroundColor, headerTintColor } = store.themeReducer;
    const { task } = store.taskReducer; 
    const { board } = store.boardReducer; 
    return {
        backgroundColor, headerTintColor,task, board
    } 
}
   
export default connect(mapStateToProps)(TaskScreen);