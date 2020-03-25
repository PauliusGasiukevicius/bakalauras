import React, { useState } from 'react';

export default function Item({clickViewItem, edit, isSectionChecked, userProgress, isDoingAction, item, itemPos, sectionPos, itemAction}) {
    let {name, location} = item;

  return (
  <div className="w-100 d-flex">
        {!edit ? 
        <button disabled={isDoingAction} onClick={()=>{itemAction(sectionPos, itemPos, "TOGGLE_CHECK")}} className="btn btn-outline-light">
            <i className={`fa fa-${(isSectionChecked || userProgress.items.includes(item._id)) ?'check-':''}square`} style={{fontSize: '2em'}}></i>
        </button> : null}
        <button disabled={isDoingAction} onClick={()=>clickViewItem(sectionPos,itemPos)} className="w-100 btn btn-outline-light">
            {name}
            <i className="fa fa-eye float-right" style={{fontSize: '2em'}}></i>
        </button>
        {edit ? <>
        <button disabled={isDoingAction} className="btn btn-outline-light">
            <i className="fa fa-edit" style={{fontSize: '2em'}}></i>
        </button>
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
