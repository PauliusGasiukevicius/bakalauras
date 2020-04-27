/* eslint-disable eqeqeq */
import React, { } from 'react';
import CoursesITeach from './Courses/CoursesITeach.js';
import CoursesIStudy from './Courses/CoursesIStudy.js';
import BadgesOfUserDisplay from './Courses/Completion/BadgesOfUserDisplay.js';
import EditProfileModal from './EditProfileModal.js';

export default function UserProfile({user, userToView, goToCourseView, setUser}) {

  return (
    <div className="m-2 card text-white bg-dark border border-white">
        {user._id == userToView._id ? <EditProfileModal user={user} setUser={setUser} /> : null}

        <img alt="" style={{width: "300px"}} className="p-2 card-img-top img-fluid mx-auto" src={userToView.imageUrl} />


        <div className="card-body">
            <h2 className="card-title">Profile of: {userToView.name}</h2>
        </div>

        <div className="card-footer">
            <div className="m-2 card text-white bg-dark border border-white">
                <div className="card-body">
                    <h2 className="card-title">Badges of {userToView.name} :</h2>
                    {<BadgesOfUserDisplay user={userToView}/>}
                </div>
            </div>
            <div className="m-2 card text-white bg-dark border border-white">
                <div className="card-body">
                    <h2 className="card-title">Courses {userToView.name} is studying :</h2>
                    {<CoursesIStudy goToCourseView={goToCourseView} user={user} userToView={userToView}/>}
                </div>
            </div>
            <div className="m-2 card text-white bg-dark border border-white">
                <div className="card-body">
                    <h2 className="card-title">Courses {userToView.name} is teaching :</h2>
                    {<CoursesITeach goToCourseView={goToCourseView} user={user} userToView={userToView}/>}
                </div>
            </div>
        </div>
    </div>
  );
}
