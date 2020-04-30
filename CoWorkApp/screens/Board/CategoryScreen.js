import React from 'react';
import { StyleSheet, SafeAreaView, View, ActivityIndicator, FlatList, TouchableOpacity , RefreshControl} from 'react-native'; 
import Category from '../../components/Board/Category' 
import { connect } from 'react-redux' 
import {AsyncStorage} from 'react-native'
import { categoryAction } from '../../redux/action/category.action'
import { wait } from '../../helper/wait';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import * as NavigationService from '../../redux/service/navigator.service';

class CategoryScreen extends React.Component{
    
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
            loadedData: false, 
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
     
    loadData = async () => {  
        let selectedBoard = JSON.parse(await AsyncStorage.getItem('seletedBoard'));   
        const { board, dispatch, category } = this.props;    
        if (board && selectedBoard) {
            let b = board.find((item) => item[0]['_id']['$oid'] == selectedBoard['_id']['$oid']) 
            if (b[0]) {
                let info = { id: b[0]['_id']['$oid'] }
                console.log("category loading ...");
                dispatch(categoryAction.getByIds(info)); 
                if (category){
                    this.setState({
                        category: category,
                        loadedData: true,
                    });  
                } 
            } else {
                console.log("Error loading..."); 
            } 
        } 
    }

    floatingAddButton = () => {
        const { backgroundColor,headerTintColor, board } = this.props;   
        if (board) {  
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

    onRefresh = () => {   
        this.setState({ loadedData: false });  
        this.loadData();  
        console.log("Refresh ... ");  
    } 

    buildContent = () => {      
        const { navigation, category } = this.props;
        const { loadedData } = this.state;
        let nameBoard = navigation.getParam('nameBoard');    
        let _content = [];   
        if (category){ 
            _content.push(
                <FlatList 
                    key ="cate"
                    data={[category]}
                    renderItem={({item})=> <Category key="cate" title={nameBoard} data={item}>{item.name}</Category>}
                    keyExtractor={(item,index)=> `${index}`}
                    refreshControl={<RefreshControl onRefresh={this.onRefresh}/> }> 
                </FlatList> 
            )
        } 

        return _content
    }

    componentDidMount() {
        this.loadData();
    }

    render(){   
        const { loadedData } = this.state; 
        const { navigation,  backgroundColor, category, loadAgain } = this.props;
        let isRefresh = navigation.getParam('refresh');   
        if (!category) { 
            if (isRefresh) { 
                this.loadData();
            }
            return (
                <View key={1} style={[styles.containerLoading, styles.horizontal]}>
                    <ActivityIndicator size="large" color={backgroundColor}  />
                </View>
            )
        } else { 
            return (  
                <View style={styles.container}>
                    <SafeAreaView >
                        { this.buildContent() }
                    </SafeAreaView>
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
    const { category, loadAgain } = store.categoryReducer;  
    const { board } = store.boardReducer; 
    return {
        category, board, backgroundColor,headerTintColor, loadAgain
    } 
}
  
export default connect(mapStateToProps)(CategoryScreen);