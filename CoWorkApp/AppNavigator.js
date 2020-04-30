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
import CategoryScreen from './screens/Board/CategoryScreen'
import TaskScreen from './screens/Board/TaskScreen'
import TaskDetailScreen from './screens/Board/TaskDetailScreen'
import MiddleScreen from './screens/Board/MiddleScreen'
import { themeConstants } from './redux/constant/theme.constant'
 
import Ionicons from 'react-native-vector-icons/Ionicons';  
import IconWithBadge from './helper/IconWithBadge'
import { connect } from 'react-redux'
import { store } from './redux/store'

// backgroundColor: "#FFAA53", 
// headerTintColor: "#fff", 

const setNavigationOptions = (title) => {  
 
  const { headerTintColor, backgroundColor} = store.getState().themeReducer;   
  return {
    title: title,  
    // headerStyle: {
    //     backgroundColor: backgroundColor, 
    // }, 
    // headerTintColor: headerTintColor,
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
  HomeScreen : {
    screen: HomeScreen,
    navigationOptions: setNavigationOptions("Home")
  },
},{
  navigationOptions: {
    title: "Home"
  }
});

const AccountStack = createStackNavigator({
  AccountScreen: {
    screen: AccountScreen,
    navigationOptions: setNavigationOptions("Account")
  }
},{
  navigationOptions: {
    title: "Account"
  }
});

const BoardStack = createStackNavigator({
  BoardScreen:{
    screen: BoardScreen,
    // navigationOptions: setNavigationOptions("Board")
  },
  CategoryScreen:{
    screen: CategoryScreen,
    // navigationOptions: setNavigationOptions("Category")
  }, 
  TaskScreen:{
    screen: TaskScreen,
    // navigationOptions: setNavigationOptions("Category")
  },
  TaskDetailScreen:{
    screen: TaskDetailScreen,
    // navigationOptions: setNavigationOptions("Category")
  },
  MiddleScreen:{
    screen: MiddleScreen,
    // navigationOptions: setNavigationOptions("Category")
  }
},{
  navigationOptions: {
    title: "Board"
  }
});

const SearchStack = createStackNavigator({
  SearchScreen:{
    screen: SearchScreen,
    navigationOptions: setNavigationOptions("Search")
  },
},{
  navigationOptions: {
    title: "Search"
  }
});

const NotificationStack = createStackNavigator({
  NotificationScreen:{
    screen: NotificationScreen,
    navigationOptions: setNavigationOptions("Notification")
  }
},{
  navigationOptions: {
    title: "Notify"
  }
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
      //     // backgroundColor:"blue"
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

function mapStateToProps(store){
  const { mode } = store.themeReducer;  
  return {
    mode
  } 
}
export default connect(mapStateToProps)(check);