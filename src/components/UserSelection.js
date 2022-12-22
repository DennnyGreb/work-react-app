import React from 'react';
import {
  Row,
  Col,
  Button,
  Card,
} from 'react-bootstrap';

const UserSelection = ({ setTriggerDataLoad, users, setActiveUser }) => {
  return users && (
    <Row className="justify-content-md-left">
      <Col xl="12" lg="12" md="12" style={{
        flexDirection: 'row',
        display: 'flex',
      }}>
        {
          users.map(user => (
            <Card key={user?.IdUser} style={{ width: '18rem', margin: 30 }}>
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
  );
}

export default UserSelection;