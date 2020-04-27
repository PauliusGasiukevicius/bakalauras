import React, {useState, useEffect} from 'react';
import CoursesDisplay from './CoursesDisplay.js'

export default function CoursesIStudy({user, userToView, goToCourseView}) {
  
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        fetch(`/courses/user/study/${userToView._id}`)
        .then(resp => resp.json())
        .then(r => {
            if(r.err)console.log(r);
            else setCourses(r);
        })
        },[userToView]);

    return <CoursesDisplay courses={courses} user={user} goToCourseView={goToCourseView}/>;
}
