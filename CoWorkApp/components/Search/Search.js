import React, { useCallback } from 'react'
import {Text, View, SafeAreaView, FlatList, StyleSheet, RefreshControl} from 'react-native';
import SearchBar from "./SearchBar";
import SearchRecentList from "./SearchRecentList";
import {connect} from 'react-redux'
import { boardAction } from '../../redux/action/board.action';
import { categoryAction } from '../../redux/action/category.action';
import { taskAction } from '../../redux/action/task.action';
import Category from '../../components/Board/Category' 
import Board from '../../components/Board/Board' 
import Task from '../../components/Board/Task' 
import { wait } from '../../helper/wait';
import _ from 'lodash';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            closeSearch: true,
            show:false,
        }; 
        this.handleSearch = _.debounce(this.handleSearch, 1000);  
    }

    _closeSearch = () => { 
        this.setState({ 
            closeSearch: true,
            text: '' 
        });
    }

    onChoose = (id) => {
        console.log("Choose", id);
        return new Promise((resolve) => true);
    }

    searchAll = async (query) => { 
        const { dispatch, user } = this.props;
        if (user) {
            dispatch(boardAction.searchAll({"username":user.username,query:query})); 
        } else {
            console.log("No user found");
        }
    }  

    // debounce = (func, wait) => {
    //     var timeout;
      
    //     return function() {
    //       var context = this,
    //           args = arguments;
      
    //       var executeFunction = function() {
    //         func.apply(context, args);
    //       };
      
    //       clearTimeout(timeout);
    //       timeout = setTimeout(executeFunction, wait);
    //     };
    // };

    handleSearch = (query) => {   
        this.setState({ show: true }); 
        this.searchAll(query);  
        // this.viewSearch();
    }

    viewSearch = () => {
        const { searchData } = this.props; 
        let _content = []  
        if (searchData) { 
            let board = searchData.board;
            let category = searchData.category;
            let task = searchData.task;

            if (category && category.length > 0) { 
                _content.push( <Category key="cate" title={'Category'} data={category}>{category.name}</Category>)
            }
            else {
                _content.push(<Category key="cate" resultSearch="Can't match with any category. Try create now !!" title={'Category'} data={[]}></Category>)
            } 
                
            if (board && board.length > 0) { 
                _content.push( 
                    <Board onChoose={this.onChoose} key="board" title={'Board'} data={board}>{board.name}</Board>   
                )
            }
            else {
                _content.push(<Board key="board" title={'Board'} data={[]} resultSearch="Not find any board. Try create now !!"></Board>)
            }

            if (task && task.length > 0) {   
                _content.push( <Task key="task" title={'Task'} data={task}>{task.name}</Task>)
            } else {
                _content.push( <Task key="task" title={'Task'} data={[]}  resultSearch="Can't match with any task. Try create now !!"></Task>)
            }    
        } else {
            _content.push( <Task key="task" title={'Not found'} data={[]}  resultSearch="Not found. Try create new one now !!"></Task>)
        } 
        return _content;
    } 

    render() {
        const { text, closeSearch, show } = this.state;
        const { category, backgroundColor, searchData } = this.props; 
        console.log(searchData)
        return (
            <View style={styles.container}>
                <SearchBar  onSearch={(keyword) => this.handleSearch(keyword)} closeSearch={closeSearch} handleCloseSearch={this._closeSearch}/> 
                {/* { !closeSearch && (text === '' && <SearchRecentList style={styles.searchContainer} /> || <SearchResultList style={styles.searchContainer}/>) } */}
                {show && 
                    <SafeAreaView>
                        {searchData && this.viewSearch()}
                    </SafeAreaView>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        // shadowOpacity:0.3,
        borderRadius: 3,
        // position: 'absolute',
        // zIndex:1,
        right:0,
        left:0, 
        shadowOffset: {width: 0, height: 0}, 
    },
    searchContainer:{ 
        zIndex: 2,
        position: 'absolute',
    },
    text: {
        margin: 2,
        fontWeight: "500",
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
    const { board, searchData } = store.boardReducer;
    const { category } = store.categoryReducer;
    const { task } = store.taskReducer;
    const { user } = store.accountReducer;
    return {
        backgroundColor, headerTintColor, board, category, task, searchData, user
    } 
}
   
export default connect(mapStateToProps)(Search);