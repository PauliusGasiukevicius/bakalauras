import React, {useEffect} from 'react';
import CourseContent from './courseContent/CourseContent.js';

export default function CourseView({course, user, setRoute, goToCourseView, setUser}) {

    useEffect(() => {
        setTimeout(document.getElementById('courseViewFirstTab').click(),50);
    }, []);

    const joinCourse = () => {
        fetch(`/joinCourse/${course._id}`, {method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: user})})
            .then(r => r.json())
            .then(r => {
                if(r && r.err)alert(r.err);
                else setUser(r);
            })
    }

    const leaveCourse = () => {
        fetch(`/leaveCourse/${course._id}`, {method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: user})})
        .then(r => r.json())
        .then(r => {
            if(r && r.err)alert(r.err);
            else setUser(r);
        }) 
    }

  return (
    <div className="w-100" style={{color: "white"}}>
        <ul className="nav nav-tabs nav-justified w-100">
            <li className="nav-item w-100">
                <a className="btn btn btn-outline-light w-100" id="courseViewFirstTab" data-toggle="tab" href="#about">About</a>
            </li>
            <li className="nav-item">
                <a className="btn btn btn-outline-light w-100" data-toggle="tab" href="#content">Content</a>
            </li>
            <li className="nav-item">
                <a className="btn btn btn-outline-light w-100" data-toggle="tab" href="#badges">Badges</a>
            </li>
            <li className="nav-item">
                <a className="btn btn btn-outline-light w-100" data-toggle="tab" href="#qa">Q &</a>
            </li>
        </ul>

        <div className="tab-content">
            <div id="about" className="tab-pane fade">
                <div className="m-2 card text-white bg-dark border border-white" >
                    <img style={{maxHeight: "500px", width: "auto"}} className="card-img-top img-fluid mx-auto" src={course.imageUrl || "https://i.imgur.com/IUwKaVm.png"} />

                    <div className="card-body">
                        <h2 className="card-title">{course.name}</h2>
                        <p className="card-text">{course.desc}</p>
                        {!user ? <></> : 
                        user.courses.includes(course._id) ? 
                        <button onClick={()=>leaveCourse()} type="button" className="m-1 w-100 btn btn-danger">Leave course</button> : 
                        <button onClick={()=>joinCourse()} type="button" className="m-1 w-100 btn btn-success">Join course</button>}
                        {!user ? <></> :
                        course.creator === user._id ? 
                        <button onClick={()=>goToCourseView(course,1)} type="button" className="m-1 w-100 btn btn-warning">Edit course</button> : 
                        <></>}
                    </div>

                    <div className="card-footer">
                        <small className="">
                            <i className="fa fa-user" /> {course.students || 0} <br />
                            <i className="fa fa-star" /> {course.ratingsCount > 0 ? course.rating : "?"}
                        </small>
                    </div>
                </div>
            </div>
            <div id="content" className="tab-pane fade">
                <h3 className="p-2">Content</h3>
                <CourseContent user={user} course={course}/>
            </div>
            <div id="badges" className="tab-pane fade">
                <h3 className="p-2">Badges</h3>
                <p>//TODO</p>
            </div>
            <div id="qa" className="tab-pane fade">
                <h3 className="p-2">Q & A</h3>
                <p>//TODO</p>
            </div>
        </div>
    </div>
  );
}
