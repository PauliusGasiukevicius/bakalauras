import React, { useState } from 'react';

export default function Item({isDoingAction, course, user, location, name, itemPos, sectionPos, itemAction}) {
    const [check, setCheck] = useState(false);

  return (
  <div className="w-100 d-flex">
        <button disabled={isDoingAction} onClick={()=>setCheck(!check)} className="btn btn-outline-light">
            <i className={`fa fa-${check?'check-':''}square`} style={{fontSize: '2em'}}></i>
        </button>
        <button disabled={isDoingAction} className="w-100 btn btn-outline-light">
            {name}
            <i className="fa fa-eye float-right" style={{fontSize: '2em'}}></i>
        </button>
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
        </button>
  </div>
  );
}
