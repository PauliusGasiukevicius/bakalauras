import React, {useEffect, useState} from 'react';
import Question from './Question.js';
import QuestionSummary from './QuestionSummary.js';

export default function QA({course, user}) {

    const [currentQuestion, setCurrentQuestion] = useState(null);

    const [questions, setQuestions] = useState([
        {_id: 3, title: 'Help!!! How to install software X?', content: 'details', upvotes: 7, replies: 5, user: user, date: new Date()},
        {_id: 6, title: 'Help!!! How to install software Y?', content: ' ', upvotes: 0, replies: 1, user: user, date: new Date()}
    ]);

    useEffect(()=>{
        //fetch all questions
    },[]);

    let clickSearch = () => {

    };

    let clickAskQuestion = () => {

    }

  return (
    <div className="w-100 text-white bg-dark border border-white">
    <div className="d-flex p-2">
      <div className = "p-2 input-group form-inline justify-content-center align-items-center w-100">
        <input className="w-75 form-control" type="search" placeholder="Search for questions" aria-label="Search"/>
        <button type="button" onClick={()=>clickSearch()} className="btn btn-outline-light" >
          <i className="fa fa-search"></i>
        </button>
      </div>
      <button type="button" onClick={()=>clickAskQuestion()} className="btn btn-outline-light" >
        <i className="fa fa-plus"></i>
        Ask a new question 
      </button>
    </div>

      <div className="w-100 text-white bg-dark border border-white p-2">
          {!questions || currentQuestion ? null : questions.map(q => <QuestionSummary question={q} user={user} key={"Q:"+q._id} setCurrentQuestion={setCurrentQuestion} />)}
          {!currentQuestion ? null : <Question question={currentQuestion} user={user} setCurrentQuestion={setCurrentQuestion} />}
      </div>
    </div>
  );
}