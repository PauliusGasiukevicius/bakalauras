import React, {useState, useEffect} from 'react';

export default function CourseCard({course}) {

  return (
  <div className="m-2 card text-white bg-dark border border-white" style={{width: "400px"}}>
        <img className="card-img-top img-fluid" src={course.imageUrl || "https://i.imgur.com/IUwKaVm.png"} />

        <div className="card-body">
            <h2 className="card-title">{course.name}</h2>
            <p className="card-text">{course.desc}</p>
        </div>

        <div className="card-footer">
            <small className="">
                <i className="fa fa-user" /> {course.students || 0} <br />
                <i className="fa fa-star" /> {course.ratingsCount > 0 ? course.rating : "?"}
            </small>
        </div>
  </div>
  );
}
