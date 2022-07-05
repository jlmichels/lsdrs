import './App.css';
import React, { useState } from 'react';
import ListSamples from './components/listSamples';
import DropoffSamples from './components/dropoffSamples';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Fade from 'react-bootstrap/Fade';

function App() {
  const [showButtons, setShowButtons] = useState(true);
  const [showListSamples, setShowListSamples] = useState(false);
  const [showDropoffSamples, setShowDropoffSamples] = useState(false);
  const [alertVariant, setAlertVariant] = useState("light");
  const fullWidthSpace = "　";
  const [alertText, setAlertText] = useState(fullWidthSpace);
  
  const handleFactory = () => {
    setShowButtons(!showButtons);
    setShowDropoffSamples(!showDropoffSamples);
  }

  const handleLaboratory = () => {
    setShowButtons(!showButtons);
    setShowListSamples(!showListSamples);
  }

  const handleNewSample = (text) => {
    /* display alert for short time, then close */
    setAlertVariant("success");
    setAlertText(text);

    setTimeout(() => {
      setAlertVariant("light");
      setAlertText(fullWidthSpace);
    }, 2000)
  }

  return (
    <div className="App">
      <Alert key="sampleDroppoffAccepted" variant={alertVariant} transition={Fade}>{alertText}</Alert>
      <header className="App-header">
        <h1>LSDRS</h1>
        <h6 className="mb-4">Laboratory Sample Drop-off/Reception System</h6>
      </header>
      <div className="d-grid gap-2">
        {showButtons ? <Button size="lg" onClick={handleFactory}>Factory</Button> : ""}
        {showButtons ? <Button size="lg" onClick={handleLaboratory}>Laboratory</Button> : ""}
      </div>
      {showListSamples ? <ListSamples/> : ""}
      {showDropoffSamples ? <DropoffSamples handleNewSample={handleNewSample}/> : ""}
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
