import React, {useEffect, useState} from 'react';
import CourseContent from './Content/CourseContent.js';
import QA from '../QA/QA.js';
import ReactStars from 'react-stars'

export default function CourseView({clickViewProfile, setCurrentCourse, course, user, setRoute, goToCourseView, setUser}) {

    const [userRating, setUserRating] = useState(0);
    const [creator, setCreator] = useState(0);

    useEffect(() => {
        setTimeout(document.getElementById('courseViewFirstTab').click(),50);
        fetch(`/rating/${course._id}/${user._id}`)
        .then(r => r.json())
        .then(r => {
            if(r._id)setUserRating(r.value);
        });

        fetch(`user/${course.creator}`)
        .then(r => r.json())
        .then(r => {
            if(r._id)setCreator(r);
        });

    }, []);

    const ratingChanged = async (newRating) => {
      let resp = await fetch(`/rating/${course._id}`, {method:"POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({user, value: newRating})});
      let json = await resp.json();
      if(json._id)
      {
          let cnt = course.ratingsCount + (userRating==0 ? 1 : 0);
          let nwValue = course.rating - userRating + newRating;
          setUserRating(json.value);
          setCurrentCourse({...course, ratingsCount: cnt, rating: nwValue});
      }
    };

    const joinCourse = () => {
        fetch(`/joinCourse/${course._id}`, {method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: user})})
            .then(r => r.json())
            .then(r => {
                if(r && r.err)
                {
                    alert(r.err);
                    if(r.relogin)setUser(null);
                }
                else setUser(r);
            })
    }

    const leaveCourse = () => {
        fetch(`/leaveCourse/${course._id}`, {method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: user})})
        .then(r => r.json())
        .then(r => {
            if(r && r.err){
                alert(r.err);
                if(r.relogin)setUser(null);
            }
            else setUser(r);
        }) 
    }

    const completeCourse = async() => {
        let resp = await fetch(`/complete/${course._id}`, 
        {method:"POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({user: user})});
        let json = await resp.json();

        if(json.ok)setRoute('completion');
        else if (json.err){
            alert(json.err);   
            if(json.relogin)setUser(null);
        }
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
                <a className="btn btn btn-outline-light w-100" data-toggle="tab" href="#qa">Q & A</a>
            </li>
        </ul>

        <div className="tab-content">
            <div id="about" className="tab-pane fade">
                <div className="m-2 card text-white bg-dark border border-white" >
                    <img style={{maxHeight: "500px", width: "auto"}} className="card-img-top img-fluid mx-auto" src={course.imageUrl || "https://i.imgur.com/IUwKaVm.png"} />

                    <div className="card-body">
                        <h2 className="card-title">{course.name}</h2>
                        <p className="card-text">{course.desc}</p>
                        {!creator ? null : 
                        <p>Created by: {"   "}
                            <a className=" btn badge badge-light text-dark" onClick={()=>{clickViewProfile(creator)}}>{creator.name}</a>
                        </p>}
                        {user && course.creator != user._id ? <div className="d-flex justify-content-center">
                                    <ReactStars value={userRating} count={5} onChange={ratingChanged} size={60} color2={'#ffd700'} />
                                </div> : null}
                        {!user ? <></> : 
                        user.courses.includes(course._id) ? 
                        <button onClick={()=>leaveCourse()} type="button" className="m-1 w-100 btn btn-danger">Leave course</button> : 
                        <button onClick={()=>joinCourse()} type="button" className="m-1 w-100 btn btn-success">Join course</button>}
                        {!user || course.creator === user._id ? null : <button onClick={()=>completeCourse()} type="button" className="m-1 w-100 btn btn-success">Claim badge & certificate</button>}
                        {!user ? <></> :
                        course.creator === user._id ? 
                        <button onClick={()=>goToCourseView(course,1)} type="button" className="m-1 w-100 btn btn-warning">Edit course</button> : 
                        <></>}
                    </div>

                    <div className="card-footer">
                        <small className="">
                            <i className="fa fa-user" /> {course.students || 0} <br />
                            <i className="fa fa-star" /> {course.ratingsCount > 0 ? (course.rating/course.ratingsCount).toFixed(1) : "?"}
                        </small>
                    </div>
                </div>
            </div>
            <div id="content" className="tab-pane fade">
                <h3 className="p-2">Content</h3>
                <CourseContent setUser={setUser} user={user} course={course}/>
            </div>
            <div id="qa" className="tab-pane fade">
                <h3 className="p-2">Q & A</h3>
                <QA clickViewProfile={clickViewProfile} course={course} user={user} setUser={setUser} />
            </div>
        </div>
    </div>
  );
}
