import React, { useState } from 'react';

export default function Item({course, user, location, name, itemId, sectionId, itemAction}) {
    const [check, setCheck] = useState(false);

  return (
  <div className="w-100 d-flex">
        <button onClick={()=>setCheck(!check)} className="btn btn-outline-light">
            <i className={`fa fa-${check?'check-':''}square`} style={{fontSize: '2em'}}></i>
        </button>
        <button className="w-100 btn btn-outline-light">
            {name}
            <i className="fa fa-eye float-right" style={{fontSize: '2em'}}></i>
        </button>
        <button className="btn btn-outline-light">
            <i className="fa fa-edit" style={{fontSize: '2em'}}></i>
        </button>
        <button onClick={()=>{itemAction(sectionId, itemId, "UP")}} className="btn btn-outline-light">
            <i className="fa fa-angle-up" style={{fontSize: '2em'}}></i>
        </button>
        <button onClick={()=>{itemAction(sectionId, itemId, "DOWN")}} className="btn btn-outline-light">
            <i className="fa fa-angle-down" style={{fontSize: '2em'}}></i>
        </button>
        <button onClick={()=>{itemAction(sectionId, itemId, "DELETE")}} className="btn btn-outline-light">
            <i className="fa fa-trash" style={{fontSize: '2em'}}></i>
        </button>
  </div>
  );
}
