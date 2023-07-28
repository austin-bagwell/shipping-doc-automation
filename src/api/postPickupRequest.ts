import { dummyPickupData } from "../data/dummyPickupData";

export async function postPickupRequest() {
  //   const endpoints = "create" | "cancel" | "update" | "info";

  const url = "https://apiq.odfl.com/pickup/v3.0/create";
  const bearer = "Bearer " + process.env.ODFL_SESSION_TOKEN;

  const headers = new Headers();

  headers.set("Authorization", bearer);
  headers.set("Content-Type", "application/json");

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(dummyPickupData),
  });

  const json = await response.json();
  console.log(json);
  return json;
}
