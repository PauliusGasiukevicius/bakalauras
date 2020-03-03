import React, {useState, useEffect} from 'react';

export default function CourseEdit({currentCourse, user}) {
  return (
  <div className="w-100 container-fluid d-flex flex-wrap justify-content-around">
    <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
            <a className="nav-link active" id="general-tab" data-toggle="tab" href="#general" role="tab">General</a>
        </li>
        <li className="nav-item">
            <a className="nav-link active" id="content-tab" data-toggle="tab" href="#content" role="tab">Content</a>
        </li>
        <li className="nav-item">
            <a className="nav-link active" id="questions-tab" data-toggle="tab" href="#questions" role="tab">Q{'&'}A</a>
        </li>
    </ul>
        <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="general" role="tabpanel" ><p>textas</p></div>
            <div className="tab-pane fade show" id="content" role="tabpanel" >???</div>
            <div className="tab-pane fade show" id="questions" role="tabpanel" >...</div>
        </div>
  </div>
  );
}
