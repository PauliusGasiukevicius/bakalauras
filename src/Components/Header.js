/* eslint-disable eqeqeq */
import React, {} from 'react';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

export default function Header({setCoursesFilter, onSuccessGoogleAuth, user, onLogout, onSuccessFacebookAuth, setRoute}) {

  const onFailure = (response) => {
    alert('Deja jums nepavyko prisijungti');
  }

  const responseFacebook = (response) => {
    if(response.status == "connected" || response.accessToken)onSuccessFacebookAuth(response);
   else alert('Deja jums nepavyko prisijungti');
  }

  const clickSearch = () => {
    setCoursesFilter(document.getElementById('coursesSearchInput').value.toLowerCase());
    setRoute('coursesSearch');
  }

  return (
    <header className="header h-100" >
      <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark p-0 pr-2">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between align-items-center w-100" id="navbarToggler">
          <div className="navbar w-100">
            <ul className="navbar-nav mr-auto w-100 justify-content-md-start justify-content-center">
              <li className="nav-item active">
                <a className="nav-link h5" href="#" onClick={()=>setRoute('home')}>e-Learn</a>
              </li>
              <li className="nav-item">
                  <a className="nav-link" href="#" onClick={()=>setRoute('about')}>About</a>
              </li>
              <li className="nav-item">
                  <a className="nav-link" href="#" onClick={()=>setRoute('donate')}>Donate</a>
              </li>
            </ul>
          </div>

          <div className = "input-group form-inline justify-content-center align-items-center w-100">
            <input id="coursesSearchInput" className="w-100 ml-auto justify-content-center align-items-center form-control mr-sm-2" type="search" placeholder="Search for courses" aria-label="Search"/>
            <button type="button" onClick={()=>clickSearch()} className="btn btn-outline-light my-2 my-md-0" >
              <i className="fa fa-search"></i></button>
          </div>

          {
            user == null ? 
            (<div className = "form-inline justify-content-md-end justify-content-center w-100">
            <button type="button" className="btn btn-outline-light my-2 my-md-0" data-toggle="modal" data-target="#login-modal">
              <i className="fa fa-sign-in"></i> Login</button>
            </div>)
            :
            (<div className = "form-inline justify-content-md-end justify-content-center w-100">
            <button type="button" onClick={()=>setRoute('courseCreate')} className="btn btn-outline-light my-2 my-md-0 m-1" data-toggle="tooltip" data-placement="bottom" title="Create course">
              <i className="fa fa-plus"></i></button>
            <button type="button" onClick={()=>setRoute('profile')} className="btn btn-outline-light my-2 my-md-0 m-1" data-toggle="tooltip" data-placement="bottom" title="My profile">
              <i className="fa fa-user"></i></button>
            <button type="button" onClick={()=>setRoute('coursesIStudy')} className="btn btn-outline-light my-2 my-md-0 m-1" data-toggle="tooltip" data-placement="bottom" title="My courses">
              <i className="fa fa-folder"></i></button>
            <button type="button" onClick={()=>setRoute('coursesITeach')} className="btn btn-outline-light my-2 my-md-0 m-1" data-toggle="tooltip" data-placement="bottom" title="Courses I teach">
              <i className="fa fa-graduation-cap"></i></button>
            <button type="button" className="btn btn-outline-light my-2 my-md-0 m-1" onClick={()=>onLogout()} data-toggle="tooltip" data-placement="bottom" title="Logout">
              <i className="fa fa-sign-in"></i></button>
            </div>)
          }

          </div>
      </nav>

  <div className="modal fade" id="login-modal" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Login/Sign up</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="modal-body" data-dismiss="modal">
          <GoogleLogin className="w-100 p-1 m-1"
          clientId="289002604454-d8h61qef9mdg6nglvtld21otnnatjkc3.apps.googleusercontent.com"
          onSuccess={(r) => onSuccessGoogleAuth(r)}
          onFailure={(r) => onFailure(r)}
          cookiePolicy={'single_host_origin'}
          />

          <FacebookLogin 
            textButton=" Sign in with Facebook"
            icon="fa-facebook"
            appId="485952342069924"
            fields="name,email,picture"
            callback={(r) => responseFacebook(r)}
            cssClass="fbButton w-100 btn p-1 m-1" />
        </div>
      </div>
    </div>
  </div>

    </header>
    
  );
}
