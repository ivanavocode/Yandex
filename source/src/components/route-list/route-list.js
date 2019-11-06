import React from 'react';
import './route-list.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const RouteList = (props) => {
  const { coordinates, onDelItem} = props;

  const NewLink = coordinates.map((item, index) => {
    const {id, name } = item;
    console.log('draggable:',id,index)
    return (
      <Draggable key={id} draggableId={id.toString()} index={index}>
        
        
      {(provided) => (
      <li key={index}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      >
      <span>{name}</span>
      <button className="click" onClick={() => onDelItem(id)}>x</button>
    </li>
          )}
          </Draggable>
        )
      }
    )

    const onDragEndList = (result) => {

      // let style = {
      //     display: "none",
      // }
      // dropped outside the list
      if (!result.destination) {
        return;
      }
      const sourceId = result.source.index;
      const destinationId = result.destination.index;
      props.onDragEndList(sourceId,destinationId);
      // console.log('ondragend',sourceId,destinationId)
    }
    const onDragStart = (result) => {
      // console.log("1")
    }

    return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEndList}>
        <Droppable droppableId="droppable">
          {(provided) => (
            
            <ul
              className="PointList"
              ref={provided.innerRef} 
              {...provided.droppableProps}
            >
              {NewLink}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
    </DragDropContext>
        )
      }

export default RouteList;

/*API-KEY
16e669f2-ef27-4d0c-a11f-e7cbf67c2026
*/
  /*
  Тимирязевский район
  */