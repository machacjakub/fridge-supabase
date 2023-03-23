/* eslint-disable unused-imports/no-unused-vars */
import * as React from 'react';
import {getPageConfig} from "@/web/config";
import {Typography} from 'antd';

const {Text} = Typography;

interface IProps {
    handlePageChange: ( x: number ) => void;
    direction: number;
	currentPage: number;
}

const ChangeListButton = ( {handlePageChange, direction, currentPage}: IProps ) => {
	const handleClick = () => {
		handlePageChange( direction );
	};

	const pageConfig: {title: string, color: string} = getPageConfig( direction+currentPage );

	return (
		<div style={{
			backgroundColor: pageConfig.color,
			width: '55px',
			height: '19px',
			padding: '5px',
			borderRadius: '14px',
			textAlign: 'center',
			marginTop: '12px',
		}} onTouchStart={handleClick} >
			{/* eslint-disable-next-line react/jsx-no-undef */}
			<Text style={{ fontSize: '12px', margin: '0' }}>
				{pageConfig.title}
			</Text>
		</div>
	);
};

export default ChangeListButton;
