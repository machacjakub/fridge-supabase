/* eslint-disable unused-imports/no-unused-vars */
import * as React from 'react';

interface IProps {
    handlePageChange: ( x: number ) => void;
    direction: number;
}

const ChangeListButton = ( {handlePageChange, direction}: IProps ) => {
	const handleClick = () => {
		console.log( 'change ' + direction );
		handlePageChange( direction );
	};
	// let color: string;
	// switch (index) {
	//   case 0:
	//     color = '#77CC88';
	//     break;
	//   case 1:
	//     color = '#77AAEE';
	//     break;
	//   case 2:
	//     color = '#EE7766';
	//     break;
	//   default:
	//     color = 'white';
	// }
	return (
		<div style={{
			backgroundColor: "lightgrey",
			width: '55px',
			height: '17px',
			padding: '5px',
			borderRadius: '14px',
			textAlign: 'center',
			marginTop: '12px',
		}} onTouchStart={handleClick} >
			<p style={{ fontSize: '14px', margin: '0' }}>page
			</p>
		</div>
	);
};

export default ChangeListButton;
