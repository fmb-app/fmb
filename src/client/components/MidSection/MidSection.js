import React, {useState, useEffect, useContext} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FmbContext from '../../context/FmbContext';
import RegularInputField from '../InputFields/RegularInputField';
import RegularButton from '../Buttons/RegularButton';
import { themes } from '../../themes/Themes';

const style = {
	midSection: {
		width: '80%',
		height: '70%',
		marginTop: '7rem',
		textAlign: 'left',
		paddingTop: themes.mediumSpace,
		paddingBottom: themes.mediumSpace,
		paddingLeft: themes.mediumSpace,
		paddingRight: themes.mediumSpace,
		backgroundColor: 'rgba(0,0,0, 0.5)',
		borderRadius: themes.standardRadius,
		boxSizing: 'border-box',
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gridColumnGap: themes.standardSpace,
		overflowY: 'auto',
	},
	row: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		boxSizing: 'border-box',
	},
}

const itemStyle = (isDragging, draggableStyle) => ({
	userSelect: "none",
  backgroundColor: "rgba(247, 66, 117, 0.8)",
  boxShadow: isDragging ? '0px 0px 9px rgba(0,0,0,0.4)' : 'none',
  height: '2rem',
  borderRadius: themes.standardRadius,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'borderBox',
  transform: isDragging ? 'rotate(20deg)' : 'rotate(0deg)',
  ...draggableStyle
});

const containerStyle = (isDraggingOver) => ({
	background: 'rgba(255,255,255, 0.2)',
	boxShadow: isDraggingOver ? 'inset 0px 0px 4px rgba(107, 190, 255)' : 'none',
	display: 'grid',
	borderRadius: themes.standardRadius,
	padding: themes.standardSpace,
	gridTemplateColumns: '1fr',
	gridGap: themes.standardSpace,
	alignContent: 'start',
	overflowY: 'auto',
	height: '90%',
	overflowY: 'auto',
	boxSizing: 'borderBox',
});

const MidSection = () => {
	const context = useContext(FmbContext);

	const onDragEnd = (result) => {
		if (!result.destination) {
      return;
    }
    console.log(result);
    if (result.destination.droppableId === 'selected') {
			context.setSelectedDrinks(result.draggableId);
    }
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div style={style.midSection}>
				<Droppable droppableId="categories">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={containerStyle(snapshot.isDraggingOver)}
            >
              {context.categories.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={itemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div>
	        <Droppable droppableId="selected">
	        	{(provided, snapshot) => (
	            <div
	              {...provided.droppableProps}
	              ref={provided.innerRef}
	              style={containerStyle(snapshot.isDraggingOver)}
	            >
	              {context.selectedDrinks.map((drink, index) => (
	                <div key={index}>
	                	{ drink }
	                </div>
	              ))}
	              {provided.placeholder}
	            </div>
	          )}
	        </Droppable>
	      </div>
			</div>
		</DragDropContext>
	);
}

export default MidSection;