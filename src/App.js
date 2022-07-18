import './App.css';
import React, { useState } from 'react';
import ListSamples from './components/listSamples';
import DropoffSamples from './components/dropoffSamples';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Fade from 'react-bootstrap/Fade';
import NavBar from './components/navBar.js';

function App() {
  const [showButtons, setShowButtons] = useState(true);
  const [showListSamples, setShowListSamples] = useState(false);
  const [showDropoffSamples, setShowDropoffSamples] = useState(false);
  const [alertVariant, setAlertVariant] = useState("light");
  const fullWidthSpace = "　";
  const [alertText, setAlertText] = useState(fullWidthSpace);
  
  const handleHome = () => {
    setShowButtons(true);
    setShowDropoffSamples(false);
    setShowListSamples(false);
  }

  const handleDropoff = () => {
    setShowButtons(false);
    setShowDropoffSamples(true);
    setShowListSamples(false);
  }
  const handleReception = () => {
    setShowButtons(false);
    setShowDropoffSamples(false);
    setShowListSamples(true);
  }

  const handleNewSample = (text) => {
    /* display alert for short time, then close */
    setAlertVariant("success");
    setAlertText(text);

    setTimeout(() => {
      setAlertVariant("light");
      /* Keep alert space filled, but empty; "" collapses alert space. */
      setAlertText(fullWidthSpace);
    }, 2000)
  }

  return (
    <div className="App">
      <NavBar handleHome={handleHome} handleDropoff={handleDropoff} handleReception={handleReception}/>
      <Alert key="sampleDroppoffAccepted" variant={alertVariant} transition={Fade}>{alertText}</Alert>
      <header className="App-header">
        <h6 className="mb-4">Laboratory Sample Drop-off/Reception System</h6>
      </header>
      <div className="d-grid gap-2">
        {showButtons ? <Button size="lg" className="mt-5" onClick={handleDropoff}>Drop-off</Button> : ""}
        {showButtons ? <Button size="lg" className="mt-5" onClick={handleReception}>Reception</Button> : ""}
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
