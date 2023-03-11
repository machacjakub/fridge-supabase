import {getDatabaseOperations} from "@/backend/database/database";
import {IItem} from "@/backend/types";

const database = getDatabaseOperations();

export const updateItemMutation = ( item: IItem ) => {
	return database.updateItem( item );
};