import React, {} from 'react';

export default function QuestionSummary({question, user, setCurrentQuestion}) {

  return (
    <div className="w-100 btn btn-outline-light m-1 p-0" onClick={() => {setCurrentQuestion(question)}}>
        <div className="card-body m-0 p-0">
            <div className="card-title m-0 p-0">
              <h4> {question.title} </h4>
                <p className="d-inline"><i className="fa fa-arrow-up" /> {question.upvotes}</p>
                {"  "}
                <p className="d-inline"><i className="fa fa-comment" /> {question.replies}</p>
            </div>
        </div>

        <div className="card-footer m-0 p-0">
            <small>
                <i className="fa fa-user" /> {question.userName} {" "}
                <span>{" "}</span>
                <i className="fa fa-calendar" /> {(new Date(question.creation_date)).toLocaleString()}
            </small>
        </div>
  </div>
  );
}
