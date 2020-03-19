import React, { useState } from 'react';

export default function AddNewSectionModal({createNewSection}) {

  const [newSectionName, setNewSectionName] = useState('');
  const [sectionLoading, setSectionLoading] = useState(false);

  let createSection = () => {
      createNewSection(newSectionName, setSectionLoading);
      setNewSectionName('');
  }

  return (
  <>
    <button className="btn btn-outline-light mx-auto" style={{fontSize: "1.2em"}} data-toggle="modal" data-target="#addSection">
        {!sectionLoading ? 
        <p className="align-middle p-0 m-0">
          New section <i className="fa fa-plus-circle"></i>
        </p> :
        <div>
          <span class="spinner-border spinner-grow-sm" role="status"></span>
          Loading...
        </div>}
    </button>

    <div className="modal fade" id="addSection" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <h5 className="modal-title">Add new section</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span className="text-white">&times;</span>
            </button>
          </div>
          <div className="modal-body d-flex">
            <div className="form w-100">
              <div className="form-group m-2 d-flex">
                <label className="">Section name</label>
                <input type="text" value={newSectionName} onChange={(e)=>setNewSectionName(e.target.value)} className=" form-control" placeholder="Enter section name" />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button onClick={()=>createSection()}type="button" className="btn btn-warning" data-dismiss="modal">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </>);
}
