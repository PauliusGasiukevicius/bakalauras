import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function AddNewItemModal({sectionId, createNewSectionItem, sectionPos}) {

  const [newItemName, setNewItemName] = useState('');  
  const [itemContent, setItemContent] = useState('');  
  const [type, setType] = useState('');
  const [itemLoading, setItemLoading] = useState(false);
  const [fileLocation, setFileLocation] = useState('');

  let createItem = () => {
    createNewSectionItem(sectionPos,sectionId,newItemName,setItemLoading, itemContent, fileLocation, type);
    setNewItemName('');
  }

  let textEditorChange = (content, editor) => {
    setItemContent(content);
  }

  let onChangeVideo = (e) => {
    let video = document.getElementById(`courseItemVideoUpload${sectionId}`).files[0]; 

    let formData = new FormData();
    formData.append("file", video);

    fetch('/uploadFile', {method: "POST", mode: "cors", body: formData})
    .then(r => r.json())
    .then(r => {if(r.location)setFileLocation(r.location);});
  }

  let onChangeFile = (e) => {
    let file = document.getElementById(`courseItemFileUpload${sectionId}`).files[0]; 

    let formData = new FormData();
    formData.append("file", file);

    fetch('/uploadFile', {method: "POST", mode: "cors", body: formData})
    .then(r => r.json())
    .then(r => {if(r.location)setFileLocation(r.location);});
  }

  return (
  <>
    <button disabled={itemLoading} className="btn btn-outline-light mx-auto" style={{fontSize: "1.2em"}} data-toggle="modal" data-target={`#${sectionId}addItem`}>
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
          <div className="modal-body w-100">
            <div className="form w-100">
              <div className="form-group m-2 w-100">
                <label className="">Item name</label>
                <input type="text" value={newItemName} onChange={(e)=>setNewItemName(e.target.value)} 
                className="w-100 form-control" placeholder="Enter item name" />
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
                <li className="nav-item">
                    <a onClick={()=>setType('quizz')} className="btn btn btn-outline-light" data-toggle="tab" href={`#addQuizzItem${sectionId}`}>
                      Quizz <i className="fa fa-check-square-o" style={{fontSize: "1.5em"}} />
                    </a>
                </li>
              </ul>

        <div className="tab-content">
            <div id={`addTextItem${sectionId}`} className="tab-pane fade">
                <div className="m-2 card text-white bg-dark border border-white" >
                    <div className="card-body">
                      <Editor initialValue={itemContent}
                        apiKey="abmgxvtjvz9gg53o1r2ohp1f5qua4yc5aoiyovbj297ritax"
                        init={{height: 500, menubar: false,
                          plugins: ['advlist autolink lists link image charmap print preview anchor','searchreplace visualblocks code fullscreen','insertdatetime media table paste code help wordcount'],
                          default_link_target:"_blank",
                          toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent removeformat',
                          content_css: '//www.tiny.cloud/css/codepen.min.css'}}
                        onEditorChange={(c,e)=>textEditorChange(c,e)}
                      />
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
                        ♦ input form for mp4/etc that use formData thing and sends it in multi parts to backend
                        ♦ from backend use this https://developers.google.com/youtube/v3/docs/?apix=true and save link in DB
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
                      ♦ input form for random files yet limit size a lot &lt; 2 MB 
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
            <button onClick={()=>createItem()}type="button" className="btn btn-warning" data-dismiss="modal">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </>);
}
