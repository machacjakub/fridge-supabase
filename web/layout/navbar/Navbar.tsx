/* eslint-disable no-restricted-imports */
import { MenuOutlined } from '@ant-design/icons';
import {getPageConfig} from "@/web/config";
import {Typography, Row, Col} from 'antd';

const { Title, Text} = Typography;

export const Navbar = ( {page}:any ) => {
	const today = new Date();
	const day = today.getDate();
	const month = today.getMonth() + 1;
	const year = today.getFullYear();
	const pageConfig = getPageConfig( page );
	return (
		<Row>
			<Col span={6} style={{ textAlign: 'center', padding: '25px 0' }}>
				<MenuOutlined style={{fontSize: '18px'}} />
			</Col>
			<Col span={12} style={{ textAlign: 'center' }}>
				<Title style={{margin: '12px 0'}}>
					{pageConfig.title}
				</Title>
			</Col>
			<Col span={6} style={{ textAlign: 'center', padding: '25px 0' }}>
				<Text style={{fontSize: '16px'}}>{day}.{month}.{year}</Text>
			</Col>
		</Row>
	);
};