import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap"
import { addStudent } from "../api/studentapi";

const COURSES = ['MERN','React','Android','AI'];
const AddStudentPage = () => {
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
            e.perventDefault();
            try{
            //finally saving the data into database
            await addStudent({...formData})
            }catch(err){
                console.log(err);
            }
        }
    return(
        <div>
    <Container>
        <h1>Add Student Form</h1>
     <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name:</Form.Label>
        <Form.Control onChange={handleChange} type="text" placeholder="Enter name" name="name" />
      </Form.Group>

       <Form.Group className="mb-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control onChange={handleChange} type="email" placeholder="Enter your email" name="email" />
      </Form.Group>

       <Form.Group className="mb-3">
        <Form.Label>Select Course:</Form.Label>
        <Form.Select name="course" onChange={handleChange}>
            <option>--- Select Course ---</option>
            {
               COURSES.map(c => <option key={c} value={c}>{c}</option>) 
            }
        </Form.Select>
      </Form.Group>

       <Form.Group className="mb-3">
        <Form.Label>Marks (0-100):</Form.Label>
        <Form.Control onChange={handleChange} type="number" placeholder="Enter your marks" name="marks" min={0} max={100} />
      </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label>City:</Form.Label>
        <Form.Control onChange={handleChange} type="text" placeholder="Enter city" name="city" />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button variant="primary" type="submit">Save Record</Button>
      </div>

      </Form>
      </Container>
        </div>
    )
}
export default AddStudentPage