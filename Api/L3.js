import http from "k6/http";
import { urls } from "../urls.js";
import { checkResult } from "../helper.js";
import { L3Payload } from "../Payload/L3.js";
import { L1Api } from "./L1.js";
import { sleep } from "k6";

const customerSignature = open("../Documents/pan1.jpeg", "b");
const sleepTime = 3


export const L3Api = {
  //create Bank details
  createBankDetails: (token, headers, customerId) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));

    //CUSTOMER SIGNATURE upload
    L1Api.uploadDocuments(token, headers, customerId, "CUSTOMER_SIGNATURE", [
      customerSignature,
    ]);
    sleep(sleepTime);

    let createBankDetailsurl = urls.L3.createBankDetailsurl;
    createBankDetailsurl = createBankDetailsurl.replace(
      "customerId",
      customerId
    );

    //post api for create bank details
    const createBankDetails = http.post(
      createBankDetailsurl,
      JSON.stringify(L3Payload.createBankDetailspayload),
      { headers }
    );

    //check result
    checkResult(" Bank details", createBankDetails);
    sleep(sleepTime);

  },
};
