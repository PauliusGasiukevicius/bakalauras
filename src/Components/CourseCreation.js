import React, {useState, useEffect} from 'react';

export default function Header({user}) {

  return (
  <div className="d-flex text-white w-100 justify-content-around" style={{marginTop: "10rem"}}>
    <form className="w-50">
        <img src="https://loremflickr.com/320/240"/>
        <div className="form-group">
            <label for="courseName">Course name</label>
            <input type="text" className="form-control" id="courseName" placeholder="Enter course name" />
        </div>
        <div className="form-group">
            <label for="courseDesc">Description</label>
            <textarea className="form-control" id="courseDesc" placeholder="Enter course description" />
        </div>
        <div class="form-group">
            <label for="courseImage">Course Image</label>
            <input type="file" class="form-control-file" id="courseImage" />
        </div>
        <button type="submit" className="btn btn-outline-light my-2 my-md-0">Submit</button>
    </form>
  </div>
  );
}
