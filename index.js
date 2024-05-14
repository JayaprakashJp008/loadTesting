import { sleep } from "k6";
import { L1Payload } from "./Payload/L1.js";
import { L1Api } from "./Api/L1.js";
import { L2Api } from "./Api/L2.js";
import { L3Api } from "./Api/L3.js";
import { ListApi } from "./Api/List.js";

const sleepTime = 5;

// export let options = {
//   vus: 5,
//   duration: '10m' // 500 virtual users
//   // Run the test for 1 minute
// };

export function Haystack() {
  const headers = L1Payload.headers;

  //login
  const loginResponse = L1Api.login();
  const token = loginResponse.payload.data.accessToken;
  headers.employeeId = loginResponse.payload.data.employeeId;

  // //onboard customer
  const customerId = L1Api.onboardCustomer(token, headers);

  //create demographics
  L1Api.createDemographics(token, headers, customerId);

  sleep(sleepTime);
  //customer list
  L1Api.customerList(token, headers);

  // //Get Loan Application
  L2Api.getLoanApplication(token, headers, customerId);

  //create survey
  L2Api.createsurvey(token, headers, customerId);

  // // create allied info
  L2Api.createAlliedInfo(token, headers, customerId);

  // //create house hold member
  L2Api.createHouseholdMember(token, headers, customerId);

  // // //create income
  L2Api.createIncome(token, headers, customerId);

  //create income
  L2Api.createIncomeExpenditure(token, headers, customerId);

  //create Bank assessment
  L2Api.createBankAssessment(token, headers, customerId);

  //Get loan Details
  L2Api.getLoanDetails(token, headers, customerId);

  //create Bank assessment
  L2Api.createLoanDetails(token, headers, customerId);

  sleep(sleepTime);
  //create bank details
  L3Api.createBankDetails(token, headers, customerId);

  ListApi.getAlliedInfoDetails(token, headers);

  ListApi.getAssetsDetails(token, headers);

  ListApi.getBankDetails(token, headers);

  ListApi.getCropDetails(token, headers);

  ListApi.getDemographicDetails(token, headers);

  ListApi.getMemberDetails(token, headers);

  ListApi.getSurveyDetails(token, headers);
}

export default function () {
  Haystack();
  // onboardingcustomer();
}

export function teardown(data) {
  console.log("Load");
}
