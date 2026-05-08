//import the student model
const student = require('../models/student');
const Student = require('../models/student');

//function/API to add student into database
const addStudent = async (req,res) => {
    try{
        const {name,email,course,marks,city} = req.body;

        //validation 
        if(!name || !email || !course || !marks){
            return res.status(400).json({
                success:false,
                message:'Please fill out all fields'
            })
        }
        //saving the data into database
        const student = await Student.create({name,email,course,marks,city})
        return res.status(201).json({
                success:true,
                message:'Data has been saved successfully!'
            })
    }catch(error){
        res.status(500).json({
            success:false,
            message:'Something went wrong!',
            error: error.message
        })
    }
}

//API for getting all the students
const getAllStudent = async (req,res) => {
    try{
        const students = await Student.find();
        res.status(200).json({
            success:true,
            message:'All students detail',
            //total count of student
            count: students.length,
            //for printing the students data
            data: students
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:'Something went wrong!',
            //getting error dynamically
            error: error.message
        })
    }
}

//API for getting any specific student
const getStudentbyId = async (req,res) => {
    try{
        const student = await Student.findById(req.params.id);
        //if student record not found
        if(!student){
            return res.status(404).json({
                success: false,
                message: 'Record not found!'
            })
        }
        res.status(200).json({
            success: true,
            message:'Successfully fetched!',
            data: student
        })
    }catch(error){
        if(error.name === 'CastError'){
            return res.status(400).json({
                success:false,
                message:'Invalid ID format'
            })
        }
         res.status(500).json({
            success:false,
            message:'Something went wrong!',
            //getting error dynamically
            error: error.message
        })

    }
}

//API for updating the student data
const updateStudent = async(req,res) => {
    try{
         const {name,email,course,marks,city} = req.body;

         const updateData = {};
         updateData.name = name;
         updateData.email = email;
         updateData.course = course;
         updateData.marks = marks;
         updateData.city = city;

         const student = await Student.findByIdAndUpdate(
            req.params.id,
            updateData
        )
        if(!student){
            return res.status(404).json({
                success:false,
                message:'Student not found!'
            })
        }
        res.status(200).json({
            success:true,
            message:'Student record updated successfully!'
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:'Something went wrong!',
            error: error.message
        })
    }
}

//API to delete the student record
const deleteStudent = async(req,res) => {
    try{

        const student = await Student.findById(req.params.id);

        await Student.findByIdAndDelete(req.params.id);

        //for getting student name specifically
        const studentName = student.name;

        res.status(200).json({
            success:true,
            message:`Student ${studentName} deleted successfully!`,
            deletedId: req.params.id
        })
    }catch(error){
          if(error.name === 'CastError'){
            return res.status(400).json({
                success:false,
                message:'Invalid ID format'
            })
        }
         res.status(500).json({
            success:false,
            message:'Something went wrong!',
            //getting error dynamically
            error: error.message
        })
    }
}


module.exports = {addStudent, getAllStudent, getStudentbyId, updateStudent, deleteStudent};