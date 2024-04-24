import http from "k6/http";
import { check } from "k6";
import { urls } from "../urls.js";
import { checkResult } from "../helper.js";
import { L2Payload } from "../Payload/L2.js";

export const L2Api = {
  //Get loan Application
  getLoanApplication: (token, headers, customerId) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));

    let getLoanApplicationUrl = urls.L2.getLoanApplicationUrl;
    getLoanApplicationUrl = getLoanApplicationUrl.replace(
      "customerId",
      customerId
    );

    //Get api for loan application
    const getLoanApplication = http.get(getLoanApplicationUrl, { headers });

    //check result
    checkResult("get loan application", getLoanApplication);
  },
  //create survey
  createsurvey: (token, headers, customerId) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));

    let createsurveyUrl = urls.L2.createsurveyUrl;
    createsurveyUrl = createsurveyUrl.replace("customerId", customerId);

    //post api for create Survey
    const createsurvey = http.post(
      createsurveyUrl,
      JSON.stringify(L2Payload.createSurveyPayload),
      { headers }
    );
    //check result
    checkResult("Create survey ", createsurvey);
  },

  createAlliedInfo: (token, headers, customerId) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));

    let createAlliedInfoUrl = urls.L2.createAlliedInfoUrl;
    createAlliedInfoUrl = createAlliedInfoUrl.replace("customerId", customerId);

    //post api for create allied info
    const createAlliedInfo = http.post(
      createAlliedInfoUrl,
      JSON.stringify(L2Payload.createAlliedInfoPayload),
      { headers }
    );

    //check result
    checkResult("Create Allied Info", createAlliedInfo);
  },

  createHouseholdMember: (token, headers, customerId) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));

    let createHouseholdMemberUrl = urls.L2.createHouseHoldMemberUrl;
    createHouseholdMemberUrl = createHouseholdMemberUrl.replace(
      "customerId",
      customerId
    );

    //post api for create allied info
    const createHouseholdMember = http.post(
      createHouseholdMemberUrl,
      JSON.stringify(L2Payload.createHouseholdmemberPayload),
      { headers }
    );

    //check result
    checkResult("Create Household Member", createHouseholdMember);
  },

  createIncome: (token, headers, customerId) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));

    let createIncomeUrl = urls.L2.createIncomeUrl;
    createIncomeUrl = createIncomeUrl.replace("customerId", customerId);

    //post api for create allied info
    const createIncome = http.post(
      createIncomeUrl,
      JSON.stringify(L2Payload.createIncomePayload),
      { headers }
    );

    //check result
    checkResult("Create IncomeDetails", createIncome);
  },

  createIncomeExpenditure: (token, headers, customerId) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));

    let createIncomeExpenditureUrl = urls.L2.createIncomeExpenditureUrl;
    createIncomeExpenditureUrl = createIncomeExpenditureUrl.replace(
      "customerId",
      customerId
    );

    const createIncomeExpenditurePayload =
      L2Payload.createIncomeExpenditurePayload;
    let createIncomeExpenditure;
    // console.log(createIncomeExpenditurePayload)
    for (let payload of createIncomeExpenditurePayload) {
      //post api for create Income Expenditure
      createIncomeExpenditure = http.post(
        createIncomeExpenditureUrl,
        JSON.stringify(payload),
        { headers }
      );
    }

    //check result
    checkResult("Create Income Expenditure", createIncomeExpenditure);
  },

  createBankAssessment: (token, headers, customerId) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));

    let createBankAssessmentUrl = urls.L2.createBankAssessment;
    createBankAssessmentUrl = createBankAssessmentUrl.replace(
      "customerId",
      customerId
    );

    //post api for create Bank assessment
    const createBankAssessment = http.post(
      createBankAssessmentUrl,
      JSON.stringify(L2Payload.createBankAssessmentPayload),
      { headers }
    );

    //check result
    checkResult("Create BankAssessment", createBankAssessment);
  },

  getLoanDetails: (token, headers, customerId) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));

    let loanDetailsUrl = urls.L2.loanDetailsUrl;
    loanDetailsUrl = loanDetailsUrl.replace("customerId", customerId);

    //Get api for loan details
    const loanDetails = http.get(loanDetailsUrl, { headers });

    //check result
    checkResult("Get Loan Details", loanDetails);
  },

  createLoanDetails: (token, headers, customerId) => {
    headers = JSON.parse(JSON.stringify(headers).replace("token", token));

    let createLoanDetailsUrl = urls.L2.createLoandetailsUrl;
    createLoanDetailsUrl = createLoanDetailsUrl.replace(
      "customerId",
      customerId
    );

    //post api for post loan details
    const createLoanDetails = http.post(
      createLoanDetailsUrl,
      JSON.stringify(L2Payload.createLoanDetailsPayload),
      { headers }
    );

    //check result
    checkResult("Create Loan Details", createLoanDetails);
  },
};
