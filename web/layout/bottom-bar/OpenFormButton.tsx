/* eslint-disable no-restricted-imports */
import { PlusOutlined } from '@ant-design/icons';
import * as React from 'react';

interface IProps {
    handleClick: () => void;
}

export const OpenFormButton = ( {handleClick}:IProps ) => {
	return (
		<div style={{
			color: 'gray',
			textAlign: 'center',
			marginTop: '12px'
		}} onClick={handleClick}>
			<p style={{ marginTop: '0', fontSize: '30px'}}>
				<PlusOutlined />
			</p>
		</div>
	);
};