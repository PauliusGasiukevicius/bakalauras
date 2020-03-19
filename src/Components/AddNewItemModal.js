import React, { useState } from 'react';

export default function AddNewItemModal({sectionId, createNewSectionItem, sectionPos}) {

  const [newItemName, setNewItemName] = useState('');  
  const [itemLoading, setItemLoading] = useState(false);

  let createItem = () => {
    createNewSectionItem(sectionPos,sectionId,newItemName,setItemLoading); //,location, type
    setNewItemName('');
  }

  return (
  <>
    <button className="btn btn-outline-light mx-auto" style={{fontSize: "1.2em"}} data-toggle="modal" data-target={`#${sectionId}addItem`}>
        {!itemLoading ? 
        <p className="align-middle p-0 m-0">
            New item <i className="fa fa-plus-circle"></i>
        </p>
         :
         <div>
           <span class="spinner-border spinner-grow-sm" role="status"></span>
           Loading...
         </div>}
    </button>

    <div className="modal fade" id={`${sectionId}addItem`} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <h5 className="modal-title">Add new item</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span className="text-white">&times;</span>
            </button>
          </div>
          <div className="modal-body d-flex">
            <div className="form w-100">
              <div className="form-group m-2 d-flex">
                <label className="">Item name</label>
                <input type="text" value={newItemName} onChange={(e)=>setNewItemName(e.target.value)} className=" form-control" placeholder="Enter item name" />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button onClick={()=>createItem()}type="button" className="btn btn-warning" data-dismiss="modal">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </>);
}
