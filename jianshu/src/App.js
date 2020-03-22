import React from 'react';
import { Provider } from 'react-redux';
import Header from './common/header/index.js'
import {Route, BrowserRouter} from 'react-router-dom'
import store from './store';
import Home from './pages/home'
import Detail from './pages/detail'


function App() {
  return (
    <Provider store={store}>      
        <BrowserRouter>
          <Header / >
          {/* <Route path = '/' exact  render = {   () =>(<div>home</div>)    }></Route> */}
          <Route path = '/' exact  component = {  Home   }></Route>
          <Route path = '/detail'  exact component = {Detail}></Route>
        </BrowserRouter>
    </Provider>
  );
}

export default App;
