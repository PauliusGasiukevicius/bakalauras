import React, {useState, useEffect, useCallback} from 'react';

export default function CourseCreation({user}) {

  let onChangeImage = (e) => {
    let img = document.getElementById('courseImageUpload').files[0];
    let reader = new FileReader();        
    reader.onload = e => document.getElementById('courseImage').src = e.target.result;        
    reader.readAsDataURL(img);
  }

  let onSubmitCourse = () => {
    let courseName = document.getElementById('courseName').value;
    let courseDescription = document.getElementById('courseDesc').value;
    let img = document.getElementById('courseImageUpload').files[0];

    let data = new FormData();
    data.append('image', img);
    data.append('name', courseName);
    data.append('description', courseDescription);

    console.log(data.entries);

    fetch("./createCourse",{method:"POST", body: data})
    .then(r => r.json())
    .then(res => console.log(res));
  }

  return (
  <div className="d-flex text-white w-100 justify-content-around" style={{marginTop: "10rem"}}>
    <form className="w-75">
    <div className="form-group m-2">
          <img id="courseImage" className=" img-fluid p-3" maxHeight="300px" src="/public/images/default_course_img.png"/>

          <div class="custom-file">
            <input onChange={(e)=>onChangeImage(e)} type="file" class="custom-file-input" id="courseImageUpload" accept="image/gif, image/jpeg, image/png" />
            <label class="custom-file-label" htmlFor="courseImageUpload">Change Image</label>
          </div>
        </div>
        <div className="form-group m-2">
            <label htmlFor="courseName">Course name</label>
            <input type="text" className="form-control" id="courseName" placeholder="Enter course name" />
        </div>
        <div className="form-group m-2">
            <label htmlFor="courseDesc">Description</label>
            <textarea className="form-control" id="courseDesc" placeholder="Enter course description" />
        </div>
        <button onClick={() => onSubmitCourse()} className="btn btn-outline-light my-2 my-md-0" type="button">Submit</button>
    </form>
  </div>
  );
}
