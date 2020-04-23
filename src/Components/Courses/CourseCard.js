import React, {} from 'react';

export default function CourseCard({course, user, goToCourseView}) {

 let getLowResLinkForImgur = () => {
     if(!course.imageUrl)return "https://i.imgur.com/IUwKaVmm.png";
     let url = course.imageUrl;
     return url.substring(0, url.lastIndexOf('.')) + "m" + url.substring(url.lastIndexOf('.'));
 }

  return (
  <div className="m-2 card text-white bg-dark border border-white" style={{width: "420px", maxHeight: "600px"}}>
        <img className="card-img-top" style={{maxHeight: "200px", width: "auto"}} src={getLowResLinkForImgur()} />

        <div className="card-body">
            <h2 className="card-title">{course.name}</h2>
            <p className="card-text">{course.desc.length > 80 ? course.desc.substring(0, 79) + "..." : course.desc}</p>
            {!user ? <></> :
            user.courses.includes(course._id) ? 
            <button onClick={()=>goToCourseView(course)} type="button" className="m-1 w-100 btn btn-success">continue course</button> : 
            <button onClick={()=>goToCourseView(course)} type="button" className="m-1 w-100 btn btn-warning">Enter course</button>}
            {!user ? <></> :
            course.creator === user._id ? 
            <button onClick={()=>goToCourseView(course, 1)} type="button" className="m-1 w-100 btn btn-warning">Edit course</button> : 
            <></>}
        </div>

        <div className="card-footer">
            <small className="">
                <i className="fa fa-user" /> {course.students || 0} <br />
                <i className="fa fa-star" /> {course.ratingsCount > 0 ? (course.rating/course.ratingsCount).toFixed(1) : "?"}
            </small>
        </div>
  </div>
  );
}
