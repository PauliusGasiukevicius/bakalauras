import React, { useState } from 'react';

export default function CourseFileView({file}) {
    //TODO add next/prev buttons on sides
    console.log(file);
    
  return (
      <div className="m-2 card text-white bg-dark border border-white" >
          {file && file.type == 'text' ? <div style={{maxHeight: "500px", overflowY: "auto"}} className="w-100" dangerouslySetInnerHTML={{ __html: file.content }}></div> : null}
      </div>
  );
}
