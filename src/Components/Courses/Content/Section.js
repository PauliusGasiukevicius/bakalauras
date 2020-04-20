import React, { useState } from 'react';
import Item from './Item.js';
import AddNewItemModal from './AddNewItemModal.js';
import EditSectionModal from './EditSectionModal.js';

export default function Section({setUser, updateSectionItem, clickViewItem, edit, userProgress, isDoingAction, sectionPos, course, user, section, itemAction, sectionAction, createNewSectionItem}) {

  let {name, items, _id} = section;
  const [arrowUp, setArrowUp] = useState(false);

  let deleteSection = () => {
    if(window.confirm("Are you sure you want to delete this whole section (including all items in it)? This action cannot be undone."))
        sectionAction(sectionPos, "DELETE");
  }

  return (
  <div className="p-1" style={{marginBottom: '1em'}}>
    <div className="d-flex" >
        {!edit ?
        <button disabled={isDoingAction} onClick={()=>sectionAction(sectionPos, "TOGGLE_CHECK")} className="btn btn-outline-light">
            <i className={`fa fa-${userProgress.sections.includes(section._id) ?'check-':''}square`} style={{fontSize: '2em'}}></i>
        </button> : null}
        <button disabled={isDoingAction} onClick={()=>setArrowUp(!arrowUp)} className="w-100 btn btn-outline-light" type="button" data-toggle="collapse" data-target={'#section'+_id}>
            <div>
                {name}
                <i className={`fa fa-arrow-circle-${arrowUp ? 'up' : 'down'} pull-right`} style={{fontSize: '2em'}}></i>
            </div>
        </button>
        {edit ? <>
            <EditSectionModal sectionPos={sectionPos} section={section} sectionAction={sectionAction}/>
        <button disabled={isDoingAction} onClick={()=>{sectionAction(sectionPos, "UP")}} className="btn btn-outline-light">
            <i className="fa fa-angle-up" style={{fontSize: '2em'}}></i>
        </button>
        <button disabled={isDoingAction} onClick={()=>{sectionAction(sectionPos, "DOWN")}} className="btn btn-outline-light">
            <i className="fa fa-angle-down" style={{fontSize: '2em'}}></i>
        </button>
        <button disabled={isDoingAction} onClick={()=>deleteSection()} className="btn btn-outline-light">
                <i className="fa fa-trash" style={{fontSize: '2em'}}></i>
        </button></> : null}
    </div>

    <div className="collapse" id={'section'+_id}>
        <div className="card card-body bg-dark border border-white">
            <ul>
                {!items ? <></> :
                items.map((item,idx) => 
                    <Item user={user} setUser={setUser}
                    isDoingAction={isDoingAction} itemPos={idx} sectionPos={sectionPos} clickViewItem={clickViewItem}
                    itemAction={itemAction} key={course._id+section._id+item._id} edit={edit} updateSectionItem={updateSectionItem}
                    item={item} userProgress={userProgress} isSectionChecked={userProgress.sections.includes(section._id)}/>
                )}
            </ul>
            
            {!edit ? null : <AddNewItemModal setUser={setUser} user={user} sectionPos={sectionPos} sectionId={_id} createNewSectionItem={createNewSectionItem}/>}
        </div>
    </div>
  </div>
  );
}
