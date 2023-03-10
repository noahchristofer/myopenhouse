import React,{useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigations';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/Store';
import { getStatusBarHeight } from "react-native-status-bar-height";

const App = () => {
  useEffect(()=>{
    global.statusBarHeight = getStatusBarHeight()
  },[])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>

  );
};
export default App;
