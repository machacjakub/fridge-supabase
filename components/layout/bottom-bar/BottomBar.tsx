/* eslint-disable unused-imports/no-unused-vars */
import * as React from 'react';
import AddItemButton from './AddItemButton';
import ChangeListButton from './ChangeListButton';

interface IProps {
    handlePageChange: ( x: number ) => void;
    handleFormOpen: () => void;
}

const BottomBar = ( {handlePageChange, handleFormOpen} :IProps ) => {
	return (
		<div style={{
			display: "flex",
			justifyContent: 'space-around',
			position: 'fixed',
			bottom: '0',
			left: '0',
			width: '100%',
			height: '50px',
			backgroundColor: 'white',
		}}>
			<ChangeListButton handlePageChange={handlePageChange} direction={-1}/>
			<AddItemButton handleClick={handleFormOpen} />
			<ChangeListButton handlePageChange={handlePageChange} direction={1}/>
		</div>
	);
};

export default BottomBar;
