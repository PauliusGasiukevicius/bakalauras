import React, {useEffect, useState} from 'react';
import Reply from './Reply.js';
import EditQuestion from './EditQuestion.js';

export default function Question({question, user, setCurrentQuestion, clickEditQuestion, loading, clickDeleteQuestion}) {

    const [replies, setReplies] = useState([
        {_id: 3, content: 'Help!!! How to install software X?', upvotes: 7, user: user, creation_date: new Date()},
        {_id: 4, content: 'What', upvotes: 0, user: user, creation_date: new Date()}
    ]);

    let deleteQuestion = () => {
      if(window.confirm("Are you sure you want to delete this whole section (including all items in it)? This action cannot be undone."))
      clickDeleteQuestion(question);
    }

    useEffect(()=>{
        //fetch all replies
    },[]);

  return (
    <div className="w-100" style={{color: "white"}}>

      <div className="d-flex w-100" style={{fontSize: "1.5em"}}>
        <button type="button" className="btn btn-outline-light" >
          <i className="fa fa-arrow-up" ></i>{" "}
            {question.upvotes}
        </button>

        <button type="button" className="btn btn-outline-light" >
          <i className="fa fa-reply"></i>&nbsp;
          {"Reply"}
        </button>
        <button type="button" onClick={()=>setCurrentQuestion(null)} className="flex-fill btn btn-outline-light" >
          <i className="fa fa-angle-double-left"></i>
          {" Go back to questions"}
        </button>
        <EditQuestion question={question} loading={loading} editQuestion={clickEditQuestion}/>

        <button type="button" onClick={()=>deleteQuestion()} className="btn btn-outline-light" >
          <i className="fa fa-trash"></i>
          {" Delete"}
        </button>
      </div>

    <div className="w-100 text-white bg-dark border border-white p-2">
      <div className="card-body m-1 p-0">
            <div className="card-title m-0 p-0">
              <h4> {question.title} </h4>
            </div>

            <div style={{maxHeight: "500px", overflowY: "auto"}} className="w-100" dangerouslySetInnerHTML={{ __html: question.content }}/>
        </div>

        <div className="card-footer m-0 p-0">
            <small>
                <i className="fa fa-user" /> {question.userName || ' '} {" "}
                <span>{" "}</span>
                <i className="fa fa-calendar" /> {(new Date(question.creation_date)).toLocaleString()}
            </small>
        </div>
    </div>

    <hr />

    <div className="w-100 text-white bg-dark border border-white p-2">
      {!replies ? null : replies.map(r => <Reply reply={r} user={user} />)}
    </div>
      
  </div>
  );
}
