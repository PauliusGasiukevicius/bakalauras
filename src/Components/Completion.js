import React, { useEffect, useState } from 'react';

export default function Completion({course, user, setUser}) {

    const [isComlete, setIsComplete] = useState(false);
    const [completionDate, setCompletionDate] = useState(null);

    useEffect(()=>{
        fetch(`/complete/${course._id}/${user._id}`)
        .then(r => r.json())
        .then(r => {
            if(r.ok){
                setIsComplete(true);
                setCompletionDate(r.date);
            }else if(r.relogin){
                alert(r.err);
                setUser(null);
            }
        });
    },[]);

    const clickViewCertificate = () => {

    }
  return (
      <>
      {(isComlete == null) ? 
        <i className="fa fa-spinner fa-spin text-white" style={{fontSize: "3em"}}></i> : isComlete ?
    <div className="m-2 card text-white bg-dark border border-white">
        Congratulations for finishing "{course.name}" course!
        Course badge has been successfully added to your badges section in the profile
        Couse certificate has been generated, you can view it by clicking <button className="btn btn-outline-light" onClick={()=>clickViewCertificate()} type="button" >here</button>
    </div> 
    : null}</>
  );
}
