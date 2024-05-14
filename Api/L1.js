import http from "k6/http";
import { FormData } from "https://jslib.k6.io/formdata/0.0.2/index.js";
import { urls } from "../urls.js";
import { checkResult } from "../helper.js";
import { L1Payload } from "../Payload/L1.js";
import { config } from "../config.js";
import { sleep } from "k6"

const pan1 = open("../Documents/pan1.jpeg", "b");
const pan2 = open("../Documents/pan2.jpeg", "b");

let customerPhoto = open("../Documents/customer_photo.jpeg", "b");

const recentCustomerPhoto = open("../Documents/recent_customer_photo.png", "b");

const sleepTime = 3;
export const L1Api = {
  login: () => {
    const params = {
      "Content-Type": "application/json",
    };

    const loginCredentials = L1Payload.loginPayload;
    const index = Math.floor(
      Math.random() * (loginCredentials.length - 1 + 1) + 0
    ); //generate random index value

    const login = http.post(
      urls.L1.loginUrl,
      JSON.stringify(loginCredentials[index]),
      { headers: params }
    );

    //check result
    checkResult("Login", login);
    if (login.status == 200) {
      let loginResponse = JSON.parse(login.body);
      loginResponse.payload.data.employeeId = loginCredentials[index].payload.employeeId;
      var employeeId = loginCredentials[index].payload.employeeId;
      console.log('employeeId', employeeId);
      return loginResponse;
    }
  },

  onboardCustomer: (token, headers) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));
    headers["product-id"] = "";

    const names = config.names;
    const index = Math.floor(Math.random() * (names.length - 1 + 1) + 0); //generate random index value

    let payload = L1Payload.onboardCustomerPayload;
    payload.payload.demographics.fullName = names[index];
    //post api for onboard customer
    const onboardCustomer = http.post(
      urls.L1.onboardCustomerUrl,
      JSON.stringify(L1Payload.onboardCustomerPayload),
      { headers }
    );

    //check result
    checkResult("Onboard Customers", onboardCustomer);
    console.log(onboardCustomer.body)
    const onboardCustomerBody = JSON.parse(onboardCustomer.body);

    if (onboardCustomerBody.payload.code == 'success') {
      //fetch customerId
      const customerId = onboardCustomerBody.payload.data.customerId;
      console.log("customerId :", customerId, "| name :", names[index]);

      sleep(sleepTime);
      return customerId;
    }
    return false;
  },

  uploadDocuments: (
    token,
    headers,
    customerId,
    type,
    documents,
    metadata = null
  ) => {
    const fd = new FormData();
    let documentUploadUrl = urls.L1.documentUploadUrl;
    documentUploadUrl = documentUploadUrl.replace("customerId", customerId);

    for (let document in documents) {
      fd.append("files", http.file(document, `${type}.jpg`, "image/jpg"));
    }
    if (metadata) fd.append("metadata", metadata);
    fd.append("type", type);
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));
    headers["Content-Type"] = "multipart/form-data; boundary=" + fd.boundary;

    //upload documents
    http.post(documentUploadUrl, fd.body(), { headers });
  },

  createDemographics: (token, headers, customerId) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));

    //CUSTOMER PHOTO upload
    L1Api.uploadDocuments(token, headers, customerId, "CUSTOMER_PHOTO", [
      customerPhoto,
    ]);

    //RECENT CUSTOMER PHOTO upload
    L1Api.uploadDocuments(token, headers, customerId, "RECENT_CUSTOMER_PHOTO", [
      recentCustomerPhoto,
    ]);

    //PAN upload
    L1Api.uploadDocuments(
      token,
      headers,
      customerId,
      "PAN",
      [pan1, pan2],
      "LWPPS4656A"
    );

    let createDemographicsUrl = urls.L1.createDemographicsUrl;
    createDemographicsUrl = createDemographicsUrl.replace(
      "customerId",
      customerId
    );
    //create demographics
    const createDemographics = http.post(
      createDemographicsUrl,
      JSON.stringify(L1Payload.createDemographicsPayload),
      { headers }
    );

    //check result
    checkResult("Demographics", createDemographics);
    sleep(sleepTime);

  },

  customerList: (token, headers) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));

    const lifecycleStagesPayload = L1Payload.customerListPayload;
    const index = Math.floor(
      Math.random() * (lifecycleStagesPayload.length - 1 + 1) + 0
    ); //generate random index value

    const customerListPayload = {
      payload: {
        lifecycleStages: lifecycleStagesPayload[index].lifecyclestages,
        fromDate: "2024-01-01",
        toDate: "2024-12-31",
        filter: "",
        skip: 0,
        limit: 20,
      },
    };

    // console.log('--------------', customerListPayload)
    //create demographics
    const customerList = http.post(
      urls.L1.customerListUrl,
      JSON.stringify(customerListPayload),
      { headers }
    );

    //check result
    checkResult("CustomerList", customerList);
  },
};
