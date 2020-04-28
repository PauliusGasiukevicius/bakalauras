import React, { useEffect, useState } from 'react';
import Badge from './Badge.js';

export default function Completion({course, user, setUser}) {

    const [isComlete, setIsComplete] = useState(null);
    const [completionDate, setCompletionDate] = useState(null);
    const [badge, setBadge] = useState(null);

    useEffect(()=>{
        fetch(`/complete/${course._id}/${user._id}`)
        .then(r => r.json())
        .then(r => {
            if(r._id){
                setIsComplete(true);
                setCompletionDate(r.date);
            }else {
                setIsComplete(false);
            }
        });

        if(course.completionBadge)
        fetch(`/badge/${course.completionBadge}`)
        .then(r => r.json())
        .then(r => {
            if(r._id)setBadge(r);
        });
    },[]);

    const clickViewCertificate = () => {
        window.open(`/certificate/${user._id}/${course._id}`);
    }
  return (
    <div className="text-white h-100 p-2" style={{backgroundColor: "#282c34"}}>
      {(isComlete == null) ? 
        <i className="fa fa-spinner fa-spin text-white" style={{fontSize: "3em"}}></i> : isComlete ?
    <div className="card text-white bg-dark border border-white">
        Congratulations for finishing "{course.name}" course! <br />
        Here's your completion badge: <br />
        {!badge ? <p><i className="fa fa-spinner fa-spin text-white" style={{fontSize: "2em"}}/></p> : 
        <div className="d-flex align-self-center"><Badge badge={badge} /></div>}
        Couse certificate has been generated, you can view it by clicking <br />
         <button className="btn btn-outline-light w-50 m-2 mx-auto" onClick={()=>clickViewCertificate()} type="button" >here</button>
    </div> 
    : null}
    </div>
  );
}
