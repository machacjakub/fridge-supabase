import {getDatabaseOperations} from "@/backend/database/database";
import { TItems} from "@/backend/types";
import { sortByExpire} from "@/backend/utils";
import {pipe} from "fputils";


const database = getDatabaseOperations();

export const getItemsQuery = async () => {
	const items: TItems = await database.getItems();
	return pipe( items, sortByExpire );
};