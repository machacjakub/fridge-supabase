import {Nullable} from "fputils";
import { TItems} from "@/backend/types";
import {TState} from "@/web/types";

export const expireStringToDate = ( date: string ) => {
	const dates = date.split( '-' );
	return new Date( Number( dates[0] ), Number( dates[1] ), Number( dates[2] ) );
};

const ascSort = ( a: Nullable<string>, b: Nullable<string> ) => expireStringToDate( a ?? '2000-11-11' ) > expireStringToDate( b ?? '2000-11-11' ) ? 1 : -1;

export const sortByExpire = ( items: TItems ) => [...items].sort( ( a, b ) => ascSort( a.expire, b.expire ) );

export const returnNext = ( state: TState ) :TState => {
	switch ( state ){
	case 'toBuy':
		return 'inFridge';
	case 'inFridge':
		return 'open';
	default:
		return 'deleted';
	}
};
export const returnPrev = ( state: TState ) :TState => {
	switch ( state ){
	case 'open':
		return 'inFridge';
	case 'deleted':
		return 'open';
	default:
		return 'toBuy';
	}
};
/*
const areSameItems = ( item1: IItem, item2: IItem ) => {
	return item1.expire === item2.expire && item1.state === item2.state && item1.name === item2.name && item1.category === item2.category && item1.id !== item2.id;

};
export const mergeEqualItems = ( items: IItem[] ) => {
  
};


 */