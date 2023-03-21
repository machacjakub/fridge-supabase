/* eslint-disable unused-imports/no-unused-vars */
//'use client';

import { AnimatePresence, motion } from "framer-motion";
import { IItem, TItems } from "@/web/types";
import { Item } from "./Item";
import {useSwipeable} from "react-swipeable";
import {sortByExpire} from "@/web/utils";

interface IProps {
    items: TItems;
    handleItemTap: ( item: IItem ) => void;
    handleItemDoubleTap: ( item: IItem ) => void;
	handleItemHold: ( item: IItem ) => void;
	handlePageChange: ( increment: number ) => void
}

export const ItemsList = ( { items, handlePageChange, handleItemTap, handleItemDoubleTap, handleItemHold }:IProps ) => {
	const itemsSorted: TItems = sortByExpire( items );
	const itemsToDisplay = [...itemsSorted.filter( ( item ) => item.state === 'open' ), ...itemsSorted.filter( ( item ) => item.state !== 'open' )];
	const handlers = useSwipeable( {
		onSwipedLeft: () => {
			handlePageChange( 1 );
		},
		onSwipedRight: () => {
			handlePageChange( -1 );
		},
	} );
	const pad = itemsToDisplay.length <= 6 ? `${800 - items.length * 80}px` : '100px';
	return (
		<div {...handlers} style={{paddingBottom: pad}}>
			<AnimatePresence >
				{items ? itemsToDisplay.map( ( item: IItem ) => (
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
						<Item key={item.id} item={item} handleTap={handleItemTap} handleDoubleTap={handleItemDoubleTap} handleHold={handleItemHold}/>
					</motion.div>
				) ) : 'nodata'}
			</AnimatePresence>
		</div>
	);
};