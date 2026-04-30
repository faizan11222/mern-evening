import { Badge, Button, Card, Container } from "react-bootstrap";


const StudentCard = ({ student, onDelete }) => {

    //function that ask us for the confirmation pop-up
    const handleDelete = () => {
      if(window.confirm(`Are you sure you want to delete ${student.name}`)){
        onDelete(student._id);
      }
    }
    return(
        <Container>
        <Card style={{ width: '28rem', marginBottom:'20px' }}>
        <Card.Body>
        <Card.Title>{student.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{student.email}</Card.Subtitle>
        <Card.Text>
         <div><strong>Course: </strong>{student.course}</div>
         <div><strong>Course: </strong>{student.city}</div>
         <div><strong>Marks: </strong><Badge>{student.marks}</Badge></div>
        </Card.Text>
      </Card.Body>

      <Card.Footer>
        <Button variant="success">Edit</Button>{' '}
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Card.Footer>
    </Card>
    </Container>
    )
}
export default StudentCard;