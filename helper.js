import { check } from "k6";

export const checkResult = (apiName, response) => {
  const body = JSON.parse(response.body);
  const checkResult = check(response, {
    [apiName]: (res) => res.status === 200 && body.payload.code == "success",
  });

  if (checkResult) {
    console.log(
      `\x1b[32m${apiName} VU ${__VU} pass: ${response.status} message: ${body.payload.message}\x1b[0m`
    );
  }

  if (!checkResult) {
    console.log(
      `\x1b[31m${apiName} VU ${__VU} fail: ${response.status}  message: ${body.payload.message}\x1b[0m`
    );
  }
};
