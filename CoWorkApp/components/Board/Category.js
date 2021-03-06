import React from 'react'
import {Text, View, StyleSheet,FlatList } from 'react-native' 
import CategoryComponent from './CategoryComponent'
import { connect } from 'react-redux'
    
class Category extends React.Component{

    constructor(props){
        super(props); 
    }

    buildContent = () => {
        const { data, resultSearch } = this.props; 
        let _content = [];  
        if (data){
            if(data.length == 0){
                if (resultSearch) {
                    _content.push(<Text key="1">{resultSearch}</Text>)
                } else { 
                    _content.push(<Text key="1">No category. Create a new one !!!</Text>)
                } 
            } else {
                for (let index in data){
                    _content.push(<CategoryComponent
                        key={index} 
                        data={data[index]} ></CategoryComponent>)
                }  
            }
        }
    
        return _content;
    }
 
    render(){ 
        const { title } = this.props; 
        return(
            <View style={styles.container}> 
               <Text style={styles.titleTopic}>{title}</Text>
               <View style={styles.containerBoard} >
                   {this.buildContent()}
               </View>
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
        // shadowOpacity:0.3,,
        // height:'auto',
        flexDirection:'column',
        justifyContent:'flex-start',  
        // alignItems:'flex-start'
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
        // marginLeft:5,
        // marginRight:5,
        // padding:8, 
        justifyContent:'flex-start', 
    }
});

function mapStateToProps(store) {
    const { category } = store.categoryReducer;
    return {
        category
    } 
}
export default connect()(Category);