/* eslint-disable unused-imports/no-unused-vars */
import * as React from 'react';
import ChangeListButton from './ChangeListButton';
import {OpenFormButton} from "@/web/layout/bottom-bar/OpenFormButton";

interface IProps {
    handlePageChange: ( x: number ) => void;
    handleFormOpen: () => void;
	currentPage: number;
}

const BottomBar = ( {handlePageChange, handleFormOpen, currentPage} :IProps ) => {
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
			<ChangeListButton currentPage={currentPage} handlePageChange={handlePageChange} direction={-1}/>
			<OpenFormButton handleClick={handleFormOpen} />
			<ChangeListButton currentPage={currentPage} handlePageChange={handlePageChange} direction={1}/>
		</div>
	);
};

export default BottomBar;
