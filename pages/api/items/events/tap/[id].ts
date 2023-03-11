import type { NextApiRequest, NextApiResponse } from 'next';
import {tapItemMutation} from "@/backend/items/tapItem";

export default async function userHandler( req: NextApiRequest, res: NextApiResponse ) {
	const {
		body,
		method,
	} = req;

	switch ( method ) {
	case 'PUT':
		res.send( await tapItemMutation( body ) );
		// TODO handle errors and check for existing id
		//res.status( 404 ).send( 'Error - item not updated' );
		break;
	default:
		res.setHeader( 'Allow', ['GET', 'PUT'] );
		res.status( 405 ).end( `Method ${method} Not Allowed` );
	}
}