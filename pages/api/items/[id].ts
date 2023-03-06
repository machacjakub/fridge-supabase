// import type { NextApiRequest, NextApiResponse } from 'next';
// import {getIndexById} from "@/pages/api/items/utils";
// import {getDatabaseOperations} from "@/backend/database/database";
//
// const database = getDatabaseOperations();
// export default async function userHandler( req: NextApiRequest, res: NextApiResponse ) {
// 	const {
// 		query: { id },
// 		method,
// 	} = req;
//
// 	let itemId: number = -1;
//
// 	if ( typeof id === 'string' ){
// 		itemId = Number( id );
// 	}
// 	switch ( method ) {
// 	// case 'GET':
// 	// 	console.log( '--- GET item ' + id );
// 	// 	const foundItem = getItemById( itemId, readData() );
// 	// 	if ( foundItem ) {
// 	// 		res.send( foundItem );
// 	// 	} else {
// 	// 		res.status( 404 ).send( 'Error - item does not exist' );
// 	// 	}
// 	// 	break;
// 	case 'PUT':
// 		console.log( '--- PUT item ' + id );
// 		const indexToUpdate = getIndexById( itemId, readData() );
// 		if ( indexToUpdate !== -1 ) {
// 			console.log( `put - index: ${indexToUpdate}, itemId: ${itemId}, item: ${JSON.stringify( readData()[indexToUpdate] )}` );
// 			console.log( 'rq body ' + JSON.stringify( req.body ) );
// 			const newItems = await updateItem( indexToUpdate, req.body );
// 			res.send( newItems );
// 		} else {
// 			res.status( 404 ).send( 'Error - item not updated' );
// 		}
// 		break;
// 	// case 'DELETE':
// 	// 	console.log( '--- DELETE item ' + id );
// 	// 	const idxToDelete = getIndexById( itemId, items );
// 	// 	if ( idxToDelete !== -1 ) {
// 	// 		items.splice( idxToDelete, 1 );
// 	// 		res.status( 204 ).send( 'newItems' );
// 	// 	} else {
// 	// 		res.status( 404 ).send( 'Error - item not deleted' );
// 	// 	}
// 	// 	break;
// 	default:
// 		res.setHeader( 'Allow', ['GET', 'PUT'] );
// 		res.status( 405 ).end( `Method ${method} Not Allowed` );
// 	}
// }

export {};