import React, {} from 'react';
import CoursesITeach from './CoursesITeach.js';
import CoursesIStudy from './CoursesIStudy.js';

export default function UserProfile({user, goToCourseView}) {

  return (
    <div className="m-2 card text-white bg-dark border border-white">
        <img style={{width: "300px"}} className="p-2 card-img-top img-fluid mx-auto" src={user.imageUrl || "https://i.imgur.com/mCHMpLT.png?3"} />

        <div className="card-body">
            <h2 className="card-title">{user.name}</h2>
        </div>

        <div className="card-footer">
            <div className="m-2 card text-white bg-dark border border-white">
                <div className="card-body">
                    <h2 className="card-title">Badges of {user.name} :</h2>
                </div>
            </div>
            <div className="m-2 card text-white bg-dark border border-white">
                <div className="card-body">
                    <h2 className="card-title">Courses {user.name} is studying :</h2>
                    {<CoursesIStudy goToCourseView={goToCourseView} user={user}/>}
                </div>
            </div>
            <div className="m-2 card text-white bg-dark border border-white">
                <div className="card-body">
                    <h2 className="card-title">Courses {user.name} is teaching :</h2>
                    {<CoursesITeach goToCourseView={goToCourseView} user={user}/>}
                </div>
            </div>
        </div>
    </div>
  );
}
