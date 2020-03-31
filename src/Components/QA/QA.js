import React, {useEffect, useState} from 'react';
import Question from './Question.js';
import QuestionSummary from './QuestionSummary.js';
import AskNewQuestionModal from './AskNewQuestionModal.js';

export default function QA({course, user}) {

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [loading, setLoading] = useState(false);

    const [questions, setQuestions] = useState(null);

    useEffect(()=>{
        fetch(`/question/${course._id}`)
        .then(r => r.json())
        .then(r => {if(!r.err)setQuestions(r)})
    },[]);

    let clickSearch = () => {

    };

    let clickAskQuestion = async (title, content) => {
      if(title == '')return alert('title cannot be empty');
      let A = JSON.parse(JSON.stringify(questions));

      setLoading(true);
      let resp = await fetch(`/question/${course._id}`, 
      {method:"POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({title, user, content})});
      let json = await resp.json();
      setLoading(false);

      if(json._id)
      {
        A.push(json);
        setQuestions(A);
        setCurrentQuestion(json);
      }
    }

    let clickEditQuestion  = async (question, title, content) => {
      if(title == '')return alert('title cannot be empty');
      let A = JSON.parse(JSON.stringify(questions));
      let questionPos = -1;
      
      for(let i=0; i<A.length; i++)
        if(A[i]._id == question._id)questionPos = 0;
      
      if(questionPos == -1)return;

      setLoading(true);
      let resp = await fetch(`/question/${question._id}`, 
      {method:"PUT", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({title, user, content})});
      let json = await resp.json();
      setLoading(false);

      if(json._id)
      {
        A[questionPos] = json;
        setQuestions(A);
        setCurrentQuestion(json);
      }
    } 

    let clickDeleteQuestion  = async (question) => {
      let A = JSON.parse(JSON.stringify(questions));
      let questionPos = -1;
      
      for(let i=0; i<A.length; i++)
        if(A[i]._id == question._id)questionPos = 0;
      
      if(questionPos == -1)return;

      setLoading(true);
      let resp = await fetch(`/question/${question._id}`, 
      {method:"DELETE", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({user})});
      let json = await resp.json();
      setLoading(false);

      if(json.ok)
      {
        A.splice(questionPos, 1);
        setQuestions(A);
        setCurrentQuestion(null);
      }
    }

  return (
    <div className="w-100 text-white bg-dark border border-white">
    <div className="d-flex p-2">
      <div className = "flex-fill d-flex">
        <input className="flex-fill form-control" type="search" placeholder="Search for questions" aria-label="Search"/>
        <button type="button" onClick={()=>clickSearch()} className="btn btn-outline-light" >
          <i className="fa fa-search"></i>
        </button>
      </div>
      <AskNewQuestionModal loading={loading} askQuestion={clickAskQuestion} />
    </div>

      <div className="w-100 text-white bg-dark border border-white p-2">
          {!questions ? <i className="fa fa-spinner fa-spin text-white" style={{fontSize: "3em"}}></i> : 
          currentQuestion ? null : questions.map(q => <QuestionSummary question={q} user={user} key={"Q:"+q._id} setCurrentQuestion={setCurrentQuestion} />)}
          {!currentQuestion ? null : <Question clickDeleteQuestion={clickDeleteQuestion} loading={loading} clickEditQuestion={clickEditQuestion} question={currentQuestion} user={user} setCurrentQuestion={setCurrentQuestion} />}
      </div>
    </div>
  );
}