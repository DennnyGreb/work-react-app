import { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Navbar from './Navbar';
import UserSelection from './components/UserSelection';
import ProjectSelection from './components/ProjectSelection';
import ColumnForm from './components/ColumnForm';
import ColumnList from './components/ColumnList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [users, setUsers] = useState(null);
  const [activeUser, setActiveUser] = useState(JSON.parse(localStorage.getItem('activeUser')) || null);
  const [triggerDataLoad, setTriggerDataLoad] = useState(true);
  const [triggerLoadUsers, setTriggerLoadUsers] = useState(true);
  const [projects, setProjects] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [columns, setColumns] = useState([]);
  const [search, setSearch] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (triggerLoadUsers) {
      axios.get('http://localhost:8080/get-users').then((res) => {
        setUsers(res.data);
      });
      setTriggerLoadUsers(false);
    }
  }, [triggerLoadUsers]);

  useEffect(() => {
    if (activeUser !== null && triggerDataLoad) {
      axios.get('http://localhost:8080/get-projects', { params: { userId: activeUser.IdUser } }).then((res) => {
        setProjects(res.data.projects);
      });
      setTriggerDataLoad(false);
    }
  }, [activeUser, triggerDataLoad]);

  useEffect(() => {
    if (activeProject) {
      axios.get('http://localhost:8080/get-columns', { 
        params: { 
          projectId: activeProject.IdProject, 
          search,
      } }).then((res) => {
        setColumns(res.data.columns);
        setTriggerDataLoad(false);
      }).catch(() => {
        setTriggerDataLoad(false);
      });
    }
  }, [activeProject, triggerDataLoad]);

  const resetToLogin = () => {
    setProjects(null);
    setColumns([]);
    setActiveProject(null);
    setActiveUser(null);
    localStorage.setItem('activeUser', null);
  }

  return (
    <div className="App">
      <Navbar resetToLogin={resetToLogin} activeUser={activeUser} />
      <Container>
        {activeUser ? (
          <ProjectSelection activeProject={activeProject} userId={activeUser?.IdUser} projects={projects || []} setActiveProject={setActiveProject} setTriggerDataLoad={setTriggerDataLoad} />
        ) : (
          <UserSelection setTriggerLoadUsers={setTriggerLoadUsers} setTriggerDataLoad={setTriggerDataLoad} users={users} setActiveUser={setActiveUser} />
        )}
        <Row className="justify-content-md-center">
          <Col xl="12" lg="12" md="12" style={{ marginBottom: '20px', paddingBottom: '20px', marginTop: '10px', borderBottom: '1px solid lightgray' }}>
            <ColumnForm setTriggerDataLoad={setTriggerDataLoad} project={activeProject} />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xl="4" lg="4" md="4" style={{ marginBottom: '20px', paddingBottom: '20px', marginTop: '10px' }}>
            {columns.length > 0 
              ? (
                <Form.Control
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    if (timeoutId) {
                      clearTimeout(timeoutId);
                    }
                    setTimeoutId(setTimeout(() => {
                      setTriggerDataLoad(true);
                    }, 800));
                  }} 
                  type="text"
                  placeholder="Пошук"
                />
              ) 
              : null
            }
          </Col>
        </Row>
        <Row className="justify-content-md-left">
          <Col xl="12" lg="12" md="12" style={{
            flexDirection: 'row',
            display: 'flex',
            flexWrap: 'wrap',
          }}>
            <ColumnList
              setTriggerDataLoad={setTriggerDataLoad}
              columnList={columns}
              activeProject={activeProject} 
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
