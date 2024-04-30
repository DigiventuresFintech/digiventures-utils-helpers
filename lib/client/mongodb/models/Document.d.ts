/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
export interface IDocument extends mongoose.Document {
    shortId: string;
    name: string;
    nameSanitized: string;
    firstname: string;
    lastname: string;
    fathersLastname: string;
    mothersLastname: string;
    gender: string;
    civilStatus: string;
    nationality: string;
    referenceCode: string;
    userId: string;
    userIp: string;
    tenantId: string;
    email: string;
    idNumber: string;
    idNumberCountry: string;
    additionalInformation: string;
    additionalInformation2: string;
    additionalInformation3: string;
    additionalInformation4: string;
    additionalInformation5: string;
    fullAddress: string;
    fullAddressSource: string;
    addressStreet: string;
    addressStreetNumber: string;
    addressApt: string;
    addressCity: string;
    addressState: string;
    addressZipCode: string;
    addressSuburb: string;
    addressCountry: string;
    addressCountryScope: string;
    facebookId: string;
    requestedProduct: string;
    maxCapital: number;
    minCapital: number;
    maxInstallments: number;
    simulationProduct: string;
    notch: number;
    paymentDate: Date;
    disbursementDate: Date;
    interest: number;
    fees: number;
    tax: number;
    numberInstallments: number;
    installmentValue: number;
    userDeviceInfo: Schema.Types.Mixed;
    createdAt: Date;
    questionsAnswers: Schema.Types.Mixed;
    questionsAnswers2: Schema.Types.Mixed;
    amount: number;
    pay1: string;
    pay1Back: string;
    installment: number;
    dev: boolean;
    monthlyIncome: number;
    idCardFront: {
        quality: number;
        qualityLicence: number;
        rekognition: Schema.Types.Mixed;
        retries: number;
        dniRekognition: string;
        url: string;
        errors: Schema.Types.Mixed;
        manual: boolean;
        barcode: Schema.Types.Mixed;
        electorCode: string;
        requestData: Schema.Types.Mixed;
        date: Date;
    };
    idCardBack: {
        quality: number;
        qualityLicence: number;
        rekognition: Schema.Types.Mixed;
        retries: number;
        url: string;
        errors: Schema.Types.Mixed;
        manual: boolean;
        requestData: Schema.Types.Mixed;
        ine: Schema.Types.Mixed;
        nubariumOcr: Schema.Types.Mixed;
        date: Date;
    };
    photo: {
        quality: number;
        confidence: number;
        retries: number;
        url: string;
        renaper: Schema.Types.Mixed;
        renaperTimestamp: Date;
        errors: Schema.Types.Mixed;
        manual: boolean;
        requestData: Schema.Types.Mixed;
        date: Date;
    };
    photoValidation: {
        grin: string;
        qualityValidation: number;
        qualityConfidence: number;
        noGlassEyeCloseRight: number;
        noGlassEyeCloseLeft: number;
        noGlassEyeOpenRight: number;
        noGlassEyeOpenLeft: number;
        retries: number;
        url: string;
        errors: Schema.Types.Mixed;
        manual: boolean;
        date: Date;
    };
    videoValidation: Schema.Types.Mixed;
    video: Schema.Types.Mixed;
    bank: {
        account: string;
        format: string;
        bank: string;
        bankId: string;
        verified: boolean;
        tries: number;
        account_type: string;
        currency: string;
        isActive: boolean;
    };
    signature: {
        url: string;
        date: Date;
    };
    payslip: {
        url: string;
        manual: boolean;
        date: Date;
    };
    utility: {
        url: string;
        manual: boolean;
        date: Date;
    };
    cbu: {
        url: string;
        manual: boolean;
        date: Date;
    };
    privacyPolicy: {
        text: string;
        date: Date;
        pdf: string;
    };
    contract: {
        text: string;
        date: Date;
        pdf: string;
    };
    contract2: {
        text: string;
        date: Date;
    };
    legajoComplete: number;
    typeScoring: string;
    statusScoring: number;
    subStatusScoring: number;
    completenessLegajo: number;
    thirdParty: Schema.Types.Mixed;
    verifiedSms: boolean;
    smsTries: number;
    customInputs: Schema.Types.Mixed;
    data: Schema.Types.Mixed;
    source: string;
    mailSent: boolean;
    utms: string;
    arUtms: Schema.Types.Mixed;
    historyUtms: Schema.Types.Mixed;
    questionsAnswersClassification: Schema.Types.Mixed;
    profileClassification: string;
    applicantParent: string;
    coApplicants: Schema.Types.Mixed;
    linkApplicant: string;
    totalComplete: number;
    totalCompleteFinal: boolean;
    enterRecover: boolean;
    enterRepeat: boolean;
    spouseName: string;
    phone: string;
    mobilePhone: string;
    workPhone: string;
    referencePhone: string;
    status: string;
    dateUpdatedStatus: Date;
    linkRecover: string;
    linkLandingNext: string;
    outputUrls: Schema.Types.Mixed;
    rejectionMessage: string;
    notes: [
        {
            title: string;
            content: string;
            attached: string;
        }
    ];
    processed: boolean;
    mailSentStatus: {
        completed: boolean;
        errors: boolean;
        lost: boolean;
    };
    authentication: {
        phone: {
            validated: boolean;
            value: string;
            tries: number;
            fails: number;
            method: string;
            updatedAt: Date;
            code: {
                requested: string;
                input: string;
            };
            dataset: Schema.Types.Mixed;
        };
        email: {
            validated: {
                type: boolean;
                default: false;
            };
            value: string;
            tries: number;
            hash: string;
            link: string;
        };
    };
    simulation: Schema.Types.Mixed;
    simulationTexts: Schema.Types.Mixed;
    requestId: string;
    fingerprint: string;
    information: Schema.Types.Mixed;
    notifications: {
        counters: Schema.Types.Mixed;
        history: [
            {
                rule: string;
                reference: string;
                status: boolean;
                date: Date;
            }
        ];
    };
    external: {
        pipedrive: {
            id: number;
            creator_user_id: number;
            user_id: number;
            person_id: number;
            org_id: number;
            stage: {
                id: number;
                title: string;
                change_time: Date;
            };
            files: [];
            contract: {
                id: number;
                status: boolean;
            };
        };
        tracking: Schema.Types.Mixed;
        loan: Schema.Types.Mixed;
        mambu: Schema.Types.Mixed;
        recaptcha: Schema.Types.Mixed;
        favacard: Schema.Types.Mixed;
    };
    scoring: {
        retry: boolean;
        rescored: boolean;
        history: string[];
        updatedAt: Date[];
    };
    firstUserModifier: {
        userId: string;
        userName: string;
        nameField: string;
        valueField: Schema.Types.Mixed;
        oldValueField: Schema.Types.Mixed;
        totalCompleteOld: number;
        totalCompleteNew: number;
    };
    lastUserModifier: {
        userId: string;
        userName: string;
        nameField: string;
        valueField: Schema.Types.Mixed;
        oldValueField: Schema.Types.Mixed;
        totalCompleteOld: number;
        totalCompleteNew: number;
    };
    totalCompleteUserAdmin: number;
    activity: boolean;
    managment: {
        owner: {
            _id: string;
            name: string;
            email: string;
        };
        participants: [
            {
                _id: string;
                name: string;
            }
        ];
    };
    vouchers: Schema.Types.Mixed;
    configuration: {
        grid: {
            labels: Schema.Types.Mixed;
        };
    };
    accountNumber: number;
    hidden: boolean;
    lastActivityAt: Date;
    externalReference: string;
    products: Schema.Types.Mixed;
    linked: Schema.Types.Mixed;
    myAccount: {
        userId: string;
        productId: string;
        productHistoryId: string;
    };
    methods?: {
        steps?: Schema.Types.Mixed;
    };
    backoffice: Schema.Types.Mixed;
    biometric: {
        id_now: Schema.Types.Mixed;
        questions: Schema.Types.Mixed;
        code: {
            success: boolean;
            data: {
                failed: boolean;
                signedDocuments: string[];
            };
        };
    };
    navigator: Schema.Types.Mixed;
}
