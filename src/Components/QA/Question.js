import React, {useEffect, useState} from 'react';
import Reply from './Reply.js';
import ReplyModal from './ReplyModal.js';
import EditQuestion from './EditQuestion.js';

export default function Question({setLoading, question, user, setCurrentQuestion, clickEditQuestion, loading, clickDeleteQuestion}) {

    const [replies, setReplies] = useState(null);

    let deleteQuestion = () => {
      if(window.confirm("Are you sure you want to delete this whole section (including all items in it)? This action cannot be undone."))
      clickDeleteQuestion(question);
    }

    let clickReply = async (content) => {
      let A = JSON.parse(JSON.stringify(replies));

      setLoading(true);
      let resp = await fetch(`/reply/${question._id}`, 
      {method:"POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({user, content})});
      let json = await resp.json();
      setLoading(false);

      if(json._id)
      {
        A.push(json);
        setReplies(A);
      }
    }

    let clickEditReply = async (reply, content) => {
      let A = JSON.parse(JSON.stringify(replies));
      let replyPos = -1;
      
      for(let i=0; i<A.length; i++)
        if(A[i]._id == reply._id)replyPos = i;
      
      if(replyPos == -1)return;

      setLoading(true);
      let resp = await fetch(`/reply/${reply._id}`, 
      {method:"PUT", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({user, content})});
      let json = await resp.json();
      setLoading(false);

      if(json._id)
      {
        A[replyPos] = json;
        setReplies(A);
      }
    }

    let deleteReply = async (reply) => {
      let A = JSON.parse(JSON.stringify(replies));
      let replyPos = -1;
      
      for(let i=0; i<A.length; i++)
        if(A[i]._id == reply._id)replyPos = i;
      
      if(replyPos == -1)return;

      setLoading(true);
      let resp = await fetch(`/reply/${reply._id}`, 
      {method:"DELETE", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({user})});
      let json = await resp.json();
      setLoading(false);

      if(json.ok)
      {
        A.splice(replyPos, 1);
        setReplies(A);
      }
    }

    useEffect(()=>{
      fetch(`/reply/${question._id}`)
      .then(r => r.json())
      .then(r => {if(!r.err)setReplies(r)})
    },[]);

  return (
    <div className="w-100" style={{color: "white"}}>

      <div className="d-flex w-100" style={{fontSize: "1.5em"}}>
        <button type="button" className="btn btn-outline-light" >
          <i className="fa fa-arrow-up" ></i>{" "}
            {question.upvotes}
        </button>

        <ReplyModal reply={clickReply} loading={loading}/>
        <button type="button" onClick={()=>setCurrentQuestion(null)} className="flex-fill btn btn-outline-light" >
          <i className="fa fa-angle-double-left"></i>
          {" Go back to questions"}
        </button>

        {
          user._id == question.userId ?
        <>
          <EditQuestion question={question} loading={loading} editQuestion={clickEditQuestion}/>

          <button type="button" onClick={()=>deleteQuestion()} className="btn btn-outline-light" >
            <i className="fa fa-trash"></i>
            {" Delete"}
          </button>
        </>
        : null
        }

      </div>

    <div className="w-100 text-white bg-dark border border-white p-2">
      <div className="card-body m-1 p-0">
            <div className="card-title m-0 p-0">
              <h4> {question.title} </h4>
            </div>

            <div style={{maxHeight: "500px", overflowY: "auto"}} className="w-100" dangerouslySetInnerHTML={{ __html: question.content }}/>
        </div>

        <div className="card-footer m-0 p-0">
          <i className="fa fa-user" /> {question.userName || ' '} &nbsp;&nbsp;
          <i className="fa fa-calendar" /> {(new Date(question.creation_date)).toLocaleString()}&nbsp;&nbsp;
          {question.creation_date != question.edit_date ? `Editted: ${ (new Date(question.edit_date)).toLocaleString() }` : null}
        </div>
    </div>

    <hr />

    <div className="w-100 text-white bg-dark border border-white p-2">
      {!replies ? <i className="fa fa-spinner fa-spin text-white" style={{fontSize: "3em"}}></i> : 
      replies.map(r => <Reply clickEditReply={clickEditReply} loading={loading} reply={r} user={user} deleteReply={deleteReply} />)}
    </div>
      
  </div>
  );
}
