import {getDatabaseOperations} from "@/backend/database/database";

const database = getDatabaseOperations();

export const deleteItemMutation = ( itemId: number ) => {
	return database.deleteItem( itemId );
};