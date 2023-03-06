import { supabase } from "./supabaseClient";
import { applyModuleName } from "@/backend/utils/logger";
import {IItem, IItemToAdd} from "@/pages/types";

const operations = {
	getItems: async () => {
		const log = applyModuleName( 'database.getItems' );
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
		const log = applyModuleName( 'database.addItem' );
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
		const log = applyModuleName( 'database.updateItem' );
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