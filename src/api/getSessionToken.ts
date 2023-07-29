import * as fs from "fs";

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
    const expiry = await getExistingToken();
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

interface AuthTokenDetails {
  token: string;
  expiry: number;
}
// TODO
// fix path to use __dirname
// only hanldes OD now but could be easily modded to get tokens based on carrier SCAC or whatevs
export async function getExistingToken(carrier: string = "odfl") {
  // const path = __dirname + "/.env";
  const path = "/Users/austin/projects/ltl-automation/.env";

  const expiry = fs.readFile(
    path,
    {
      encoding: "utf8",
    },
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const keyValues = data.split("\n").map((variable) => {
        const key = variable.split("=")[0];
        const value = variable.split("=")[1];
        return { key, value };
      });

      const tokens = keyValues.filter((kv) => {
        return kv.key.includes("TOKEN");
      });

      const carrierSpecificTokens = tokens.filter((token) =>
        token.key.match(carrier.toUpperCase())
      );

      // bad, probably yes
      // will use key.includes('EXPIRY') or something to make less stupid later
      // const token = carrierSpecificTokens[0].value;
      const expiry = carrierSpecificTokens[1].value;

      return expiry;
    }
  );
  // console.log(expiry);
  return expiry;
}
