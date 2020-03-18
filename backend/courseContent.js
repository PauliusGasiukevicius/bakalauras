module.exports = (app, mongoose) => {

    let CourseContent = require('./models/courseContentModel.js');

    /*
        Everything should have courseId so that user can have something like checked items array
        Lets save stuff like, here course content holds array for sections
        then each section has name and hold array of items
        then each item has name, location, type, text, reference (null usually but can hold 
                                Id for quizz or something if I decide to add that in the future)
        need routes for:
            POST: addSection + create courseContent if does not exist
            POST: addItem
            GET: Get all courseContent data
            DELETE: Section <-- clean everythinh, sections array entry, all items, section itself
            DELETE: Item <-- clean everythinh, items array entry, item itself
            POST: Move Sections
            POST: Move Items
    */
}