import {Nullable} from "fputils";
import {TItems} from "@/backend/types";
import {expireStringToDate} from "@/backend/utils";


export const belongsToPage = ( itemState: string, page: string ) :boolean => itemState === page || ( itemState === 'open' && page === 'inFridge' );

export const toDate = ( str: string ) => {
	return new Date( str );
};

const ascSort = ( a: Nullable<string>, b: Nullable<string> ) => expireStringToDate( a ?? '2000-11-11' ) > expireStringToDate( b ?? '2000-11-11' ) ? 1 : -1;

export const sortByExpire = ( items: TItems ): TItems => [...items].sort( ( a, b ) => ascSort( a.expire, b.expire ) );


/*
export const joinDuplicates = ([...items]: TItems) => {
    if()
}
*/