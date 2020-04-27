/* eslint-disable eqeqeq */
import React, {} from 'react';
import { GoogleLogin } from 'react-google-login';
import EmailLogin from './EmailLogin.js';

export default function Header({clickViewProfile, setUser, setCoursesFilter, onSuccessGoogleAuth, user, onLogout, onSuccessFacebookAuth, setRoute}) {

  const onFailure = (response) => {
    alert('Deja jums nepavyko prisijungti');
  }

  const clickSearch = () => {
    setCoursesFilter(document.getElementById('coursesSearchInput').value.toLowerCase());
    setRoute('coursesSearch');
  }

  return (
    <>
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

          <div className = "input-group form-inline d-flex justify-content-center align-items-center w-100">
            <input id="coursesSearchInput" className="form-control mr-sm-2" type="search" placeholder="Search for courses" aria-label="Search"/>
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
            <button type="button" onClick={()=>clickViewProfile(user)} className="btn btn-outline-light my-2 my-md-0 m-1" data-toggle="tooltip" data-placement="bottom" title="My profile">
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
      <div className="modal-content bg-dark text-white">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Login/Sign up</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="modal-body" data-dismiss="modal">
          <GoogleLogin className="w-100 p-1 m-1"
          clientId="289002604454-d8h61qef9mdg6nglvtld21otnnatjkc3.apps.googleusercontent.com"
          render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn btn-outline-light w-100 p-11  m-1 text-left" style={{padding: "10px"}}>
              <span className="align-middle">
                &nbsp;
                <i className="fa fa-google "  style={{fontSize: "1.5em"}}/>	
                &nbsp; 	&nbsp; Login with Google
              </span>
            </button>
          )}
          onSuccess={(r) => onSuccessGoogleAuth(r)}
          onFailure={(r) => onFailure(r)}
          cookiePolicy={'single_host_origin'}
          />

        <button className="btn btn-outline-light w-100 p-11  m-1 text-left" style={{padding: "10px"}} data-toggle="modal" data-target="#emailLogin">
          <span className="align-middle">
              &nbsp;
              <i className="fa fa-envelope "  style={{fontSize: "1.5em"}}/>	
              &nbsp; 	&nbsp; Login with email
          </span>
        </button>
          
        </div>
      </div>
    </div>
  </div>

    </header>
    <EmailLogin setUser={setUser} />
  </>
  );
}
