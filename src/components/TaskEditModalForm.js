import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const TaskEditModalForm = ({ columns, activeTask, show, handleClose, setTriggerDataLoad }) => {
  const [taskName, setTaskName] = useState(activeTask.Name);
  const [taskDescription, setTaskDescription] = useState(activeTask.Description);
  const [taskWork, setTaskWork] = useState(activeTask.Work);
  const [taskState, setTaskState] = useState(activeTask.TaskStateId);
  const editTask = () => {
    axios.put('http://localhost:8080/update-task', {
      data: {
        name: taskName,
        description: taskDescription,
        work: taskWork,
        IdTask: activeTask.IdTask,
        TaskStateId: taskState,
      }
    }).then(res => {
      setTriggerDataLoad(true);
    });
  };
  const deleteTask = () => {
    axios.delete('http://localhost:8080/delete-task', 
      { params: { IdTask: activeTask.IdTask }}).then(res => {
        setTriggerDataLoad(true);
    });
  };

  console.log(columns);

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
                type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskDescription">
              <Form.Label>Опис</Form.Label>
              <Form.Control value={taskDescription} onChange={(event) => setTaskDescription(event.target.value)} 
                type="textarea" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskWork">
              <Form.Label>Тип роботи</Form.Label>
              <Form.Control value={taskWork} onChange={(event) => setTaskWork(event.target.value)} 
                type="textarea" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskState">
              <Form.Label>Колонка</Form.Label>
              <Form.Select onChange={event => { 
                  setTaskState(event.target.value);
                }} aria-label="select">
                <option>Обрати колонку</option>
                {columns.map(column => (
                  <option key={column.IdTaskState} value={column.IdTaskState}>{column.TaskStateName}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрити
          </Button>
          <Button variant="primary" onClick={() => {
            handleClose();
            editTask();
          }}>
            Оновити
          </Button>
          <Button variant="danger" onClick={() => {
            handleClose();
            deleteTask();
          }}>
            Видалити
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

TaskEditModalForm.defaultProps = {
  activeTask: {
    Name: '',
    Description: '',
    Work: '',
  }
}

export default TaskEditModalForm;