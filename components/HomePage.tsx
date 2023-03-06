import {Navbar} from "@/components/layout/navbar/Navbar";
import React, {useEffect, useState} from "react";
import {IItem, IItemToAdd, TItems, TState} from "@/pages/types";
import {ItemsList} from "@/components/items/ItemsList";
import BottomBar from "@/components/layout/bottom-bar/BottomBar";
import {getItemsOperations} from "@/components/tapLogic";
import {getDatabaseOperations} from "@/backend/database/database";

const database = getDatabaseOperations();
// eslint-disable-next-line react/display-name
export const HomePage = ( ) => {
	console.log( 'rendering homepage' );
	const [items, setItems] = useState<TItems|null>( null );
	const [page, setPage] = useState<number>( 1 );
	const [loading, setLoading] = useState( true );
	//const pages: TState[] = ['toBuy', 'inFridge', 'deleted'];
	//const [formIsDisplayed, setFormDisplayed] = useState<boolean>( false );
	useEffect( () => {
		const fetchItems = async () => {
			const data = await database.getItems();
			setItems( data );
			setLoading( false );
		};
		fetchItems();
	}, [] );

	const addItem = async ( item: IItemToAdd ) => {
		await database.addItem( item );
		const data = await database.getItems();
		setItems( data );
	};

	const changeItem = async ( item: IItem ) => {
		await database.updateItem( item );
		const data = await database.getItems();
		setItems( data );
	};

	// const handlePageChange = ( increment: number ) => {
	// 	if ( page + increment > 2 || page + increment < 0 ) return;
	// 	setPage( page+increment );
	// };

	const tapHandlers = getItemsOperations( addItem, changeItem );

	if ( loading || !items || items.length === 0 ){
		return <div>Loading...</div>;
	}
	return ( <>
		<Navbar/>
		<p>Form component</p>
		<ItemsList items={items} handleItemTap={tapHandlers.tap} handleItemDoubleTap={tapHandlers.doubleTap}/>
		<BottomBar handlePageChange={() => {}} handleFormOpen={() => {}} />
	</>
	);
};