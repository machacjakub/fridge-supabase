import {FaCarrot, FaCheese, FaDice, FaDrumstickBite, FaEgg, FaRegLemon} from "react-icons/fa";

export const getCategoryIcon = ( category: string ) => {
	switch ( category ) {
	case 'fruit':
		return <FaRegLemon/>;
	case 'vegetable':
		return <FaCarrot/>;
	case 'meat':
		return <FaDrumstickBite/>;
	case 'eggs':
		return <FaEgg/>;
	case 'dairy':
		return <FaCheese/>;
	case 'other':
		return <FaDice/>;
	}
};