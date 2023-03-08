/* eslint-disable unused-imports/no-unused-vars */
import * as React from 'react';
import {getPageConfig} from "@/web/config";

interface IProps {
    handlePageChange: ( x: number ) => void;
    direction: number;
	currentPage: number;
}

const ChangeListButton = ( {handlePageChange, direction, currentPage}: IProps ) => {
	const handleClick = () => {
		console.log( 'change ' + direction );
		handlePageChange( direction );
	};

	const pageConfig: {title: string, color: string} = getPageConfig( direction+currentPage );

	return (
		<div style={{
			backgroundColor: pageConfig.color,
			width: '55px',
			height: '17px',
			padding: '6px',
			borderRadius: '14px',
			textAlign: 'center',
			marginTop: '12px',
		}} onTouchStart={handleClick} >
			<p style={{ fontSize: '14px', margin: '0' }}>
				{pageConfig.title}
			</p>
		</div>
	);
};

export default ChangeListButton;
