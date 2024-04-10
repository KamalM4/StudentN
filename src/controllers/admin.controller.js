const studentService = require("../services/student.service.js");
const StatusCode = require("../../commons/utlis/statusCode.js");
const response = require("../../commons/response/response.js");

const mongoose = require("mongoose");

const saveStudent = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await studentService.saveStudent(req.body, session);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      result,
      res,
      "Successfully",
      "Successfully"
    );
  } catch (error) {
    await session.abortTransaction();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  } finally {
    session.endSession();
  }
};
const viewStudent = async (req, res) => {
  try {
    const result = await studentService.Service.viewStudent(req.params.id);
    return response.handleSuccessResponse(
      result,
      res,
      "Successfully",
      "Successfully"
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res,
      error
    );
  }
};
const viewAllStudent = async (req, res) => {
  try {
    const result = await studentService.viewAllStudent();
    return response.handleSuccessResponse(
      result,
      res,
      "Successfully",
      "Successfully"
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res,
      error
    );
  }
};
const updateStudent = async (req, res) => {
  try {
    const result = await studentService.updateStudent(req.params.id, req.body);
    return response.handleSuccessResponse(
      result,
      res,
      "Successfully",
      "Successfully"
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const deleteStudent = async (req, res) => {
  try {
    const result = await studentService.deleteStudent(req.params.id);
    return response.handleSuccessResponse(
      result,
      res,
      "Successfully",
      "Successfully"
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};

module.exports = {
  /**
   * @swagger
   * tags:
   *   name: Student Management
   *   description: APIs for managing student
   *
   * /admin-add-student:
   *   post:
   *     summary: Save a new student
   *     description: Use this API to save a new student
   *     tags:
   *       - Student Management
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: student
   *         description: The student object to save
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             studentName:
   *               type: string
   *               description: The name of the student
   *               example: sks
   *             branchName:
   *               type: string
   *               description: The name of the branch
   *               example: cse
   *             email:
   *               type: string
   *               description: The emailId of the student
   *               example: abc@gmail.com
   *             password:
   *               type: string
   *               description: The password of the studentId
   *               example: abcstudent100
   *             age:
   *               type: Number
   *               description: age of the student
   *               example: 0
   *             description:
   *               type: string
   *               description: Description of the course
   *               example: This details provides an introduction to business administration.
   *     responses:
   *       200:
   *         description: Successful response indicating the course has been saved
   *       400:
   *         description: Bad Request - Invalid input or missing required fields
   *       401:
   *         description: Unauthorized - Missing or invalid authentication token
   *       500:
   *         description: Internal Server Error - Failed to save the student due to server issues
   */
  saveStudent,
  /**
   * @swagger
   * tags:
   *   name: Student Management
   *   description: APIs for managing student
   *
   * /admin-view-student/{id}:
   *   get:
   *     summary: View student details by ID
   *     description: Use this API to view details of a student by its ID
   *     tags:
   *       - Student Management
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the student to view
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: Successful response containing the course details
   *         schema:
   *           type: object
   *           properties:
   *             _id:
   *               type: string
   *               description: The unique identifier of the student
   *             studentName:
   *               type: string
   *               description: The name of the student
   *             branchName:
   *               type: string
   *               description: The branchname of the student
   *             email:
   *               type: string
   *               description: The emailid of the student
   *             password:
   *               type: string
   *               description: The password of the student to verify id
   *             age:
   *               type: Number
   *               description: Age of the student
   *             description:
   *               type: string
   *               description: Description of the course
   *       400:
   *         description: Bad Request - Invalid input or missing required fields
   *       401:
   *         description: Unauthorized - Missing or invalid authentication token
   *       404:
   *         description: Course not found
   *       500:
   *         description: Internal Server Error - Failed to retrieve course details
   */
  viewStudent,
  /**
   * @swagger
   * tags:
   *   name: Student Management
   *   description: APIs for managing student
   *
   * /admin-view-all-student:
   *   get:
   *     summary: View all student
   *     description: Use this API to view details of all student
   *     tags:
   *       - Student Management
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Successful response containing details of all students
   *         schema:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               _id:
   *                 type: string
   *                 description: The unique identifier of the student
   *               studentName:
   *                 type: string
   *                 description: The name of the student
   *               branchname:
   *                 type: string
   *                 description: The branch of the student
   *               email:
   *                 type: string
   *                 description: The emailid of the student 
   *               password:
   *                 type: string
   *                 description: The password to verify the student id
   *               age:
   *                 type: Number
   *                 description: age of the student
   *               description:
   *                 type: string
   *                 description: Description of the course
   *       401:
   *         description: Unauthorized - Missing or invalid authentication token
   *       500:
   *         description: Internal Server Error - Failed to retrieve student details
   */
  viewAllStudent,
  /**
   * @swagger
   * tags:
   *   name: Student Management
   *   description: APIs for managing Student
   *
   * /admin-update-student/{id}:
   *   put:
   *     summary: Update a student by ID
   *     description: Use this API to update details of a student by its ID
   *     tags:
   *       - Student Management
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the student to update
   *         type: string
   *         required: true
   *       - in: body
   *         name: course
   *         description: The updated student object
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             studentName:
   *               type: string
   *               description: The updated name of the student
   *               example: SKS
   *             branchname:
   *               type: string
   *               description: The updated code of the student
   *               example: CSE
   *             email:
   *               type: string
   *               description: The updated email id of the student
   *               example: abc1@gmail.com
   *             password:
   *               type: string
   *               description: The updated password of student
   *               example: newpassword1
   *             age:
   *               type: Number
   *               description: updated age of student
   *               example: 20
   *             description:
   *               type: string
   *               description: Updated description of the student
   *               example: This details provide an introduction to student.
   *     responses:
   *       200:
   *         description: Successful response indicating the course has been updated
   *       400:
   *         description: Bad Request - Invalid input or missing required fields
   *       401:
   *         description: Unauthorized - Missing or invalid authentication token
   *       404:
   *         description: Course not found
   *       500:
   *         description: Internal Server Error - Failed to update the course due to server issues
   */
  updateStudent,
  /**
   * @swagger
   * tags:
   *   name: Student Management
   *   description: APIs for managing student
   *
   * /admin-delete-student/{id}:
   *   delete:
   *     summary: Delete a student by ID
   *     description: Use this API to delete a student by its ID
   *     tags:
   *       - Student Management
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the student to delete
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: Successful response indicating the course has been deleted
   *       401:
   *         description: Unauthorized - Missing or invalid authentication token
   *       404:
   *         description: Course not found
   *       500:
   *         description: Internal Server Error - Failed to delete the course due to server issues
   */ 
  deleteStudent,
};
