import { dummyMakeBolData } from "./dummyBolData";

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

export async function makeBolRequest() {
  const params = "?";
  const url =
    process.env.ODFL_TEST_API_ROOT + "/BOL/v3.1/eBOL/bol-request" + params;
  const bearer = "Bearer " + process.env.ODFL_SESSION_TOKEN;

  const headers = new Headers();

  headers.set("Authorization", bearer);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(dummyMakeBolData),
    });
    // console.log(res);
    const json = await res.json();
    console.log(json);
    return json;
  } catch (err) {
    console.log(err);
  }
}
