import React from 'react';
import { StyleSheet, View , Text, InteractionManager} from 'react-native';
import { themeActions } from '../../redux/action/theme.action'
import {connect} from 'react-redux'
import { wait } from '../../helper/wait'

import Account from '../../components/Account/Account'
import ChangeLayout from '../../components/Account/ChangeLayout'
import AppInfo from '../../components/Account/AppInfo'
import UserInfor from '../../components/Account/UserInfor'


class AccountScreen extends React.Component{
 
    static navigationOptions = ({navigation}) => { 
        return {
            title: navigation.getParam('Title', 'Account'), 
            headerStyle: {
                backgroundColor: navigation.getParam('BackgroundColor'), 
            },
            headerTintColor: navigation.getParam('HeaderTintColor'), 
        };
    }; 

    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: '',
        }
    } 

    applyMode = (mode) => {  
        console.log("interface",mode);
        const { dispatch } = this.props;
        dispatch(themeActions.changeMode(mode));
        wait(100).then(() => {
            this.changeLayout();
        }) 
    };

    changeLayout = () => {
        const { headerTintColor, backgroundColor, navigationName } = this.props;  
        this.props.navigation.setParams({
            Title: 'Board',
            BackgroundColor: backgroundColor,
            HeaderTintColor: headerTintColor,
        }); 
    }

    componentDidMount(){
        this.changeLayout();
    }
       
    buildContent() { 
        let _content = [];
        _content.push(<UserInfor key='2'></UserInfor>)
        _content.push(<Account key='1'></Account>) 
        _content.push(<AppInfo onChangeLayout={this.applyMode} key='3'></AppInfo>)
        return _content
    }

    render(){  
        return (
            <View style={styles.container}>
                {this.buildContent()} 
            </View> 
        );
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
    containerInfo: {
        flexDirection: 'row',
        shadowRadius: 10,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 0 },
        borderRadius: 6,
        marginHorizontal: 10,
        backgroundColor: "#fff",
    }
});

function mapStateToProps(store) { 
    const { backgroundColor, headerTintColor, loading } = store.themeReducer;
    return {
        backgroundColor, headerTintColor, loading
    } 
}
  
export default connect(mapStateToProps)(AccountScreen);