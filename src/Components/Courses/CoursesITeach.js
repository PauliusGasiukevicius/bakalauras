import React, {useState, useEffect} from 'react';
import CoursesDisplay from './CoursesDisplay.js'

export default function CoursesITeach({user, goToCourseView, userToView}) {
  
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        fetch(`/courses/user/teach/${userToView._id}`)
        .then(resp => resp.json())
        .then(r => {
            if(r.err)console.log(r);
            else setCourses(r);
        })
        },[userToView]);

    return <CoursesDisplay courses={courses} user={user} goToCourseView={goToCourseView}/>;
}
