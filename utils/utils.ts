export const toTimeReadable = ( date: Date ) => `${padNumber( date.getHours() )}:${padNumber( date.getMinutes() ) }:${padNumber( date.getSeconds() )}`;

export const padNumber = ( number: number | string ) => String( number ).length <= 1 ? '0' + number : number;
