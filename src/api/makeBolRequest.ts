import { dummyMakeBolData } from "../data/dummyBolData";
import { ODMakeBol200Response } from "../types/ODMakeBol200Response";
import { ODMakeBol400Response } from "../types/ODMakeBol400Response";

// TODO
// add handling for url params

// getting this error as of 6:37 7/19
// had it in Postman earlier but can't remember what i did to fix it

// {
//   timestamp: '2023-07-20T00:37:00.285+00:00',
//   status: 415,
//   error: 'Unsupported Media Type',
//   path: '/bol-request'
// }

// defaults to generate a new proNumber in the response
export async function makeBolRequest(): Promise<
  ODMakeBol200Response | ODMakeBol400Response | any
> {
  const params =
    "?generatePro=true&generateBol=true&generateLabel=true&emailBol=true&emailLabel=true";
  const url =
    process.env.ODFL_TEST_API_ROOT + "/BOL/v3.1/eBOL/bol-request" + params;
  const bearer = "Bearer " + process.env.ODFL_SESSION_TOKEN;

  const headers = new Headers();

  headers.set("Authorization", bearer);
  headers.set("Content-Type", "application/json");

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(dummyMakeBolData),
  });

  if (res.status >= 400) {
    const errors = res.json();
    console.log("Errors caught in makeBolRequest");

    return errors;
  }

  const json = await res.json();
  return json;
}
