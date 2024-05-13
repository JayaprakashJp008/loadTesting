import http from 'k6/http';
import { check, sleep } from 'k6';
import { urls } from "./urls.js";
import { L1Payload } from "./Payload/L1.js";

const K6_PORT = 7575

import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';

import { randomString, uuidv4 } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';


const pan1 = open("../Documents/pan1.jpeg", "b");
const pan2 = open("../Documents/pan2.jpeg", "b");

let customerPhoto = open("../Documents/customer_photo.jpeg", "b");

const recentCustomerPhoto = open("../Documents/recent_customer_photo.png", "b");

const sleepTime = 10;


console.log(`Metrics server running on port ${__ENV.K6_PORT}`);


// export let options1 = {
//   scenarios: {
//     onboarding_scenario: {
//       executor: 'constant-arrival-rate',
//       rate: 1,
//       preAllocatedVUs: 1,
//       duration:'10m',
//       maxVUs: 200, // Adjust as needed
//     },
//     group_created_scenario: {
//       executor: 'constant-arrival-rate',
//       rate: 1,
//       duration: '10m',
//       preAllocatedVUs: 1,
//       maxVUs: 100, 
//     },
//   },
// };

export let options = {
  vus: 50,
  duration: '10m' // 500 virtual users
  // Run the test for 1 minute
};

export function onboardingcustomer() {

  const demographics_payload = {

    payload: {
      lifecycleStages: [
        {
          level: "DEMOGRAPHIC_DETAILS",
          status: "SUBMITTED"
        }
      ],
      fromDate: "",
      toDate: "",
      filter: "",
      skip: 0,
      limit: 20
    }

  };

  const householddetails_payload = {

    payload: {
      lifecycleStages: [
        {
          level: "CREDIT_CHECK",
          status: "APPROVED"
        }
      ],
      fromDate: "",
      toDate: "",
      filter: "",
      skip: 0,
      limit: 20
    }

  };

  const bankaccount_details_payload = {

    payload: {
      lifecycleStages: [
        {
          level: "BANK_ACCOUNT_DETAILS",
          status: "SUBMITTED"
        }
      ],
      fromDate: "",
      toDate: "",
      filter: "",
      skip: 0,
      limit: 20
    }

  };

  function generateRandomNumber() {
    return (Math.floor(Math.random() * 900000000000) + 100000000000).toString();
  }

  const auaSpecificUidToken = randomString(25);
  const trasanction_id = randomString(12);
  const payload = L1Payload.onboardCustomerPayload;

  const TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0M20wU1p4bjQ4S0tZWmNjVjY3NndmaGdDZTQ2dGdZa3VNVk1OdkU3QVBFIn0.eyJleHAiOjE3MTIxNTkxOTAsImlhdCI6MTcxMjE1NTU5MCwianRpIjoiMDFhODFlZTYtZDZjYS00MDA2LTgwZDEtMjYzM2RlYzIyYTU3IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5taWZpeC5pby9yZWFsbXMvc2hlY29tbSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIzZTAxZmIxOS0yM2JkLTRiZGYtODEzNy0yMmE1MDA4ZTJiYWIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzaGVDb21tZXJ6LWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiJmZTJhNzAzMy00Mjk1LTRlMjAtOWQ5OS1hYTI5YjUxZWQwN2MiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXNoZWNvbW0iLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIHVzZXItYXR0cmlidXRlcyIsInNpZCI6ImZlMmE3MDMzLTQyOTUtNGUyMC05ZDk5LWFhMjliNTFlZDA3YyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcm9kdWN0SWQiOiJQRC1GRUQtSkxHIiwicm9sZUNvZGUiOiJSTzEwMDAyIiwibmFtZSI6Ik1WSFBjVFdKZkgiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1cy1zaC1zaGMtMTAyMjMiLCJnaXZlbl9uYW1lIjoiTVZIUGNUV0pmSCIsImVtYWlsIjoiMWUzM2dpd2RlMDVAZ21haWwuY29tIn0.TkhDH3zYrQqzZZDXaUB60sfoODZDjgTNZ9yz_CJ14Daorz0JwLbh1mQkzZll5KAfMDX5uF3zkkc3LB_qJOsQU4FysJDXwhdBhCrvXVPRkWBCjKIykByRYdrnVWYgHISbmHhvzSOlS8e6pNW3Lr7bsb8--EBDDR-mm59x814FyFvlAYGqr6yqdG3dRmBHtuP3d07SDNOnH0IpKMJLSvZ1lwaVrphM60bnsuaj9V-Ajprl2_Ydq3ZgqI_6W76mV4asRIZRYpY_6t-DPP1cTt-P_uDbD1cQQZ1j6-FjwV5gopkQT6PwcYaF9s7jvygwdUT588OV8TEzJ3hwltmTcW9Bqg"
  const headers = L1Payload.headers

  const response2 = http.post(
    urls.L1.onboardCustomerUrl,
    JSON.stringify(payload),
    { headers: headers }

  )

  console.log(response2.body)
  const json = JSON.parse(response2.body);
  const customerId = json.payload.data.customerId;
  console.log(customerId)

  const checkResult1 = check(response2, {
    'Onboarding Customers': (res) => res.status === 200,
  });

  if (!checkResult1) {
    console.log(`VU ${__VU} fail: ${response2.status}`);

  }

  sleep(sleepTime)

  const headers1 = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${TOKEN}`,
    'partner-id': 'SH-SHC'
  };

  const fd = new FormData();
  fd.append('files', http.file(pan1, '20.jpg', 'image/jpg'));
  fd.append('files', http.file(pan2, '21.jpg', 'image/jpg'));
  fd.append('metadata', 'LWPPS4656A')
  fd.append('type', 'PAN')

  const upload_url = urls.L1.documentUploadUrl;

  const file_upload_response = http.post(upload_url, fd.body(), {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=' + fd.boundary,
      'Authorization': `Bearer ${TOKEN}`,
      'partner-id': 'SH-SHC'
    },

  });

  console.log(file_upload_response.body);
  sleep(sleepTime)

  const recentphoto = new FormData();
  recentphoto.append('files', http.file(recentCustomerPhoto, '23.jpg', 'image/jpg'))
  recentphoto.append('type', 'RECENT_CUSTOMER_PHOTO')

  const recent_photo_response = http.post(upload_url, recentphoto.body(), {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=' + recentphoto.boundary,
      'Authorization': `Bearer ${TOKEN}`,
      'partner-id': 'SH-SHC'
    },

  });

  console.log(recent_photo_response.body);
  sleep(sleepTime)

  const customerphoto = new FormData();
  customerphoto.append('files', http.file(customerPhoto, '24.jpg', 'image/jpg'))
  customerphoto.append('type', 'CUSTOMER_PHOTO')

  const customer_photo_response = http.post(upload_url, customerphoto.body(), {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=' + customerphoto.boundary,
      'Authorization': `Bearer ${TOKEN}`,
      'partner-id': 'SH-SHC'
    },

  });
  sleep(sleepTime)

  console.log(customer_photo_response.body);

  const url = urls.L1.createDemographicsUrl
  console.log(url)

  const payload1 = L1Payload.createDemographicsPayload


  const response1 = http.post(url,
    JSON.stringify(payload1),
    { headers }
  );

  console.log(response1.body)

  const checkResult = check(response1, {
    'Demographics': (res) => res.status === 200,
  });

  if (checkResult) {
    console.log(`VU ${__VU} pass: ${response1.status}`);

  }
  if (!checkResult) {
    console.log(`VU ${__VU} fail: ${response1.status}`);
  }

  // sleep(180);

  // const demographics_list = http.post(
  //   'https://federal-qa-test.mifix.io/main/customer/list',
  //   JSON.stringify(demographics_payload),
  //   { headers }

  // )

  // console.log(demographics_list.body)

  // const demographics = check(demographics_list, {
  //   'Demogarphics_list': (res) => res.status === 200,
  // });

  // if (demographics) {
  //   console.log(`VU ${__VU} pass: ${demographics_list.status}`);

  // }
  // if (!demographics) {
  //   console.log(`VU ${__VU} fail: ${demographics_list.status}`);
  // }

  // sleep(240)

  // const assets_payload = {


  //   payload: [
  //     {
  //       code: "8b341113-58e4-4c14-8460-9a61d50f6fd8",
  //       value: 10000
  //     }
  //   ]

  // }

  // const assets_url = `https://federal-qa-test.mifix.io/main/customer/${customerId}/assets`
  // const assets_response = http.post(assets_url,
  //   JSON.stringify(assets_payload),
  //   { headers }
  // );

  // console.log(assets_response.body)

  // const checkassets = check(assets_response, {
  //   'assets': (res) => res.status === 200,
  // });

  // if (checkassets) {
  //   console.log(`VU ${__VU} pass: ${assets_response.status}`);

  // }
  // if (!checkResult) {
  //   console.log(`VU ${__VU} fail: ${assets_response.status}`);
  // }

  // console.log(assets_response)
  // sleep(sleepTime)

  // const incomes_payload = {
  //   payload: [
  //     {
  //       type: "PRIMARY",
  //       employmentType: "abfb4e26-ec67-4bca-b36d-3867e169fbbd",
  //       occupation: "564618d7-642c-41a7-956c-06641668212b",
  //       designation: "aafd6b55-5f39-4eeb-9c83-df716f989e70",
  //       otherIncomeType: "NO",
  //       incomeProofId: "",
  //       frequencyOfIncome: "MON",
  //       income: 10000
  //     }
  //   ]
  // }

  // const incomes_url = `https://federal-qa-test.mifix.io/main/customer/${customerId}/incomes`
  // const incomes_response = http.post(incomes_url,
  //   JSON.stringify(incomes_payload),
  //   { headers }
  // );

  // console.log(incomes_response.body)

  // const checkincomes = check(incomes_response, {
  //   'primaryincomes': (res) => res.status === 200,
  // });

  // if (checkincomes) {
  //   console.log(`VU ${__VU} pass: ${incomes_response.status}`);

  // }
  // if (!checkincomes) {
  //   console.log(`VU ${__VU} fail: ${incomes_response.status}`);
  // }

  // console.log(incomes_response)

  // sleep(sleepTime)
  // const amenities_payload = {
  //   payload: [
  //     {
  //       code: "8e9183c8-8595-446e-b11b-94fc70b047ea",
  //       value: true
  //     }
  //   ]
  // }

  // const amenitiies_url = `https://federal-qa-test.mifix.io/main/customer/${customerId}/amenities`
  // const amenities_response = http.post(amenitiies_url,
  //   JSON.stringify(amenities_payload),
  //   { headers }
  // );

  // console.log(amenities_response.body)

  // const checkamenities = check(amenities_response, {
  //   'amenities': (res) => res.status === 200,
  // });

  // if (checkamenities) {
  //   console.log(`VU ${__VU} pass: ${amenities_response.status}`);

  // }
  // if (!checkamenities) {
  //   console.log(`VU ${__VU} fail: ${amenities_response.status}`);
  // }

  // sleep(sleepTime)
  // const expenses_payload = {

  //   payload: [
  //     {
  //       type: "RECURRING-EXPENSE",
  //       code: "daffba40-5ef8-4ab2-b8c6-95b0e3ef33c4",
  //       value: 220000
  //     }
  //   ]

  // }

  // const expenses_url = `https://federal-qa-test.mifix.io/main/customer/${customerId}/expenses`
  // const expenses_response = http.post(expenses_url,
  //   JSON.stringify(expenses_payload),
  //   { headers }
  // );

  // console.log(expenses_response.body)

  // const checkexpenses = check(expenses_response, {
  //   'expenses': (res) => res.status === 200,
  // });

  // if (checkexpenses) {
  //   console.log(`VU ${__VU} pass: ${expenses_response.status}`);

  // }
  // if (!checkexpenses) {
  //   console.log(`VU ${__VU} fail: ${expenses_response.status}`);
  // }

  // sleep(sleepTime)

  // const randomUUID = uuidv4();
  // const k = randomUUID;

  // const kyc_form_Data = new FormData();
  // kyc_form_Data.append('files', http.file(img1, '20.jpg', 'image/jpg'));
  // kyc_form_Data.append('files', http.file(img2, '21.jpg', 'image/jpg'));
  // kyc_form_Data.append('metadata', 'LWPPS4656A')
  // kyc_form_Data.append('type', 'PAN')

  // const kyc_form_data_url = `https://federal-qa-test.mifix.io/main//customer/${customerId}/member/${k}/uploadMember`


  // const kyc_householmember_response = http.post(kyc_form_data_url, kyc_form_Data.body(), {
  //   headers: {
  //     'Content-Type': 'multipart/form-data; boundary=' + kyc_form_Data.boundary,
  //     'Authorization': `Bearer ${TOKEN}`,
  //     'partner-id': 'SH-SHC'
  //   },

  // });

  // console.log(kyc_householmember_response.body);

  // const checkhouseholdmemberekyc = check(kyc_householmember_response, {
  //   'householdmemberekycs': (res) => res.status === 200,
  // });

  // if (checkhouseholdmemberekyc) {
  //   console.log(`VU ${__VU} pass: ${kyc_householmember_response.status}`);

  // }
  // if (!kyc_householmember_response) {
  //   console.log(`VU ${__VU} fail: ${kyc_householmember_response.status}`);
  // }

  // const household_member_income_payload = {

  //   payload: [
  //     {
  //       id: k,
  //       dob: "1994-10-13",
  //       fullName: "Hdhege",
  //       gender: "18e33d33-18ad-4d60-9843-0eaf845f5636",
  //       relationship: "21638999-0f27-41d6-a2bf-4a79136c854d",
  //       isNominee: true,
  //       incomeDetails: [
  //         {
  //           employmentType: "6da8663e-c624-4fe5-acc9-626acec513b2",
  //           frequencyOfIncome: "MON",
  //           income: 10000,
  //           incomeProofId: " ",
  //           designation: "8363e16c-1686-49f9-9f6d-c4c1d1917767",
  //           occupation: "e42c22bb-d6d5-47e0-bf8e-3e92b93efa40",
  //           type: "PRIMARY"
  //         }
  //       ]
  //     }
  //   ]

  // }

  // const householdincomes_url = `https://federal-qa-test.mifix.io/main/customer/${customerId}/members`
  // const householdincome_response = http.post(householdincomes_url,
  //   JSON.stringify(household_member_income_payload),
  //   { headers }
  // );

  // console.log(householdincome_response.body)

  // const checkhouseholdincome = check(householdincome_response, {
  //   'householdincomes': (res) => res.status === 200,
  // });

  // if (checkhouseholdincome) {
  //   console.log(`VU ${__VU} pass: ${householdincome_response.status}`);

  // }
  // if (!checkhouseholdincome) {
  //   console.log(`VU ${__VU} fail: ${householdincome_response.status}`);
  // }

  // const eligibilty_url = `https://federal-qa-test.mifix.io/main/customer/${customerId}/eligibility`

  // const eligibity_response = http.get(eligibilty_url,
  //   { headers }
  // );

  // const checkeligibility = check(eligibity_response, {
  //   'eligibility': (res) => res.status === 200,
  // });


  // if (checkeligibility) {
  //   console.log(`VU ${__VU} pass: ${eligibity_response.status}`);

  // }
  // if (!checkeligibility) {
  //   console.log(`VU ${__VU} fail: ${eligibity_response.status}`);
  // }

  // const calucalate_emi_url = `https://federal-qa-test.mifix.io/main/customer/${customerId}/calculate`

  // const caluclate_emi_payload = {
  //   payload: {
  //     amount: 50000,
  //     tenure: 24
  //   }
  // }

  // const emi_response = http.post(calucalate_emi_url,
  //   JSON.stringify(caluclate_emi_payload),
  //   { headers }
  // );

  // const check_emi = check(emi_response, {
  //   'calculateemi': (res) => res.status === 200,
  // });

  // if (check_emi) {
  //   console.log(`VU ${__VU} pass: ${emi_response.status}`);

  // }
  // if (!check_emi) {
  //   console.log(`VU ${__VU} fail: ${emi_response.status}`);
  // }

  // console.log(emi_response);

  // const l2_submit_api_url = `https://federal-qa-test.mifix.io/main/customer/${customerId}/household/submit`

  // const l1_submit_payload = {
  //   payload: {
  //     optedLoan: {
  //       amount: 50000,
  //       tenure: 24,
  //       purpose: "7d5bac9e-b41e-4ebf-818f-dbf95a73aabb",
  //       netWorth: 12000
  //     },
  //     consent: true,
  //     otp: 654321
  //   }
  // }

  // const l2_submit_response = http.post(
  //   l2_submit_api_url,
  //   JSON.stringify(l1_submit_payload), { headers }
  // )

  // console.log(l2_submit_response.body);

  // const check_l2_submit = check(l2_submit_response, {
  //   'household_details_submission': (res) => res.status === 200,
  // });

  // if (check_l2_submit) {
  //   console.log(`VU ${__VU} pass: ${l2_submit_response.status}`);

  // }
  // if (!check_l2_submit) {
  //   console.log(`VU ${__VU} fail: ${l2_submit_response.status}`);
  // }

  // const householddetails_list = http.post(
  //   'https://federal-qa-test.mifix.io/main/customer/list',
  //   JSON.stringify(householddetails_payload),
  //   { headers }

  // )

  // console.log(householddetails_list.body)

  // const checkHouseholddetails = check(householddetails_list, {
  //   'HouseHold_Details_List': (res) => res.status === 200,
  // });

  // if (checkHouseholddetails) {
  //   console.log(`VU ${__VU} pass: ${householddetails_list.status}`);

  // }
  // if (!checkHouseholddetails) {
  //   console.log(`VU ${__VU} fail: ${householddetails_list.status}`);
  // }

  // sleep(40)
  // console.log(customerId);

  // const proof_of_account_images = new FormData();
  // proof_of_account_images.append('files', http.file(img1, '20.jpg', 'image/jpg'));
  // proof_of_account_images.append('files', http.file(img2, '21.jpg', 'image/jpg'));
  // proof_of_account_images.append('type', 'BANK_ACCOUNT_PROOF');

  // const proof_of_account_url = `https://federal-qa-test.mifix.io/main/customer/${customerId}/upload`
  // const proof_of_account_response = http.post(proof_of_account_url, proof_of_account_images.body(), {
  //   headers: {
  //     'Content-Type': 'multipart/form-data; boundary=' + proof_of_account_images.boundary,
  //     'Authorization': `Bearer ${TOKEN}`,
  //     'partner-id': 'SH-SHC'
  //   },

  // });

  // console.log(proof_of_account_response.body);

  // const proof_of_account = check(proof_of_account_response, {
  //   'proof_of_account': (res) => res.status === 200,
  // });

  // if (proof_of_account) {
  //   console.log(`VU ${__VU} pass: ${proof_of_account_response.status}`);

  // }
  // if (!proof_of_account) {
  //   console.log(`VU ${__VU} fail: ${proof_of_account_response.status}`);
  // }

  // const bank_account_details_payload = {
  //   payload: {
  //     disbursementPreference: "OTHER",
  //     bankDetails: {
  //       accountHolderName: "ramesh",
  //       accountNumber: "10990200087021",
  //       ifsc: "FDRL0001437",
  //       branchName: "IOB",
  //       branchAddress: "CHETNA_APARTMENTS, J.M.ROAD, BHANDUP, MUMBAI-400078"
  //     }
  //   }
  // }

  // const bank_account_details_url = `https://federal-qa-test.mifix.io/main/customer/${customerId}/account`
  // const bank_account_details_response = http.post(bank_account_details_url,
  //   JSON.stringify(bank_account_details_payload),
  //   { headers });

  // console.log(bank_account_details_response.body);

  // const bank_account_details = check(bank_account_details_response, {
  //   'bank_account_details': (res) => res.status === 200,
  // });

  // if (bank_account_details) {
  //   console.log(`VU ${__VU} pass: ${bank_account_details_response.status}`);

  // }
  // if (!bank_account_details) {
  //   console.log(`VU ${__VU} fail: ${bank_account_details_response.status}`);
  // }

  // sleep(10)

  // const bank_account_details_list = http.post(
  //   'https://federal-qa-test.mifix.io/main/customer/list',
  //   JSON.stringify(bankaccount_details_payload),
  //   { headers }

  // )

  // console.log(bank_account_details_list.body)
  // const check_bank_account_detilas = check(bank_account_details_list, {
  //   'Bank_Account_Details': (res) => res.status === 200,
  // });

  // if (check_bank_account_detilas) {
  //   console.log(`VU ${__VU} pass: ${bank_account_details_list.status}`);

  // }
  // if (!check_bank_account_detilas) {
  //   console.log(`VU ${__VU} fail: ${bank_account_details_list.status}`);
  // }
}

export function groupcreated() {



  const TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0M20wU1p4bjQ4S0tZWmNjVjY3NndmaGdDZTQ2dGdZa3VNVk1OdkU3QVBFIn0.eyJleHAiOjE3MTA4NTk4MjcsImlhdCI6MTcxMDg1NjIyNywianRpIjoiMDMzOWM2NDYtZDk4Mi00NmMyLWEzNzctM2VhZWIxNGQ3NzFlIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5taWZpeC5pby9yZWFsbXMvc2hlY29tbSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIxOTU5ZWJmOC1jNzQ2LTQwM2ItYTY5Mi04Njk5NDExYmVjNmIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzaGVDb21tZXJ6LWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiIyMTJlYzg4ZS01NDZiLTRkMTQtOWVkYi05ZTI0M2UxYjI0MDMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXNoZWNvbW0iLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIHVzZXItYXR0cmlidXRlcyIsInNpZCI6IjIxMmVjODhlLTU0NmItNGQxNC05ZWRiLTllMjQzZTFiMjQwMyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcm9kdWN0SWQiOiJQRC1GRUQtSkxHIiwicm9sZUNvZGUiOiJSTzEwMDAyIiwibmFtZSI6ImZFcEtSdVBsZlAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1cy1zaC1zaGMtNjQ5NDQiLCJnaXZlbl9uYW1lIjoiZkVwS1J1UGxmUCIsImVtYWlsIjoieTlwYTJoQGdtYWlsLmNvbSJ9.KpOO_sYRAXrRqnyoRSoodtu3DlPC5EJqcFwRgTucurWoliqdoj4xtmk5DX28j-oFt2fPyDKINiVATSRQY6KGsysb-GflqXHHI-xV7y3oF5SHFURRCQkJXIlRvBXfLxq1pdphtgd60xbNibFe051tkPbV8Efv3DnGCOG56Kcf6qZRiS-XnG4BXZ7Fre7ubXjsMkceZWdmbEjH_u0LY2XMHAP-YASf3IPP4y_19NDRSZOpLns5kC-bUBitUj9FgDn-S2JkJhIWMGmsG_YU3wurrEH4Trbyyl0CJkGweXGz_T3A50UGSXa69gOde8WWPCabfcO6oTOe9F2eQ6VoiPHmYQ"
  const headers = {
    'Content-Type': 'application/json',
    'partner-id': 'SH-SHC',
    'api-key': "QOOTkgzbC4dDic2bhFLVH13xCXnDKEsjoH92hBxFI7YL01pZorYfm13IbrUuIsmf"
  };


  const group_creation_headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
    'partner-id': 'SH-SHC'
  };
  const lifecycle_payload = {

    payload: {
      lifecycle: [
        {
          level: "BANK_ACCOUNT_DETAILS",
          status: "SUBMITTED"
        }
      ],
      verifiedBy: [
        "us-sh-shc-34566"
      ]
    }

  }

  const lifecyle_url = `https://federal-qa-test.mifix.io/lifecycle/v1/customer/count/current`
  const lifecycle_response = http.post(lifecyle_url,
    JSON.stringify(lifecycle_payload), { headers });

  console.log(lifecycle_response.body);


  const lifecycle = check(lifecycle_response, {
    'lifecycle_current': (res) => res.status === 200,
  });


  if (lifecycle) {
    console.log(`VU ${__VU} pass: ${lifecycle_response.status}`);

  }
  if (!lifecycle) {
    console.log(`VU ${__VU} fail: ${lifecycle_response.status}`);
  }




  const customerid_json = JSON.parse(lifecycle_response.body);
  const customerids = customerid_json.payload.data[0].customers;
  console.log(customerids)


  console.log(customerids[0]);


  const group_creation_payload = {
    payload: {
      customers: [
        customerids[0],
        customerids[1],
        customerids[2],
        customerids[3]
      ],
      groupHead: customerids[3],
      villageName: "HOSUR"
    }
  }


  console.log(group_creation_payload);




  const group_creation_url = `https://federal-qa-test.mifix.io/main/group/create`;
  const group_creation_response = http.post(
    group_creation_url,
    JSON.stringify(group_creation_payload),
    { headers: group_creation_headers }
  )

  console.log(group_creation_response.body);


  const group_creation = check(group_creation_response, {
    'group_creation': (res) => res.status === 200,
  });


  if (group_creation) {
    console.log(`VU ${__VU} pass: ${group_creation_response.status}`);

  }
  if (!group_creation) {
    console.log(`VU ${__VU} fail: ${group_creation.status}`);
  }


}

export function verification() {


  const TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0M20wU1p4bjQ4S0tZWmNjVjY3NndmaGdDZTQ2dGdZa3VNVk1OdkU3QVBFIn0.eyJleHAiOjE3MTA4NTk4NzQsImlhdCI6MTcxMDg1NjI3NCwianRpIjoiYjQ2NjFhMjMtNzhmMC00NTk5LTkxNTctZThmMTBiMGQyOTAyIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5taWZpeC5pby9yZWFsbXMvc2hlY29tbSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmMjZjYzA3NS0wOTE1LTQyMTMtODdhNy03MTFmZDY0NzcwYTEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzaGVDb21tZXJ6LWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiJiZTExZWQ1Ny0wYjBiLTQ1MWUtYWI5NC05YTJiNTNiZjVhMDUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXNoZWNvbW0iLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIHVzZXItYXR0cmlidXRlcyIsInNpZCI6ImJlMTFlZDU3LTBiMGItNDUxZS1hYjk0LTlhMmI1M2JmNWEwNSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcm9kdWN0SWQiOiJQRC1GRUQtSkxHIiwicm9sZUNvZGUiOiJSTzEwMDA4IiwibmFtZSI6Implb2lmZWZlb2Zlb29maiIsInByZWZlcnJlZF91c2VybmFtZSI6InVzLXNoLXNoYy0zNDU2NyIsImdpdmVuX25hbWUiOiJqZW9pZmVmZW9mZW9vZmoiLCJlbWFpbCI6ImllbmZlYnZydmllQGdtYWlsLmNvbSJ9.LN3xWi0tb8ueOQYoxw-SN4fJFjTG2WGzNwAUfe2r7YlQvWhWFzy3HE2WoMZDcQvwwiR0U8K7HNSgC0S6aT1Q6dN7WMUSQgolgINnmIPNaJ5zoh7MTWbsivVsjx-rqehauU6I3w1s2S-H80JtFZqT6iRgh9ptLBgRh2mLt7307Qf0nSQmDjhT3gWUEUqR-_PdkOjr5UH8L4mKQJlKtTQl5Q5GjICk0X8Go84UeYs-0qa-f7EbmT-XitXs4cs6AZToKh3w9x5ku9KYyRfL79blxBpc4pb5B9VfTyXTt88hQpJFml5u2QyNO3VGAWz0QQdf9XMlZKYnTia06pH-My6k3Q"
  const headers = {
    'Content-Type': 'application/json',
    'partner-id': 'SH-SHC',
    'api-key': "QOOTkgzbC4dDic2bhFLVH13xCXnDKEsjoH92hBxFI7YL01pZorYfm13IbrUuIsmf"
  };


  const group_verification_headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
    'partner-id': 'SH-SHC'
  };
  const lifecycle_payload = {

    payload: {
      lifecycle: [
        {
          level: "GROUP",
          status: "CREATED"
        }
      ],
      verifiedBy: [
        "us-sh-shc-70703"
      ]
    }

  }

  const lifecyle_url = `https://federal-qa-test.mifix.io/lifecycle/v1/group/count/current`
  const lifecycle_response = http.post(lifecyle_url,
    JSON.stringify(lifecycle_payload), { headers });

  console.log(lifecycle_response.body);


  const lifecycle = check(lifecycle_response, {
    'lifecycle_current': (res) => res.status === 200,
  });


  if (lifecycle) {
    console.log(`VU ${__VU} pass: ${lifecycle_response.status}`);

  }
  if (!lifecycle) {
    console.log(`VU ${__VU} fail: ${lifecycle_response.status}`);
  }




  const groups_json = JSON.parse(lifecycle_response.body);
  const group_ids = groups_json.payload.data[0].groups;
  console.log(group_ids)

  console.log(group_ids[0]);

  const group_members_url = `https://federal-qa-test.mifix.io/main/group/${group_ids[0]}/groupMembers`
  const group_members_response = http.get(group_members_url,
    { headers: group_verification_headers });

  console.log(group_members_response.body);


  const group_members = check(group_members_response, {
    'group_members_verification': (res) => res.status === 200,
  });


  if (group_members) {
    console.log(`VU ${__VU} pass: ${group_members_response.status}`);

  }
  if (!group_members) {
    console.log(`VU ${__VU} fail: ${group_members_response.status}`);
  }

  const cust_id_arrays_json = JSON.parse(group_members_response.body);
  const customerId = Array.from(cust_id_arrays_json.payload.data.groupMembers, el => el.custId)


  const residence_photo = new FormData();
  residence_photo.append('files', http.file(img3, '23.jpg', 'image/jpg'));
  residence_photo.append('type', 'RESIDENCE_PHOTO');

  const residence_photo_url = `https://federal-qa-test.mifix.io/main/customer/${customerId[0]}/upload`



  const residence_photo_response = http.post(
    residence_photo_url,
    residence_photo.body(), {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=' + residence_photo.boundary,
      'Authorization': `Bearer ${TOKEN}`,
      'partner-id': 'SH-SHC'
    },

  });

  console.log(residence_photo_response.body);

  const residence_photo_log = check(residence_photo_response, {
    'upload_residence_photo': (res) => res.status === 200,
  });


  if (residence_photo_log) {
    console.log(`VU ${__VU} pass: ${residence_photo_response.status}`);

  }
  if (!residence_photo_log) {
    console.log(`VU ${__VU} fail: ${residence_photo_response.status}`);
  }


  const residencephoto_id = JSON.parse(residence_photo_response.body);
  const id = residencephoto_id.payload.data.id;
  console.log(id);


  const verification_payload = {
    payload: {
      groupId: group_ids[0],
      landHolding: "8da77e2a-dcdd-42e4-ac5c-3e75b56b063b",
      residence: {
        natureOfResidence: "8da77e2a-dcdd-42e4-ac5c-3e75b56b063b",
        houseType: "8da77e2a-dcdd-42e4-ac5c-3e75b56b063b",
        durationOfStay: "2023-01-01",
        docId: id,
        coOrdinates: {
          latitude: "38.8951",
          longitude: "-77.0364"
        }
      },
      reasons: [
        "4c84b227-f411-422a-8cba-e11b68759b07",
        "0584f767-eb12-4a85-9e76-2b6b6e1c46d6"
      ],
      status: true,
      comments: ""
    }
  }

  const verification_url = `https://federal-qa-test.mifix.io/main/customer/${customerId[0]}/fieldVerification`

  const verification_response = http.post(
    verification_url,
    JSON.stringify(verification_payload),
    { headers: group_verification_headers }

  )

  console.log(verification_response.body);

  const customer_verification = check(verification_response, {
    'customer_verification': (res) => res.status === 200,
  });


  if (customer_verification) {
    console.log(`VU ${__VU} pass: ${verification_response.status}`);

  }
  if (!customer_verification) {
    console.log(`VU ${__VU} fail: ${verification_response.status}`);
  }









}

export function final_confirmation() {

  const TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0M20wU1p4bjQ4S0tZWmNjVjY3NndmaGdDZTQ2dGdZa3VNVk1OdkU3QVBFIn0.eyJleHAiOjE3MTA4NTk4NzQsImlhdCI6MTcxMDg1NjI3NCwianRpIjoiYjQ2NjFhMjMtNzhmMC00NTk5LTkxNTctZThmMTBiMGQyOTAyIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5taWZpeC5pby9yZWFsbXMvc2hlY29tbSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmMjZjYzA3NS0wOTE1LTQyMTMtODdhNy03MTFmZDY0NzcwYTEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzaGVDb21tZXJ6LWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiJiZTExZWQ1Ny0wYjBiLTQ1MWUtYWI5NC05YTJiNTNiZjVhMDUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXNoZWNvbW0iLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIHVzZXItYXR0cmlidXRlcyIsInNpZCI6ImJlMTFlZDU3LTBiMGItNDUxZS1hYjk0LTlhMmI1M2JmNWEwNSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcm9kdWN0SWQiOiJQRC1GRUQtSkxHIiwicm9sZUNvZGUiOiJSTzEwMDA4IiwibmFtZSI6Implb2lmZWZlb2Zlb29maiIsInByZWZlcnJlZF91c2VybmFtZSI6InVzLXNoLXNoYy0zNDU2NyIsImdpdmVuX25hbWUiOiJqZW9pZmVmZW9mZW9vZmoiLCJlbWFpbCI6ImllbmZlYnZydmllQGdtYWlsLmNvbSJ9.LN3xWi0tb8ueOQYoxw-SN4fJFjTG2WGzNwAUfe2r7YlQvWhWFzy3HE2WoMZDcQvwwiR0U8K7HNSgC0S6aT1Q6dN7WMUSQgolgINnmIPNaJ5zoh7MTWbsivVsjx-rqehauU6I3w1s2S-H80JtFZqT6iRgh9ptLBgRh2mLt7307Qf0nSQmDjhT3gWUEUqR-_PdkOjr5UH8L4mKQJlKtTQl5Q5GjICk0X8Go84UeYs-0qa-f7EbmT-XitXs4cs6AZToKh3w9x5ku9KYyRfL79blxBpc4pb5B9VfTyXTt88hQpJFml5u2QyNO3VGAWz0QQdf9XMlZKYnTia06pH-My6k3Q"
  //   'Content-Type': 'application/json',
  //   'partner-id':'SH-SHC',
  //   'api-key':"QOOTkgzbC4dDic2bhFLVH13xCXnDKEsjoH92hBxFI7YL01pZorYfm13IbrUuIsmf"
  // };


  const group_final_confiramtion_headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
    'partner-id': 'SH-SHC'
  };
  const lifecycle_payload = {
    payload: {
      lifecycleStages: [
        {
          level: "GROUP_PENNY_DROP",
          status: "SUCCESS"
        }
      ],
      skip: 0,
      limit: 20

    }

  }

  const lifecyle_url = `https://federal-qa-test.mifix.io/main/group/list`
  const lifecycle_response = http.post(lifecyle_url,
    JSON.stringify(lifecycle_payload), { headers: group_final_confiramtion_headers });

  console.log(lifecycle_response.body);


  const lifecycle = check(lifecycle_response, {
    'lifecycle_current': (res) => res.status === 200,
  });


  if (lifecycle) {
    console.log(`VU ${__VU} pass: ${lifecycle_response.status}`);

  }
  if (!lifecycle) {
    console.log(`VU ${__VU} fail: ${lifecycle_response.status}`);
  }




  const groups_json = JSON.parse(lifecycle_response.body);
  const group_ids = Array.from(groups_json.payload.data.groups, el => el.groupId)
  console.log(group_ids)

  console.log(group_ids[0]);

  const group_members_url = `https://federal-qa-test.mifix.io/main/group/${group_ids[0]}/groupMembers`
  const group_members_response = http.get(group_members_url,
    { headers: group_final_confiramtion_headers });

  console.log(group_members_response.body);


  const group_members = check(group_members_response, {
    'groups_final_confirmation': (res) => res.status === 200,
  });


  if (group_members) {
    console.log(`VU ${__VU} pass: ${group_members_response.status}`);

  }
  if (!group_members) {
    console.log(`VU ${__VU} fail: ${group_members_response.status}`);
  }

  const cust_id_arrays_json = JSON.parse(group_members_response.body);
  const customerId = Array.from(cust_id_arrays_json.payload.data.groupMembers, el => el.custId)
  const nominee_ids = Array.from(cust_id_arrays_json.payload.data.groupMembers, el => el.nominee.id);
  console.log(nominee_ids);
  console.log(customerId);


  const group_photo_url = `https://federal-qa-test.mifix.io/main/group/${group_ids[0]}/upload`

  const group_photo = new FormData();
  group_photo.append('files', http.file(img3, '23.jpg', 'image/jpg'));
  group_photo.append('type', 'GROUP_PHOTO');


  const group_photo_response = http.post(group_photo_url, group_photo.body(), {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=' + group_photo.boundary,
      'Authorization': `Bearer ${TOKEN}`,
      'partner-id': 'SH-SHC'
    },

  });

  console.log(group_photo_response.body);


  const group_photo_upload = check(group_photo_response, {
    'group_photo_upload': (res) => res.status === 200,
  });


  if (group_photo_upload) {
    console.log(`VU ${__VU} pass: ${group_photo_response.status}`);

  }
  if (!group_photo_upload) {
    console.log(`VU ${__VU} fail: ${group_photo_response.status}`);
  }



  const customer_signature_upload = new FormData();
  customer_signature_upload.append('files', http.file(img3, '23.jpg', 'image/jpg'));
  customer_signature_upload.append('type', 'CUSTOMER_SIGNATURE');

  const customer_signature_url = `https://federal-qa-test.mifix.io/main/customer/${customerId[0]}/upload`;
  const customer_signature_response = http.post(
    customer_signature_url,
    customer_signature_upload.body(), {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=' + customer_signature_upload.boundary,
      'Authorization': `Bearer ${TOKEN}`,
      'partner-id': 'SH-SHC'
    },

  });

  console.log(customer_signature_response.body);

  const customer_signature = check(customer_signature_response, {
    'upload_customer_signature': (res) => res.status === 200,
  });


  if (customer_signature) {
    console.log(`VU ${__VU} pass: ${customer_signature_response.status}`);

  }
  if (!customer_signature) {
    console.log(`VU ${__VU} fail: ${customer_signature_response.status}`);
  }




  const nominee_photo = new FormData();
  nominee_photo.append('files', http.file(img3, '23.jpg', 'image/jpg'));
  nominee_photo.append('type', 'NOMINEE_PHOTO');


  const nominee_photo_upload_url = `https://federal-qa-test.mifix.io/main/customer/${customerId[2]}/member/${nominee_ids[2]}/uploadMember`
  const nominee_photo_response = http.post(
    nominee_photo_upload_url,
    nominee_photo.body(), {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=' + nominee_photo.boundary,
      'Authorization': `Bearer ${TOKEN}`,
      'partner-id': 'SH-SHC'
    },

  });

  console.log(nominee_photo_response.body);

  const nominee_photo_upload = check(nominee_photo_response, {
    'Nominee Photo': (res) => res.status === 200,
  });


  if (nominee_photo_upload) {
    console.log(`VU ${__VU} pass: ${nominee_photo_response.status}`);

  }
  if (!nominee_photo_upload) {
    console.log(`VU ${__VU} fail: ${nominee_photo_upload.status}`);
  }



  const collection_due_date_payload = {
    payload: {
      day: "tuesday",
      week: 1
    }
  }

  const collection_due_date_url = `https://federal-qa-test.mifix.io/main/group/${group_ids[0]}/duedate`

  const collection_due_date_response = http.post(
    collection_due_date_url,
    JSON.stringify(collection_due_date_payload),
    { headers: group_final_confiramtion_headers }
  )


  console.log(collection_due_date_response.body);
  const collection_due_date_set = check(collection_due_date_response, {
    'Collection Due Date': (res) => res.status === 200,
  });


  if (collection_due_date_set) {
    console.log(`VU ${__VU} pass: ${collection_due_date_response.status}`);

  }
  if (!collection_due_date_set) {
    console.log(`VU ${__VU} fail: ${collection_due_date_response.status}`);
  }















}

export default function () {

  onboardingcustomer();
  // groupcreated();
  // verification();
  // final_confirmation();
  // Internal_cph();
  // Loan_Approval();


}

export function teardown(data) {


  console.log("Load")
}
