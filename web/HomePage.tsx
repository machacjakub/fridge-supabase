import {Navbar} from "@/web/layout/navbar/Navbar";
import React, {useEffect, useState} from "react";
import {IFormData, IItem, TItems, TState} from "@/web/types";
import {ItemsList} from "@/web/items/ItemsList";
import BottomBar from "@/web/layout/bottom-bar/BottomBar";
import {addItemRequest, doubleTapItemEvent, getItemsRequest, tapItemEvent} from "@/web/apiRequests";
import {FormComponent} from "@/web/form/FormComponent";
import {LoadingOutlined} from "@ant-design/icons";
import {pipe} from "fputils";

// eslint-disable-next-line react/display-name
export const HomePage = ( ) => {
	const [items, setItems] = useState<TItems|null>( null );
	const [page, setPage] = useState<number>( 1 );
	const [loading, setLoading] = useState( true );
	const pages: TState[] = ['toBuy', 'inFridge', 'deleted'];
	const [formIsDisplayed, setFormDisplayed] = useState<boolean>( false );
	useEffect( () => {
		const fetchItems = async () => {
			const data = await getItemsRequest();
			setItems( data );
			setLoading( false );
		};
		fetchItems();
	}, [] );

	// const changeItem = async ( item: IItem ) => {
	// 	await changeItemRequest( item );
	// 	const data = await getItemsRequest();
	// 	setItems( data );
	// };

	const handleFormSubmit = async ( item: IFormData ) => {
		setFormDisplayed( false );
		pipe( await addItemRequest( {...item, state: pages[page]} ), setItems );
	};

	const handlePageChange = ( increment: number ) => {
		if ( page + increment > 2 || page + increment < 0 ) return;
		setPage( page+increment );
	};

	// const tapHandlers = getItemsOperations( addItem, changeItem );
	const handleItemTap =async ( item: IItem ) => {
		pipe( await tapItemEvent( item ), setItems );
	};

	const handleItemDoubleTap =async ( item: IItem ) => {
		pipe( await doubleTapItemEvent( item ), setItems );
	};
	

	if ( loading || !items || items.length === 0 ){
		return <div style={{ height: '700px', textAlign: 'center'}}><LoadingOutlined style={{fontSize: '30px', marginTop: '350px' }} /></div> ;
	}
	return ( <>
		<Navbar page={page}/>
		<FormComponent handleFormSubmit={handleFormSubmit} isDisplayed={formIsDisplayed} handleFormClose={() => setFormDisplayed( false )} />
		<ItemsList page={page} items={items.filter( ( item ) => item.state === pages[page] || ( item.state === 'open' && pages[page] === 'inFridge' ) )} handlePageChange={handlePageChange} handleItemTap={handleItemTap} handleItemDoubleTap={handleItemDoubleTap}/>
		<BottomBar currentPage={page} handlePageChange={handlePageChange} handleFormOpen={() => setFormDisplayed( true )} />
	</>
	);
};