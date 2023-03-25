/* eslint-disable unused-imports/no-unused-vars */
//'use client';

import { AnimatePresence, motion } from "framer-motion";
import {IItem, TItems, TState} from "@/web/types";
import { Item } from "./Item";
import {useSwipeable} from "react-swipeable";
import { sortForPage} from "@/web/utils";

interface IProps {
    items: TItems;
    handleItemTap: ( item: IItem ) => void;
    handleItemDoubleTap: ( item: IItem ) => void;
	handleItemEdit: ( item: IItem ) => void;
	handlePageChange: ( increment: number ) => void
	handleItemDelete: ( id: number ) => void
	page: TState;
}

export const ItemsList = ( { items, handlePageChange, handleItemTap, handleItemDoubleTap, handleItemEdit, handleItemDelete, page }:IProps ) => {
	const itemsSorted: TItems = sortForPage( page, items );
	const handlers = useSwipeable( {
		onSwipedLeft: () => {
			handlePageChange( 1 );
		},
		onSwipedRight: () => {
			handlePageChange( -1 );
		},
	} );
	const pad = itemsSorted.length <= 7 ? `${570 - items.length * 77}px` : '100px';
	return (
		<div {...handlers} style={{paddingBottom: pad}}>
			<AnimatePresence >
				{items ? itemsSorted.map( ( item: IItem ) => (
					<motion.div
						key={item.id}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							type: 'spring',
							duration: 0.4,
							damping: 25,
						}}
						layout
					>
						<Item key={item.id} item={item} handleTap={handleItemTap} handleDoubleTap={handleItemDoubleTap} handleEdit={handleItemEdit} handleDelete={handleItemDelete} />
					</motion.div>
				) ) : 'nodata'}
			</AnimatePresence>
		</div>
	);
};