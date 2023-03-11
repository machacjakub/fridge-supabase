import {getDatabaseOperations} from "@/backend/database/database";
import {IItemToAdd} from "@/backend/types";

const database = getDatabaseOperations();

export const addItemMutation = ( item: IItemToAdd ) => {
	return database.addItem( item );
};