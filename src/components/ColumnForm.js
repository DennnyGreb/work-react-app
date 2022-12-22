import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ColumnForm = ({ project, setTriggerDataLoad }) => {
  const [columnName, setColumnName] = useState('');
  const [columnDescription, setColumnDescription] = useState('');
  const addColumn = () => {
    axios.post('http://localhost:8080/create-column', {
      data: {
        IdProject: project?.IdProject,
        name: columnName,
        description: columnDescription,
      }
    }).then(res => {
      setTriggerDataLoad(true);
    });
  };

  return project ? (
    <>
      <h1 className="projectHeader" style={{ fontSize: 24 }}>Назва поточного проекту: <span style={{color: '#0d6efd'}}>{project?.Name}</span></h1>
      {/* <p className="projectDescription">{project?.Description}</p> */}
      <Form 
        style={{
          display: 'flex',
          width: '34rem',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onSubmit={(event) => {
        event.preventDefault();
        addColumn();
      }}>
        <Form.Group style={{margin: 10}} className="mb-3" controlId="columnName">
          <Form.Label>Назва колонки</Form.Label>
          <Form.Control value={columnName} onChange={(event) => setColumnName(event.target.value)} 
            type="text" placeholder="Введіть назву колонки" />
        </Form.Group>
        <Form.Group style={{margin: 10}} className="mb-3" controlId="columnDescription">
          <Form.Label>Опис</Form.Label>
          <Form.Control value={columnDescription} onChange={(event) => setColumnDescription(event.target.value)} 
            type="textarea" placeholder="Введіть опис колонки" />
        </Form.Group>
        <Button style={{marginTop: 25}} variant="primary" type="submit">
          Створити
        </Button>
      </Form>
    </>
    ) : null
};

export default ColumnForm;