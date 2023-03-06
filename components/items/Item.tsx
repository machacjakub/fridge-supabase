/* eslint-disable unused-imports/no-unused-vars */
import { useState } from "react";
import { IItem } from "@/components/types";

interface IProps {
    item: IItem;
    handleTap: ( item: IItem ) => void;
    handleDoubleTap: ( item: IItem ) => void;
}

export const Item = ( {item, handleTap, handleDoubleTap}: IProps ) => {
	const [color, setColor] = useState( 'lightgrey' );
	//const color = 'grey';
	const [stav, setStav] = useState( '-' );
	const longTouch = 300;
	let touchTimeout:any;
	let holdTimeout;

	let taped = true;
	let hold = false;

	function eHold() {
		setStav( 'hold' );
		setColor( 'grey' );
		setTimeout( () => setColor( 'lightgrey' ), 2000 );
		console.log( 'hold' );
	}

	function eClick() {
		setStav( 'click' );
		handleTap( item );
		console.log( 'click' );
	}

	function eDouble() {
		handleDoubleTap( item );
		console.log( 'd-click' );
	}

	function interval() {
		if ( hold ) {
			eHold();
		} else if ( taped ) {
			eDouble();
		} else {
			eClick();
		}
		taped = true;
		holdTimeout = setTimeout( () => setStav( '-' ), 1500 );
	}

	function hTouchS() {
		hold = true;
		taped = !taped;
		clearTimeout( touchTimeout );
		touchTimeout = setTimeout( interval, longTouch );
	}

	function hTouchEnd() {
		hold = false;
	}

	function hTouchMove() {
		clearTimeout( touchTimeout );
	}

	return (
		<div
			className="item"
			style={{
				backgroundColor: color,
				padding: '18px',
				margin: '8px 5px',
				borderRadius: '15px',
				fontSize: '18px',
				border:
                    item.state == 'open'
                    	? '2px solid black'
                    	: '2px solid lightgrey',
			}}
			onTouchStart={hTouchS}
			onTouchEnd={hTouchEnd}
			onTouchMove={hTouchMove}
		>
			{item.name} - {item.expire} - ({item.count}) -{' '}
			{item.category} - {item.state}
		</div>
	);
};
