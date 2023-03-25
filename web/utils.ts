import {TItems} from "@/backend/types";
import {expireStringToDate} from "@/backend/utils";
import {TState} from "@/web/types";


export const belongsToPage = ( itemState: string, page: string ) :boolean => itemState === page || ( itemState === 'open' && page === 'inFridge' );

export const toDate = ( str: string ) => {
	return new Date( str );
};

type TDeletedAt = string | null | undefined

const ascSort = ( a: TDeletedAt, b: TDeletedAt ) => expireStringToDate( a ?? '2000-11-11' ) > expireStringToDate( b ?? '2000-11-11' ) ? 1 : -1;

export const sortByExpire = ( items: TItems ): TItems => [...items].sort( ( a, b ) => ascSort( a.expire, b.expire ) );
export const sortByDeleted = ( items: TItems ): TItems => [...items].sort( ( a, b ) => ascSort( a.deletedAt, b.deletedAt ) );
export const sortForPage = ( page: TState, items:TItems ) => {
	if ( page === 'deleted' ) {
		return sortByDeleted( items );
	}
	const itemsSorted = sortByExpire( items );
	return [...itemsSorted.filter( ( item ) => item.state === 'open' ), ...itemsSorted.filter( ( item ) => item.state !== 'open' )];
};

export const getNewItemsFromPayload = ( items: TItems, payload: {new: any, old: {id: number}} ) => {
	if ( JSON.stringify( payload.new ) === '{}' ) {
		return [ ...items.filter( ( item ) => payload.old.id !== item.id )];
	}
	return [...items, payload.new];
};

/*
export const joinDuplicates = ([...items]: TItems) => {
    if()
}
*/