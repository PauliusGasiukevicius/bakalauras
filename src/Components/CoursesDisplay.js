import React, {useState, useEffect} from 'react';
import CourseCard from './CourseCard.js'

export default function CourseDisplay() {

    const [courses, setCourses] = useState([]);

    if(!courses || courses.length==0)
    setCourses([
        {_id: 1, name: "Example", desc: "An example description", imageUrl: "https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"},
        {_id: 2, name: "Example", desc: "An example description", imageUrl: "https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"},
        {_id: 3, name: "Example", desc: "An example description", imageUrl: "https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"},
        {_id: 4, name: "Example", desc: "An example description", imageUrl: "https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"},
        {_id: 5, name: "Example", desc: "An example description", imageUrl: "https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"},
        {_id: 6, name: "Example", desc: "An example description", imageUrl: "https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"},
        {_id: 7, name: "Example", desc: "An example description", imageUrl: "https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"},
        {_id: 8, name: "Example", desc: "An example description", imageUrl: "https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"},
        {_id: 9, name: "Example", desc: "An example description", imageUrl: "https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"},
        {_id: 10, name: "Example", desc: "An example description", imageUrl: "https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"},
    ]);

    /*fetch('http://localhost:8080/courses')
    .then(resp => resp.json())
    .then(r => {setCourses(r)})*/

  return (
  <div className="w-100 container-fluid d-flex flex-wrap justify-content-around">
        {
            !courses ? <h5>Kursų nerasta</h5> :
            courses.map(course => <CourseCard course={course} key={"Course" + course._id}/>)
        }
  </div>
  );
}
