import React, { useEffect, useState } from 'react';

export default function Completion({course, user, setUser}) {

    const [isComlete, setIsComplete] = useState(null);
    const [completionDate, setCompletionDate] = useState(null);

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
    },[]);

    const clickViewCertificate = () => {
        alert('W.I.P.');
    }
  return (
    <div className="text-white h-100" style={{backgroundColor: "#282c34"}}>
      {(isComlete == null) ? 
        <i className="fa fa-spinner fa-spin text-white" style={{fontSize: "3em"}}></i> : isComlete ?
    <div className="m-2 card text-white bg-dark border border-white">
        Congratulations for finishing "{course.name}" course! <br />
        Course badge has been successfully added to your badges section in the profile <br />
        Couse certificate has been generated, you can view it by clicking <br />
         <button className="btn btn-outline-light w-50 m-2 mx-auto" onClick={()=>clickViewCertificate()} type="button" >here</button>
    </div> 
    : null}
    </div>
  );
}
