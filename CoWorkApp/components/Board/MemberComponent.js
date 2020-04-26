import React from 'react'
import {Text, View, StyleSheet,Image, ScrollView, Button, TouchableHighlight} from 'react-native' 
import { CheckBox } from 'react-native-elements'
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import DropDownItem from 'react-native-drop-down-item';

var moment = require('moment');

const IC_ARR_DOWN = require('../../assets/icons/ic_arr_down.png');
const IC_ARR_UP = require('../../assets/icons/ic_arr_up.png');
class MemberComponent extends React.Component{

    constructor(props){
        super(props); 
        this.state = { 
            text: '',
            checked: false,
            friend: this.props.data,
            friendJoin: this.props.dataJoin,
            checked: this.props.data.map((item)=> this.props.dataJoin.includes(item)),
        }
    }

    changeOption = (i) => {
        const { checked} = this.state;
        const { changeOptionFriend } = this.props;
        checked[i] = !checked[i]; 
        changeOptionFriend(i);
        this.setState({checked: checked});
    }

    buildContent = () => {  
        const { friend, friendJoin, checked } = this.state;    
        // console.log(checked,friendJoin, friend);
        let _friend = friend.map((param, i) => { 
            return ( 
                <View key={i} >
                    <Text style={[{fontSize: 15, height:30},]}>
                        <CheckBox 
                            checkedIcon={<Image style={{ width: 20, height: 20, marginTop:8  }} source={require('../../assets/icons/checked_icon.png')} />}
                            uncheckedIcon={<Image  style={{ width: 20, height: 20, marginTop:8 }} source={require('../../assets/icons/unchecked_icon.png')} />}
                            checked={checked[i]}
                            onPress={() => this.changeOption(i)}
                        />{param} 
                    </Text>
                </View> 
            )});
        return (<View style={styles.container}>
            <ScrollView style={{ alignSelf: 'stretch' }}>
            {
                friend? 
                    <DropDownItem 
                        style={styles.dropDownItem}
                        contentVisible={false}
                        invisibleImage={IC_ARR_DOWN}
                        visibleImage={IC_ARR_UP}
                        header={<View style={styles.header}> 
                            <Text style={{fontSize: 15,color: 'black',}}>
                                {friend.filter((person, i) => checked[i] ).map((person) => person + ', ') }</Text>
                        </View>}>   
                        {_friend}
                    </DropDownItem> 
                : null
            } 
            </ScrollView>
        </View>); 
    }
 
    render(){ 
        const { data, friend } = this.props; 
        const Icon = ({ name }) => (
            <Ionicons style={styles.inputIcon} size={25}
              name={`${Platform.OS === "ios" ? "ios" : "md"}-${name}`}
            />
        )   
        return(  
            <View style={styles.inputContainer}> 
                <Icon name="people"/>  
                {this.buildContent()} 
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    dropDownItem:{
    //   paddingHorizontal:10,  
    },
    container:{
        flex:1,
        // justifyContent:'center',
        paddingHorizontal: 8, 
        paddingVertical: 12,
        paddingBottom: 15,
        // paddingTop: -3,
        // paddingBottom: 4, 
        // backgroundColor:'#ffffff',  
        // flexDirection:'column',
        // justifyContent:'flex-start',   
    },
    txt:{ 
        color: 'rgb(74,74,74)',
    },
    inputs:{ 
        // marginLeft:16, 
        borderBottomColor: '#FFFFFF', 
    }, 
    header: {
        width: '100%',  
        paddingHorizontal: 8,
        flexWrap: 'wrap', 
        color: 'rgb(74,74,74)',
        flexDirection: 'row',
        alignItems: 'center', 
    },
        headerTxt: {
        fontSize: 12,
        color: 'rgb(74,74,74)',
        marginRight: 60,
        flexWrap: 'wrap',
    },   
    inputContainer: {
        flex:1, 
        backgroundColor: '#FFFFFF', 
        borderBottomWidth: 1,  
        marginBottom:5, 
        marginHorizontal:2,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputIcon:{
        width:30, 
        height:50,
        marginLeft:15,
        paddingVertical:10,
        alignItems:'center',
        justifyContent: 'center'
    },
});

function mapStateToProps(store) {
    const { friend } = store.boardReducer; 
    return {
        friend,
    }
}

export default connect(mapStateToProps)(MemberComponent);