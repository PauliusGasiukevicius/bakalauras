import React, {useState, useEffect} from 'react';
import CoursesDisplay from './CoursesDisplay.js'

export default function CoursesIStudy({user, goToCourseView}) {
  
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        fetch(`/courses/user/study/${user._id}`)
        .then(resp => resp.json())
        .then(r => {
            if(r.err)console.log(r);
            else setCourses(r);
        })
        },[]);

    return <CoursesDisplay courses={courses} user={user} goToCourseView={goToCourseView}/>;
}
