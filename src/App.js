import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css'; 
import db from './firebase';


const items = [
  { id: '1', content: 'Torch with 4 battery-cells' },
  { id: '2', content: 'Folding knife' },
  { id: '3', content: 'Air map of the area' },
  { id: '4', content: 'Plastic raincoat(large size)' },
  { id: '5', content: 'Magnetic compass' },
  { id: '6', content: 'First-aid kit' },
  { id: '7', content: '45 caliber pistol(loaded)' },
  { id: '8', content: 'Parachute (red & white)' },
  { id: '9', content: 'Bottle of 1000 salt tablets' },
  { id: '10', content: '1 liter of water per person' },
  { id: '11', content: 'Torch with 4 battery-cells' },
  { id: '12', content: 'A book entitled-Desert Animals That Can Be Eaten' },
  { id: '13', content: 'Sunglasses (for everyone)' },
  { id: '14', content: '2 liters of 180 proof liquor' },
  { id: '15', content: 'Overcoat (for everyone)' },
  { id: '16', content: 'A cosmetic mirror' },
];

const App = () => {
  const [dragItems, setDragItems] = useState(items);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(dragItems);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setDragItems(newItems);
  };

  const handleSubmit = () => {
    const arrangedIndexes = dragItems.map((item) => item.id);
    console.log(arrangedIndexes);
  
    // Store the arrangedIndexes to Firebase database
    db.ref('arrangedIndexes').set(arrangedIndexes) // Use 'db' instead of 'database'
      .then(() => {
        console.log('Data stored successfully.');
      })
      .catch((error) => {
        console.error('Error storing data:', error);
      });
  };

  return (
    <div className="app-container">
      <h1>Drag and Drop Items</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="items">
          {(provided) => (
            <div
              className="droppable-area"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {dragItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={`draggable-item ${
                        snapshot.isDragging ? 'is-dragging' : ''
                      }`}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default App;
