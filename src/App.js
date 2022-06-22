import './App.css';
import React from 'react';
import ListSamples from './components/listSamples';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>LSDRS</h1>
        <h5 className="mb-4">Laboratory Sample Drop-off/Reception System</h5>
      </header>
      <ListSamples/>
    </div>
  );
}

function Login() {
  return (
    <form action ="/login" method="post" id="login">
      <Username/>
      <Password/>
    </form>
  );
}

function Username() {
  return (
    <React.Fragment>
      <label>Username:</label>
      <input type="text" id="username" placeholder="Enter username"/>
    </React.Fragment>
  );
}

function Password() {
  return (
    <React.Fragment>
      <label>Password:</label>
      <input type="text" id="password" placeholder="Enter password"/>
    </React.Fragment>
  );
}

export default App;
