import * as fs from "fs/promises";

interface EnvironmentVariable {
  key: string;
  value: string;
}

interface ODgetODSessionToken200ResponseJson {
  sessionToken: string;
  expiration: number;
}

export async function getFreshSessionToken(carrier: string) {
  switch (carrier.toUpperCase()) {
    case "ODFL":
      return freshenODSessionToken();
    default:
      console.log("getFreshSessionToken default");
      break;
  }
}

async function freshenODSessionToken() {
  let token;
  const tokenExpiration = process.env.ODFL_SESSION_TOKEN_EXPIRY;

  if (tokenExpiration && isTokenExpired(tokenExpiration)) {
    console.log("getODSessionTokenExiration true in makeBol");
    const freshToken = await refreshToken("ODFL");
    token = freshToken?.sessionToken;

    const envToken = {
      key: "ODFL_SESSION_TOKEN",
      value: `${token}`,
    };

    const envExpiry = {
      key: "ODFL_SESSION_TOKEN_EXPIRY",
      value: `${freshToken?.expiration}`,
    };

    await updateTokenInEnvironment([envToken, envExpiry]);
  } else {
    token = process.env.ODFL_SESSION_TOKEN;
  }
  return token;
}

// TODO
// add handling for multiple carriers
export async function getODSessionToken() {
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
    const json: ODgetODSessionToken200ResponseJson = await res.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}

// write/overwrite new token+expiry into .env for now, use db later
export async function refreshToken(carrier: string) {
  try {
    const expiration = await getODSessionTokenExpiration(carrier);
    const now = new Date().getTime();

    if (expiration && expiration * 1000 < now) {
      console.log(`old token is expired`);
      console.log(`creating new token...`);
      const newToken = await getODSessionToken();

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
export async function getODSessionTokenExpiration(
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

// works, but maybe smelly?
// once again, hard coded path is not the way but hey...
export async function updateTokenInEnvironment(
  variableToUpdate: Array<EnvironmentVariable>
) {
  const path = "/Users/austin/projects/ltl-automation/.env";
  try {
    const environment = await getEnvironmentVariables();

    variableToUpdate.forEach((envVariable) => {
      const toUpdate = environment.find((env) => {
        return env.key === envVariable.key;
      });

      const idx = environment.findIndex((env) => env.key === toUpdate?.key);
      Object.assign(environment[idx], envVariable);
    });

    const updatedEnvString = environment
      .map((env) => convertToString(env))
      .join("\n");

    await fs.writeFile(path, updatedEnvString);
  } catch (err) {
    console.log(err);
  }
}

function convertToString(environmentVar: EnvironmentVariable) {
  return `${environmentVar.key}=${environmentVar.value.toString()}`;
}

// only works for OD's implementaion, ex need to *1000
function isTokenExpired(expiration: string) {
  return Number.parseInt(expiration) * 1000 < new Date().getTime();
}
