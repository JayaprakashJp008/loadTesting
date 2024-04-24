import { randomString } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

const auaSpecificUidToken = randomString(25);
const trasanction_id = randomString(12);

function generateRandomNumber() {
    return (Math.floor(Math.random() * 900000000000) + 100000000000).toString();
}

export const payload = {
    loginPayload: {
        payload: {
            employeeId: "us-sh-fed-54321",
            password: "Nst@1234"
        }
    },

    onboardCustomerPayload: {
        payload: {
            auaSpecificUidToken: auaSpecificUidToken,
            transactionId: trasanction_id,
            aadharNumber: generateRandomNumber(),
            demographics: {
                fullName: "Ramesh",
                careof: "C/O: Simhadri Venkateswarlu",
                dob: "1989-05-05",
                gender: "18f5c8df-b956-455c-9c99-97f78da1b770"
            }
        }
    },

    createAlliedInfoPayload: {
        payload: {
            animal: 'AN10001',
            numberOfAnimals: 2,
            breed: 'Buffalo',
            alliedSOF: '5a23808f-031e-42f9-a31c-c2e6fcabb219',
            milkSociety: 'MAS10013'
        }
    },

    createHouseholdmemberPayload: {
        payload: [
            {
                dob: "1980-12-11",
                fullName: "Hdhege",
                gender: "18e33d33-18ad-4d60-9843-0eaf845f5636",
                relationship: "38b259ee-1a08-42ef-a4b4-6996aeadb139",
                isNominee: true
            }
        ]
    },

    createIncomePayload: {
        payload: [
            {
                occupation: "564618d7-642c-41a7-956c-06641668212b",
                income: 30000
            }
        ]
    },

}