import {getDatabaseOperations} from "@/backend/database/database";



const database = getDatabaseOperations();

export const getItemsQuery = async () => {
	return await database.getItems();
};