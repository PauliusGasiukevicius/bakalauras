import React, { useEffect, useState } from 'react';
import Badge from './Badge.js';

export default function EditCompletion({user, course, setUser}) {

  const [badge, setBadge] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [isDoingAction, setIsDoingAction] = useState(false);

  useEffect(()=>{
    console.log(course.completionBadge);
    if(course.completionBadge)
        fetch(`/badge/${course.completionBadge}`)
        .then(r => r.json())
        .then(r => {
            if(r._id)
            {
              setBadge(r);
              setImgUrl(r.imageUrl);
            }
            
        });
  },[]);

  
  let onChangeImage = async (e) => {
    let img = document.getElementById('badgeEditImageUpload').files[0]; 

    let formData = new FormData();
    formData.append("image", img);
    formData.append("user", JSON.stringify(user));

    setIsDoingAction(true);
    let resp = await fetch(`/image`, {method: "POST", body: formData});
    let json = await resp.json();
    if(json.url)setBadge({...badge, imageUrl: json.url});
    else alert(json.err);
    setIsDoingAction(false);
  }

  let onEditBadge = async () => {
    let resp = await fetch(`/editBadge/${badge._id}`,{method:"POST", headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(badge)});
    let json = await resp.json();
      if(json.err){
          alert(json.err);
          if(json.relogin)setUser(null);
      }
      else {
          alert('success');
      }
  }

  return (
  <div className="text-white h-100 p-2" style={{backgroundColor: "#282c34"}}>
    {isDoingAction ?<div className="position-fixed h-100 w-100 mx-auto" style={{zIndex: 10}}>
    <div className="fa fa-spinner fa-spin text-white mx-auto" style={{fontSize: "7em"}}></div></div> : null}

    <div className="card text-white bg-dark border border-white">
        Course completion badge: <br />
        {!badge ? <p><i className="fa fa-spinner fa-spin text-white" style={{fontSize: "2em"}}/></p> : 
        <>
          <form className="w-75 mx-auto" style={{marginBottom: "10px"}}>
                    <div className="form-group m-2">
                        <img className=" img-fluid p-3" style={{maxWidth: "200px", maxHeight: "200px"}} src={badge.imageUrl} alt=""/>

                        <div className="custom-file">
                            <input onChange={(e)=>onChangeImage(e)} type="file" className="custom-file-input" id="badgeEditImageUpload" accept="image/*" />
                            <label className="custom-file-label text-left" htmlFor="badgeEditImageUpload">Change Image</label>
                        </div>
                        </div>
                        <div className="form-group m-2">
                            <label htmlFor="editCourseName">Badge title</label>
                            <input value={badge.name} onChange={(e)=>setBadge({...badge, name: e.target.value})} type="text" className="form-control" id="editCourseName" placeholder="Enter course name" />
                        </div>
                        <div className="form-group m-2">
                            <label htmlFor="editCourseDesc">Description</label>
                            <textarea value={badge.desc} onChange={(e)=>setBadge({...badge, desc: e.target.value})} className="form-control" id="editCourseDesc" placeholder="Enter course description" />
                        </div>
                        <button style={{marginBottom: "10px"}} onClick={() => onEditBadge()} className="btn btn-outline-light my-2 my-md-0" type="button">Confirm changes</button>
                    </form>
        </>
        }
         <br />
        
    </div> 
  </div>
  );
}