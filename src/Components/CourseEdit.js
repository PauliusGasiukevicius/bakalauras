import React, {useEffect} from 'react';

export default function CourseEdit({course, user, setRoute}) {

    useEffect(() => {
        setTimeout(document.getElementById('courseViewFirstTab').click(),50);
    }, []);

    const deleteCourse = () => {
        if(window.confirm("Are you sure you want to delete this course? This action cannot be undone."))
        {
            fetch(`/deleteCourse/${course._id}`, {method: 'DELETE', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: user})})
            .then(r => r.json())
            .then(r => {
                if(r && r.err)alert(r.err);
                setRoute('home');
            })
        }
    }

  return (
    <div className="w-100" style={{color: "white"}}>
        <ul className="nav nav-tabs nav-justified w-100">
            <li className="nav-item w-100">
                <a className="btn btn btn-outline-light w-100" id="courseViewFirstTab" data-toggle="tab" href="#edit-general">Edit about</a>
            </li>
            <li className="nav-item">
                <a className="btn btn btn-outline-light w-100" data-toggle="tab" href="#edit-content">Edit content</a>
            </li>
            <li className="nav-item">
                <a className="btn btn btn-outline-light w-100" data-toggle="tab" href="#edit-badges">Edit badges</a>
            </li>
        </ul>

        <div className="tab-content">
            <div id="edit-general" className="tab-pane fade">
                <div className="m-2 card text-white bg-dark border border-white" >
                    <img style={{width: "400px"}} className="card-img-top img-fluid mx-auto" src={course.imageUrl || "https://i.imgur.com/IUwKaVm.png"} />

                    <div className="card-body">
                        <h2 className="card-title">{course.name}</h2>
                        <p className="card-text">{course.desc}</p>
                        <button onClick={() => deleteCourse()} type="button" className="m-1 w-100 btn btn-danger">Delete course</button>
                    </div>

                    <div className="card-footer">
                        <small className="">
                            <i className="fa fa-user" /> {course.students || 0} <br />
                            <i className="fa fa-star" /> {course.ratingsCount > 0 ? course.rating : "?"}
                        </small>
                    </div>
                </div>
            </div>
            <div id="edit-content" className="tab-pane fade">
                <h3>Content</h3>
                <p>//TODO</p>
            </div>
            <div id="edit-badges" className="tab-pane fade">
                <h3>Badges</h3>
                <p>//TODO</p>
            </div>
        </div>
    </div>
  );
}
