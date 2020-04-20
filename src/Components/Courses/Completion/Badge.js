import React, {} from 'react';

export default function Badge({badge}) {

  return (
  <div className="m-2 card text-white bg-dark border border-white" style={{width: "420px", maxHeight: "600px"}}>
        <img className="card-img-center mx-auto" style={{maxWidth: "200px", maxHeight: "200px"}} src={badge.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Golden_star.svg/768px-Golden_star.svg.png"} />

        <div className="card-body">
            <h4 className="card-title">{badge.name}</h4>
            <p className="card-text">{badge.desc}</p>
        </div>
  </div>
  );
}
