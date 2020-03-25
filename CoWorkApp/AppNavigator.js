import React from 'react'; 
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';

import HomeScreen from './screens/Home/HomeScreen'
import AccountScreen from './screens/Account/AccountScreen'
import BoardScreen from './screens/Board/BoardScreen'
import NotificationScreen from './screens/Notification/NotificationScreen'
import SearchScreen from './screens/Search/SearchScreen'
import LoginScreen from './screens/Authentication/LoginScreen'
import SignUpScreen from './screens/Authentication/SignUpScreen'
import AuthLoadingScreen from './screens/Authentication/AuthLoadingScreen'
 
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

const LoginStack = createStackNavigator({
  LoginScreen,
  SignUpScreen
},{ 
  headerMode: 'none',
  navigationOptions: setNavigationOptions("Welcome to CoWork")
}); 
 
const HomeStack = createStackNavigator({
  HomeScreen,
},{
 navigationOptions: setNavigationOptions("Home")
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


const AuthStack = createStackNavigator({ LoginStack, });

const check = createSwitchNavigator(
  { 
    AuthLoading: AuthLoadingScreen,
    App: AppNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
 
// function mapStateToProps(store) {
//   const { loggedIn } = store.accountReducer;     
//   return { 
//       loggedIn,
//   };
// } 

export default connect(null)(check);