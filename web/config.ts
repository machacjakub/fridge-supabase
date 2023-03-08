export const config = {
	pages: {
		toBuy: {
			title: 'To buy',
			color: '#77CC88',
		},
		inFridge: {
			title: 'Fridge',
			color: '#77AAEE'
		},
		deleted: {
			title: 'Deleted',
			color: '#EE7766'
		},
		default: {
			title: '',
			color: 'white'
		}
	}
};

export const getPageConfig = ( index: number ) => {
	switch ( index ) {
	case 0:
		return config.pages.toBuy;
	case 1:
		return config.pages.inFridge;
	case 2:
		return config.pages.deleted;
	default:
		return config.pages.default;
	}
};