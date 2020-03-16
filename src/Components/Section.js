import React, { useState } from 'react';
import Item from './Item.js';

export default function Section({course, user, items, name}) {

let ID = name.replace(/ /g,'_');
  const [arrowUp, setArrowUp] = useState(false);

  return (
  <div className="p-1" style={{marginBottom: '1em'}}>
    <div className="d-flex" >
        <button onClick={()=>setArrowUp(!arrowUp)} className="w-100 btn btn-outline-light" type="button" data-toggle="collapse" data-target={'#'+ID}>
            <div>
                {name}
                <i className={`fa fa-arrow-circle-${arrowUp ? 'up' : 'down'} pull-right`} style={{fontSize: '2em'}}></i>
            </div>
        </button>
            <button className="btn btn-outline-light float-right">
                    <i className="fa fa-times" style={{fontSize: '2em'}}></i>
            </button>
    </div>

    <div className="collapse" id={ID}>
        <div className="card card-body bg-dark border border-white">
            <ul>
                {!items ? <></> :
                items.map(item => 
                    <Item key={course._id+name+item.name} location={item.location} name={item.name} course={course} user={user} />
                )}
            </ul>
        </div>
    </div>
  </div>
  );
}
