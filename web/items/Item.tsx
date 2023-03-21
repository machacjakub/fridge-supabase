/* eslint-disable unused-imports/no-unused-vars */
import { useState } from "react";
import { IItem } from "@/web/types";
import {Col, Row} from "antd";
import {getCategoryConfig} from "@/web/items/categoryConfig";

interface IProps {
    item: IItem;
    handleTap: ( item: IItem ) => void;
    handleDoubleTap: ( item: IItem ) => void;
	handleHold: ( item: IItem ) => void;
}

const category = getCategoryConfig();

export const Item = ( {item, handleTap, handleDoubleTap, handleHold}: IProps ) => {
	// const [color, setColor] = useState( '#E8E8E8' );
	const [stav, setStav] = useState( '-' );
	const longTouch = 300;
	let touchTimeout:any;
	let holdTimeout;

	let taped = true;
	let hold = false;

	function eHold() {
		console.log( 'inside eHold' );
		handleHold( item );
		console.log( 'end of eHold' );
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
				backgroundColor: category[item.category].color,
				padding: '18px 18px 13px 18px',
				margin: '8px 5px',
				borderRadius: '15px',
				fontSize: '18px',
				border:
					item.state == 'open'
						? '3px solid black'
						: `3px solid ${category[item.category].color}`,
			}}
			onTouchStart={hTouchS}
			onTouchEnd={hTouchEnd}
			onTouchMove={hTouchMove}
		>
			{/* eslint-disable-next-line react/jsx-no-undef */}
			<Row>
				<Col span={3} style={{fontSize: '20px'}}>
					{category[item.category].icon}
				</Col>
				<Col span={12} style={{fontSize: '15px'}}>
					{item.name}
				</Col>
				<Col span={8} style={{fontSize: '14px', marginTop: '1px', color: 'rgba(0, 0, 0, 0.4)'}}>
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