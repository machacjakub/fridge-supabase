import type { NextApiRequest, NextApiResponse } from 'next';
import {getDatabaseOperations} from "@/backend/database/database";

const database = getDatabaseOperations();
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
		console.log( '--- PUT item ' + id );
		await database.updateItem( body );
		const newItems = await database.getItems();
		res.send( newItems );
		// TODO handle errors and check for existing id
		//res.status( 404 ).send( 'Error - item not updated' );
		break;
	// case 'DELETE':
	// 	console.log( '--- DELETE item ' + id );
	// 	const idxToDelete = getIndexById( itemId, items );
	// 	if ( idxToDelete !== -1 ) {
	// 		items.splice( idxToDelete, 1 );
	// 		res.status( 204 ).send( 'newItems' );
	// 	} else {
	// 		res.status( 404 ).send( 'Error - item not deleted' );
	// 	}
	// 	break;
	default:
		res.setHeader( 'Allow', ['GET', 'PUT'] );
		res.status( 405 ).end( `Method ${method} Not Allowed` );
	}
}