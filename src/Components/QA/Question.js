import React, {useEffect, useState} from 'react';
import Reply from './Reply.js';
import ReplyModal from './ReplyModal.js';
import EditQuestion from './EditQuestion.js';

export default function Question({clickViewProfile, setUser, changeQuestionReplies, changeQuestionUpvotes, setLoading, question, user, setCurrentQuestion, clickEditQuestion, loading, clickDeleteQuestion}) {

    const [replies, setReplies] = useState(null);
    const [upvotes, setUpvotes] = useState([]);
    const [isQuestionUpvoted, setIsQuestionUpvoted] = useState(false);
    const [questionUpvotes, setQuestionUpvotes] = useState(question.upvotes);

    useEffect(()=>{
      fetch(`/upvotes/${question.courseId}/${user._id}`)
      .then(r => r.json())
      .then(r => {
        if(!r.err){
          setUpvotes(r);
          setIsQuestionUpvoted(isUpvoted(question, r));
        }
      })

      fetch(`/reply/${question._id}`)
      .then(r => r.json())
      .then(r => {if(!r.err)setReplies(r)})

    },[]);


    let deleteQuestion = () => {
      if(window.confirm("Are you sure you want to delete this whole section (including all items in it)? This action cannot be undone."))
        clickDeleteQuestion(question);
    }

    let isUpvoted = (item, upvotes) => {
      for(let i=0; i<upvotes.length; i++)
        if(upvotes[i].objectId == item._id)return 1;
      return 0;
    };

    let clickUpvote = async () => {
        setLoading(true);
        let resp = await fetch(`/upvotes`, 
        {method:"POST", headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({courseId: question.courseId, user, objectId: question._id, type: 'question'})});
        let json = await resp.json();

        if(json._id){ //created upvote object
          setUpvotes([...upvotes, json]);
          changeQuestionUpvotes(question, 1);
          setQuestionUpvotes(questionUpvotes+1);
          setIsQuestionUpvoted(true);
        }else if(json.ok){
          let cp = JSON.parse(JSON.stringify(upvotes));
          let upvoteIndex = -1;
          for(let i=0; i<upvotes.length; i++)
            if(upvotes[i]._id == json.deletedId)upvoteIndex = i;
          if(upvoteIndex == -1)return;
          cp.splice(upvoteIndex, 1);
          setUpvotes(cp);
          changeQuestionUpvotes(question, -1);
          setQuestionUpvotes(questionUpvotes - 1);
          setIsQuestionUpvoted(false);
        }else if(json.relogin){
          alert(json.err);
          setUser(null);
        }
        setLoading(false);
    }

    let changeReplyUpvotes = (reply, inc) =>
    {
      let replyPos = -1;
      for(let i=0; i<replies.length; i++)
        if(replies[i]._id == reply._id)replyPos=i;

      if(replyPos < 0)return;
      replies[replyPos].upvotes+=inc;
    };

    let clickReplyUpvote = async (reply) => {
      setLoading(true);
      let resp = await fetch(`/upvotes`, 
      {method:"POST", headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({courseId: question.courseId, user, objectId: reply._id, type: 'reply'})});
      let json = await resp.json();

      if(json._id){ //created upvote object
        setUpvotes([...upvotes, json]);
        changeReplyUpvotes(reply, 1);
        //setIsReplyUpvoted(true);
      }else if(json.ok){
        let cp = JSON.parse(JSON.stringify(upvotes));
        let upvoteIndex = -1;
        for(let i=0; i<upvotes.length; i++)
          if(upvotes[i]._id == json.deletedId)upvoteIndex = i;
        if(upvoteIndex == -1)return;
        cp.splice(upvoteIndex, 1);
        setUpvotes(cp);
        changeReplyUpvotes(reply, -1);
      }else if(json.relogin){
        alert(json.err);
        setUser(null);
      }
      setLoading(false);
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
        changeQuestionReplies(question, 1);
      }else if(json.relogin){
        alert(json.err);
        setUser(null);
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
      }else if(json.relogin){
        alert(json.err);
        setUser(null);
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
        changeQuestionReplies(question, -1);
      }else if(json.relogin){
        alert(json.err);
        setUser(null);
      }
    }

    let clickViewQuestionStarterProfile = () => {
        fetch(`/user/${question.userId}`)
        .then(r => r.json())
        .then(r => {
          if(r._id)
          clickViewProfile(r);
        });
    }

  return (
    <div className="w-100" style={{color: "white"}}>

      <div className="d-flex w-100" style={{fontSize: "1.5em"}}>
        <button onClick={()=>clickUpvote()} type="button" className="btn btn-outline-light" >
          {!isQuestionUpvoted ? <i className="fa fa-arrow-up"></i> : <i className="fa fa-arrow-up" style={{color: 'orange'}}></i>}
            {" "}{questionUpvotes}
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
          <i className="fa fa-user" /> <button  onClick={()=>clickViewQuestionStarterProfile()} className="btn badge badge-light text-dark">
            {question.userName || ' '}
            </button> &nbsp;&nbsp;
          <i className="fa fa-calendar" /> {(new Date(question.creation_date)).toLocaleString()}&nbsp;&nbsp;
          {question.creation_date != question.edit_date ? `Editted: ${ (new Date(question.edit_date)).toLocaleString() }` : null}
        </div>
    </div>

    <hr />

    <div className="w-100 text-white bg-dark border border-white p-2">
      {!replies ? <i className="fa fa-spinner fa-spin text-white" style={{fontSize: "3em"}}></i> : 
      replies.map(r => <Reply key={"Reply"+r._id} clickViewProfile={clickViewProfile} isUpvoted={isUpvoted(r,upvotes)} clickReplyUpvote={clickReplyUpvote} upvotes={upvotes} clickEditReply={clickEditReply} loading={loading} reply={r} user={user} deleteReply={deleteReply} />)}
    </div>
      
  </div>
  );
}
