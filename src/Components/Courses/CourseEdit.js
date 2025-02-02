import React, {useEffect, useState} from 'react';
import CourseContent from './Content/CourseContent.js';
import EditCompletion from './Completion/EditCompletion.js';

export default function CourseEdit({setUser, course, user, setRoute, setCourse}) {

    const [name, setName] = useState(course.name);
    const [desc, setDesc] = useState(course.desc);
    const [imageUrl, setImageUrl] = useState(course.imageUrl || "https://i.imgur.com/IUwKaVm.png");
    const [isDoingAction, setIsDoingAction] = useState(false);

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
                if(r && r.err){
                    alert(r.err);
                    if(r.relogin)setUser(null);
                }
                setRoute('home');
            })
        }
    }

    let onChangeImage = async (e) => {
        let img = document.getElementById('editCourseImageUpload').files[0]; 

    let formData = new FormData();
    formData.append("image", img);
    formData.append("user", JSON.stringify(user));
    
        setIsDoingAction(true);
        let resp = await fetch(`/image`, {method: "POST", body: formData});
        let json = await resp.json();
        if(json.url)setImageUrl(json.url);
        else alert(json.err);
        setIsDoingAction(false);
      }
    
      let onEditCourse = async () => {
        let resp = await fetch(`/editCourse${course._id}`,{method:"POST", headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({name: name, description: desc, imageUrl: imageUrl , user: user})});
        let json = await resp.json();
          if(json.err){
              alert(json.err);
              if(json.relogin)setUser(null);
          }
          else {
              setCourse(json);
              alert('success');
          }
      }

  return (
    <div className="w-100" style={{color: "white"}}>
        <ul className="nav nav-tabs nav-justified w-100">
            <li className="nav-item w-100">
                <a className="btn btn btn-outline-light w-100" id="courseViewFirstTab" data-toggle="tab" href="#edit-general">about</a>
            </li>
            <li className="nav-item">
                <a className="btn btn btn-outline-light w-100" data-toggle="tab" href="#edit-content">content</a>
            </li>
            <li className="nav-item">
                <a className="btn btn btn-outline-light w-100" data-toggle="tab" href="#edit-completion">completion</a>
            </li>
        </ul>

        {isDoingAction ?<div className="position-fixed h-100 w-100 mx-auto" style={{zIndex: 10}}>
        <div className="fa fa-spinner fa-spin text-white mx-auto" style={{fontSize: "7em"}}></div></div> : null}

        <div className="tab-content">
            <div id="edit-general" className="tab-pane fade">
                <div className="w-100 card text-white bg-dark border border-white" >

                    <form className="w-75 mx-auto" style={{marginBottom: "10px"}}>
                    <div className="form-group m-2">
                        <img id="editCourseImage" className=" img-fluid p-3" style={{maxHeight: "300px"}} src={imageUrl}/>

                        <div className="custom-file">
                            <input onChange={(e)=>onChangeImage(e)} type="file" className="custom-file-input" id="editCourseImageUpload" accept="image/*" />
                            <label className="custom-file-label text-left" htmlFor="editCourseImageUpload">Change Image</label>
                        </div>
                        </div>
                        <div className="form-group m-2">
                            <label htmlFor="editCourseName">Course name</label>
                            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" id="editCourseName" placeholder="Enter course name" />
                        </div>
                        <div className="form-group m-2">
                            <label htmlFor="editCourseDesc">Description</label>
                            <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} className="form-control" id="editCourseDesc" placeholder="Enter course description" />
                        </div>
                        <button style={{marginBottom: "10px"}} onClick={() => onEditCourse()} className="btn btn-outline-light my-2 my-md-0" type="button">Confirm changes</button>
                    </form>

                    <button onClick={() => deleteCourse()} type="button" className="m-2 mx-auto w-75 btn btn-danger">Delete course</button>
                </div>
            </div>
            <div id="edit-content" className="tab-pane fade">
                <h3>Content</h3>
                <CourseContent setUser={setUser} user={user} course={course} edit={true}/>
            </div>
            <div id="edit-completion" className="tab-pane fade">
                <h3>Completion:</h3>
                <EditCompletion setUser={setUser} user={user} course={course} />
            </div>
        </div>
    </div>
  );
}
