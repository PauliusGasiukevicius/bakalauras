import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function EditItemModal({setUser, user, item, updateSectionItem, sectionPos, itemPos}) {

  let itemId = item._id;
  const [newItemName, setNewItemName] = useState(item.name);  
  const [itemContent, setItemContent] = useState(item.content);  
  const [type, setType] = useState(item.type);
  const [itemLoading, setItemLoading] = useState(false);
  const [fileLocation, setFileLocation] = useState(item.location);

  let editItem = () => {
      updateSectionItem(sectionPos, itemPos, itemId, newItemName, setItemLoading, itemContent, fileLocation, type) 
  }

  let textEditorChange = (content, editor) => {
    setItemContent(content);
  }

  let onChangeVideo = async(e) => {
    try{
      setItemLoading(true);
      let video = document.getElementById(`courseItemVideoUpload${itemId}`).files[0]; 

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
      let file = document.getElementById(`courseItemFileUpload${itemId}`).files[0]; 

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
    <button disabled={itemLoading} className="btn btn-outline-light" style={{fontSize: "1.2em"}} data-toggle="modal" data-target={`#${itemId}editItem`}>
        <i className="fa fa-edit" style={{fontSize: '2em'}}></i>
    </button>

    <div className="modal fade" id={`${itemId}editItem`} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <h5 className="modal-title">Edit item</h5>
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
                    <a onClick={()=>setType('text')} className="btn btn btn-outline-light" data-toggle="tab" href={`#editTextItem${itemId}`}>
                      Text <i className="fa fa-font" style={{fontSize: "1.5em"}} />
                    </a>
                </li>
                <li className="nav-item">
                    <a onClick={()=>setType('video')} className="btn btn btn-outline-light" data-toggle="tab" href={`#editVideoItem${itemId}`}>
                      Video <i className="fa fa-video-camera" style={{fontSize: "1.5em"}} />
                    </a>
                </li>
                <li className="nav-item">
                    <a onClick={()=>setType('file')} className="btn btn btn-outline-light" data-toggle="tab" href={`#editFileItem${itemId}`}>
                      File <i className="fa fa-file" style={{fontSize: "1.5em"}} />
                    </a>
                </li>
                <li className="nav-item">
                    <a onClick={()=>setType('quizz')} className="btn btn btn-outline-light" data-toggle="tab" href={`#editQuizzItem${itemId}`}>
                      Quizz <i className="fa fa-check-square-o" style={{fontSize: "1.5em"}} />
                    </a>
                </li>
              </ul>

        <div className="tab-content">
            <div id={`editTextItem${itemId}`} className="tab-pane fade">
                <div className="m-2 card text-white bg-dark border border-white" >
                    <div className="card-body">
                      <Editor initialValue={itemContent}
                        apiKey="abmgxvtjvz9gg53o1r2ohp1f5qua4yc5aoiyovbj297ritax"
                        init={{height: 500, menubar: false,
                          plugins: ['advlist autolink lists link image charmap print preview anchor','searchreplace visualblocks code fullscreen','insertdatetime media table paste code help wordcount'],
                          default_link_target:"_blank",
                          toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                          }}
                        onEditorChange={(c,e)=>textEditorChange(c,e)}
                      />
                    </div>
                </div>
            </div>
            <div id={`editVideoItem${itemId}`} className="tab-pane fade">
                <div className="m-2 card text-white bg-dark border border-white" >
                    <div className="card-body">
                      <div className="custom-file">
                        <input onChange={(e)=>onChangeVideo(e)} type="file" className="custom-file-input" id={`courseItemVideoUpload${itemId}`} accept="video/*" />
                        <label className="custom-file-label" htmlFor={`courseItemVideoUpload${itemId}`}>Upload/Change video</label>
                      </div>
                    </div>
                </div>
            </div>
            <div id={`editFileItem${itemId}`} className="tab-pane fade">
                <div className="m-2 card text-white bg-dark border border-white" >
                    <div className="card-body">
                      <div className="custom-file">
                        <input onChange={(e)=>onChangeFile(e)} type="file" className="custom-file-input" id={`courseItemFileUpload${itemId}`} />
                        <label className="custom-file-label" htmlFor={`courseItemFileUpload${itemId}`}>Upload/Change file</label>
                      </div>
                    </div>
                </div>
            </div>
            <div id={`editQuizzItem${itemId}`} className="tab-pane fade">
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
            <button disabled={itemLoading} onClick={()=>editItem()}type="button" className="btn btn-warning" data-dismiss="modal">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </>);
}
