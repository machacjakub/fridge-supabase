import {FaAppleAlt, FaCarrot, FaCheese, FaDice, FaDrumstickBite, FaEgg} from "react-icons/fa";


const categoryConfig = {
	fruit: {
		icon: <FaAppleAlt/>,
		color: '#ffefb7'
	},
	vegetable: {
		icon: <FaCarrot/>,
		color: '#89bb78'
	},
	meat: {
		icon: <FaDrumstickBite/>,
		color: '#eab0b4'
	},
	egg: {
		icon: <FaEgg/>,
		color: '#d3c7b7'
	},
	dairy: {
		icon: <FaCheese/>,
		color: '#bde7de'
	},
	other: {
		icon: <FaDice/>,
		color: '#d8d9e1'
	},

};
export const getCategoryConfig = ( ) => categoryConfig;