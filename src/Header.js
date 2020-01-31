import React, {useState} from 'react';

export default function Header() {
  return (
    <header className="header">
        <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
  <div className="collapse navbar-collapse justify-content-between align-items-center w-100" id="navbarToggler">
    <div className="navbar w-100">
        <ul className="navbar-nav mr-auto mt-2 mt-md-0 w-100 justify-content-md-start justify-content-center">
        <li className="nav-item active">
          <a className="nav-link h5" href="#">eLearn</a>
        </li>
        <li className="nav-item active">
            <a className="nav-link" href="#">Home</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="#">About</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="#">Donate</a>
        </li>
        </ul>
    </div>

    <div className = "input-group form-inline justify-content-center align-items-center w-100">
      <input className="w-100 ml-auto justify-content-center align-items-center form-control mr-sm-2" type="search" placeholder="Search for courses" aria-label="Search"/>
      <button className="btn btn-outline-light my-2 my-md-0" type="submit">
        <i className="fa fa-search"></i></button>
    </div>

    <div className = "form-inline justify-content-md-end justify-content-center w-100">
      <button className="btn btn-outline-light my-2 my-md-0" type="submit">
        <i className="fa fa-sign-in"></i> Login</button>
    </div>

  </div>
        </nav>
    </header>
  );
}
