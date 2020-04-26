import React from 'react';
import { StyleSheet, ScrollView , View, ActivityIndicator, TouchableOpacity} from 'react-native'; 
import Category from '../../components/Board/Category' 
import { connect } from 'react-redux'

import { categoryAction } from '../../redux/action/category.action'
import { wait } from '../../helper/wait';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import * as NavigationService from '../../redux/service/navigator.service';

class CategoryScreen extends React.PureComponent{
    
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
    
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //       title: navigation.getParam('Title', 'Default Title'),
    //       //Default Title of ActionBar
    //       headerStyle: {
    //         backgroundColor: navigation.getParam('BackgroundColor', '#ED2525'),
    //         //Background color of ActionBar
    //       },
    //       headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
    //       //Text color of ActionBar
    //     };
    //   };

    constructor(props){
        super(props); 
        this.state = {
            backgroundColor: '', 
            loadedData: false, 
        }
        this.buildContent = this.buildContent.bind(this);
    }

    apply_Orange = () => {
        //Function to change Title, 
        //BackgRound Color and Text Color
        this.props.navigation.setParams({
          Title: 'Orange Activity',
          BackgroundColor: '#FF3D00',
          HeaderTintColor: '#fff',
        });
    };
     
    loadData = async () => {  
        const { navigation, dispatch, category } = this.props; 
        let data = navigation.getParam('data');
        let mapId = data.map(id => id["$oid"]);  
        console.log("category loading ...");

        await dispatch(categoryAction.getByIds(mapId));
        this.setState({
            loadedData: true
        });
        // wait(500).then(() => { 
        //     if (category){
        //         this.setState({
        //             category:  this.props.category ?  this.props.category :[],
        //             loadedData: true,
        //         }); 
        //     }else{
        //         wait(5000).then(() => {
        //             console.log("Time out 404");
        //             this.setState({
        //                 loadedData: true
        //             })
        //         })
        //     }
           
        // }); 
    }

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
                        navigationName:'New Category',   
                        typeCreate:1,
                        dataFriend: filterFriend,
                        backgroundColor:backgroundColor, 
                        headerTintColor: headerTintColor,  })}
                style={[styles.floatingAddButton,{borderWidth:2,borderColor:backgroundColor}]}>
                <Icon name="add"></Icon>
            </TouchableOpacity>
            )
        } 
    }


    buildContent = () => {     
        const { navigation , category} = this.props;
        let nameBoard = navigation.getParam('nameBoard');    
        let _content = [];   
        if (category){
            _content.push(<Category key="cate" title={nameBoard} data={category}>{category.name}</Category>); 
        } 
        return _content;
    }

    render(){   
        const { loadedData } = this.state;
        const { backgroundColor } = this.props;

        const { navigation } = this.props;
        let isRefresh = navigation.getParam('refresh');
        if (isRefresh){
            this.loadData();
            return (<View style={[styles.containerLoading, styles.horizontal]}>
                    <ActivityIndicator size="large" color={backgroundColor}/>
                </View>)
        }
        if (!loadedData) {
            this.loadData();
            return (
                <View key={1} style={[styles.containerLoading, styles.horizontal]}>
                    <ActivityIndicator size="large" color={backgroundColor}  />
                </View>
            )
        } else {  

            return (  
                <View style={styles.container}>
                    <ScrollView >
                        { this.buildContent() }
                    </ScrollView>
                    {this.floatingAddButton()}
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
    }, 
    button: {
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
    const {  backgroundColor,headerTintColor } = store.themeReducer;
    const { category,loadedData } = store.categoryReducer; 
    const { board } = store.boardReducer; 
    return {
        category, board, backgroundColor,headerTintColor, loadedData
    } 
}
  
export default connect(mapStateToProps)(CategoryScreen);