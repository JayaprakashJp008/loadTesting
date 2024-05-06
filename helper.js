import { check } from "k6";

export const checkResult = (apiName, response) => {
  let body;
  const checkResult = check(response, {
    [apiName]: (res) => {
      if (res.status === 200) return body = JSON.parse(response.body)
      else return body = { payload: { status: res.status, message: res.status_text } }
    },
  });
  
  if (checkResult && body.payload.data && body.payload.data.code == 'success') {
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
