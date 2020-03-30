import React, {useEffect, useState} from 'react';
import Reply from './Reply.js';

export default function QuestionSummary({question, user, setCurrentQuestion}) {

    const [replies, setReplies] = useState([
        {_id: 3, content: 'Help!!! How to install software X?', upvotes: 7, user: user, date: new Date()},
        {_id: 4, content: 'What', upvotes: 0, user: user, date: new Date()}
    ]);

    useEffect(()=>{
        //fetch all replies
    },[]);

  return (
    <div className="w-100" style={{color: "white"}}>
      TODO:
      1. Display questions (title, content, etc)
      2. upvote button
      3. reply button
      4. reply modal
      5. back to questions button
        {/*Content */}
      <button type="button" onClick={()=>setCurrentQuestion(null)} className="btn btn-outline-light" >
        <i className="fa fa-exit"></i>
        Go back to questions
      </button>
        {!replies ? null : replies.map(r => <Reply reply={r} user={user} />)}
    </div>
  );
}
