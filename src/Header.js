import React, {useState} from 'react';

export default function Header() {
  return (
    <header className="header">
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
  <div className="collapse navbar-collapse justify-content-between align-items-center w-100" id="navbarTogglerDemo01">
    <div className="navbar justify-content-between align-items-center w-100">
        <a className="navbar-brand" href="#">eLearn</a>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item active">
            <a className="nav-link disabled" href="#">Home <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
            <a className="nav-link disabled" href="#">About</a>
        </li>
        <li className="nav-item">
            <a className="nav-link disabled" href="#">Donate</a>
        </li>
        </ul>
    </div>

    <div className = "form-inline justify-content-center align-items-center w-100">
      <input className=" justify-content-center align-items-center form-control mr-sm-2" type="search" placeholder="Search for courses" aria-label="Search"/>
      <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
    </div>

    <div className = "form-inline justify-content-end align-items-end w-100">
      <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Login</button>
    </div>

  </div>
        </nav>
    </header>
  );
}
