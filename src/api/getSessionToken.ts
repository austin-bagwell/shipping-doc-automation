import * as fs from "fs/promises";

// TODO
// add handling for multiple carriers
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
export async function refreshToken(carrier: string) {
  try {
    const expiration = await getSessionTokenExpiration(carrier);
    const now = new Date().getTime();

    if (expiration && expiration < now) {
      console.log(`old token is expired`);
      const newToken = await getSessionToken();
      console.log("newToken:");
      console.log(newToken);

      // TODO
      // overwriting specific bit of .env file without overwriting everything
      // await fs.writeFile(.env, overwrite old token/expiry)
    }
  } catch (err) {
    console.log(err);
  }
}

// TODO
// fix path to use __dirname or something equally elegant
// only hanldes OD now but could be easily modded to get tokens based on carrier SCAC or whatevs
export async function getSessionTokenExpiration(
  carrier: string = "odfl"
): Promise<number | undefined> {
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
    return Number.parseInt(expiration);
  } else {
    // threw new Error('see error msg below')
    console.log(
      `sorry boss the crappy code didn't find the expiration time for carrier '${carrier}'`
    );
  }
}
