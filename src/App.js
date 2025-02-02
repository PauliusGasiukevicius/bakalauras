import React, {useState, useEffect} from 'react';
import ls from 'local-storage'
import Header from './Components/Header.js';
import CoursesDisplay from './Components/Courses/CoursesDisplay.js';
import CourseCreation from './Components/Courses/CourseCreation.js'
import CourseEdit from './Components/Courses/CourseEdit.js'
import CourseView from './Components/Courses/CourseView.js'
import About from './Components/About.js'
import Donate from './Components/Donate.js'
import UserProfile from './Components/UserProfile.js'
import CoursesITeach from './Components/Courses/CoursesITeach.js'
import CoursesIStudy from './Components/Courses/CoursesIStudy.js'
import Completion from './Components/Courses/Completion/Completion.js';
import './App.css';

function App() {

  const [mobile, setMobile] = useState(false);
  const [route, setRoute] = useState('home');
  const [user, setUser] = useState(null);
  const [userToView, setUserToView] = useState(null);
  const [courses, setCourses] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [coursesFilter, setCoursesFilter] = useState('');

  let goToCourseView = (course, edit = false) => {
    setCurrentCourse(course);
    if(!edit)setRoute('courseView');
    else setRoute('courseEdit');
  }

  let onSuccessGoogleAuth = (response) => {
    document.activeElement.blur();

    let data = {...response.profileObj, token: response.tokenId, authType: "google"};

    fetch('/userGoogle', {method: "POST", headers: {'Content-Type': 'application/json'},
     body: JSON.stringify(data)})
    .then(r => r.json())
    .then(r => {
      if(r && !r.err)setUser(r);
      else if(r && r.err){
        alert(r.err);
        setUser(null);
      }
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

  let clickViewProfile = (userToView) => {
    setUserToView(userToView);
    setRoute('profile');
  }

  useEffect(() => {
    if(window.innerWidth < 840){
      setMobile(true);
    fetch(`/courses/0/3/${coursesFilter}`)
    .then(resp => resp.json())
    .then(r => {setCourses(r)})
    }
    else{
      fetch(`/courses/0/9/${coursesFilter}`)
    .then(resp => resp.json())
    .then(r => {setCourses(r)})
    }
    let cachedUser = ls.get('user') || null;
    if(cachedUser != null)setUser(cachedUser);

    
  },[]);

  useEffect(() => {
    if(route=='home' || route=='coursesSearch')
    {
      if(mobile){
        fetch(`/courses/0/5/${coursesFilter}`)
    .then(resp => resp.json())
    .then(r => {setCourses(r)})
      }
      else {
        fetch(`/courses/0/9/${coursesFilter}`)
        .then(resp => resp.json())
        .then(r => {setCourses(r)})
      }
    }
  },[route, coursesFilter]);

  let showMore = async () => {
    let resp = await fetch(`/courses/${courses.length}/${mobile ? 5 : 9}/${coursesFilter}`);
    let json = await resp.json();
    setCourses(courses.concat(json));
  }

  let changeUser = (newUser) => {

    if(newUser == null){
      setRoute('home');
      setUser(null);
      setCurrentCourse(null);
    }else setUser(newUser);
  }
 
 useEffect(() => {
    ls.set('user', user);
  },[user]);
 

  return (
    <div className="App" style={{backgroundColor: "#282c34"}}>
      <Header clickViewProfile={clickViewProfile} setUser={changeUser} setCoursesFilter={setCoursesFilter} setRoute={setRoute} user={user} onSuccessGoogleAuth={onSuccessGoogleAuth} onLogout={onLogout} onSuccessFacebookAuth={onSuccessFacebookAuth} />
        <div className="h-100" style={{backgroundColor: "#282c34", marginTop: "65px"}}>
          {
              route=='home' || route == 'coursesSearch'  ?
              <CoursesDisplay courses={courses} showMore={showMore} user={user} goToCourseView={goToCourseView}/>
            : route == 'coursesITeach' ?
              <CoursesITeach user={user} userToView={userToView || user} goToCourseView={goToCourseView}/>
              : route == 'coursesIStudy' ?
              <CoursesIStudy user={user} userToView={userToView || user} goToCourseView={goToCourseView}/>
            : route == 'about' ?
              <About />
            : route == 'completion' ?
              <Completion setUser={changeUser} user={user} course={currentCourse} />
            : route == 'donate' ?
              <Donate user={user}/>
            : route == 'profile' ?
              <UserProfile setUser={setUser} user={user} userToView={userToView || user} goToCourseView={goToCourseView}/>
            : route == 'courseEdit' ?
              <CourseEdit setUser={changeUser} course={currentCourse} user={user} setRoute={setRoute} setCourse={setCurrentCourse}/>
              : route == 'courseView' ?
              <CourseView clickViewProfile={clickViewProfile} setCurrentCourse={setCurrentCourse} setUser={changeUser} course={currentCourse} user={user} setRoute={setRoute} goToCourseView={goToCourseView}/>
            : route == 'courseCreate' ?
              <CourseCreation setUser={changeUser} user={user} setRoute={setRoute} setCurrentCourse={setCurrentCourse}/>
            : <p>An unexpected error has occured.</p>
          }
        </div>
    </div>
  );
}

export default App;
