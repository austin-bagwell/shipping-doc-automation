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
  const existingTokenExpiration = process.env.ODFL_SESSION_TOKEN_EXPIRY;
  if (
    existingTokenExpiration &&
    Number.parseInt(existingTokenExpiration) * 1000 < new Date().getTime()
  ) {
    console.log("getODSessionTokenExiration true in makeBol");
    const freshToken = await refreshToken("ODFL");
    token = freshToken?.sessionToken;
    // fs.writeFile() to update OD .env stuff I guess
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

export async function updateTokenInEnvironment(
  tokenDetails: Array<EnvironmentVariable>
) {
  const path = "/Users/austin/projects/ltl-automation/.env";
  try {
    const envFile = await fs.readFile(path, {
      encoding: "utf8",
    });

    const environment = await getEnvironmentVariables();
    const tokenDetailsKeys = tokenDetails.map((token) => token.key);

    // this works
    // still need to convert all this shiz to a string
    // and then fs.writeFile to .env
    // shoooooo
    const updated = tokenDetails.forEach((envVariable) => {
      const toUpdate = environment.find((env) => {
        // console.log("env.key");
        // console.log(env.key);
        // console.log("envVariable.key");
        // console.log(envVariable.key);
        return env.key === envVariable.key;
      });

      const idx = environment.findIndex((env) => env.key === toUpdate?.key);
      Object.assign(environment[idx], envVariable);
    });
    console.log(environment);
  } catch (err) {
    console.log(err);
  }
}

// try {
//   const test = await updateTokenInEnvironment([
//     { key: "ODFL_SESSION_TOKEN", value: "xxx" },
//     { key: "ODFL_SESSION_TOKEN_EXPIRY", value: "678" },
//   ]);
//   console.log(test);
// } catch (err) {
//   console.log(err);
// }
