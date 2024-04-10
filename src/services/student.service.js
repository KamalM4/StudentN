const studentQuery = require("../queries/student.query");
const saveStudent = async(body, session) =>{
    try{
        const{
            studentName,
            branchName,
            email,
            password,
            age,
            description}=body;

        return await studentQuery.saveStudent({
            studentName,
            branchName,
            email,
            password,
            age,
            description,
        }, session);

        } catch (error) {
            throw error;
        }
    }
    const viewStudent = async(id) => {
        try {
            const result=await studentQuery.viewStudent(id);
            if(!result) {
                throw customException.error(
                    statusCode.NOT_FOUND,
                    null,
                    `${id} not found.`
                );
            }
            return result

        }catch (error) {
            throw error;
        }
    }
    const viewAllStudent = async()=>{
        try {
            return await studentQuery.viewAllStudent();
        } catch (error) {
            throw error;
        }
    }
    const updateStudent = async(id, body)=>{
        try{
            if(!id){
                return ' please write the resource ID...'
            }
            if(!await studentQuery.updateStudent(id)){
                return `${id} is not associated with any id.please check...`
            }
            const updateStudent = await studentQuery.updateStudent(id,body);
            return updatedStudent;
        } catch (error) {
            throw error;
        }
    }

    const deleteStudent = async(id) =>{
        try {
            return await studentQuery.deleteStudent(id);
        } catch (error) {
            throw error;
        }
    }
    module.exports = {
        saveStudent,
        viewStudent,
        viewAllStudent,
        updateStudent,
        deleteStudent,

    }
