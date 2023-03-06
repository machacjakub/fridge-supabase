import {getDatabaseOperations} from "@/backend/database/database";

const database = getDatabaseOperations();

export const getItemsQuery = () => {
	return database.getItems();
};