const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

//Middle-ware
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});


//temp-API for stuff in development
app.get('/courses', (req,res) => {
    res.send([
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
});

app.listen(process.env.PORT || 8080, () => {

});