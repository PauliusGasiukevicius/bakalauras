import React, { useState } from 'react';

export default function EditSectionModal({sectionPos, section, sectionAction}) {

  const [newSectionName, setNewSectionName] = useState(section.name);
  const [sectionLoading, setSectionLoading] = useState(false);

  let editSection = () => {
    setSectionLoading(true);
    sectionAction(sectionPos, 'EDIT', newSectionName);
    setSectionLoading(false);
  }

  return (
  <>
  <button disabled={sectionLoading} className="btn btn-outline-light" style={{fontSize: "1.2em"}} 
  data-toggle="modal" data-target={`#editsection${section._id}`}>
        {!sectionLoading ? 
        <i className="fa fa-edit" style={{fontSize: '2em'}}></i> :
        <div>
          <span class="spinner-border spinner-grow-sm" role="status"></span>
        </div>}
    </button>

    <div className="modal fade" id={`editsection${section._id}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <h5 className="modal-title">Edit section</h5>
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
            <button onClick={()=>editSection()}type="button" className="btn btn-warning" data-dismiss="modal">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </>);
}
