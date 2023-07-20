import { ReqMakeBol } from "../models/requests/ODMakeBolRequest";

// const bodyData: ReqMakeBol = {
//     addresses: [
//     ]
// }

// TODO
// add handling for url params
export async function makeBolRequest() {
  const params = "?";
  const url =
    process.env.ODFL_TEST_API_ROOT + "/BOL/v3.1/eBOL/bol-request" + params;
  const bearer = "Bearer " + process.env.ODFL_SESSION_TOKEN;

  const headers = new Headers();

  headers.set("Authorization", bearer);

  try {
    // TODO
    // yes that is a hideous inline comment sry
    const res = await fetch(url, {
      method: "POST",
      headers /*body: JSON.stringify(bodyData)*/,
    });
    // console.log(res);
    const json = await res.json();
    console.log(json);
    return json;
  } catch (err) {
    console.log(err);
  }
}
