import { supabase } from "./supabaseClient";
import { getLogger } from "@/utils/logger";
import {IItem, IItemToAdd} from "@/web/types";

const getFunctionLog = getLogger( 'database' );

const operations = {
	getItems: async () => {
		const log = getFunctionLog( 'getItems' );
		const { data, error }: any = await supabase
			.from( 'items' )
			.select( '*' );
		if ( error ) {
			log.error( 'Failed to get items' );
			return error;
		}
		log.info( 'Getting items form database succeeded' );
		return data;
	},
	addItem: async ( item: IItemToAdd ) => {
		const log = getFunctionLog( 'addItem' );

		const { data, error }: any = await supabase
			.from( 'items' )
			.insert( item )
			.single();
		if ( error ) {
			log.error( 'Failed to add item' );
			return error;
		}
		log.info( 'Adding item to database' );
		return data;
	},
	updateItem: async ( item: IItem ) => {
		const log = getFunctionLog( 'updateItem' );

		const {data, error}: any = await supabase
			.from( 'items' )
			.update( item )
			.eq( 'id', item.id );
		if ( error ) {
			log.error( 'Failed to update item' );
			return error;
		}
		log.info( 'Updating item to database succeeded' );
		return data;
	},
	deleteItem: async ( itemId: number ) => {
		const log = getFunctionLog( 'deleteItem' );

		const {data, error}: any = await supabase
			.from( 'items' )
			.delete()
			.eq( 'id', itemId );
		if ( error ) {
			log.error( 'Failed to delete item' );
			return error;
		}
		log.info( 'Deleting item from database succeeded' );
		return data;
	}
};

export const getDatabaseOperations = () => {
	return operations;
};