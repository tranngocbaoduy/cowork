import React from 'react';
import { StyleSheet, ScrollView , Text, TouchableOpacity} from 'react-native'; 
import TaskDetail from '../../components/Board/TaskDetail'
import { connect } from 'react-redux'

class TaskDetailScreen extends React.PureComponent{
    
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
        const { navigation } = this.props; 
        let data = navigation.getParam('data');  
        let _content = []; 
        _content.push(<TaskDetail key='1' title={data.name} data={data}>{data.name}</TaskDetail>);
        return _content;
    }

    render(){  
        return (
            <ScrollView style={styles.container}>
                {this.buildContent()} 
                {/* <TouchableOpacity
                    onPress={this.apply_Orange}
                    activeOpacity={0.7}
                    style={styles.button}>
                    <Text style={styles.TextStyle}> APPLY YELLOW COLOR </Text>
                </TouchableOpacity> */}

            </ScrollView> 
        );
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
        // marginVertical:15, 
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

// function mapStateToProps(store) { 
//     const { backgroundColor, headerTintColor } = store.themeReducer;
//     return {
//         backgroundColor, headerTintColor
//     } 
// }
  
export default connect()(TaskDetailScreen);