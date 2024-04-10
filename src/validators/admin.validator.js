const Joi = require('joi');
const response = require("../../commons/response/response");
const statusCode = require("../../commons/utlis/statusCode");
const studentSchema = Joi.object({

    studentName: Joi.string().required(),
    branchName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.number().integer().min(0),
    description: Joi.string().allow('', null)
});

const validateStudent = (req, res, next) => {
    const { error,value } = studentSchema.validate(req.body);
    if (error) {
        return response.errorResponse(res, statusCode.BAD_REQUEST, error.details[0].message);

    }
    next();
};
module.exports = { validateStudent };