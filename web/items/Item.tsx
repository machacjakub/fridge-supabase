/* eslint-disable unused-imports/no-unused-vars */
import { useState } from "react";
import { IItem } from "@/web/types";
import {Button, Col, Row} from "antd";
import {getCategoryConfig} from "@/web/items/categoryConfig";
import {CaretUpOutlined} from "@ant-design/icons";

interface IProps {
    item: IItem;
    handleTap: ( item: IItem ) => void;
    handleDoubleTap: ( item: IItem ) => void;
	handleEdit: ( item: IItem ) => void;
	handleDelete: ( id: number ) => void;
}

const category = getCategoryConfig();

export const Item = ( {item, handleTap, handleDoubleTap, handleEdit, handleDelete}: IProps ) => {
	// const [color, setColor] = useState( '#E8E8E8' );
	const [stav, setStav] = useState( '-' );
	const [isEditing, setEditing] = useState( false );
	const longTouch = 300;
	let touchTimeout:any;
	let holdTimeout;

	let taped = true;
	let hold = false;

	const onEdit = ( item: IItem ) => {
		handleEdit( item );
		setEditing( false );
	};

	function eHold() {
		setEditing( true );
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
			onTouchStart={isEditing ? () => {} : hTouchS}
			onTouchEnd={isEditing ? () => {} : hTouchEnd}
			onTouchMove={isEditing ? () => {} : hTouchMove}
		>
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
			{isEditing &&
			<Row style={{marginTop: '16px'}}>
				<Col span={1}/>
				<Col span={4} style={{}}>
					<Button type='primary' onClick={() => onEdit( item )} >Edit</Button>
				</Col>
				<Col span={13} style={{textAlign: 'center'}} onClick={() => setEditing( false )}><CaretUpOutlined style={{fontSize: '30px', position: 'relative', top: '10px'}} /></Col>
				<Col span={6} style={{}}>
					<Button type='primary' danger onClick={() => handleDelete( item.id )}>Delete</Button>
				</Col>
				<Col span={1}/>
			</Row>}
		</div>

	);
};

// {item.name} - {item.expire} - ({item.count}) -{' '}
// {item.category} - {item.state}