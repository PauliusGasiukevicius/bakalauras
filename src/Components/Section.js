import React, { useState } from 'react';
import Item from './Item.js';

export default function Section({course, user, items, name, itemAction, sectionAction, sectionId}) {

let ID = name.replace(/ /g,'_');
  const [arrowUp, setArrowUp] = useState(false);
  const [check, setCheck] = useState(false);

  let deleteSection = () => {
    if(window.confirm("Are you sure you want to delete this whole section (including all items in it)? This action cannot be undone."))
        sectionAction(sectionId, "DELETE");
  }

  return (
  <div className="p-1" style={{marginBottom: '1em'}}>
    <div className="d-flex" >
        <button onClick={()=>setCheck(!check)} className="btn btn-outline-light">
            <i className={`fa fa-${check?'check-':''}square`} style={{fontSize: '2em'}}></i>
        </button>
        <button onClick={()=>setArrowUp(!arrowUp)} className="w-100 btn btn-outline-light" type="button" data-toggle="collapse" data-target={'#'+ID}>
            <div>
                {name}
                <i className={`fa fa-arrow-circle-${arrowUp ? 'up' : 'down'} pull-right`} style={{fontSize: '2em'}}></i>
            </div>
        </button>
        <button className="btn btn-outline-light">
            <i className="fa fa-edit" style={{fontSize: '2em'}}></i>
        </button>
        <button onClick={()=>{sectionAction(sectionId, "UP")}} className="btn btn-outline-light">
            <i className="fa fa-angle-up" style={{fontSize: '2em'}}></i>
        </button>
        <button onClick={()=>{sectionAction(sectionId, "DOWN")}} className="btn btn-outline-light">
            <i className="fa fa-angle-down" style={{fontSize: '2em'}}></i>
        </button>
        <button onClick={()=>deleteSection()} className="btn btn-outline-light">
                <i className="fa fa-trash" style={{fontSize: '2em'}}></i>
        </button>
    </div>

    <div className="collapse" id={ID}>
        <div className="card card-body bg-dark border border-white">
            <ul>
                {!items ? <></> :
                items.map((item,idx) => 
                    <Item 
                    itemId={idx}
                    sectionId={sectionId}
                    itemAction={itemAction}
                    key={course._id+name+item.name} 
                    location={item.location} 
                    name={item.name} 
                    course={course} 
                    user={user} />
                )}
            </ul>
            <button className="btn btn-outline-light mx-auto" style={{fontSize: "1.2em"}}>
                <p className="align-middle p-0 m-0">
                    New item <i className="fa fa-plus-circle"></i>
                </p>
            </button>
        </div>
    </div>
  </div>
  );
}
