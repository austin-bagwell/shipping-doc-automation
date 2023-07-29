import * as fs from "fs/promises";

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

// write/overwrite new token+expiry into .env for now, use db later
export async function refreshToken() {
  try {
    const expiry = await getSessionTokenExpiration("ODFL");
    console.log(expiry);
  } catch (err) {
    console.log(err);
  }
  // let newToken;
  // get value of existingToken exire
  // if now > existingExpire (plus or minus 10 minutes or something?)
  // token = getSessionToken();
  // return token;;
}

// TODO
// fix path to use __dirname or something equally elegant
// only hanldes OD now but could be easily modded to get tokens based on carrier SCAC or whatevs
export async function getSessionTokenExpiration(
  carrier: string = "odfl"
): Promise<string | void> {
  const path = "/Users/austin/projects/ltl-automation/.env";

  const environmentVariables = await fs.readFile(path, {
    encoding: "utf8",
  });

  // truly disgusting I am sorry
  const expiration = environmentVariables
    .split("\n")
    .map((variable) => {
      const key = variable.split("=")[0];
      const value = variable.split("=")[1];

      if (key.toUpperCase().includes("TOKEN")) {
        return { key, value };
      }
    })
    .filter((sessionToken) => sessionToken?.key.includes(carrier.toUpperCase()))
    .filter((t) => t?.key.toUpperCase().includes("EXPIRY"))[0]?.value;

  if (expiration) {
    return expiration;
  } else {
    console.log(
      `sorry boss the crappy code didn't find the expiration time for carrier '${carrier}'`
    );
  }
  return expiration;
}
