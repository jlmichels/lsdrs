import './App.css';
import React, { useState } from 'react';
import ListSamples from './components/listSamples';
import Button from 'react-bootstrap/Button';

function App() {
  const [showButtons, setShowButtons] = useState(true);
  const [showListSamples, setShowListSamples] = useState(false);

  const handleFactory = () => {
    setShowButtons(!showButtons);
    // Show sample input screen
  }

  const handleLaboratory = () => {
    setShowButtons(!showButtons);
    setShowListSamples(!showListSamples);
  }

  console.log(showListSamples)

  return (
    <div className="App">
      <header className="App-header">
        <h1>LSDRS</h1>
        <h5 className="mb-4">Laboratory Sample Drop-off/Reception System</h5>
      </header>
      <div className="d-grid gap-2">
        {showButtons ? <Button size="lg" onClick={handleFactory}>Factory</Button> : ""}
        {showButtons ? <Button size="lg" onClick={handleLaboratory}>Laboratory</Button> : ""}
      </div>
      {showListSamples ? <ListSamples/> : ""}
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
