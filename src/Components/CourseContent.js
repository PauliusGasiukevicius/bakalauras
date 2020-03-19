import React, { useState, useEffect } from 'react';
import Section from './Section.js';
import AddNewSectionModal from './AddNewSectionModal.js';

export default function CourseContent({course, user}) {
  
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/getCourseContent/${course._id}`)
    .then(r => r.json())
    .then(r => {
      if(!r.err)setData(r);
      console.log(r);
    });
  },[]);

  //id now mean actual db _id so should fix code to use pos
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

    //id now mean actual db _id so should fix code to use pos
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

    let createNewSection = async (name, setSectionLoading) => {
      if(name == '')return alert('name cannot be empty');
      let A = JSON.parse(JSON.stringify(data));

      setSectionLoading(true);
      let resp = await fetch(`/addSection/${course._id}`, 
      {method:"POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({name: name, user: user})});
      let json = await resp.json();
      setSectionLoading(false);

      if(json._id)
      {
        A.push(json);
        setData(A);
      }
    }

    let createNewSectionItem = async (sectionPos, sectionId, name, setItemLoading, location='test', type='test') => {
      if(name == '')return alert('name cannot be empty');
      let A = JSON.parse(JSON.stringify(data));

      setItemLoading(true);
      let resp = await fetch(`/addItem/${course._id}/${sectionId}`, 
      {method:"POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({name: name, location: location, type: type, user: user})});
      let json = await resp.json();
      setItemLoading(false);

      console.log(json);

      if(json._id)
      {
        A[sectionPos].items.push(json);
        setData(A);
      }
    }

  return (
  <div style={{color: "white"}}>
      
      {!data ? <i className="fa fa-spinner fa-spin text-white" style={{fontSize: "3em"}}></i> :
      data.map((section, idx) => 
      <Section itemAction={courseItemAction} sectionAction={courseSectionAction}
      createNewSectionItem={createNewSectionItem} key={course._id+section._id} 
      section={section} course={course} user={user} sectionPos={idx} />)}
    
    {!data ? <></> : <AddNewSectionModal createNewSection={createNewSection} />}

  </div>
  );
}
