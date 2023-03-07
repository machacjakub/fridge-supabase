import {Navbar} from "@/web/layout/navbar/Navbar";
import React, {useEffect, useState} from "react";
import {IItem, IItemToAdd, TItems, TState} from "@/web/types";
import {ItemsList} from "@/web/items/ItemsList";
import BottomBar from "@/web/layout/bottom-bar/BottomBar";
import {getItemsOperations} from "@/web/tapLogic";
import {addItemRequest, changeItemRequest, getItemsRequest} from "@/web/apiRequests";

// eslint-disable-next-line react/display-name
export const HomePage = ( ) => {
	console.log( 'rendering homepage' );
	const [items, setItems] = useState<TItems|null>( null );
	const [page, setPage] = useState<number>( 1 );
	const [loading, setLoading] = useState( true );
	const pages: TState[] = ['toBuy', 'inFridge', 'deleted'];
	//const [formIsDisplayed, setFormDisplayed] = useState<boolean>( false );
	useEffect( () => {
		const fetchItems = async () => {
			const data = await getItemsRequest();
			setItems( data );
			setLoading( false );
		};
		fetchItems();
	}, [] );

	const addItem = async ( item: IItemToAdd ) => {
		await addItemRequest( item );
		const data = await getItemsRequest();
		setItems( data );
	};

	const changeItem = async ( item: IItem ) => {
		await changeItemRequest( item );
		const data = await getItemsRequest();
		setItems( data );
	};

	const handlePageChange = ( increment: number ) => {
		if ( page + increment > 2 || page + increment < 0 ) return;
		setPage( page+increment );
	};

	const tapHandlers = getItemsOperations( addItem, changeItem );

	if ( loading || !items || items.length === 0 ){
		return <div>Loading...</div>;
	}
	return ( <>
		<Navbar page={pages[page]}/>
		<ItemsList items={items.filter( ( item ) => item.state === pages[page] || ( item.state === 'open' && pages[page] === 'inFridge' ) )} handleItemTap={tapHandlers.tap} handleItemDoubleTap={tapHandlers.doubleTap}/>
		<BottomBar handlePageChange={handlePageChange} handleFormOpen={() => {}} />
	</>
	);
};