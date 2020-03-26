import React, { useState } from 'react';

export default function CourseFileView({file}) {
    //TODO add next/prev buttons on sides
    
  return (
      <div className="m-2 card text-white bg-dark border border-white" >
        {file && file.type == 'text' ? 
        <div style={{maxHeight: "500px", overflowY: "auto"}} className="w-100" dangerouslySetInnerHTML={{ __html: file.content }}></div> : null}
        {file && file.type == 'file' ? 
        <a download href={file.location} className="btn btn-outline-light">
            Download <i className="fa fa-download" style={{fontSize: "2em"}}></i>
            </a> : null}
        {file && file.type == 'video' ? 
        <video className="w-100" style={{maxHeight: "500px"}} controls autoplay src={file.location}></video> : null}
      </div>
  );
}
