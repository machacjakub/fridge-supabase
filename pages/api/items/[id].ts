import type { NextApiRequest, NextApiResponse } from 'next';
import {updateItemMutation} from "@/backend/items/updateItem";
import {deleteItemMutation} from "@/backend/items/deleteItem";

export default async function userHandler( req: NextApiRequest, res: NextApiResponse ) {
	const {
		query: { id },
		body,
		method,
	} = req;

	switch ( method ) {
	// case 'GET':
	// 	console.log( '--- GET item ' + id );
	// 	const foundItem = getItemById( itemId, readData() );
	// 	if ( foundItem ) {
	// 		res.send( foundItem );
	// 	} else {
	// 		res.status( 404 ).send( 'Error - item does not exist' );
	// 	}
	// 	break;
	case 'PUT':
		res.send( await updateItemMutation( body ) );
		// TODO handle errors and check for existing id
		//res.status( 404 ).send( 'Error - item not updated' );
		break;
	case 'DELETE':
		if ( id ){
			res.status( 200 ).send( await deleteItemMutation( Number( id ) ) );
			break;
		}
		res.status( 404 ).send( 'Error - item not deleted' );
		break;
	default:
		res.setHeader( 'Allow', ['GET', 'PUT'] );
		res.status( 405 ).end( `Method ${method} Not Allowed` );
	}
}