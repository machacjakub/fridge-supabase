import {TState} from "@/components/types";


export const belongsToPage = ( itemState: string, page: string ) :boolean => itemState === page || ( itemState === 'open' && page === 'inFridge' );
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
export const joinDuplicates = ([...items]: TItems) => {
    if()
}
*/