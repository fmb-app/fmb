import React, {useState, useEffect, useContext} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FmbContext from '../../context/FmbContext';
import RegularInputField from '../InputFields/RegularInputField';
import RegularButton from '../Buttons/RegularButton';
import DragItem from '../DragItem/DragItem';
import { themes } from '../../themes/Themes';

const style = {
	midSection: {
		width: '80%',
		height: '70%',
		marginTop: '7rem',
		textAlign: 'left',
		padding: themes.mediumSpace,
		backgroundColor: 'rgba(0,0,0, 0.5)',
		borderRadius: themes.standardRadius,
		boxSizing: 'border-box',
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gridColumnGap: themes.standardSpace,
		overflowY: 'auto',
	},
	instruction: {
		textAlign: 'center',
		color: themes.standardTextColor,
	},
	leftSidePanel: {
		display: 'grid',
		gridRowGap: themes.standardSpace,
		gridTemplateRows: '1fr 1fr',
		boxSizing: 'border-box',
		maxHeigth: '100%',
	},
	results: {
		padding: themes.standardSpace,
		borderRadius: themes.standardRadius,
		background: 'rgba(255,255,255, 0.2)',
		display: 'grid',
		gridTemplateColumns: '1fr',
		gridRowGap: themes.standardSpace,
		alignContent: 'start',
		boxSizing: 'border-box',
		height: '100%',
		overflowY: 'auto',
	},
	selectedDrink: {
		borderRadius: themes.standardRadius,
		backgroundColor: 'yellow',
		height: '2rem',
	}
}

const itemContainerStyle = (isDraggingOver) => ({
	background: 'rgba(255,255,255, 0.2)',
	boxShadow: isDraggingOver ? 'inset 0px 0px 4px rgba(107, 190, 255)' : 'none',
	display: 'grid',
	borderRadius: themes.standardRadius,
	padding: themes.standardSpace,
	gridTemplateColumns: '1fr',
	gridGap: themes.standardSpace,
	alignContent: 'start',
	overflowY: 'auto',
	height: '100%',
	overflowY: 'auto',
	boxSizing: 'border-box',
});

const dropContainerStyle = (isDraggingOver) => ({
	background: 'rgba(255,255,255, 0.2)',
	boxShadow: isDraggingOver ? 'inset 0px 0px 4px rgba(107, 190, 255)' : 'none',
	display: 'grid',
	borderRadius: themes.standardRadius,
	padding: themes.standardSpace,
	alignContent: 'start',
	overflowY: 'auto',
	overflowY: 'auto',
	boxSizing: 'border-box',
});

const MidSection = () => {
	const context = useContext(FmbContext);

	const CATEGORY = 'CATEGORY';
	const PRODUCT  = 'PRODUCT';

	const [selectMode, setSelectMode] = useState(CATEGORY);

	const onDragEnd = (result) => {
		if (result.destination.droppableId !== 'dropContainer') {
      return;
    }

    switch (selectMode) {
    	case CATEGORY:
    		getProducts(result.draggableId).then((data) => {
      		context.setProducts(data);
    			setSelectMode(PRODUCT);
    		})
    		break;
    	case PRODUCT:
    		const drink = context.products.filter((product) => product._id === result.draggableId);
				context.setSelectedDrinks(drink[0]);
    		setSelectMode(CATEGORY);
    		break;
    }
	}

	const renderCategories = () => {
		return (
			context.categories.map((item, index) => (
	    	<div key={index}>
	      	<DragItem item={item} index={index} label={item} />
	      </div>
	    ))
    );
	}

	const renderProducts = () => {
		return (
			context.products.map((item, index) => (
				<div key={item._id}>
					<DragItem item={item._id} index={index} label={item.name1} />
				</div>
			))
		);
	}

	/*
	 * Fetch all products within the given category
	 */
	const getProducts = (category) => {
		return (
		fetch('/api/products/' + category, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      }).then((res) => res.json())
		)
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div style={style.midSection}>
				<Droppable droppableId="categories">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={itemContainerStyle(snapshot.isDraggingOver)}
            >
              {selectMode === CATEGORY && renderCategories()}
              {selectMode === PRODUCT && renderProducts()}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div style ={style.leftSidePanel}>
	        <Droppable droppableId="dropContainer">
	        	{(provided, snapshot) => (
	            <div
	              {...provided.droppableProps}
	              ref={provided.innerRef}
	              style={dropContainerStyle(snapshot.isDraggingOver)}
	            >
	            	<h2 style={style.instruction}>
	            		{selectMode === CATEGORY ? 'Dra en kategori hit' : 'Dra en produkt hit'}
	            	</h2>
	              {provided.placeholder}
	            </div>
	          )}
	        </Droppable>
	        <div style={style.results}>
	        	{context.selectedDrinks.map((drink) => (
	        		<div style={style.selectedDrink}>
	        			{drink.name1}
	        		</div>
	        	))}
	        </div>
	      </div>
			</div>
		</DragDropContext>
	);
}

export default MidSection;

