import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function AddNewItemModal({setUser, user, sectionId, createNewSectionItem, sectionPos}) {

  const [newItemName, setNewItemName] = useState('');  
  const [itemContent, setItemContent] = useState('');  
  const [type, setType] = useState('');
  const [itemLoading, setItemLoading] = useState(false);
  const [fileLocation, setFileLocation] = useState('');
  const [show, setShow] = useState(false);

  let createItem = () => {
    createNewSectionItem(sectionPos,sectionId,newItemName,setItemLoading, itemContent, fileLocation, type);
    setNewItemName('');
  }

  let textEditorChange = (content, editor) => {
    setItemContent(content);
  }

  let onChangeVideo = async(e) => {
    try{
      setItemLoading(true);
      let video = document.getElementById(`courseItemVideoUpload${sectionId}`).files[0]; 

      let formData = new FormData();
      formData.append("file", video);
      formData.append("user", JSON.stringify(user));

      let resp = await fetch('/file', {method: "POST", body: formData});
      let json = await resp.json();
      
      if(json.location)setFileLocation(json.location);
      else if(json.relogin){
        alert(json.err);
        setUser(null);
      }

    }catch(error){console.log(error)};
  setItemLoading(false);
  }

  let onChangeFile = async (e) => {
      try{
      setItemLoading(true);
      let file = document.getElementById(`courseItemFileUpload${sectionId}`).files[0]; 

      let formData = new FormData();
      formData.append("file", file);
      formData.append("user", JSON.stringify(user));

      let resp = await fetch('/file', {method: "POST", body: formData});
      let json = await resp.json();
      
      if(json.location)setFileLocation(json.location);
      else if(json.relogin){
        alert(json.err);
        setUser(null);
      }

    }catch(error){console.log(error)};
  setItemLoading(false);
  }

  return (
  <>
    <button type="button" disabled={itemLoading} onClick={()=>setShow(true)} className="btn btn-outline-light mx-auto" style={{fontSize: "1.2em"}} data-toggle="modal" data-target={`#addItem${sectionId}`}>
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

    <div className="modal fade" id={`addItem${sectionId}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <h5 className="modal-title">Add new item</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span className="text-white">&times;</span>
            </button>
          </div>
          <div className="modal-body w-100">
            <div className="form w-100">
              <div className="form-group m-2 w-100">
                <label className="">Item name</label>
                <input type="text" value={newItemName} onChange={(e)=>setNewItemName(e.target.value)} 
                className="w-100 form-control" placeholder="Enter item name" />
                {itemLoading ? <div><div className="fa fa-spinner fa-spin text-white position-fixed" style={{fontSize: "7em", zIndex: 11}}></div></div> : null}
              </div>
            </div>

            <div className="w-100 m-1" style={{color: "white"}}>
              <ul className="nav nav-tabs nav-center mx-auto w-100 justify-content-center align-items-center">
                <li className="nav-item">
                    <a onClick={()=>setType('text')} className="btn btn btn-outline-light" data-toggle="tab" href={`#addTextItem${sectionId}`}>
                      Text <i className="fa fa-font" style={{fontSize: "1.5em"}} />
                    </a>
                </li>
                <li className="nav-item">
                    <a onClick={()=>setType('video')} className="btn btn btn-outline-light" data-toggle="tab" href={`#addVideoItem${sectionId}`}>
                      Video <i className="fa fa-video-camera" style={{fontSize: "1.5em"}} />
                    </a>
                </li>
                <li className="nav-item">
                    <a onClick={()=>setType('file')} className="btn btn btn-outline-light" data-toggle="tab" href={`#addFileItem${sectionId}`}>
                      File <i className="fa fa-file" style={{fontSize: "1.5em"}} />
                    </a>
                </li>
                {/*<li className="nav-item">
                    <a onClick={()=>setType('quizz')} className="btn btn btn-outline-light" data-toggle="tab" href={`#addQuizzItem${sectionId}`}>
                      Quizz <i className="fa fa-check-square-o" style={{fontSize: "1.5em"}} />
                    </a>
                </li>*/}
              </ul>

        <div className="tab-content">
            <div id={`addTextItem${sectionId}`} className="tab-pane fade">
                <div className="m-2 card text-white bg-dark border border-white" >
                    <div className="card-body">
                      {!show ? null : <Editor initialValue={itemContent}
                        apiKey="abmgxvtjvz9gg53o1r2ohp1f5qua4yc5aoiyovbj297ritax"
                        init={{height: 500, menubar: false,
                          plugins: ['lists link image codesample paste'],
                          default_link_target:"_blank",
                          toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image codesample",
                          codesample_global_prismjs: true
                          }}
                        onEditorChange={(c,e)=>textEditorChange(c,e)}
                      />}
                    </div>
                </div>
            </div>
            <div id={`addVideoItem${sectionId}`} className="tab-pane fade">
                <div className="m-2 card text-white bg-dark border border-white" >
                    <div className="card-body">
                      <div className="custom-file">
                        <input onChange={(e)=>onChangeVideo(e)} type="file" className="custom-file-input" id={`courseItemVideoUpload${sectionId}`} accept="video/*" />
                        <label className="custom-file-label" htmlFor={`courseItemVideoUpload${sectionId}`}>Upload/Change video</label>
                      </div>
                    </div>
                </div>
            </div>
            <div id={`addFileItem${sectionId}`} className="tab-pane fade">
                <div className="m-2 card text-white bg-dark border border-white" >
                    <div className="card-body">
                      <div className="custom-file">
                        <input onChange={(e)=>onChangeFile(e)} type="file" className="custom-file-input" id={`courseItemFileUpload${sectionId}`} />
                        <label className="custom-file-label" htmlFor={`courseItemFileUpload${sectionId}`}>Upload/Change file</label>
                      </div>
                    </div>
                </div>
            </div>
            <div id={`addQuizzItem${sectionId}`} className="tab-pane fade">
                <div className="m-2 card text-white bg-dark border border-white" >
                    <div className="card-body">
                      optional if all other stuff done? or do i need this for badges?
                    </div>
                </div>
            </div>
        </div>
    </div>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button disabled={itemLoading} onClick={()=>createItem()}type="button" className="btn btn-warning" data-dismiss="modal">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </>);
}
