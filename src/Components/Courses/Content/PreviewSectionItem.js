import React, { useState } from 'react';
import CourseFileView from './CourseFileView.js';

export default function PreviewSectionItem({edit, item, clickViewItem, sectionPos, itemPos, isDoingAction}) {

  return (
  <>

<button disabled={isDoingAction} onClick={()=>clickViewItem(sectionPos,itemPos)} className="w-100 btn btn-outline-light" 
data-toggle="modal" data-target={`#previewItem${item._id}${edit ? '' : 'notEdit'}`}>
            {item.name}
            <i className="fa fa-eye float-right" style={{fontSize: '2em'}}></i>
        </button>

    <div className="modal fade" id={`previewItem${item._id}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <h5 className="modal-title">Preview item</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span className="text-white">&times;</span>
            </button>
          </div>
          <div className="modal-body d-flex">
              <CourseFileView isPreview={true} item={item}/>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </>);
}
