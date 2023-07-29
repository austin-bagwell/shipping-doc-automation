import * as fs from "fs/promises";

interface EnvironmentVariable {
  key: string;
  value: string;
}

interface ODGetSessionToken200ResponseJson {
  sessionToken: string;
  expiration: number;
}
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

// write/overwrite new token+expiry into .env for now, use db later
export async function refreshToken(carrier: string) {
  try {
    const expiration = await getSessionTokenExpiration(carrier);
    const now = new Date().getTime();

    if (expiration && expiration * 1000 < now) {
      console.log(`old token is expired`);
      console.log(`creating new token...`);
      const newToken = await getSessionToken();

      // TODO
      // await setTokenEnvironmentVariable(carrier);
      // overwriting specific bit of .env file without overwriting everything
      // await fs.writeFile(.env, overwrite old token/expiry)
      return newToken;
    } else {
      console.log("token not expired");
      return null;
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
): Promise<number> {
  const environment = await getEnvironmentVariables();

  const expirationVariable: EnvironmentVariable = environment.filter(
    (envVariable) => {
      if (
        envVariable.key.includes(carrier.toUpperCase()) &&
        envVariable.key.includes("EXPIRY")
      ) {
        return true;
      }
    }
  )[0];

  if (expirationVariable) {
    return Number.parseInt(expirationVariable.value);
  } else {
    // threw new Error('see error msg below')
    console.log(
      `sorry boss the crappy code didn't find the expiration time for carrier '${carrier}'`
    );
    // FIXME
    // because I'm still figuring out TypeScript lol
    // don't know if I should be including this as such
    // but tsc screams at me if I don't return a number
    return 0;
  }
}

// TODO move to /utils
async function getEnvironmentVariables(): Promise<Array<EnvironmentVariable>> {
  const path = "/Users/austin/projects/ltl-automation/.env";
  const envFile = await fs.readFile(path, {
    encoding: "utf8",
  });
  const environment = envFile.split("\n").map((variable) => {
    const [key, value] = variable.split("=");
    return { key, value };
  });
  return environment;
}
