const mongoose = require('mongoose');
const shortid = require("shortid");
const validator= require('validator')

const studentSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `Std-${shortid.generate()}`
    },

    studentName: {
        type: String,
        required: true
    },
    branchName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    description: {
        type: String
      }
})
const studentModel = mongoose.model('Students',studentSchema);
module.exports= {studentModel};