import {Navbar} from "@/web/layout/navbar/Navbar";
import React, {useEffect, useState} from "react";
import {IFormData, IItem, IItemToAdd, TItems, TState} from "@/web/types";
import {ItemsList} from "@/web/items/ItemsList";
import BottomBar from "@/web/layout/bottom-bar/BottomBar";
import {
	addItemRequest,
	changeItemRequest,
	deleteItemRequest,
	doubleTapItemEvent,
	getItemsRequest,
	tapItemEvent
} from "@/web/apiRequests";
import {FormComponent} from "@/web/form/FormComponent";
import {LoadingOutlined} from "@ant-design/icons";
import {pipe} from "fputils";
import {supabaseAnonKey, supabaseURL} from "@/backend/database/supabaseClient";
import {getNewItemsFromPayload} from "@/web/utils";


const { createClient } = require( '@supabase/supabase-js' );

const supabase = createClient( supabaseURL, supabaseAnonKey );

// const channel = supabase
// 	.channel( 'schema-db-changes' )
// 	.on(
// 		'postgres_changes',
// 		{
// 			event: '*',
// 			schema: 'public',
// 			table: 'items'
// 		},
// 		( payload: any ) => console.log( 'Change recieved',payload )
// 	)
// 	.subscribe();
// eslint-disable-next-line react/display-name
export const HomePage = ( ) => {
	const [items, setItems] = useState<TItems|null>( null );
	const [page, setPage] = useState<number>( 1 );
	const [loading, setLoading] = useState( true );
	const pages: TState[] = ['toBuy', 'inFridge', 'deleted'];
	const [formIsDisplayed, setFormDisplayed] = useState<boolean>( false );
	const [itemToEdit, setItemToEdit] = useState<IItem|undefined>( );
	useEffect( () => {
		const fetchItems = async () => {
			console.log( 'fetching items' );
			const data = await getItemsRequest();
			setItems( data );
			setLoading( false );
		};
		fetchItems();

		supabase
			.channel( 'schema-db-changes' )
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'items'
				},
				( payload: any ) => {
					console.log( 'Change recieved',payload );
					if ( items !== null ) {
						setItems( getNewItemsFromPayload( items, payload ) );
					} else {
						fetchItems();
					}
				}
			)
			.subscribe();
	}, [] );

	if ( loading || !items || items.length === 0 ){
		return <div style={{ height: '700px', textAlign: 'center'}}><LoadingOutlined style={{fontSize: '30px', marginTop: '350px' }} /></div> ;
	}

	const changeItem = async ( item: IItem ) => {
		const changedItem = await changeItemRequest( item );
		setItems( [...items.filter( ( item ) => item.id !== changedItem[0].id ), ...changedItem] );
	};
	
	const addItem = async ( item: IItemToAdd ) => {
		const newItem = ( await addItemRequest( {...item, state: pages[page]} ) )[0];
		setItems( [...items, newItem] );
	};

	const deleteItem = async ( itemId: number ) => {
		await deleteItemRequest( itemId );
		setItems( [...items.filter( ( item ) => item.id !== itemId )] );
	};

	const editItem = async ( item: IItem ) => {
		setItemToEdit( {...item} );
		setFormDisplayed( true );
	};

	const handleFormSubmit = async ( item: IFormData ) => {
		if ( itemToEdit ){
			await changeItem( {...item, id: itemToEdit.id, state: itemToEdit.state} );
			setItemToEdit( undefined );
		} else {
			await addItem( {...item, state: pages[page]} );
		}
		setFormDisplayed( false );
	};

	const handleFormClose = () => {
		setFormDisplayed( false );
		setItemToEdit( undefined );
	};

	const handlePageChange = ( increment: number ) => {
		if ( page + increment > 2 || page + increment < 0 ) return;
		setPage( page+increment );
	};

	// const tapHandlers = getItemsOperations( addItem, changeItem );
	const handleItemTap =async ( item: IItem ) => {
		const changedItems = await tapItemEvent( item );
		setItems( [...items.filter( ( item ) => item.id !== changedItems[0].id ), ...changedItems] ) ;
	};

	const handleItemDoubleTap =async ( item: IItem ) => {
		pipe( await doubleTapItemEvent( item ), setItems );
	};

	return ( <>
		<Navbar page={page}/>
		{formIsDisplayed && <FormComponent handleFormSubmit={handleFormSubmit} isDisplayed={formIsDisplayed} handleFormClose={handleFormClose} itemToEdit={itemToEdit} />}
		<ItemsList
			items={items.filter( ( item ) => item.state === pages[page] || ( item.state === 'open' && pages[page] === 'inFridge' ) )}
			handlePageChange={handlePageChange}
			handleItemTap={handleItemTap }
			handleItemDoubleTap={handleItemDoubleTap}
			handleItemEdit={editItem}
			handleItemDelete={deleteItem}
			page={pages[page]}/>
		<BottomBar currentPage={page} handlePageChange={handlePageChange} handleFormOpen={() => setFormDisplayed( true )} />
	</>
	);
};