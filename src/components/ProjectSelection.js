import React, { useState } from 'react';
import ProjectForm from './ProjectForm';
import {
  Row,
  Col,
  Button,
  Card,
} from 'react-bootstrap';

const ProjectSelection = ({ activeProject, userId, projects, setActiveProject, setTriggerDataLoad }) => {
  const [openProjectForm, setOpenProjectForm] = useState(false);
  return !activeProject && (
    <>
      <Row className="justify-content-md-left">
        <Col xl="12" lg="12" md="12" style={{
          flexDirection: 'row',
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          {
            projects.map(project => (
              <Card key={project?.IdProject} style={{ minWidth: '12rem', width: '12rem', margin: 20 }}>
                <Card.Body>
                  <Card.Title>{project?.Name}</Card.Title>
                  <Button variant="primary" onClick={() => {
                    setActiveProject(project);
                  }}>Обрати проект</Button>
                </Card.Body>
              </Card>
            ))
          }
          <Card key='uniq' style={{ minWidth: '12rem', width: '12rem', margin: 30}}>
            <Card.Body style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button onClick={() => setOpenProjectForm(true)}>Додати</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ProjectForm setOpenProjectForm={setOpenProjectForm} userId={userId} openProjectForm={openProjectForm} setTriggerDataLoad={setTriggerDataLoad} />
    </>
  );
}

export default ProjectSelection;