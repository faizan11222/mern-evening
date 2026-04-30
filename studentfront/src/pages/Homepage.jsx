import { useEffect, useState } from "react";
import { deleteStudent, getAllStudents } from "../api/studentapi";
import StudentCard from "../components/StudentCard";
import { Alert, Col, Row } from "react-bootstrap";

const Homepage = () => {
    //hook to get all students data
    const [students, setStudents] = useState([]);
    //hook for setting loading state
    const [loading, setLoading] = useState(false);
    //state for handling the errors
    const [error, setError] = useState(null);
    //hook for handling messages
    const [message, setMessage] = useState(null);

    //function to fetch all students data from database
    const fetchStudents = async () => {
        try{
            setLoading(true);
            setError(null);
            const data = await getAllStudents();
            setStudents(data.data)
        }catch(error){
            setError(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchStudents();
    },[])

    //function to delete the student from database
    const handleDelete = async (id) => {
        try{
            const data = await deleteStudent(id)
            setStudents(prev => prev.filter(s => s._id !== id))
            setMessage({ variant:'success', text:data.message })
        }catch(err){
            setMessage({ variant:'danger',text:'Could not delete the student' })
        }
        //removing the message after 3 seconds
        setTimeout(() => setMessage(null),3000)
    }

    //state for getting the students data automatically
    return(
<div>
    <h1>All Student Data</h1>
    {
        message && (
            <Alert variant={message.variant}>{message.text}</Alert>
        )
    }
    <Row xs={1} md={2} lg={3}>
    {

        students.map(s => (
            <Col>
            <StudentCard student={s} onDelete={handleDelete}/>
            </Col>
        ))}
        </Row>
   
</div>
    )
}
export default Homepage;