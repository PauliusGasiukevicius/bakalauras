import React, {useEffect} from 'react';

export default function CourseView({course, user}) {

    useEffect(() => {
        setTimeout(document.getElementById('courseViewFirstTab').click(),50);
    }, []);

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
                    <img style={{width: "400px"}} className="card-img-top img-fluid mx-auto" src={course.imageUrl || "https://i.imgur.com/IUwKaVm.png"} />

                    <div className="card-body">
                        <h2 className="card-title">{course.name}</h2>
                        <p className="card-text">{course.desc}</p>
                        {!user ? <></> :
                        user.courses.includes(course._id) ? 
                        <button onClick={console.log('ha')} type="button" className="m-1 w-100 btn btn-danger">Leave course</button> : 
                        <button onClick={console.log('ha')} type="button" className="m-1 w-100 btn btn-success">Join course</button>}
                        {!user ? <></> :
                        course.creator === user._id ? 
                        <button onClick={console.log('ha')} type="button" className="m-1 w-100 btn btn-warning">Edit course</button> : 
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
                <h3>Content</h3>
                <p>//TODO</p>
            </div>
            <div id="badges" className="tab-pane fade">
                <h3>Badges</h3>
                <p>//TODO</p>
            </div>
            <div id="qa" className="tab-pane fade">
                <h3>Q & A</h3>
                <p>//TODO</p>
            </div>
        </div>
    </div>
  );
}
