import dotenv from "dotenv";

import { makeBolRequest } from "./src/api/makeBolRequest";
dotenv.config();

// console.log(process.env.USER_ODFL);

console.log("running makeBolRequest()...");
makeBolRequest();
