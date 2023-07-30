import { dummyMakeBolData } from "../data/dummyBolData";
import { ODMakeBol200Response } from "../types/ODMakeBol200Response";
import { ODMakeBol400Response } from "../types/ODMakeBol400Response";
import {
  refreshToken,
  getODSessionTokenExpiration,
  getFreshSessionToken,
} from "./getSessionToken";

// TODO
// add handling for url params
// defaults to generate a new proNumber in the response
export async function makeBolRequest(): Promise<
  ODMakeBol200Response | ODMakeBol400Response | any
> {
  const params =
    "?generatePro=true&generateBol=true&generateLabel=true&emailBol=true&emailLabel=true";
  const url =
    process.env.ODFL_TEST_API_ROOT + "/BOL/v3.1/eBOL/bol-request" + params;

  const token = await getFreshSessionToken("ODFL");
  const bearerToken = "Bearer " + token;

  const headers = new Headers();
  headers.set("Authorization", bearerToken);
  headers.set("Content-Type", "application/json");

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(dummyMakeBolData),
  });

  // TODO
  // error handling based on err response code?
  if (res.status >= 400) {
    const errors = await res.json();
    console.log("Errors in makeBolRequest");
    console.log(errors);
    return errors;
  }

  const json = await res.json();

  return json;
}
