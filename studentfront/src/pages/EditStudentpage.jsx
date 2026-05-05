import { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import { getStudentById, updateStudent } from "../api/studentapi";

const COURSES = ['MERN','React','Android','AI'];
const EditStudentPage = () => {
    //reads id from URL
    const {id} = useParams();
      const navigate = useNavigate();

    //hook that captures input fields data and hold them
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        course:'',
        marks:'',
        city:''
    });
     //hook for setting loading state
        const [loading, setLoading] = useState(false);
        //state for handling the errors
        const [error, setError] = useState({});
        //hook for handling messages
        const [message, setMessage] = useState(null);

        //fetch the student data once when we land on page
        useEffect(() => {
            const fetchStudent = async () => {
                try{
                    const data = await getStudentById(id);
                    //populating the data from database into input fields
                    setFormData({
                        name: data.data.name,
                        email: data.data.email,
                        course: data.data.course,
                        marks: data.data.marks,
                        city: data.data.city,
                    })
                }catch(err){
                    console.log(err);
                }
            }
            fetchStudent()
        },[id])

    //function that get the data from input fields
        const handleChange = (e) => {
            const {name,value} = e.target;
            //passing the input fields values into hook and holding them
            setFormData(prev => ({...prev,[name]:value}))
            console.log('Updated values ',{...formData,[name]:value})
        }

         //function for saving the student data into database
                const handleSubmit = async(e) => {
                    //preventing button to refresh the page
                    e.preventDefault();
                    try{
                    //finally saving the data into database
                    const data = await updateStudent(id,{...formData})
                    setMessage({variant:'success',text:data.message})
                    //redirect to main page
                    setTimeout(() => navigate('/'),1500)
                    }catch(err){
                     setMessage({variant:'danger',text:'Could not add Student!'})
                    }
                }
    return(
        <div>
            <Container>
                <h1>Edit Student Record</h1>
        { 
            message && <Alert variant={message.variant}>{message.text}</Alert>
        }
       <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name:</Form.Label>
        <Form.Control value={formData.name} onChange={handleChange} type="text" placeholder="Enter name" name="name" />
      </Form.Group>

       <Form.Group className="mb-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control value={formData.email} onChange={handleChange} type="email" placeholder="Enter your email" name="email" />
      </Form.Group>

       <Form.Group className="mb-3">
        <Form.Label>Select Course:</Form.Label>
        <Form.Select value={formData.course} name="course" onChange={handleChange}>
            <option>--- Select Course ---</option>
            {
               COURSES.map(c => <option key={c} value={c}>{c}</option>) 
            }
        </Form.Select>
      </Form.Group>

       <Form.Group className="mb-3">
        <Form.Label>Marks (0-100):</Form.Label>
        <Form.Control value={formData.marks} onChange={handleChange} type="number" placeholder="Enter your marks" name="marks" min={0} max={100} />
      </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label>City:</Form.Label>
        <Form.Control value={formData.city} onChange={handleChange} type="text" placeholder="Enter city" name="city" />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button variant="primary" type="submit">Save Record</Button>
      </div>

      </Form>
            </Container>
        </div>
    )
}
export default EditStudentPage