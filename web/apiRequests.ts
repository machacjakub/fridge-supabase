import {IItem, IItemToAdd} from "./types";
import {getConfig} from "@/web/config";
// @ts-ignore
const config = getConfig();
const getFunctionLog = config.logger();

export const getItemsRequest = async () => {
	const log = getFunctionLog( 'getItemsRequest' );
	const response = await fetch( '/api/items', {
		method: 'GET',
	} );
	log.info( 'Getting items succeeded' );
	return await response.json();
};
export const addItemRequest = async ( {name, expire, count, category, state}:IItemToAdd ) => {
	const log = getFunctionLog( 'addItemRequest' );
	try {
		const response = await fetch( '/api/items', {
			method: 'POST',
			body: JSON.stringify(
				{
					name: name,
					expire: expire,
					count: count,
					category: category,
					state: state
					//TODO - aby slo pridat jen na listy toBuy a inFridge
				}
			),
			headers: {
				'Content-Type': 'application/json'
			}
		} );
		log.info( 'Adding item succeeded' );
		return await response.json();
	} catch ( error ) {
		log.error( 'Failed to add item' );
		return error;
	}
};


export const changeItemRequest = async ( item: IItem ) => {
	const log = getFunctionLog( 'changeItemRequest' );
	const response = await fetch( `/api/items/${item.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify( item )
	} );
	log.info( 'Changing item succeeded' );
	return await response.json();
};

export const tapItemEvent = async ( item: IItem ) => {
	const log = getFunctionLog( 'tapItemEvent' );
	const response = await fetch( `/api/items/events/tap/${item.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify( item )
	} );
	log.info( 'Single tap on item completed successfully' );
	return await response.json();
};

export const doubleTapItemEvent = async ( item: IItem ) => {
	const log = getFunctionLog( 'doubleTapItemRequest' );
	const response = await fetch( `/api/items/events/double/${item.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify( item )
	} );
	log.info( 'Double tap on item completed successfully' );
	return await response.json();
};