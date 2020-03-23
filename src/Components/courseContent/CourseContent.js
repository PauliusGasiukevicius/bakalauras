import React, { useState, useEffect } from 'react';
import Section from './Section.js';
import AddNewSectionModal from './AddNewSectionModal.js';

export default function CourseContent({course, user, edit}) {
  
  const [data, setData] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [isDoingAction, setIsDoingAction] = useState(false);

  useEffect(() => {
    fetch(`/getCourseContent/${course._id}`)
    .then(r => r.json())
    .then(r => {if(!r.err)setData(r);});

    fetch(`/getUserCourseProgress/${course._id}/${user._id}`)
    .then(r => r.json())
    .then(r => {if(!r.err)setUserProgress(r);});

  },[]);

    let courseSectionAction = async (sectionPos, action, name) => {
      setIsDoingAction(true);
      let A = JSON.parse(JSON.stringify(data));
      let json, resp;

      switch(action){
        case 'EDIT':
          resp = await fetch(`/editSection/${A[sectionPos]._id}/`, {method:"POST", headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({user: user, name: name})});
          json = await resp.json();
          A[sectionPos].name = name;
          if(json.ok)setData(A);
        break;
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
        case 'TOGGLE_CHECK':
          resp = await fetch(`/toggleCheck/${course._id}/${user._id}`, 
          {method:"POST", headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({user: user, isSection: true, idToToggle: A[sectionPos]._id})});
          json = await resp.json();
          let B = JSON.parse(JSON.stringify(userProgress));
          if(B.sections.includes(A[sectionPos]._id))B.sections.splice(B.sections.indexOf(A[sectionPos]._id),1);
          else B.sections.push(A[sectionPos]._id);
          if(json.ok)setUserProgress(B);
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
        case 'TOGGLE_CHECK':
          resp = await fetch(`/toggleCheck/${course._id}/${user._id}`, 
          {method:"POST", headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({user: user, isSection: false, idToToggle: A[sectionPos].items[itemPos]._id})});
          json = await resp.json();
          let B = JSON.parse(JSON.stringify(userProgress));
          if(B.items.includes(A[sectionPos].items[itemPos]._id))B.items.splice(B.items.indexOf(A[sectionPos].items[itemPos]._id ),1);
          else B.items.push(A[sectionPos].items[itemPos]._id );
          if(json.ok)setUserProgress(B);
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

      {isDoingAction ?<div className="position-fixed h-100 w-100 mx-auto" style={{zIndex: 10}}>
        <div className="fa fa-spinner fa-spin text-white mx-auto" style={{fontSize: "7em"}}></div></div> : null}
      
      {!data ? <i className="fa fa-spinner fa-spin text-white" style={{fontSize: "3em"}}></i> :
      data.map((section, idx) => 
      <Section edit={edit} itemAction={courseItemAction} sectionAction={courseSectionAction}
      createNewSectionItem={createNewSectionItem} key={course._id+section._id} userProgress={userProgress}
      section={section} course={course} user={user} sectionPos={idx} isDoingAction={isDoingAction} />)}
    
    {!data || !edit ? <></> : <AddNewSectionModal createNewSection={createNewSection} />}

  </div>
  );
}
