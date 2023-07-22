import dotenv from "dotenv";
import * as readline from "readline";

import { makeBolRequest } from "./src/api/makeBolRequest";
dotenv.config();

console.log("running makeBolRequest()...");

async function main() {
  try {
    const newBolRequest = await makeBolRequest();
    console.log(newBolRequest);
  } catch (err) {
    console.log(err);
  }
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
