import {getLogger} from "@/utils/logger";

const config = {
	pages: {
		toBuy: {
			title: 'To buy',
			color: '#77CC88',
			color1: '#77CC88',
		},
		inFridge: {
			title: 'Fridge',
			color: '#77AAEE',
			color1: '#A4BFF7',
		},
		deleted: {
			title: 'Deleted',
			color: '#EE7766',
			color1: '#EE7766',
		},
		default: {
			title: '',
			color: 'white',
			color1: 'white'
		}
	},
	logger: () => getLogger( 'web' ),
};

export const getConfig = () => ( config );

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