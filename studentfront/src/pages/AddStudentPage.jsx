import { Button, Container, Form } from "react-bootstrap"

const AddStudentPage = () => {
    return(
        <div>
    <Container>
        <h1>Add Student Form</h1>
     <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name="name" />
      </Form.Group>

       <Form.Group className="mb-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" name="name" />
      </Form.Group>

       <Form.Group className="mb-3">
        <Form.Label>Select Course:</Form.Label>
        <Form.Select name="course">
            <option>--- Select Course ---</option>
        </Form.Select>
      </Form.Group>

       <Form.Group className="mb-3">
        <Form.Label>Marks (0-100):</Form.Label>
        <Form.Control type="number" placeholder="Enter your marks" name="marks" min={0} max={100} />
      </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label>City:</Form.Label>
        <Form.Control type="text" placeholder="Enter city" name="city" />
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