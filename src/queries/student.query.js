const {studentModel} = require("../models/student.model");

const saveStudent= async (studentData, session) => {
    try{
        const student = await new studentModel(studentData);
        student.save(session);
        return student;
    } catch (error) {
        throw error;
    }

};

const viewStudent = async (id) => {
    try {
        return await studentModel.findById(id);
    } catch (error) {
        throw error;
    }
};

//viewAllStudent

const viewAllStudent = async () => {
    try{
        return await studentModel.find();
    } catch (error) {
        throw error;
    }
};

const updateStudentDetails= async (id, body) => {
    try {
        return await studentModel.findByIdAndUpdate(id, body, {new: true});
    }catch (error) {
        throw error;
    }
};

const deleteStudent = async (id) => {
    try {
        return await studentModel.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
};

module.exports ={
saveStudent,
viewStudent,
viewAllStudent,
updateStudentDetails,
deleteStudent,
};