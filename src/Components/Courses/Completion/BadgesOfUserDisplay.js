import React, { useState, useEffect } from 'react';
import Badge from './Badge.js'

export default function BadgesOfUserDisplay({user}) {
    
    const [badges, setBadges] = useState(null);

    useEffect(()=>{
        fetch(`/badgesOfUser/${user._id}`)
        .then(r => r.json())
        .then(r => {
            if(r && !r.err)setBadges(r);
        });
    },[]);

  return (
    <div className="w-100 container-fluid d-flex flex-wrap justify-content-around">
          {
              !badges ? <i className="fa fa-spinner fa-spin text-white" style={{fontSize: "3em"}}></i> :
              badges.map(badge => <Badge badge={badge} key={"Badge" + badge._id}/>)
          }
    </div>
  );
}
