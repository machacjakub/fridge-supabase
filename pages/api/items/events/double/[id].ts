import type { NextApiRequest, NextApiResponse } from 'next';
import {getItemsQuery} from "@/backend/items/getItems";
import {doubleTapItemMutation} from "@/backend/items/doubleTapItem";

export default async function userHandler( req: NextApiRequest, res: NextApiResponse ) {
	const {
		body,
		method,
	} = req;

	switch ( method ) {
	case 'PUT':
		await doubleTapItemMutation( body );
		res.send( await getItemsQuery() );
		// TODO handle errors and check for existing id
		//res.status( 404 ).send( 'Error - item not updated' );
		break;
	default:
		res.setHeader( 'Allow', ['GET', 'PUT'] );
		res.status( 405 ).end( `Method ${method} Not Allowed` );
	}
}