let mongoose = require("mongoose"),
express = require("express"),
router = express.Router();

// Student Model
let studentSchema = require("../models/Student");

// CREATE Student
router.post("/create-student", (req, res, next) => {
studentSchema.create(req.body).then((result) => {
    res.json(result);
})
.catch((err)=>{
    next(err);
})
});

// READ Students
router.get("/", (req, res , next) => {
studentSchema.find().then((result) => {
    res.json(result);
})
.catch((err)=>{
    next(err);
})
});

// UPDATE student
router
.route("/update-student/:id")
// Get Single Student
.get((req, res,next) => {
	studentSchema.findById
		(req.params.id).then((result) => {
            res.json(result);
        })
        .catch((err)=>{
            next(err);
        })
})

// Update Student Data
.put((req, res, next) => {
	studentSchema.findByIdAndUpdate(
	req.params.id,
	{
		$set: req.body,
	}).then((result) => {
        res.json(result);
		console.log("Student updated successfully !");
    })
    .catch((err)=>{
        next(err);
    })
});

// Delete Student
router.delete("/delete-student/:id",
(req, res, next) => {
studentSchema.findByIdAndRemove(
	req.params.id).then((result) => {
        res.status(200).json({
            msg: result,
        });
    })
    .catch((err)=>{
        next(err);
    })
    
});

module.exports = router;
