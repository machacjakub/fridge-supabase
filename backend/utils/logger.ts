export const applyModuleName = ( moduleName: string ) => {
	return {
		info: ( text: any ) => console.log( `${moduleName} | ${text}` ),
		error: ( text: any ) => console.error( `${moduleName} | ${text}` )
	};
};