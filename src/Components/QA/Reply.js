import React, {useEffect, useState} from 'react';

export default function Reply({reply, user}) {

  return (
    <div className="w-100 m-1" style={{color: "white"}}>

      <div className="d-flex w-100" style={{fontSize: "1.5em"}}>
      <button type="button" className="btn btn-outline-light" >
        <i className="fa fa-arrow-up" ></i>
          {" "}{reply.upvotes}
      </button>
      <button type="button" className="btn btn-outline-light" >
        <i className="fa fa-edit"></i>
        {" Edit"}
      </button>

      <button type="button" className="btn btn-outline-light" >
        <i className="fa fa-trash"></i>
        {" Delete"}
      </button>
    </div>

    <div className="w-100 text-white bg-dark border border-white p-2">
      <div className="card-body m-1 p-0">
            <div style={{maxHeight: "500px", overflowY: "auto"}} className="w-100" dangerouslySetInnerHTML={{ __html: reply.content }}/>
        </div>

        <div className="card-footer m-0 p-0">
            <small>
                <i className="fa fa-user" /> {reply.userName} {" "}
                <span>{" "}</span>
                <i className="fa fa-calendar" /> {(new Date(reply.creation_date)).toLocaleString()}
            </small>
        </div>
    </div>
      
  </div>
  );
}
