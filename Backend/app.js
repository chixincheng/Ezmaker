require("dotenv").config(); // environment variable

// require packages
const express = require("express");
const mongoose = require("mongoose");

// initialise express
const app = express();

//  mondodb connect
mongoose
.connect(
    process.env.MONGODB_URI, 
    {useNewUrlParser: true, useUnifiedTopology: true}
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// create a schema
const studentSchema = new mongoose.Schema({
    roll_no: Number,
    name: String,
    year: Number,
    subjects: [String]
});

// create a model with studentSchema
const Student = mongoose.model('Student', studentSchema);

// Create a new document
const stud = new Student({
    roll_no: 1001,
    name: 'Madison Hyde',
    year: 3,
    subjects: ['DBMS', 'OS', 'Graph Theory', 'Internet Programming']
});
// Add the document to Collections
stud.save().then(() => console.log("One entry added"));

// get documents
app.get('/', (req, res) => {
    Student.find({}, (err, found) => {
        if (!err) {
            res.send(found);
        } else {
            console.log(err);
            res.send("Some error occured!")
        } 
    });
});

// Server listen
app.listen(3000, () => console.log("Server listening to port 3000"));