import React, {} from 'react';
import CourseCard from './CourseCard.js'

export default function CourseDisplay({courses, coursesFilter, user, goToCourseView}) {
  return (
  <div className="w-100 container-fluid d-flex flex-wrap justify-content-around">
        {
            !courses ? <i className="fa fa-spinner fa-spin text-white" style={{fontSize: "3em"}}></i> :
            courses.filter(course => {
                if(coursesFilter)return course.name.toLowerCase().includes(coursesFilter);
                return 1;
            }).map(course => <CourseCard goToCourseView={goToCourseView} user={user} course={course} key={"Course" + course._id}/>)
        }
  </div>
  );
}
