import React, { useState } from 'react';
import PreviewSectionItem from './PreviewSectionItem.js';
import EditItemModal from './EditItemModal.js';

export default function Item({user, setUser, updateSectionItem, clickViewItem, edit, isSectionChecked, userProgress, isDoingAction, item, itemPos, sectionPos, itemAction}) {
    let {name, location} = item;

  return (
  <div className="w-100 d-flex">
        {!edit ? 
        <button disabled={isDoingAction} onClick={()=>{itemAction(sectionPos, itemPos, "TOGGLE_CHECK")}} className="btn btn-outline-light">
            <i className={`fa fa-${(isSectionChecked || userProgress.items.includes(item._id)) ?'check-':''}square`} style={{fontSize: '2em'}}></i>
        </button> : null}
        <PreviewSectionItem edit={edit} isDoingAction={isDoingAction} item={item} clickViewItem={clickViewItem} sectionPos={sectionPos} itemPos={itemPos}/>
        {edit ? <>
        <EditItemModal user={user} setUser={setUser} updateSectionItem={updateSectionItem} item={item} sectionPos={sectionPos} itemPos={itemPos}/>
        <button disabled={isDoingAction} onClick={()=>{itemAction(sectionPos, itemPos, "UP")}} className="btn btn-outline-light">
            <i className="fa fa-angle-up" style={{fontSize: '2em'}}></i>
        </button>
        <button disabled={isDoingAction} onClick={()=>{itemAction(sectionPos, itemPos, "DOWN")}} className="btn btn-outline-light">
            <i className="fa fa-angle-down" style={{fontSize: '2em'}}></i>
        </button>
        <button disabled={isDoingAction} onClick={()=>{itemAction(sectionPos, itemPos, "DELETE")}} className="btn btn-outline-light">
            <i className="fa fa-trash" style={{fontSize: '2em'}}></i>
        </button> </> : null}
  </div>
  );
}
