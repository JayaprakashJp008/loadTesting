import { randomString } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import { config } from "../config.js";
const auaSpecificUidToken = randomString(25);
const trasanction_id = randomString(12);
function generateRandomNumber() {
    return (Math.floor(Math.random() * 900000000000) + 100000000000).toString();
}

export const L1Payload = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer token`,
        'partner-id': 'SH-FED',
        'client': 'federal-agri',
        'product-id': 'PD-FED-KCC',
        'client': 'federal-agri'
    },

    loginPayload: config.logins,

    onboardCustomerPayload: {
        payload: {
            auaSpecificUidToken: auaSpecificUidToken,
            transactionId: `ekyc_${trasanction_id}`,
            aadharNumber: generateRandomNumber(),
            demographics: {
                fullName: "Ramesh",
                careof: "C/O: Simhadri Venkateswarlu",
                dob: "1989-05-05",
                gender: "18f5c8df-b956-455c-9c99-97f78da1b770"
            }
        }
    },

    createDemographicsPayload: {
        payload: {
            address: [
                {
                    houseNo: "NST House",
                    landmark: "Near IHRD College",
                    locality: "Bangalore",
                    pincode: "624622",
                    state: "Tamilnadu",
                    street: "Indira nagar",
                    type: "PERMANENT",
                    vtc: "Bangalore"
                },
                {
                    houseNo: "NST House",
                    landmark: "Near IHRD College",
                    locality: "Bangalore",
                    pincode: "624622",
                    state: "Tamilnadu",
                    street: "Indira nagar",
                    type: "CURRENT",
                    vtc: "Bangalore"
                }
            ],
            bankInfo: {
                cityCode: "c84936fc-6956-4a08-9bbe-13d966a7a686",
                districtCode: "76bc9441-d7e6-4392-aaf1-e7cbedda5b46",
                stateCode: "0d1b7019-0525-48ce-bb93-2049a20bc540",
                solId: "96d54c21-e26a-4520-849d-4db0e9be4b35"
            },
            demographics: {
                altMobileNumber: "5558899696",
                educationalQualification: "13d7fce6-8b0c-4f22-8951-840fab798d59",
                ethnicity: "27ae2cc8-12b4-4e5c-9062-ca83a0868b7d",
                fatherName: "God",
                maritalStatus: "abe5f1ea-4a8f-4769-a27a-4910e8efa96b",
                mobileNumber: "7760452174",
                motherName: "Sea"
            }
        }
    },

    customerListPayload: config.customerList,
}