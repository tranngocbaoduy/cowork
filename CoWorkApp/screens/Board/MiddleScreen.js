import React from 'react';
import { StyleSheet, ScrollView , View, ActivityIndicator, Text} from 'react-native'; 
import Task from '../../components/Board/Task'
import { wait } from '../../helper/wait';
import { taskAction } from '../../redux/action/task.action'
import { connect } from 'react-redux'
import NewBoardComponent from '../../components/Board/NewBoardComponent';
import NewCategoryComponent from '../../components/Board/NewCategoryComponent';
import NewTaskComponent from '../../components/Board/NewTaskComponent';

class MiddleScreen extends React.PureComponent{
    
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
    

    buildContent(){ 
        const { task, navigation } = this.props;   
        let dataFriend = navigation.getParam('dataFriend');  
        let typeCreate = navigation.getParam('typeCreate');   
        let _content = [];   
        if(typeCreate == 0){
            _content.push(<NewBoardComponent key='1' dataFriend={dataFriend} data={task}>Task</NewBoardComponent>);
        }else if(typeCreate == 1){
            _content.push(<NewCategoryComponent key='1' dataFriend={dataFriend} data={task}>Task</NewCategoryComponent>);
        } else if(typeCreate == 2){
            _content.push(<NewTaskComponent key='1' dataFriend={dataFriend} data={task}>Task</NewTaskComponent>);
        } 
        return _content;
    }

  
    loadData = async () => {   
        await wait(200).then(() => { 
            this.setState({ 
                loadedData: true,
            }); 
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
                <ScrollView style={styles.container}>
                    {this.buildContent()} 
                </ScrollView>
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
});

function mapStateToProps(store) { 
    const { backgroundColor, headerTintColor } = store.themeReducer;
    const { task } = store.taskReducer; 
    return {
        backgroundColor, headerTintColor,task
    } 
}
   
export default connect(mapStateToProps)(MiddleScreen);