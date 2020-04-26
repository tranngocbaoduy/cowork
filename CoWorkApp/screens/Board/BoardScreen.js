import React from 'react';
import { StyleSheet, Alert , SafeAreaView, View, ActivityIndicator, RefreshControl, FlatList, TouchableOpacity, Image} from 'react-native';
import Board from '../../components/Board/Board'
import SearchInBoard from '../../components/Board/SearchInBoard'
import {connect} from 'react-redux'; 
import * as NavigationService from '../../redux/service/navigator.service'; 
import { wait } from '../../helper/wait'
import { isEmpty } from '../../helper/String' 
import { boardAction } from '../../redux/action/board.action';
import { AsyncStorage } from 'react-native'; 
import Ionicons from 'react-native-vector-icons/Ionicons'; 

class BoardScreen extends React.PureComponent{
  
    static navigationOptions = ({navigation}) => {   
        return {
            title: navigation.getParam('Title', 'Board'), 
            headerStyle: {
                backgroundColor: navigation.getParam('BackgroundColor'), 
            },
            headerTintColor: navigation.getParam('HeaderTintColor'), 
        };
    }; 

    constructor(props) {
        super(props);
        this.state = {
            keyWord: '',
            loadedData: false,
            dataSearch:[],
            backgroundColorState: '',
            dataAll:[],
            dataRecent:[],
            dataSearch:[],
            closeSearch: true,
            content: [],  

        }
    }

    checkMode(){ 
        wait(100).then(() => {
            this.setState({backgroundColor:this.props.backgroundColor});
            const { headerTintColor, backgroundColor, navigationName } = this.props;  
            this.props.navigation.setParams({
                Title: 'Board',
                BackgroundColor: backgroundColor,
                HeaderTintColor: headerTintColor,
            }); 
        }) 
    }   

    onSearch = (keyWord) => {
        let dataFilter = [];
        let isClose = true;
        const { dataAll } = this.state; 
        dataFilter = isEmpty(keyWord) ? dataAll : dataAll.filter((item) => item.name.toLowerCase().startsWith(keyWord.toLowerCase()));
        isClose = isEmpty(keyWord) ? true: false;
        this.setState({
            keyWord: keyWord,
            dataSearch: dataFilter,
            closeSearch: isClose,
        });
    }

    handleCloseSearch = () => { 
        this.setState({
            keyWord:'',
            closeSearch: true,
        });
    }
    
    chooseBoard = async (idBoard) => {  
        const { dataRecent, dataAll } = this.state; 
        let selectedBoard = await dataAll.find(item=>item.id_board === idBoard);
        await AsyncStorage.setItem('seletedBoard', JSON.stringify(selectedBoard));  
        let isExist = dataRecent.find(item => item.id_board === idBoard); 
        if (!isExist){ 
            if( dataRecent.length > 2){
                dataRecent.shift();
            } 
         
            dataRecent.push(dataAll.find(item=>item.id_board === idBoard));
            this.setState(prevState => ({
                ...prevState.dataRecent, 
                dataRecent: dataRecent, 
            }));
        }
        return new Promise((resolve) => true);
    }

    loadData = async () => { 
        const { dispatch, board } = this.props;  
        const { loadedData } = this.state;    
        await dispatch(boardAction.getAll({"username":"admin"}));  
        console.log('Loading data...'); 
        wait(200).then(() => {   
            if (board){  
                console.log('Update data...');
                this.setState({dataAll: board.map(b => b[0]),loadedData: true});  
            }else{
                wait(5000).then(() => {
                    console.log("Time out 404");
                    this.setState({
                        loadedData: true
                    })
                })
            } 
        });       
    }

    onRefresh = () => {   
        this.setState({loadedData: false});  
        console.log("Refresh ... ");  
    } 

    floatingAddButton = () => {
        const { backgroundColor,headerTintColor, board } = this.props; 
        if (board && board.length > 0){ 
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
                        navigationName:'Create New Board',  
                        typeCreate:0,
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
        const { dataAll, dataRecent, keyWord, dataSearch, closeSearch, loadedData } = this.state;
        let _content = [];  
        let sp = [];
        sp.push(<SearchInBoard keyWord={keyWord} 
            handleCloseSearch={this.handleCloseSearch} 
            onSearch={(keyWord) => this.onSearch(keyWord)} 
            style={styles.search} key='1'
            closeSearch={closeSearch}></SearchInBoard>)
        _content.push(<SafeAreaView key='4'>{sp}</SafeAreaView>);
        _content.push(!isEmpty(keyWord) && <Board  style={styles.containerInfo} key='2' title="Search board" onChoose={this.chooseBoard} data={dataSearch}></Board>);  
        _content.push(isEmpty(keyWord) &&<Board  style={styles.containerInfo} key='2' title="Recent board" onChoose={this.chooseBoard} data={dataRecent}></Board>);  
        _content.push(isEmpty(keyWord) &&<Board style={styles.containerInfo} key='3' title="All your board" onChoose={this.chooseBoard} data={dataAll}></Board>);  
        

        return(
        <View key='board' style={styles.container}>
            <SafeAreaView>
                <FlatList 
                    data={_content}
                    renderItem={({item})=> (item)}
                    keyExtractor={(item,index)=> `${index}`}
                    refreshControl={<RefreshControl refreshing={!loadedData} onRefresh={this.onRefresh}/> }> 
                </FlatList> 
            </SafeAreaView> 
            {this.floatingAddButton()}
        </View>
        ) 
    }

    componentDidMount(){
        const { backgroundColorState, loadedData } = this.state; 
        const { backgroundColor } = this.props; 
        if (loadedData){
            let isRefresh = this.props.navigate.getParam('refresh');
            if(isRefresh){
                this.setState({
                    loadedData: true
                });
            }
        }
     
        if( backgroundColorState != backgroundColor){
            this.checkMode();
        }
    }

    render(){     
        const { loadedData } = this.state;  
        const { backgroundColor, board } = this.props; 
        if (!loadedData || !board){
            this.loadData();
            return (
            <View style={[styles.containerLoading, styles.horizontal]}>
                <ActivityIndicator size="large" color={backgroundColor}/>
            </View>)
        } else {
            return (this.buildContent() );
        } 
    };
}  

const styles = StyleSheet.create({ 
    container:{
        backgroundColor:"#fff", 
        flex:1,
        paddingVertical:4,
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
    containerInfo:{   
        flexDirection: 'row',
        shadowRadius:10,
        shadowOpacity:0.2, 
        shadowOffset:{width:0,height:0},  
        borderRadius:6,
        marginHorizontal:10, 
        backgroundColor: "#fff", 
 
    },
    search:{ 
        flex:1,
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
    const { data, loading, board } = store.boardReducer; 
    console.log("Length board",board?board.length:null);
    return {
        backgroundColor, headerTintColor, loading, data, board
    }
}
 
export default connect(mapStateToProps)(BoardScreen);