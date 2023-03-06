import {IItem, IItemToAdd} from "./types";

export const addItemMutation = async ( {name, expire, count, category, state}:IItemToAdd ) => {
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
		const data = await response.json();
		console.log( 'response recieved, item created and persistent (post)' );
		return data;
	} catch ( error ) {
		console.error( error );
		return error;
	}
};


export const changeItemMutation = async ( item: IItem ) => {
	const response = await fetch( `/api/items/${item.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify( item )
	} );
	return await response.json();
};