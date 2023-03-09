/* eslint-disable unused-imports/no-unused-vars */
//'use client';

import { AnimatePresence, motion } from "framer-motion";
import { IItem, TItems } from "@/web/types";
import { Item } from "./Item";
import {useSwipeable} from "react-swipeable";

interface IProps {
    items: TItems;
    handleItemTap: ( item: IItem ) => void;
    handleItemDoubleTap: ( item: IItem ) => void;
	handlePageChange: ( increment: number ) => void
}

export const ItemsList = ( { items, handlePageChange, handleItemTap, handleItemDoubleTap }:IProps ) => {
	const handlers = useSwipeable( {
		onSwipedLeft: () => {
			handlePageChange( 1 );
		},
		onSwipedRight: () => {
			handlePageChange( -1 );
		},
	} );
	const pad = items.length > 1 ? '200px' : '700px';
	return (
		<div {...handlers} style={{paddingBottom: pad}}>
			<AnimatePresence >
				{items ? items.map( ( item: IItem ) => (
					<motion.div
						key={item.id}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							type: 'spring',
							duration: 0.6,
							damping: 25,
						}}
						layout
					>
						<Item key={item.id} item={item} handleTap={handleItemTap} handleDoubleTap={handleItemDoubleTap} />
					</motion.div>
				) ) : 'nodata'}
			</AnimatePresence>
		</div>
	);
};