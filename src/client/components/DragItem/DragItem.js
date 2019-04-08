import React, {useState, useEffect, useContext} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { themes } from '../../themes/Themes';

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
  ...draggableStyle
});

const DragItem = ({item, index, label}) => {
	return (
		<Draggable draggableId={item} index={index}>
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
		      {label}
		    </div>
		  )}
		</Draggable>
	);
}

export default DragItem;