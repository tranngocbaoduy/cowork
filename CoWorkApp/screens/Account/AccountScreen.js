import React from 'react';
import { StyleSheet, View , Text, InteractionManager} from 'react-native';
import Account from '../../components/Account/Account'
import ChangeLayout from '../../components/Account/ChangeLayout'
import { themeActions } from '../../redux/action/theme.action'
import {connect} from 'react-redux'
import { wait } from '../../helper/wait'

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
       
    buildContent(){ 
        let _content = [];
        _content.push(<Account key='1'></Account>)
        _content.push(<ChangeLayout onChangeLayout={this.applyMode} key='2'></ChangeLayout>)
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
    container: {
      flex: 1, 
      backgroundColor: '#DCDCDC',
    }
});


function mapStateToProps(store) { 
    const { backgroundColor, headerTintColor, loading } = store.themeReducer;
    return {
        backgroundColor, headerTintColor, loading
    } 
}
  
export default connect(mapStateToProps)(AccountScreen);