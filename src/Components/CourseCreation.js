import React, {} from 'react';

export default function CourseCreation({user, setRoute, setCurrentCourse}) {

  let onChangeImage = (e) => {
    let img = document.getElementById('courseImageUpload').files[0]; 
    let apiUrl = 'https://api.imgur.com/3/image';
    let apiKey = '88f7b792a58698f';

    let formData = new FormData();
    formData.append("image", img);

    fetch(apiUrl, {method: "POST", mode: "cors", headers:
       {Authorization: 'Client-ID ' + apiKey, Accept: 'application/json'}, body: formData})
    .then(r => r.json())
    .then(r => document.getElementById('courseImage').src = r.data.link);

  }

  let onSubmitCourse = () => {
    let courseName = document.getElementById('courseName').value;
    let courseDescription = document.getElementById('courseDesc').value;
    let imgUrl = document.getElementById('courseImage').src;

    fetch("./createCourse",{method:"POST", headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({name: courseName, description: courseDescription, imgUrl: imgUrl , user: user})})
    .then(r => r.json())
    .then(res => {
      if(res.err)alert(res.err);
      else 
      {
          setCurrentCourse(res._id);
          setRoute('courseEdit');
      }
    });
  }

  return (
  <div className="d-flex text-white w-100 justify-content-around" style={{marginTop: "10rem"}}>
    <form className="w-75">
    <div className="form-group m-2">
          <img id="courseImage" className=" img-fluid p-3" style={{maxHeight: "300px"}} src="https://i.imgur.com/IUwKaVm.png"/>

          <div className="custom-file">
            <input onChange={(e)=>onChangeImage(e)} type="file" className="custom-file-input" id="courseImageUpload" accept="image/gif, image/jpeg, image/png" />
            <label className="custom-file-label" htmlFor="courseImageUpload">Change Image</label>
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
