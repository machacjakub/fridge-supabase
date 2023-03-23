import {IItem} from "@/backend/types";
import {returnNext} from "@/backend/utils";
import {updateItemMutation} from "@/backend/items/updateItem";
import {addItemMutation} from "@/backend/items/addItem";
import {toDateReadable} from "@/utils/utils";

export const tapItemMutation = async ( item: IItem ) => {
	if ( item.count === 1 ) {
		const newState = returnNext( item.state );
		return await updateItemMutation( { ...item, state: newState, deletedAt: newState === 'deleted' ? toDateReadable( new Date() ) : null} );
	} else if ( item.state === 'toBuy' ) {
		return await updateItemMutation( { ...item, state: 'inFridge'} );
	} else {
		const {id, name, expire, category, state}: IItem = {...item};
		return [
			...await updateItemMutation( {id, name, expire, count: ( item.count -1 ), category, state } ),
			...await addItemMutation( {name, expire, count: 1, category, state: returnNext( state )} )
		];
	}
};