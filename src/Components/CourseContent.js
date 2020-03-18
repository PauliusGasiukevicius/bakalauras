import React, { useState } from 'react';
import Section from './Section.js';
import AddNewSectionModal from './AddNewSectionModal.js';

export default function CourseContent({course, user}) {
  
  const [data, setData] = useState([
      {_id: '321sd21s', name: 'Section 1', items: [{_id: 'sdfsdffs', name: 'hmm'}, {_id: 'sdfsdffs', name: 'test'}, {_id: 'sdfsdffs', name: 'hmm3'}]},
      {_id: 'sdfsdffs', name: 'Section 2', items: [{_id: 'sdfsdffs', name: '3.txt'}]},
      {_id: 'fgfggd1s', name: 'Section 3', items: [{_id: 'sdfsdffs', name: '4.html'}]},
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

    let createNewSection = (name) => {
      if(name == '')return alert('name cannot be empty');
      let A = JSON.parse(JSON.stringify(data));
      A.push({name:name, items: [], id: new Date().getTime() + Math.random().toString()});
      setData(A);
    }

    let createNewSectionItem = (sectionId, name, location) => {
      if(name == '')return alert('name cannot be empty');
      let A = JSON.parse(JSON.stringify(data));
      A[sectionId].items.push({name:name, location: '', _id: new Date().getTime() + Math.random().toString()});
      setData(A);
    }

  return (
  <div style={{color: "white"}}>
      
      {!data ? <></> :
      data.map((section, idx) => 
      <Section sectionId={idx} itemAction={courseItemAction} sectionAction={courseSectionAction}
      createNewSectionItem={createNewSectionItem} key={course._id+section._id} 
      section={section} course={course} user={user} />)}
    
    <AddNewSectionModal createNewSection={createNewSection} />

  </div>
  );
}
