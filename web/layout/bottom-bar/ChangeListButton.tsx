/* eslint-disable unused-imports/no-unused-vars */
import * as React from 'react';
import {getPageConfig} from "@/web/config";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

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
			color: pageConfig.color,
			width: '20%',
			fontSize: '30px',
			padding: '5px',
			textAlign: 'center',
			marginTop: '8px',
		}} onTouchStart={handleClick} >
			{direction > 0 ? <RightOutlined/> : <LeftOutlined/>}
		</div>
	);
};

export default ChangeListButton;
