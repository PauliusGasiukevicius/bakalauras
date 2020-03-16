import React, { useState } from 'react';

export default function Item({course, user, location, name}) {

  return (
  <div className="w-100">
        <button className="btn btn-outline-light w-100" type="button">
            <div className="input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <input type="checkbox" />
                    </div>
                </div>
                <p>{name}</p>
                <i className="fa fa-times btn pull-right"></i>
            </div>
        </button>
  </div>
  );
}
