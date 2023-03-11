import type { NextApiRequest, NextApiResponse } from 'next';
import {updateItemMutation} from "@/backend/items/updateItem";
import {getItemsQuery} from "@/backend/items/getItems";
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
		await updateItemMutation( body );
		res.send( await getItemsQuery() );
		// TODO handle errors and check for existing id
		//res.status( 404 ).send( 'Error - item not updated' );
		break;
	case 'DELETE':
		if ( id ){
			await deleteItemMutation( Number( id ) );
			res.status( 204 ).send( await getItemsQuery() );
		}
		res.status( 404 ).send( 'Error - item not deleted' );
		break;
	default:
		res.setHeader( 'Allow', ['GET', 'PUT'] );
		res.status( 405 ).end( `Method ${method} Not Allowed` );
	}
}