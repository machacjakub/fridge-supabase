import {IItem, IItemToAdd} from "./types";


export const getItemsRequest = async () => {
	const response = await fetch( '/api/items', {
		method: 'GET',
	} );
	return await response.json();
};
export const addItemRequest = async ( {name, expire, count, category, state}:IItemToAdd ) => {
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
		return await response.json();
	} catch ( error ) {
		console.error( error );
		return error;
	}
};


export const changeItemRequest = async ( item: IItem ) => {
	const response = await fetch( `/api/items/${item.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify( item )
	} );
	return await response.json();
};