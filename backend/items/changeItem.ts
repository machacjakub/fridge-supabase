import {getDatabaseOperations} from "@/backend/database/database";

const database = getDatabaseOperations();

export const changeItemMutation = () => {
	return database.getItems();
};