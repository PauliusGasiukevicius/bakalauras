import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import ls from 'local-storage'
import Header from './Components/Header.js';
import CoursesDisplay from './Components/CoursesDisplay.js';
import CourseCreation from './Components/CourseCreation.js'
import About from './Components/About.js'
import Donate from './Components/Donate.js'
import './App.css';

function App() {

  const [route, setRoute] = useState('home');
  const [user, setUser] = useState(null);

  let onSuccessGoogleAuth = (response) => {
    document.activeElement.blur();

    let data = {...response.profileObj, token: response.tokenId, authType: "google"};

    fetch('/userGoogle', {method: "POST", headers: {'Content-Type': 'application/json'},
     body: JSON.stringify(data)})
    .then(r => r.json())
    .then(r => {
      if(r && !r.err)setUser(r);
      else if(r && r.err) alert(r.err);
    })
  }

  let onSuccessFacebookAuth = (response) => {
    document.activeElement.blur();
    alert('Auth succes, yet FB not yet supported on backend *sigh*')
    //setUser({authObj: (response.authResponse || response), authType: "facebook" });
    console.log({authObj: (response.authResponse || response), authType: "facebook" });
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
    <div className="App" style={{backgroundColor: "#282c34"}}>
      <Header setRoute={setRoute} user={user} onSuccessGoogleAuth={onSuccessGoogleAuth} onLogout={onLogout} onSuccessFacebookAuth={onSuccessFacebookAuth} />
        <div className="h-100" style={{backgroundColor: "#282c34", marginTop: "60px"}}>
          {
            route == 'home' ? 
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Bachelor WIP
                </p>
                <CoursesDisplay />
              </header>
            : route == 'coursesSearch' ?
              <CoursesDisplay />
            : route == 'about' ?
              <About />
            : route == 'donate' ?
              <Donate />
            : route == 'courseCreate' ?
              <CourseCreation user={user}/>
            : <p>An unexpected error has occured.</p>
          }
        </div>
    </div>
  );
}

export default App;
