import {TItems} from "@/web/types";

export const getItemById = ( id: number, itemList: TItems ) => {
	return itemList.find( ( item ) => {
		return item.id === id;
	} );
};

export const getIndexById = ( id: number, itemsList: TItems ): number => {
	return itemsList.findIndex( ( item ) => {
		return item.id === id ;
	} );
};