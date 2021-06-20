import React, { Component } from 'react';
import Login from './components/login';
import  Logout from './components/logout';
import User from './components/user';

export class App extends Component {
  render() {
    return (
      <div>
        <Login/>
        <Logout/>
        <User/>
      </div>
    )
  }
}

export default App;
