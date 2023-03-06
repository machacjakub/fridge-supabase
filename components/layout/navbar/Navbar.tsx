/* eslint-disable no-restricted-imports */
import { MenuOutlined } from '@ant-design/icons';

export const Navbar = ( {page}:any ) => {
	const today = new Date();
	const day = today.getDate();
	const month = today.getMonth() + 1;
	const year = today.getFullYear();
	return (
		<table style={{ width: '100%' }}>
			<tbody>
				<tr>
					<td style={{ width: '25%', textAlign: 'center' }}>
						<MenuOutlined />
					</td>
					<td style={{ width: '50%', textAlign: 'center' }}>
						<h1>
							{page}
						</h1>
					</td>
					<td style={{ width: '25%', textAlign: 'center' }}>
						{day}.{month}.{year}
					</td>
				</tr>
			</tbody>
		</table>
	);
};