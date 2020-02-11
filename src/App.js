import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import ls from 'local-storage'
import Header from './Header.js';
import './App.css';

function App() {

  const [route, setRoute] = useState('home');
  const [user, setUser] = useState(null);

  let onSuccessGoogleAuth = (response) => {
    document.activeElement.blur();
    setUser({authObj: response.profileObj, authType: "google"}); //save user info + JWT token
    //ToDo, load backend-stuff like courses/etc
  }

  let onSuccessFacebookAuth = (response) => {
    document.activeElement.blur();
    setUser({authObj: (response.authResponse || response), authType: "facebook" });
    //TODO Note this above OR trick might not work, gotta recheck when DB is connected and stuff
    //ToDo, load backend-stuff like courses/etc
  }

  let onLogout = () => {
    setUser(null);
  }

  useEffect(() => {
    let cachedUser = ls.get('user') || null;
    if(cachedUser != null)setUser(cachedUser);
  
  },[]);
 
 useEffect(() => {
    ls.set('user', user);
  },[user]);
 

  return (
    <div className="App">
      <Header user={user} onSuccessGoogleAuth={onSuccessGoogleAuth} onLogout={onLogout} onSuccessFacebookAuth={onSuccessFacebookAuth} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bachelor WIP
        </p>
        </header>
    </div>
  );
}

export default App;
