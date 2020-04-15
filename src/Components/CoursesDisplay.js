import React, {} from 'react';
import CourseCard from './CourseCard.js'

export default function CourseDisplay({showMore, courses, user, goToCourseView}) {
  return (
  <>
    <div className="w-100 container-fluid d-flex flex-wrap justify-content-around">
          {
              !courses ? <i className="fa fa-spinner fa-spin text-white" style={{fontSize: "3em"}}></i> :
              courses.map(course => <CourseCard goToCourseView={goToCourseView} user={user} course={course} key={"Course" + course._id}/>)
          }
    </div>
    <button onClick={()=>showMore()} className="btn btn-outline-light m-3" style={{fontSize: "1.2em"}}> Show more</button>
  </>
  );
}
