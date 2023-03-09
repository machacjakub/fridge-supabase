import {getDatabaseOperations} from "@/backend/database/database";

const database = getDatabaseOperations();

export const deleteItemMutation = () => {
	return database.getItems();
};