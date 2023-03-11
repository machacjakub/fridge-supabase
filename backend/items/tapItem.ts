import {IItem} from "@/backend/types";
import {returnNext} from "@/backend/utils";
import {updateItemMutation} from "@/backend/items/updateItem";
import {getItemsQuery} from "@/backend/items/getItems";
import {addItemMutation} from "@/backend/items/addItem";

export const tapItemMutation = async ( item: IItem ) => {
	if ( item.count === 1 ) {
		await updateItemMutation( { ...item, state: returnNext( item.state )} );
		return await getItemsQuery();
	} else if ( item.state === 'toBuy' ) {
		await updateItemMutation( { ...item, state: 'inFridge'} );
		return await getItemsQuery();
	} else {
		const {id, name, expire, category, state}: IItem = {...item};
		await addItemMutation( {name, expire, count: 1, category, state: returnNext( state )} );
		await updateItemMutation( {id, name, expire, count: ( item.count -1 ), category, state } );
		return await getItemsQuery();
	}
};