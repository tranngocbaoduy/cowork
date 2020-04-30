import { NativeModules, NativeEventEmitter } from 'react-native';
import BleManager from 'react-native-ble-manager';
import React from 'react';
import { Text, View } from 'react-native';
// import BleManager from 'react-native-ble-manager';
import { NativeAppEventEmitter } from 'react-native'

// const BleManagerModule = NativeModules.BleManager;
// const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default class Beacon extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      peripherals: new Map(),
    };
  }
  

  componentDidMount() {
  
  
    // console.log(BleManager.start(),'BleManager');
    this.handlerDiscover = NativeAppEventEmitter.addListener( 
      'BleManagerDiscoverPeripheral',(data) => 
      this.handleDiscoverPeripheral(data)
    );
    BleManager.start({ showAlert: false })
    .then((data) => {
      // Success code
      console.log('Module initialized',data);
    }).catch((err) => {
      console.log(err);
    });
    // this.scanForDevices(); // I chose to start scanning for devices here

    // this.handlerStop = NativeAppEventEmitter.addListener(
    //   'BleManagerStopScan',
    //   this.handleStopScan()
    // );

   
  }

  scanForDevices() {
    BleManager.scan([], 15);
  }

  handleDiscoverPeripheral = (peripheral) => {
    const { peripherals } = this.state;

    if (peripheral.name) {
      peripherals.set(peripheral.id, peripheral.name);
    }
    this.setState({ peripherals });
  };

  handleStopScan = () => {
    console.log('Scan is stopped. Devices: ', this.state.peripherals);
  }

  render(){
    return(
      <View >
        <Text >as</Text>
      </View>
    )
  }
}