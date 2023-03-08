export const toTimeReadable = ( date: Date ) => `${padNumber( date.getHours() )}:${padNumber( date.getMinutes() ) }:${padNumber( date.getSeconds() )}`;
export const toDateReadable = ( date: Date ): string => `${date.getFullYear()}-${padNumber( date.getMonth()+1 )}-${padNumber( date.getDate() )}`;
export const padNumber = ( num: number ) => num < 10 ? '0' + num : num;
