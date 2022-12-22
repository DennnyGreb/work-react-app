import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const TaskModalForm = ({ projectId, show, handleClose, activeColumn, setTriggerDataLoad }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskWork, setTaskWork] = useState('');
  const addTask = () => {
    axios.post('http://localhost:8080/create-task', {
      data: {
        name: taskName,
        description: taskDescription,
        work: taskWork,
        IdProject: projectId, // Check
        IdTaskState: activeColumn?.IdTaskState,
      }
    }).then(res => {
      setTriggerDataLoad(true);
    });
  };

  return (
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
            handleClose();
            addTask();
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default TaskModalForm;