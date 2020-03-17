import React, { useState } from 'react';
import Section from './Section.js';

export default function CourseContent({course, user}) {
    const [data, setData] = useState([
      {name: 'Section 1', items: [{name: 'hmm'}, {name: 'test'}, {name: 'hmm3'}]},
      {name: 'Section 2', items: [{name: '3.txt'}]},
      {name: 'Section 3', items: [{name: '4.html'}]},
    ]);

    let courseSectionAction = (sectionID, action) => {
      let A = JSON.parse(JSON.stringify(data));
      switch(action){
        case 'UP':
          if(sectionID == 0)return;
          [A[sectionID-1], A[sectionID]] = [A[sectionID], A[sectionID-1]];
          setData(A);
        break;
        case 'DOWN':
          if(sectionID + 1 == A.length)return;
          [A[sectionID], A[sectionID+1]] = [A[sectionID+1], A[sectionID]];
          setData(A);
        break;
        case 'DELETE':
          A.splice(sectionID,1);
          setData(A);
        break;

        default:
      }
    }

    let courseItemAction = (sectionID, itemID, action) => {
      let A = JSON.parse(JSON.stringify(data));
      console.log(A);
      switch(action){
        case 'UP':
          if(itemID == 0)return;
          [A[sectionID].items[itemID-1], A[sectionID].items[itemID]] = [A[sectionID].items[itemID], A[sectionID].items[itemID-1]];
          setData(A);
        break;
        case 'DOWN':
          if(itemID + 1 == A[sectionID].items.length)return;
          [A[sectionID].items[itemID], A[sectionID].items[itemID+1]] = [A[sectionID].items[itemID+1], A[sectionID].items[itemID]];
          setData(A);
        break;
        case 'DELETE':
          A[sectionID].items.splice(itemID,1);
          setData(A);
        break;

        default:
      }
    }

  return (
  <div style={{color: "white"}}>
      
      {!data ? <></> :
      data.map((section, idx) => 
      <Section sectionId={idx}
      itemAction={courseItemAction}
      sectionAction={courseSectionAction}
       key={course._id+section.name} 
       items={section.items} 
       name={section.name} 
       course={course} 
       user={user} />
      )}
    
    <button className="btn btn-outline-light mx-auto" style={{fontSize: "1.2em"}}>
        <p className="align-middle p-0 m-0">
          New section <i className="fa fa-plus-circle"></i>
        </p>
    </button>

  </div>
  );
}
