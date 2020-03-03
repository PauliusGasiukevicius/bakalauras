import React, {useState, useEffect} from 'react';
import CourseCard from './CourseCard.js'

export default function CourseDisplay({courses, coursesFilter}) {
  return (
  <div className="w-100 container-fluid d-flex flex-wrap justify-content-around">
        {
            !courses ? <h5>No courses found</h5> :
            courses.filter(course => {
                if(coursesFilter)return course.name.toLowerCase().includes(coursesFilter);
                return 1;
            }).map(course => <CourseCard course={course} key={"Course" + course._id}/>)
        }
  </div>
  );
}
