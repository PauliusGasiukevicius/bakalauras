import React, { useState } from 'react';
import Item from './Item.js';
import AddNewItemModal from './AddNewItemModal.js';

export default function Section({sectionPos, course, user, section, itemAction, sectionAction, createNewSectionItem}) {

  let {name, items, _id} = section;
  const [arrowUp, setArrowUp] = useState(false);
  const [check, setCheck] = useState(false);

  let deleteSection = () => {
    if(window.confirm("Are you sure you want to delete this whole section (including all items in it)? This action cannot be undone."))
        sectionAction(sectionPos, "DELETE");
  }

  return (
  <div className="p-1" style={{marginBottom: '1em'}}>
    <div className="d-flex" >
        <button onClick={()=>setCheck(!check)} className="btn btn-outline-light">
            <i className={`fa fa-${check?'check-':''}square`} style={{fontSize: '2em'}}></i>
        </button>
        <button onClick={()=>setArrowUp(!arrowUp)} className="w-100 btn btn-outline-light" type="button" data-toggle="collapse" data-target={'#section'+_id}>
            <div>
                {name}
                <i className={`fa fa-arrow-circle-${arrowUp ? 'up' : 'down'} pull-right`} style={{fontSize: '2em'}}></i>
            </div>
        </button>
        <button className="btn btn-outline-light">
            <i className="fa fa-edit" style={{fontSize: '2em'}}></i>
        </button>
        <button onClick={()=>{sectionAction(sectionPos, "UP")}} className="btn btn-outline-light">
            <i className="fa fa-angle-up" style={{fontSize: '2em'}}></i>
        </button>
        <button onClick={()=>{sectionAction(sectionPos, "DOWN")}} className="btn btn-outline-light">
            <i className="fa fa-angle-down" style={{fontSize: '2em'}}></i>
        </button>
        <button onClick={()=>deleteSection()} className="btn btn-outline-light">
                <i className="fa fa-trash" style={{fontSize: '2em'}}></i>
        </button>
    </div>

    <div className="collapse" id={'section'+_id}>
        <div className="card card-body bg-dark border border-white">
            <ul>
                {!items ? <></> :
                items.map((item,idx) => 
                    <Item 
                    itemPos={idx}
                    sectionPos={sectionPos}
                    itemAction={itemAction}
                    key={course._id+section._id+item._id} 
                    location={item.location} 
                    name={item.name} 
                    course={course} 
                    user={user} />
                )}
            </ul>
            <AddNewItemModal sectionPos={sectionPos} sectionId={_id} createNewSectionItem={createNewSectionItem}/>
        </div>
    </div>
  </div>
  );
}
