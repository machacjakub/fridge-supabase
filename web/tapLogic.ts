import {IItem} from "@/web/types";
import {returnNext, returnPrev} from "@/web/utils";

// type TAddItem = ( item: IItemToAdd ) => void;
// type TChangeItem = ( item: IItem ) => void;
export const getItemsOperations = (	addItem: any, changeItem: any ): any => {
	return {
		tap: async ( {...item}: IItem ) => {
			if ( item.count === 1 ) {
				item.state = returnNext( item.state );
				changeItem( item );
			} else if ( item.state === 'toBuy' ) {
				item.state = 'inFridge';
				changeItem( item );
			} else {
				const {id, name, expire, category, state}: IItem = {...item};
				const newState = returnNext( state );
				await addItem( {name, expire, count: 1, category, state: newState} );
				await changeItem( {id, name, expire, count: ( item.count -1 ), category, state } );
			}
		},
		doubleTap: async ( {...item }: IItem ) => {
			item.state = returnPrev( item.state );
			changeItem( item );
		},
	};
};