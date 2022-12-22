import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import TaskModalForm from './TaskModalForm';
import TaskEditModalForm from './TaskEditModalForm';
import pencil from '../pencil.png';

const ColumnList = ({ columnList, activeProject, setTriggerDataLoad }) => {
  const [activeColumn, setActiveColumn] = useState(null);
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  
  const handleEditClose = () => {
    setEditShow(false);
    setActiveTask(null);
  };

  const handleClose = () => {
    setShow(false);
    setActiveColumn(null);
  };

  const columns = _.uniqBy(columnList, 'IdTaskState');
  const list = columns.map(item => ({ ...item, Tasks: columnList
    .filter(listItem => (listItem.IdTaskState === item.IdTaskState && listItem.IdTask ))
    .map(listItem => ({ Name: listItem.TaskName, IdTask: listItem.IdTask, Description: listItem.Description, Work: listItem.Work, TaskStateId: listItem.IdTaskState}))
  }));

  return list?.length > 0 
    ? (
      <>
        {list.map(column => (
          <Card 
            key={column.IdTaskState} 
            style={{
              minWidth: '14rem',
              width: '14rem',
              marginRight: '20px',
              marginBottom: '20px' 
            }}>
            <Card.Body>
              <Card.Title>{column.TaskStateName}</Card.Title>
              { /* Column Tasks */}
              {column.Tasks?.map(task => {
                return (
                  <Badge key={task.IdTask} style={{ 
                    fontSize: '14px',
                    padding: '10px',
                    marginBottom: '10px',
                    textAlign: 'left',
                    border: '1px solid #000',
                    color: '#000',
                    fontWeight: '400',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }} bg="light">
                    <span>{task.Name}</span>
                    <img onClick={() => {
                      setActiveTask(task);
                      setEditShow(true);
                    }} style={{ width: 15, height: 15, cursor: 'pointer' }} src={pencil} alt="pencil"/>
                  </Badge>
                );
              })}
              <Button style={{ marginBottom: 10, width: '100%', fontSize: '14px', }} variant="warning" onClick={() => {
                setShow(true);
                setActiveColumn(column);
              }}>
                Додати завдання
              </Button>
              <Button style={{ width: '100%', fontSize: '14px', }} variant="danger" onClick={() => {
                axios.delete('http://localhost:8080/delete-column', { params: { IdTaskState: column.IdTaskState } }).then((res => {
                  setTriggerDataLoad(true);
                }));
              }}>
                Видалити
              </Button>
            </Card.Body>
          </Card>
        ))}
        <TaskModalForm setTriggerDataLoad={setTriggerDataLoad} activeColumn={activeColumn} projectId={activeProject?.IdProject} handleClose={handleClose} show={show} />
        { activeTask ? <TaskEditModalForm columns={columns} activeTask={activeTask} setTriggerDataLoad={setTriggerDataLoad} handleClose={handleEditClose} show={editShow} /> : null }
      </>
    ) : null;
}

export default ColumnList;