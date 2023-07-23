import dotenv from "dotenv";
import * as readline from "readline";

import { makeBolRequest } from "./src/api/makeBolRequest";
import { ODMakeBol400Response } from "./src/types/ODMakeBol400Response";
import { ODMakeBol200Response } from "./src/types/ODMakeBol200Response";
import { json } from "stream/consumers";
dotenv.config();

console.log("running makeBolRequest()...");

type ODResponses = ODMakeBol200Response | ODMakeBol400Response | any;

async function main() {
  try {
    const response = await makeBolRequest();

    if (!response.success) {
      //   const errors: ODMakeBol400Response = handleError(response);
      //   const err = await handleError(errors);
      //   throw new Error(err);
      console.log(response);
    }

    // console.log(
    //   `Request worked:  \nPRO#${response.proNumber?.toString()} created.`
    // );
    return response;

    /*
    const pathToCsv = rl.question("enter path to csv")
    const shipments = await parseShipmentInfo(pathToCsv)
    shipments.map(async (shipment) => {
        const response = await makeBolRequest(shipment)
        await cacheResponse(response)
    })
    */
  } catch (err) {
    console.log(err);
  }
}

async function handleError(err: ODResponses) {
  const { timestamp, status, error, path } = err;

  const message = `Error ${status.toString()}: ${error}. Path: ${path}\nTime: ${timestamp}`;
  return message;
}

main();

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Who is the consignee's cousin?", (answer) => {
//   switch (answer.toLowerCase()) {
//     case "you":
//       console.log("you are the consignees cousin?!?");
//       break;
//     case "h":
//       console.log("Enter 'you'");
//       break;
//     case "help":
//       console.log("Enter 'you'");
//       break;
//     default:
//       console.log("Invalid answer! type 'help' for help");
//   }
//   rl.close();
// });
