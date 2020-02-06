import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { connect, Provider} from 'react-redux'

import AppNavigator from './AppNavigator'

import { store } from './redux/store'

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component{ 

  constructor(props){
    super(props); 
    this.state = { 
    } 
  }

  render(){ 
    return ( 
      <Provider store={store}>  
        <AppContainer/>  
      </Provider>
    );
  };
}   

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
