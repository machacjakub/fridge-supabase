

export const belongsToPage = ( itemState: string, page: string ) :boolean => itemState === page || ( itemState === 'open' && page === 'inFridge' );

export const toDate = ( str: string ) => {
	return new Date( str );
};

/*
export const joinDuplicates = ([...items]: TItems) => {
    if()
}
*/