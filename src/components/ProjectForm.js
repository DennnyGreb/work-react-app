import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const ProjectForm = ({ openProjectForm, userId, setTriggerDataLoad, setOpenProjectForm }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const addProject = () => {
    axios.post('http://localhost:8080/create-project', {
      data: { userId, name: projectName, description: projectDescription }
    }).then(() => {
      setTriggerDataLoad(true);
      setOpenProjectForm(false);
    });
  };

  return openProjectForm ? (
    <Form style={{ marginTop: 30 }} onSubmit={(event) => {
      event.preventDefault();
      addProject({
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
  ) : null;
}

export default ProjectForm;