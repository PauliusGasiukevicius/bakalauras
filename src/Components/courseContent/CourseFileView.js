import React, { useState } from 'react';

export default function CourseFileView({item}) {
    //TODO add next/prev buttons on sides
    
  return (
      <div className="p-2 card text-white bg-dark border border-white w-100" >
        {item && item.type == 'text' ? 
        <div style={{maxHeight: "500px", overflowY: "auto"}} className="w-100" dangerouslySetInnerHTML={{ __html: item.content }}></div> : null}
        {item && item.type == 'file' ? 
        <a download href={item.location} className="btn btn-outline-light">
            Download <i className="fa fa-download" style={{fontSize: "2em"}}></i>
            </a> : null}
        {item && item.type == 'video' ? 
        <video className="w-100" style={{maxHeight: "500px"}} controls autoplay src={item.location}></video> : null}
      </div>
  );
}
