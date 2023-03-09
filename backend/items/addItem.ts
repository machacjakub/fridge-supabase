import {getDatabaseOperations} from "@/backend/database/database";

const database = getDatabaseOperations();

export const addItemMutation = () => {
	return database.getItems();
};