import {TState} from "@/web/types";
// import {IItem} from "@/backend/types";

export const expireStringToDate = ( date: string ) => {
	const dates = date.split( '-' );
	return new Date( Number( dates[0] ), Number( dates[1] ), Number( dates[2] ) );
};

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

// const areSameItems = ( item1: IItem, item2: IItem ) => {
// 	return item1.expire === item2.expire && item1.state === item2.state && item1.name === item2.name && item1.category === item2.category;
// };
//
// const areThereDuplicates = ( i ) => {
//
// };
// export const mergeEqualItems = ( items: IItem[] ) => {
//
// };