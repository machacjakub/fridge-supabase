// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next';
// import {IItem, TItems} from "@/pages/types";
// import {getDatabaseOperations} from "@/backend/database/database";
//
// type Data = TItems|IItem|string
//
// const database = getDatabaseOperations();
//
// export default async function hanlder (
// 	req: NextApiRequest,
// 	res: NextApiResponse<Data>
// ) {
// 	const {
// 		method,
// 		body,
// 	} = req;
//
// 	switch ( method ) {
// 	case 'GET':
// 		const data = await database.getItems();
// 		res.status( 200 ).json( data );
// 		break;
// 	case 'POST':
// 		const data = await database.addItem( body );
// 		res.status( 200 ).json( data );
// 		break;
// 	default:
// 		res.setHeader( 'Allow', ['GET', 'PUT'] );
// 		res.status( 405 ).end( `Method ${method} Not Allowed` );
// 	}
// };