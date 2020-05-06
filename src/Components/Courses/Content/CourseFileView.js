import React, { useState } from 'react';

export default function CourseFileView({item, clickNextPrevItem, isPreview}) {

  let clickNext = () => {
    clickNextPrevItem('next');
  }

  let clickPrev = () => {
    clickNextPrevItem('prev');
  }
    
  return (
      <div className="p-2 card text-white bg-dark border border-white w-100" >
        {!isPreview && item ? 
        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-light" type="button" onClick={()=>clickPrev()}>&#8249; Previous</button>
          <p>{item.name}</p>
          <button className="btn btn-outline-light" type="button" onClick={()=>clickNext()}>Next &#8250;</button>
        </div> : null}

        {item && item.type == 'text' ? 
        <div style={{maxHeight: "500px", overflowY: "auto"}} className="w-100 text-left" dangerouslySetInnerHTML={{ __html: item.content }}></div> : null}
        {item && item.type == 'file' ? 
        <a download href={item.location} className="btn btn-outline-light">
            Download <i className="fa fa-download" style={{fontSize: "2em"}}></i>
            </a> : null}
        {item && item.type == 'video' ? 
        <video onEnded={()=>clickNext()} className="w-100" style={{maxHeight: "500px"}} controls autoPlay src={item.location}></video> : null}
      </div>
  );
}
