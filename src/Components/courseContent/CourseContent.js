import React, { useState, useEffect } from 'react';
import Section from './Section.js';
import AddNewSectionModal from './AddNewSectionModal.js';

export default function CourseContent({course, user}) {
  
  const [data, setData] = useState(null);
  const [isDoingAction, setIsDoingAction] = useState(false);

  useEffect(() => {
    fetch(`/getCourseContent/${course._id}`)
    .then(r => r.json())
    .then(r => {if(!r.err)setData(r);});
  },[]);

    let courseSectionAction = async (sectionPos, action) => {
      setIsDoingAction(true);
      let A = JSON.parse(JSON.stringify(data));
      let json, resp;

      switch(action){
        case 'UP':
          if(sectionPos == 0)break;
          [A[sectionPos-1], A[sectionPos]] = [A[sectionPos], A[sectionPos-1]];
          resp = await fetch(`/swapSections/${course._id}/`, {method:"POST", headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({user: user, pos1: sectionPos-1, pos2: sectionPos})});
          json = await resp.json();
          if(json.ok)setData(A);
        break;
        case 'DOWN':
          if(sectionPos + 1 == A.length)break;
          [A[sectionPos], A[sectionPos+1]] = [A[sectionPos+1], A[sectionPos]];
          resp = await fetch(`/swapSections/${course._id}/`, {method:"POST", headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({user: user, pos1: sectionPos, pos2: sectionPos+1})});
          json = await resp.json();
          if(json.ok)setData(A);
        break;
        case 'DELETE':
          resp = await fetch(`/deleteSection/${course._id}/${A[sectionPos]._id}`, 
          {method:"DELETE", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({user: user})});
          json = await resp.json();
          A.splice(sectionPos,1);
          if(json.ok)setData(A);
        break;
        default:
      }
      setIsDoingAction(false);
    }

    let courseItemAction = async (sectionPos, itemPos, action) => {
      setIsDoingAction(true);
      let A = JSON.parse(JSON.stringify(data));
      let json, resp;
      switch(action){
        case 'UP':
          if(itemPos == 0)break;
          [A[sectionPos].items[itemPos-1], A[sectionPos].items[itemPos]] = [A[sectionPos].items[itemPos], A[sectionPos].items[itemPos-1]];
          resp = await fetch(`/swapItems/${A[sectionPos]._id}/`, {method:"POST", headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({user: user, pos1: itemPos-1, pos2: itemPos})});
          json = await resp.json();
          if(json.ok)setData(A);
        break;
        case 'DOWN':
          if(itemPos + 1 == A[sectionPos].items.length)break;
          [A[sectionPos].items[itemPos], A[sectionPos].items[itemPos+1]] = [A[sectionPos].items[itemPos+1], A[sectionPos].items[itemPos]];
          resp = await fetch(`/swapItems/${A[sectionPos]._id}/`, {method:"POST", headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({user: user, pos1: itemPos, pos2: itemPos+1})});
          json = await resp.json();
          if(json.ok)setData(A);
        break;
        case 'DELETE':
          resp = await fetch(`/deleteItem/${A[sectionPos]._id}/${A[sectionPos].items[itemPos]._id}`, 
          {method:"DELETE", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({user: user})});
          json = await resp.json();
          A[sectionPos].items.splice(itemPos,1);
          if(json.ok)setData(A);
        break;

        default:
      }
      setIsDoingAction(false);
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

      if(json._id)
      {
        A[sectionPos].items.push(json);
        setData(A);
      }
    }

  return (
  <div style={{color: "white"}}>

      {isDoingAction ?<div className="position-fixed h-100 w-100 mx-auto">
        <div className="fa fa-spinner fa-spin text-white mx-auto" style={{fontSize: "7em"}}></div></div> : null}
      
      {!data ? <i className="fa fa-spinner fa-spin text-white" style={{fontSize: "3em"}}></i> :
      data.map((section, idx) => 
      <Section itemAction={courseItemAction} sectionAction={courseSectionAction}
      createNewSectionItem={createNewSectionItem} key={course._id+section._id} 
      section={section} course={course} user={user} sectionPos={idx} isDoingAction={isDoingAction} />)}
    
    {!data ? <></> : <AddNewSectionModal createNewSection={createNewSection} />}

  </div>
  );
}
