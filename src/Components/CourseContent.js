import React, { useState } from 'react';
import Section from './Section.js';

export default function CourseContent({course, user}) {
    const [data, setData] = useState([
    {name: 'Section 1', items: [{name: 'hmm'}, {name: 'test'}, {name: 'hmm3'}]},
    {name: 'Section 2', items: [{name: '3.txt'}]},
    {name: 'Section 3', items: [{name: '4.html'}]},
    ]);

  return (
  <div style={{color: "white"}}>
      
      {!data ? <></> :
      data.map(section => 
      <Section key={course._id+section.name} items={section.items} name={section.name} course={course} user={user} />
      )}
    
    <button className="btn btn-outline-light mx-auto m-3">
        <i className="mx-auto fa fa-plus-circle" style={{fontSize: "4em"}}></i>
    </button>

  </div>
  );
}
