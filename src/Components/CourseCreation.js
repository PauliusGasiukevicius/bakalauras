import React, {useState} from 'react';

export default function CourseCreation({user, setRoute, setCurrentCourse}) {
  const [isDoingAction, setIsDoingAction] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [imageUrl, setImageUrl] = useState("https://i.imgur.com/IUwKaVm.png");

  let onChangeImage = async (e) => {
    let img = document.getElementById('courseImageUpload').files[0]; 
    let apiUrl = 'https://api.imgur.com/3/image';
    let apiKey = '88f7b792a58698f';

    let formData = new FormData();
    formData.append("image", img);

    setIsDoingAction(true);
    let resp = await fetch(apiUrl, {method: "POST", mode: "cors", headers:
       {Authorization: 'Client-ID ' + apiKey, Accept: 'application/json'}, body: formData});
    let json = await resp.json();
    setImageUrl(json.data.link);
    setIsDoingAction(false);
  }

  let onSubmitCourse = () => {
    fetch("./createCourse",{method:"POST", headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({name: name, description: desc, imgUrl: imageUrl , user: user})})
    .then(r => r.json())
    .then(res => {
      if(res.err)alert(res.err);
      else 
      {
          setCurrentCourse(res);
          setRoute('courseEdit');
      }
    });
  }

  return (
  <div className="d-flex text-white w-100 justify-content-around" style={{marginTop: "10rem"}}>
    {isDoingAction ?<div className="position-fixed h-100 w-100 mx-auto" style={{zIndex: 10}}>
        <div className="fa fa-spinner fa-spin text-white mx-auto" style={{fontSize: "7em"}}></div></div> : null}
    <form className="w-75">
    <div className="form-group m-2">
          <img id="courseImage" className=" img-fluid p-3" style={{maxHeight: "300px"}} src={imageUrl}/>

          <div className="custom-file">
            <input onChange={(e)=>onChangeImage(e)} type="file" className="custom-file-input" id="courseImageUpload" accept="image/gif, image/jpeg, image/png" />
            <label className="custom-file-label" htmlFor="courseImageUpload">Change Image</label>
          </div>
        </div>
        <div className="form-group m-2">
            <label htmlFor="courseName">Course name</label>
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className="form-control" id="courseName" placeholder="Enter course name" />
        </div>
        <div className="form-group m-2">
            <label htmlFor="courseDesc">Description</label>
            <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} className="form-control" id="courseDesc" placeholder="Enter course description" />
        </div>
        <button onClick={() => onSubmitCourse()} className="btn btn-outline-light my-2 my-md-0" type="button">Submit</button>
    </form>
  </div>
  );
}
