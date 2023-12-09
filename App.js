import React from 'react';
import Routes from './src/routes';
import { Provider } from "react-redux";
import configureStore from './src/store/reducer';
import GilroyFontLoader from './src/theme/fontLoader';
import Toast from './src/components/Toast';


const store = configureStore()

export default function App() {
  return (
    <GilroyFontLoader>
      <Provider store={store}>
        <Routes />
        <Toast />
      </Provider>
    </GilroyFontLoader>
  );
}

