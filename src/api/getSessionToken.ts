export async function getSessionToken() {
  const url = process.env.ODFL_TEST_API_ROOT + "/auth/v1.0/token";
  const username = process.env.ODFL_USER;
  const password = process.env.ODFL_PW;
  const headers = new Headers();

  headers.set(
    "Authorization",
    "Basic " + Buffer.from(username + ":" + password).toString("base64")
  );

  try {
    const res = await fetch(url, { headers });
    const json: ODGetSessionToken200ResponseJson = await res.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}

interface ODGetSessionToken200ResponseJson {
  sessionToken: string;
  expiration: number;
}
