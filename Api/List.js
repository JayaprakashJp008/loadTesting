import http from "k6/http";
import { check } from "k6";
import { urls } from "../urls.js";
import { checkResult } from "../helper.js";
import { config } from "../config.js";
export const ListApi = {
  //Get loan Application
  getDemographicDetails: (token, headers) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));
    const customerId =
      config.customerIds[Math.floor(Math.random() * items.length)];
    let demographicsDetailsUrl = urls.List.demographicsDetailsUrl;
    demographicsDetailsUrl = demographicsDetailsUrl.replace(
      "customerId",
      customerId
    );

    //Get api for loan details
    const demographicsDetails = http.get(demographicsDetailsUrl, {
      headers,
    });

    //check result
    checkResult("Get Demographic Details", demographicsDetails);
  },
  getAssetsDetails: (token, headers) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));
    const customerId =
      config.customerIds[Math.floor(Math.random() * items.length)];
    let assetsDetailsUrl = urls.List.assetsDetailsUrl;
    assetsDetailsUrl = assetsDetailsUrl.replace("customerId", customerId);

    //Get api for loan details
    const assetsDetails = http.get(assetsDetailsUrl, {
      headers,
    });

    //check result
    checkResult("Get Assets Details", assetsDetails);
  },
  getBankDetails: (token, headers) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));
    const customerId =
      config.customerIds[Math.floor(Math.random() * items.length)];
    let bankDetailsUrl = urls.List.bankDetailsUrl;
    bankDetailsUrl = bankDetailsUrl.replace("customerId", customerId);

    //Get api for loan details
    const bankDetails = http.get(bankDetailsUrl, {
      headers,
    });

    //check result
    checkResult("Get Bank Details", bankDetails);
  },
  getIncomesDetails: (token, headers) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));
    const customerId =
      config.customerIds[Math.floor(Math.random() * items.length)];
    let incomesDetailsUrl = urls.List.incomesDetailsUrl;
    incomesDetailsUrl = incomesDetailsUrl.replace("customerId", customerId);

    //Get api for loan details
    const incomesDetails = http.get(incomesDetailsUrl, {
      headers,
    });

    //check result
    checkResult("Get Income Details", incomesDetails);
  },
  getAlliedInfoDetails: (token, headers) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));
    const customerId =
      config.customerIds[Math.floor(Math.random() * items.length)];
    let alliedInfoDetailsUrl = urls.List.alliedInfoDetailsUrl;
    alliedInfoDetailsUrl = alliedInfoDetailsUrl.replace(
      "customerId",
      customerId
    );

    //Get api for loan details
    const alliedInfoDetails = http.get(alliedInfoDetailsUrl, {
      headers,
    });

    //check result
    checkResult("Get AlliedInfo Details", alliedInfoDetails);
  },
  getCropDetails: (token, headers) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));
    const customerId =
      config.customerIds[Math.floor(Math.random() * items.length)];
    let cropDetailsUrl = urls.List.cropDetailsUrl;
    cropDetailsUrl = cropDetailsUrl.replace("customerId", customerId);

    //Get api for loan details
    const cropDetails = http.get(cropDetailsUrl, {
      headers,
    });

    //check result
    checkResult("Get Crop Details", cropDetails);
  },
  getSurveyDetails: (token, headers) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));
    const customerId =
      config.customerIds[Math.floor(Math.random() * items.length)];
    let surveyDetailsUrl = urls.List.surveyDetailsUrl;
    surveyDetailsUrl = surveyDetailsUrl.replace("customerId", customerId);

    //Get api for loan details
    const surveyDetails = http.get(surveyDetailsUrl, {
      headers,
    });

    //check result
    checkResult("Get Survey Details", surveyDetails);
  },
  getMemberDetails: (token, headers) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));
    const customerId =
      config.customerIds[Math.floor(Math.random() * items.length)];
    let memberDetailsUrl = urls.List.memberDetailsUrl;
    memberDetailsUrl = memberDetailsUrl.replace("customerId", customerId);

    //Get api for loan details
    const memberDetails = http.get(memberDetailsUrl, {
      headers,
    });

    //check result
    checkResult("Get Member Details", memberDetails);
  },
};
