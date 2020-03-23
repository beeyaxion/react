import React from 'react';
import { Provider } from 'react-redux';
import Header from './common/header/index.js'
import {Route, BrowserRouter} from 'react-router-dom'
import store from './store';
import Home from './pages/home'
import Detail from './pages/detail/loadable'
import Login from './pages/login';
import Writer from './pages/write';


function App() {
  return (
    <Provider store={store}>      
        <BrowserRouter>
          <Header / >
          {/* <Route path = '/' exact  render = {   () =>(<div>home</div>)    }></Route> */}
          <Route path = '/' exact  component = {  Home   }></Route>
          <Route path = '/login' exact  component = {  Login   }></Route>
          <Route path = '/detail/:id'  exact component = {Detail}></Route>
          <Route path = '/write'  exact component = {Writer}></Route>
        </BrowserRouter>
    </Provider>
  );
}

export default App;
