import React from 'react'; 
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';

import HomeScreen from './screens/HomeScreen'
import AccountScreen from './screens/AccountScreen'
import BoardScreen from './screens/BoardScreen'
import NotificationScreen from './screens/NotificationScreen'
import SearchScreen from './screens/SearchScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'

import { store } from './redux/store'
import { themeConstants } from './redux/constant/theme.constant'

import Ionicons from 'react-native-vector-icons/Ionicons';  
import IconWithBadge from './helper/IconWithBadge'
import { connect } from 'react-redux'

const setNavigationOptions = (title) => { 
  const mode = themeConstants.DARK; 
  if( mode === themeConstants.DARK){
    return {
      title: title,
      backgroundColor: "#fff",
      color: "#000"
    }
  }else{
    return {
      title: title,
      backgroundColor: "#000",
      color: "#fff"
    }
  }
}

function isLoginNavigate(){ 
  const { loggedIn } =store.getState().accountReducer;
  return loggedIn ? {HomeScreen, LoginScreen, SignUpScreen}: {LoginScreen,HomeScreen,SignUpScreen};
}

function isLoginOption(){ 
  const { loggedIn } =store.getState().accountReducer;
  return loggedIn ? {}: {
    headerShown: false,
    tabBarVisible :false,
  };
}

const HomeStack = createStackNavigator(
  isLoginNavigate(),{navigationOptions: 
    isLoginOption()
});

const AccountStack = createStackNavigator({
     AccountScreen,
   },{
    navigationOptions: setNavigationOptions("Account")
 });

const BoardStack = createStackNavigator({
    BoardScreen,
   },{
    navigationOptions: setNavigationOptions("Board")
 });

const SearchStack = createStackNavigator({
  SearchScreen,
 },{ 
  navigationOptions: setNavigationOptions("Search")
});

const NotificationStack = createStackNavigator({
  NotificationScreen,
 },{
  navigationOptions: setNavigationOptions("Notification")
});

const HomeIconWithBadge = props => {
  return <IconWithBadge {...props} badgeCount={3} />;
}; 

const AppNavigator = createBottomTabNavigator(
    { 
    HomeStack,
    BoardStack,
    SearchStack,
    NotificationStack,
    AccountStack, 
  },
  {
    defaultNavigationOptions: ({navigation})=>({
      tabBarLabel: navigation.tabBarLabel, 
      // tabBarOptions: {
      //   activeTintColor: 'tomato',
      //   inactiveTintColor: 'gray',
      //   style:{
      //     backgroundColor:"blue"
      //   }
      // },
      tabBarOptions: setNavigationOptions("Home"),
      tabBarIcon:({ focused, horizontal, tintColor }) =>{
        const { routeName } = navigation.state;  
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'BoardStack') {
          iconName = `ios-leaf`; 
          IconComponent = HomeIconWithBadge
        } else if (routeName === 'HomeStack') {
          iconName = `ios-bookmark`;
        } else if (routeName === 'AccountStack') {
          iconName = `ios-planet`;
        } else if (routeName === 'NotificationStack') {
          iconName = `ios-alarm`;
        } else if (routeName === 'SearchStack') {
          iconName = `ios-search`;
        } 
        // You can return any component that you like here!
        return <IconComponent name={iconName} size={26} color={tintColor} />;
      }, 
    })
});
  
function mapStateToProps(store) {
  const { loggedIn } = store.accountReducer;     
  return { 
      loggedIn,
  };
} 

export default connect(mapStateToProps)(AppNavigator);