import React, { useState } from 'react';
import styled from '@emotion/styled';
import { columnsFromBackend } from './KanbanData';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import Modal from "react-modal";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Form from 'react-bootstrap/Form';
const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const options = [
  'SEO', 'Long Form', 'Blog Post'
];
let currentColum;
const defaultOption = options[0];
const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [modalIsOpen, setIsOpen] = useState(false);
  let subtitle;
  function openModal(index) {
    currentColum = index;
    setIsOpen(true);
  }
  function save() {
    
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  return (
    
   <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
        <Container>
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
          },
          content: {
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
        }}
        contentLabel="Add New Task"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
      
        <div>Add New Taskl</div>
        <form>
         Tag: <Dropdown options={options} value={defaultOption} placeholder="Select an option" />
         <Form.Label>TaskName</Form.Label>
      <Form.Control
         
        id="taskName"
        aria-describedby="taskName"
      />
           
        </form>
        <button onClick={closeModal}>Close</button>
        <button onClick={save}>Save</button>
      </Modal>
    
          <TaskColumnStyles>
            {Object.entries(columns).map(([columnId, column]) => {
              return (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided, snapshot) => (
                    <TaskList
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <Title>{column.title}</Title>  <button onClick={() => openModal(columnId)}>Open Modal</button>
                      {column.items.map((item, index) => (
                        <TaskCard key={item} item={item} index={index} />
                      ))}
                      {provided.placeholder}
                    </TaskList>
                  )}
                </Droppable>
              );
            })}
          </TaskColumnStyles>
        </Container>
      </DragDropContext>
  );
};

export default Kanban;
