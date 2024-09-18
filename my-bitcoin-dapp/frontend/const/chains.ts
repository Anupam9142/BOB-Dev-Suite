import {  BOB } from "@thirdweb-dev/chains";

export const IS_DEV_ENV = process.env.NODE_ENV === "development";


const PRODUCTION_CHAIN = BOB;
export const CHAIN = PRODUCTION_CHAIN;
