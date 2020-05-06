import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function ReplyModal({loading, reply}) {

  const [content, setContent] = useState('');

  let clickSubmitQuestion = () => {
    reply(content);
    setContent('');
  }

  return (
  <>
    <button disabled={loading} className="btn btn-outline-light" data-toggle="modal" data-target="#replyQuestion">
      <i className="fa fa-reply"></i>
      {" Reply"}
    </button>

    <div className="modal fade" id="replyQuestion" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <h5 className="modal-title">Reply</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span className="text-white">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form w-100">
              <div className="form-group w-100">
                <div className="w-100 m-1">
                  <Editor initialValue={content}
                          apiKey="abmgxvtjvz9gg53o1r2ohp1f5qua4yc5aoiyovbj297ritax"
                          init={{height: 500, menubar: false,
                            plugins: ['advlist autolink lists link image charmap print preview anchor','searchreplace visualblocks fullscreen','insertdatetime media table paste codesample help wordcount'],
                            default_link_target:"_blank",
                            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image codesample",
                            }}
                          onEditorChange={(c,e)=>setContent(c)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button onClick={()=>clickSubmitQuestion()}type="button" className="btn btn-warning" data-dismiss="modal">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </>);
}
