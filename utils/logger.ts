import {toTimeReadable} from "@/utils/utils";

export const getLogger = ( moduleName: string ) => {
	return ( functionName: string ) => {
		const prefix = `${toTimeReadable( new Date() )} | ${moduleName} | ${functionName}`;
		return {
			info: ( text: string ) => console.log( `${prefix} | ${text}` ),
			error: ( text: string ) => console.error( `${prefix} | ${text}` )
		};
	};
};