import { supabase } from "./supabaseClient";
import { getLogger } from "@/utils/logger";
import {IItem, IItemToAdd} from "@/web/types";

const getFunctionLog = getLogger( 'database' );

const operations = {
	getItems: async () => {
		const log = getFunctionLog( 'getItems' );
		try {
			const { data, error }: any = await supabase
				.from( 'items' )
				.select( '*' );
			if ( error ) {
				throw error;
			}
			if ( data ) {
				log.info( 'Getting items form database succeeded' );
				return data;
			}
		} catch ( error ) {
			log.error( 'Failed to get items' );
			return error;
		}
	},
	addItem: async ( item: IItemToAdd ) => {
		const log = getFunctionLog( 'addItem' );
		try {
			const { data, error }: any = await supabase
				.from( 'items' )
				.insert( item )
				.single();
			if ( error ) {
				throw error;
			}
			if ( data ) {
				log.info( 'Adding item to database succeeded' );
				return data;
			}
		} catch ( error ) {
			log.error( 'Failed to add item' );
			return error;
		}
	},
	updateItem: async ( item: IItem ) => {
		const log = getFunctionLog( 'updateItem' );
		try {
			const {data, error}: any = await supabase
				.from( 'items' )
				.update( item )
				.eq( 'id', item.id );
			if ( error ) {
				throw error;
			}
			if ( data ) {
				log.info( 'Updating item to database succeeded' );
				return data;
			}
		} catch ( error ) {
			log.error( 'Failed to update item' );
			return error;
		}
	}
};

export const getDatabaseOperations = () => {
	return operations;
};