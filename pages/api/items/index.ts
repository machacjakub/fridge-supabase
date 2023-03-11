// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {IItem, TItems} from "@/web/types";
import {getItemsQuery} from "@/backend/items/getItems";
import {addItemMutation} from "@/backend/items/addItem";

type Data = TItems|IItem|string

export default async function hanlder (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const {
		method,
		body,
	} = req;

	switch ( method ) {
	case 'GET':
		const data = await getItemsQuery();
		res.status( 200 ).json( data );
		break;
	case 'POST':
		await addItemMutation( body );
		const newData = await getItemsQuery();
		res.status( 200 ).json( newData );
		break;
	default:
		res.setHeader( 'Allow', ['GET', 'PUT'] );
		res.status( 405 ).end( `Method ${method} Not Allowed` );
	}
};
