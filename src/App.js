import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import ls from 'local-storage'
import Header from './Components/Header.js';
import CoursesDisplay from './Components/CoursesDisplay.js';
import CourseCreation from './Components/CourseCreation.js'
import CourseEdit from './Components/CourseEdit.js'
import About from './Components/About.js'
import Donate from './Components/Donate.js'
import UserProfile from './Components/UserProfile.js'
import CoursesITeach from './Components/CoursesITeach.js'
import './App.css';

function App() {

  const [route, setRoute] = useState('home');
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [coursesFilter, setCoursesFilter] = useState('');

  let onSuccessGoogleAuth = (response) => {
    document.activeElement.blur();

    let data = {...response.profileObj, token: response.tokenId, authType: "google"};

    fetch('/userGoogle', {method: "POST", headers: {'Content-Type': 'application/json'},
     body: JSON.stringify(data)})
    .then(r => r.json())
    .then(r => {
      if(r && !r.err)setUser(r);
      else if(r && r.err) alert(r.err);
      console.log(r);
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
    setRoute('home');
  }

  useEffect(() => {
    let cachedUser = ls.get('user') || null;
    if(cachedUser != null)setUser(cachedUser);

    fetch('/courses')
    .then(resp => resp.json())
    .then(r => {setCourses(r)})

  },[]);

  useEffect(() => {
    if(route=='home' || route=='coursesSearch')
    fetch('/courses')
    .then(resp => resp.json())
    .then(r => {setCourses(r)})
  },[route]);
 
 useEffect(() => {
    ls.set('user', user);
  },[user]);
 

  return (
    <div className="App" style={{backgroundColor: "#282c34"}}>
      <Header setCoursesFilter={setCoursesFilter} setRoute={setRoute} user={user} onSuccessGoogleAuth={onSuccessGoogleAuth} onLogout={onLogout} onSuccessFacebookAuth={onSuccessFacebookAuth} />
        <div className="h-100" style={{backgroundColor: "#282c34", marginTop: "65px"}}>
          {
            route == 'home' ? 
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Bachelor WIP
                </p>
                <CoursesDisplay courses={courses} user={user}/>
              </header>
            : route == 'coursesSearch' ?
              <CoursesDisplay courses={courses} coursesFilter={coursesFilter} user={user}/>
            : route == 'coursesITeach' ?
              <CoursesITeach user={user}/>
            : route == 'about' ?
              <About />
            : route == 'donate' ?
              <Donate user={user}/>
            : route == 'profile' ?
              <UserProfile user={user}/>
            : route == 'courseEdit' ?
              <CourseEdit currentCourse={currentCourse} user={user}/>
            : route == 'courseCreate' ?
              <CourseCreation user={user} setRoute={setRoute} setCurrentCourse={setCurrentCourse}/>
            : <p>An unexpected error has occured.</p>
          }
        </div>
    </div>
  );
}

export default App;
