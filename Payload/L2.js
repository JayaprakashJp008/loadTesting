export const L2Payload = {
  createSurveyPayload: {
    payload: {
      state: "fec180c1-9c0a-4d0a-8a54-068634c6adbc",
      district: "0a94096a-aba8-4b7a-9e07-3628a7f1bcf2",
      taluk: "55e77aa6-de41-42b1-a59c-a0a1240b19e7",
      village: "99aca355-6033-4d31-a95d-cdd74441dad7",
      surveyNumber: "34",
      subDivisionNumber: "2A",
      landOwnerName: "ravi",
      pattaChittaNumber: 3856,
      landExtentHechtares: 1.3,
      isJointPatta: false,
      landClassification: "21d4d5e7-f017-4aba-8c07-455b20041c1f",
      isVerified: true,
      landDocumentType: "21d4d5e7-f017-4aba-8c07-465c21041c1f",
      //"possessionCertificate": "73bd8abc-54c1-4e3f-a89a-41fe51c57a35",
      //"encumbranceCertificate": "73bd8abc-54c1-4e3f-a89a-41fe51c57a35",
      //"agriDocumentImage": "73bd8abc-54c1-4e3f-a89a-41fe51c57a35",
      //"agriLandImage": "73bd8abc-54c1-4e3f-a89a-41fe51c57a35",
      //"landHoldingByApplicant":0.3
    },
  },

  createAlliedInfoPayload: {
    payload: {
      animal: "AN10000",
      numberOfAnimals: 10,
      breed: "Cow",
      alliedSOF: "08e394ca-aa03-4f47-944f-5825781df696",
      milkSociety: "MS10013",
    },
  },

  createHouseholdmemberPayload: {
    payload: [
      {
        dob: "1980-12-11",
        fullName: "Hdhege",
        gender: "18e33d33-18ad-4d60-9843-0eaf845f5636",
        relationship: "38b259ee-1a08-42ef-a4b4-6996aeadb139",
        isNominee: true,
      },
    ],
  },

  createIncomePayload: {
    payload: [
      {
        occupation: "564618d7-642c-41a7-956c-06641668212b",
        income: 30000,
      },
    ],
  },

  createIncomeExpenditurePayload: [
    {
      payload: {
        animalId: "AN10000",
        noOfUnits: 10,
        noOfLiters: 12,
        noOfMilkingDays: 270,
        rate: 30,
        income: 15000,
        netIncome: 25000,
        year: "2022",
      },
    },
    {
      payload: {
        animalId: "AN10000",
        noOfUnits: 10,
        noOfLiters: 12,
        noOfMilkingDays: 270,
        rate: 30,
        income: 15000,
        netIncome: 25000,
        year: "2023",
      },
    },
  ],

  createBankAssessmentPayload: {
    payload: {
      // "comments": "Test comment",
      questions: [
        {
          question: "e618a6b9-ddaf-4317-a607-addbb0244626",
          answer: "e618a6b9-ddaf-4317-a607-addbb0244626",
        },
        {
          question: "66f465b8-a4ee-44d6-b34a-25d5c7872ad4",
          answer: "6",
        },
        {
          question: "82a3586f-dc44-417b-8ee0-2980bebde347",
          answer: "12",
        },
        {
          question: "21d4d5e7-f017-4aba-8c07-466b21131c1f",
          answer: "21d4d5e7-f017-4aba-8c07-466b21131c1f",
        },
        {
          question: "21d4d5e7-f017-4aba-8c07-465b21141c1f",
          answer: "21d4d5e7-f017-4aba-8c07-465b21141c1f",
        },
        {
          question: "21d4d5e7-f017-4aba-8c07-467c21151c1f",
          answer: "21d4d5e7-f017-4aba-8c07-467c21151c1f",
        },
        {
          question: "21d4d5e7-f017-4aba-8c07-467c21141c1f",
          answer: "21d4d5e7-f017-4aba-8c07-467c21141c1f",
        },
        {
          question: "21d4d5e7-f017-4aba-8c07-467c23141c1f",
          answer: "21d4d5e7-f017-4aba-8c07-467c23141c1f",
        },
        {
          question: "21d4d5e7-f017-4aba-8c07-467c25141c1f",
          answer: "21d4d5e7-f017-4aba-8c07-467c25141c1f",
        },
        {
          question: "c42a0ae8-b53d-4855-93f6-36b078d6e142",
          answer: "2",
        },
      ],
    },
  },

  createLoanDetailsPayload: {
    payload: {
      code: "77007",
      loanTenorInMonths: 24,
      optedAmount: 80000,
    },
  },
};
