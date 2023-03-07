// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {getDatabaseOperations} from "@/backend/database/database";
import {IItem, TItems} from "@/web/types";

type Data = TItems|IItem|string

const database = getDatabaseOperations();

export default async function hanlder (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const {
		method,
		body,
	} = req;

	switch ( method ) {
	case 'GET':
		const data = await database.getItems();
		res.status( 200 ).json( data );
		break;
	case 'POST':
		await database.addItem( body );
		const newData = await database.getItems();
		res.status( 200 ).json( newData );
		break;
	default:
		res.setHeader( 'Allow', ['GET', 'PUT'] );
		res.status( 405 ).end( `Method ${method} Not Allowed` );
	}
};
