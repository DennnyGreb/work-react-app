import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from './Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [openProjectForm, setOpenProjectForm] = useState(false);
  const [columnList, setColumnList] = useState([]);
  const [columnName, setColumnName] = useState('');
  const [columnDescription, setColumnDescription] = useState('');
  const [activeColumn, setActiveColumn] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskWork, setTaskWork] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [project, setProject] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setActiveColumn(null);
  };
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <Navbar />
      <Container>
        { openProjectForm ? null : (
          <Row>
            <Col>
              <Button style={{ marginTop: '30px' }} onClick={() => setOpenProjectForm(true)}>Додати проект</Button>
            </Col>
          </Row>
        )}
        <Row className="justify-content-md-center">
          <Col xl="4" lg="4" md="4" style={{ marginBottom: '30px', marginTop: '30px' }}>
            { openProjectForm && !project ? (
              <Form onSubmit={(event) => {
                event.preventDefault();
                setProject({
                  name: projectName,
                  description: projectDescription,
                });
              }}>
                <Form.Group className="mb-3" controlId="projectName">
                  <Form.Label>Назва проекту</Form.Label>
                  <Form.Control value={projectName} onChange={(event) => setProjectName(event.target.value)} type="text" placeholder="Введіть назву проекту" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="projectDescription">
                  <Form.Label>Опис проекту</Form.Label>
                  <Form.Control value={projectDescription} onChange={(event) => setProjectDescription(event.target.value)} type="textarea" placeholder="Введіть опис проекту" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Створити
                </Button>
              </Form>
            ) : null }
            { project ? (
              <>
                <h1 className="projectHeader">{project.name}</h1>
                <p className="projectDescription">{project.description}</p>
                <Form onSubmit={(event) => {
                  event.preventDefault();
                  setColumnList([...columnList, {
                    name: columnName,
                    description: columnDescription,
                    tasks: [],
                  }]);
                  setColumnName('');
                  setColumnDescription('');
                }}>
                  <Form.Group className="mb-3" controlId="columnName">
                    <Form.Label>Назва колонки</Form.Label>
                    <Form.Control value={columnName} onChange={(event) => setColumnName(event.target.value)} 
                      type="text" placeholder="Введіть назву колонки" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="columnDescription">
                    <Form.Label>Опис</Form.Label>
                    <Form.Control value={columnDescription} onChange={(event) => setColumnDescription(event.target.value)} 
                      type="textarea" placeholder="Введіть опис колонки" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Створити
                  </Button>
                </Form>
              </>
              ) : null
            }
          </Col>
        </Row>
        <Row className="justify-content-md-left">
          <Col xl="12" lg="12" md="12" style={{
            flexDirection: 'row',
            display: 'flex',
          }}>
          {columnList.length > 0 ?
              columnList.map(column => (
                <Card style={{ width: '18rem', marginRight: '20px', marginBottom: '20px' }}>
                  <Card.Body>
                    <Card.Title>{column.name}</Card.Title>
                    <Card.Text>
                      {column.description}
                    </Card.Text>
                    { /* Column Tasks */}
                    {column?.tasks?.map(task => {
                      return (
                        <Badge style={{ 
                          display: 'block',
                          fontSize: '16px',
                          padding: '10px',
                          marginBottom: '10px',
                        }} bg="secondary">{task.name}</Badge>
                      );
                    })}
                    <Button variant="primary" onClick={() => {
                      handleShow();
                      setActiveColumn(column.name);
                    }}>
                      Додати завдання
                    </Button>
                  </Card.Body>
                </Card>
              ))
            : null}
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Додайте завдання</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(event) => {
            event.preventDefault();
          }}>
            <Form.Group className="mb-3" controlId="taskName">
              <Form.Label>Назва завдання</Form.Label>
              <Form.Control value={taskName} onChange={(event) => setTaskName(event.target.value)} 
                type="text" placeholder="Введіть назву завдання" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskDescription">
              <Form.Label>Опис</Form.Label>
              <Form.Control value={taskDescription} onChange={(event) => setTaskDescription(event.target.value)} 
                type="textarea" placeholder="Введіть опис завдання" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskWork">
              <Form.Label>Тип роботи</Form.Label>
              <Form.Control value={taskWork} onChange={(event) => setTaskWork(event.target.value)} 
                type="textarea" placeholder="Введіть тип роботи" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            const index = columnList.findIndex(item => item.name === activeColumn);
            console.log(index);
            let newColumnList = [...columnList];
            newColumnList[index] = { ...newColumnList[index], tasks: [...newColumnList[index].tasks, {
              name: taskName,
              description: taskDescription,
              work: taskWork,
            }]};
            setColumnList(newColumnList);
            setTaskName('');
            setTaskDescription('');
            setTaskWork('');
            handleClose();
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
