import {IItem} from "@/backend/types";
import {updateItemMutation} from "@/backend/items/updateItem";
import {getItemsQuery} from "@/backend/items/getItems";
import {returnPrev} from "@/backend/utils";

export const doubleTapItemMutation = async ( item: IItem ) => {
	await updateItemMutation( { ...item, state: returnPrev( item.state )} );
	return getItemsQuery();
};