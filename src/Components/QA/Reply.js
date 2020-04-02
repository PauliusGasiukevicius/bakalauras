import React, {useEffect, useState} from 'react';
import EditReplyModal from './EditReplyModal.js';

export default function Reply({clickReplyUpvote, isUpvoted, deleteReply, reply, user, loading, clickEditReply}) {

  let clickUpvote = () => {
    clickReplyUpvote(reply);
  }

  return (
    <div className="w-100 m-1" style={{color: "white"}}>

      <div className="d-flex w-100" style={{fontSize: "1.5em"}}>
      <button onClick={()=>clickUpvote()} type="button" className="btn btn-outline-light" >
      {!isUpvoted ? <i className="fa fa-arrow-up"></i> : <i className="fa fa-arrow-up" style={{color: 'orange'}}></i>}
          {" "}{reply.upvotes}
      </button>
      {
        user._id == reply.userId ? 
        <>
          <EditReplyModal reply = {reply} loading={loading} editReply={clickEditReply}/>

          <button onClick={()=>deleteReply(reply)} type="button" className="btn btn-outline-light" >
            <i className="fa fa-trash"></i>
            {" Delete"}
          </button>
        </>
        : null
      }
    </div>

    <div className="w-100 text-white bg-dark border border-white p-2">
      <div className="card-body m-1 p-0">
            <div style={{maxHeight: "500px", overflowY: "auto"}} className="w-100" dangerouslySetInnerHTML={{ __html: reply.content }}/>
        </div>

        <div className="card-footer m-0 p-0">
            <small>
                <i className="fa fa-user" /> {reply.userName}  &nbsp;&nbsp;
                <i className="fa fa-calendar" /> {(new Date(reply.creation_date)).toLocaleString()} &nbsp;&nbsp;
                {reply.creation_date != reply.edit_date ? `Editted: ${ (new Date(reply.edit_date)).toLocaleString() }` : null}
            </small>
        </div>
    </div>
      
  </div>
  );
}
