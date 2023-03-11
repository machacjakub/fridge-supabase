/* eslint-disable unused-imports/no-unused-vars */
import { useState } from "react";
import { IItem } from "@/web/types";
import {Col, Row} from "antd";
import {getCategoryIcon} from "@/web/items/categoryIcons";

interface IProps {
    item: IItem;
    handleTap: ( item: IItem ) => void;
    handleDoubleTap: ( item: IItem ) => void;
	page: number;
}

export const Item = ( {item, handleTap, handleDoubleTap, page}: IProps ) => {
	const [color, setColor] = useState( '#E8E8E8' );
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
				padding: '18px 18px 13px 18px',
				margin: '8px 5px',
				borderRadius: '15px',
				fontSize: '18px',
				border:
					item.state == 'open'
						? '2px solid black'
						: `2px solid ${color}`,
			}}
			onTouchStart={hTouchS}
			onTouchEnd={hTouchEnd}
			onTouchMove={hTouchMove}
		>
			{/* eslint-disable-next-line react/jsx-no-undef */}
			<Row>
				<Col span={3} style={{fontSize: '20px'}}>
					{getCategoryIcon( item.category )}
				</Col>
				<Col span={12} style={{fontSize: '15px'}}>
					{item.name}
				</Col>
				<Col span={8} style={{fontSize: '14px', marginTop: '1px', color: 'gray'}}>
					{item.expire}
				</Col>
				<Col span={1} style={{fontSize: '16px'}}>
					{item.count}
				</Col>
			</Row>
			{/*<span style={{padding: '10px 15px 0 0', fontSize: '22px'}}>{getCategoryIcon( item.category )}</span>*/}
			{/*<span style={{position: 'relative', bottom: '5px'}}>{item.name}</span>*/}
			{/*<span style={{position: 'relative', bottom: '5px', color: 'grey'}}>{item.expire}</span>*/}
			{/*<span style={{position: 'absolute', right: "36px"}}>{item.count}</span>*/}
		</div>
	);
};

// {item.name} - {item.expire} - ({item.count}) -{' '}
// {item.category} - {item.state}