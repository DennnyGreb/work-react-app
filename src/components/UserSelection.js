import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Card,
  Form,
} from 'react-bootstrap';
import axios from 'axios';

const UserSelection = ({ setTriggerLoadUsers, setTriggerDataLoad, users, setActiveUser }) => {
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');

  const createUser = () => {
    axios.post('http://localhost:8080/create-user', {
      data: {
        userName,
        userLastName,
        userNickname,
        userEmail,
        password,
      }
    }).then(() => {
      setTriggerLoadUsers(true);
    });
  };

  return users && (
    <>
      <Form style={{ marginTop: 30, marginBottom: 30 }} onSubmit={(event) => {
        event.preventDefault();
        createUser();
        setUserName('');
        setUserLastName('');
        setUserNickname('');
        setUserEmail('');
        setUserPassword('');
      }}>
        <Row className="justify-content-md-center">
          <Col xl="12" lg="12" md="12" style={{
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'center',
            }}>
            <h3>Cтворити користувача</h3>
          </Col>
          <Col xl="12" lg="12" md="12" style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Form.Group style={{ margin: 15 }} className="mb-3" controlId="userName">
              <Form.Label>Імʼя користувача</Form.Label>
              <Form.Control value={userName} onChange={(event) => setUserName(event.target.value)} type="text" placeholder="Введіть імʼя" />
            </Form.Group>
            <Form.Group style={{ margin: 15 }} className="mb-3" controlId="userLastName">
              <Form.Label>Прізвище користувача</Form.Label>
              <Form.Control value={userLastName} onChange={(event) => setUserLastName(event.target.value)} type="text" placeholder="Введіть прізвище" />
            </Form.Group>
          </Col>
          <Col xl="12" lg="12" md="12" style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Form.Group style={{ margin: 15 }} className="mb-3" controlId="userNickname">
              <Form.Label>Нік користувача</Form.Label>
              <Form.Control value={userNickname} onChange={(event) => setUserNickname(event.target.value)} type="text" placeholder="Введіть нік" />
            </Form.Group>
            <Form.Group style={{ margin: 15 }} className="mb-3" controlId="userEmail">
              <Form.Label>Емейл користувача</Form.Label>
              <Form.Control value={userEmail} onChange={(event) => setUserEmail(event.target.value)} type="email" placeholder="Введіть емейл" />
            </Form.Group>
          </Col>
          <Col xl="12" lg="12" md="12" style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Form.Group style={{ margin: 15 }} className="mb-3" controlId="password">
              <Form.Label>Пароль користувача</Form.Label>
              <Form.Control value={password} onChange={(event) => setUserPassword(event.target.value)} type="password" placeholder="Введіть пароль" />
            </Form.Group>
            <Button style={{ margin: 15, marginTop: 46, width: 201, height: 38 }} variant="primary" type="submit">
              Створити
            </Button>
          </Col>
        </Row>
      </Form>
      <Row className="justify-content-md-left">
        <Col xl="12" lg="12" md="12" style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <h3>Обрати користувача</h3>
        </Col>
        <Col xl="12" lg="12" md="12" style={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {
            users.map(user => (
              <Card 
                key={user?.IdUser}
                style={{
                  minWidth: '10rem',
                  width: '10rem',
                  marginRight: '20px',
                  marginBottom: '20px' 
                }}
              >
                <Card.Body>
                  <Card.Title>{user.Name}</Card.Title>
                  <Button variant="primary" onClick={() => {
                    setActiveUser(user);
                    localStorage.setItem('activeUser', JSON.stringify(user));
                    setTriggerDataLoad(true);
                  }}>Обрати</Button>
                </Card.Body>
              </Card>
            ))
          }
        </Col>
      </Row>
    </>
  );
}

export default UserSelection;