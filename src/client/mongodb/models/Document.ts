import * as mongoose from 'mongoose';
import {Connection, Model, Schema} from 'mongoose';
import { nanoid } from 'nanoid';
import {ICoupon} from "./Coupon";

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
    tenantId: mongoose.Types.ObjectId;
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
    /*
    location: {
        accuracy: number,
        lat: number,
        lng: number,
    },
     */
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
    legajoComplete: number; //OLD
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
        },
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
            validated: { type: boolean; default: false };
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
            },
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
            },
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

const DocumentSchema = new Schema({
    shortId: { type: String },
    name: { type: String, text: true },
    nameSanitized: String,
    firstname: String,
    lastname: String,
    fathersLastname: String,
    mothersLastname: String,
    gender: String,
    civilStatus: String,
    nationality: String,
    referenceCode: {
        type: String,
        unique: true,
        default: () => nanoid(12),
    },
    createdAt: Date,
    userId: String,
    userIp: String,
    tenantId: { type: mongoose.Types.ObjectId },
    email: String,
    idNumber: String,
    idNumberCountry: String,
    additionalInformation: String,
    additionalInformation2: String,
    additionalInformation3: String,
    additionalInformation4: String,
    additionalInformation5: String,
    fullAddress: String,
    fullAddressSource: String,
    addressStreet: String,
    addressStreetNumber: String,
    addressApt: String,
    addressCity: String,
    addressState: String,
    addressZipCode: String,
    addressSuburb: String,
    addressCountry: String,
    addressCountryScope: String,
    facebookId: String,
    requestedProduct: String,
    maxCapital: Number,
    minCapital: Number,
    maxInstallments: Number,
    simulationProduct: String,
    notch: Number,
    paymentDate: Date,
    disbursementDate: Date,
    interest: Number,
    fees: Number,
    tax: Number,
    numberInstallments: Number,
    installmentValue: Number,
    userDeviceInfo: Schema.Types.Mixed,
    /*
    location: {
        accuracy: Number,
        lat: Number,
        lng: Number,
    },

     */
    questionsAnswers: Schema.Types.Mixed,
    questionsAnswers2: Schema.Types.Mixed,
    amount: Number,
    pay1: String,
    pay1Back: String,
    installment: Number,
    dev: Boolean,
    monthlyIncome: Number,
    idCardFront: {
        quality: Number,
        qualityLicence: Number,
        rekognition: Schema.Types.Mixed,
        retries: Number,
        dniRekognition: String,
        url: String,
        errors: Schema.Types.Mixed,
        manual: Boolean,
        barcode: Schema.Types.Mixed,
        electorCode: String,
        requestData: Schema.Types.Mixed,
        date: Date,
    },
    idCardBack: {
        quality: Number,
        qualityLicence: Number,
        rekognition: Schema.Types.Mixed,
        retries: Number,
        url: String,
        errors: Schema.Types.Mixed,
        manual: Boolean,
        requestData: Schema.Types.Mixed,
        ine: Schema.Types.Mixed,
        nubariumOcr: Schema.Types.Mixed,
        date: Date,
    },
    photo: {
        quality: Number,
        confidence: Number,
        retries: Number,
        url: String,
        renaper: Schema.Types.Mixed,
        renaperTimestamp: Date,
        errors: Schema.Types.Mixed,
        manual: Boolean,
        requestData: Schema.Types.Mixed,
        date: Date,
    },
    photoValidation: {
        grin: String,
        qualityValidation: Number,
        qualityConfidence: Number,
        noGlassEyeCloseRight: Number,
        noGlassEyeCloseLeft: Number,
        noGlassEyeOpenRight: Number,
        noGlassEyeOpenLeft: Number,
        retries: Number,
        url: String,
        errors: Schema.Types.Mixed,
        manual: Boolean,
        date: Date,
    },
    videoValidation: Schema.Types.Mixed,
    video: Schema.Types.Mixed,
    bank: {
        account: String,
        format: String,
        bank: String,
        bankId: String,
        verified: Boolean,
        tries: Number,
        account_type: String,
        currency: String,
        isActive: Boolean,
    },
    signature: {
        url: String,
        date: Date,
    },
    payslip: {
        url: String,
        manual: Boolean,
        date: Date,
    },
    utility: {
        url: String,
        manual: Boolean,
        date: Date,
    },
    cbu: {
        url: String,
        manual: Boolean,
        date: Date,
    },
    privacyPolicy: {
        text: String,
        date: Date,
        pdf: String,
    },
    contract: {
        text: String,
        date: Date,
        pdf: String,
    },
    contract2: {
        text: String,
        date: Date,
    },
    legajoComplete: Number, //OLD
    typeScoring: String,
    statusScoring: Number,
    subStatusScoring: Number,
    completenessLegajo: Number,
    thirdParty: Schema.Types.Mixed,
    verifiedSms: Boolean,
    smsTries: Number,
    customInputs: Schema.Types.Mixed,
    data: Schema.Types.Mixed,
    source: String,
    mailSent: Boolean,
    utms: String,
    arUtms: Schema.Types.Mixed,
    historyUtms: Schema.Types.Mixed,
    questionsAnswersClassification: Schema.Types.Mixed,
    profileClassification: String,
    applicantParent: String,
    coApplicants: Schema.Types.Mixed,
    linkApplicant: String,
    totalComplete: Number,
    totalCompleteFinal: Boolean,
    enterRecover: Boolean,
    enterRepeat: Boolean,
    spouseName: String,
    phone: String,
    mobilePhone: String,
    workPhone: String,
    referencePhone: String,
    status: String,
    dateUpdatedStatus: Date,
    linkRecover: String,
    linkLandingNext: String,
    outputUrls: Schema.Types.Mixed,
    rejectionMessage: String,
    notes: [{ title: String, content: String, attached: String }],
    processed: Boolean,
    mailSentStatus: {
        completed: Boolean,
        errors: Boolean,
        lost: Boolean,
    },
    authentication: {
        phone: {
            validated: Boolean,
            value: String,
            tries: Number,
            fails: Number,
            method: String,
            updatedAt: Date,
            code: {
                requested: String,
                input: String,
            },
            dataset: Schema.Types.Mixed,
        },
        email: {
            validated: { type: Boolean, default: false },
            value: String,
            tries: Number,
            hash: String,
            link: String,
        },
    },
    simulation: Schema.Types.Mixed,
    simulationTexts: Schema.Types.Mixed,
    requestId: String,
    fingerprint: String,
    information: Schema.Types.Mixed,
    notifications: {
        counters: Schema.Types.Mixed,
        history: [
            {
                rule: String,
                reference: String,
                status: Boolean,
                date: Date,
            },
        ],
    },
    external: {
        pipedrive: {
            id: Number,
            creator_user_id: Number,
            user_id: Number,
            person_id: Number,
            org_id: Number,
            stage: {
                id: Number,
                title: String,
                change_time: Date,
            },
            files: [],
            contract: {
                id: Number,
                status: Boolean,
            },
        },
        tracking: Schema.Types.Mixed,
        loan: Schema.Types.Mixed,
        mambu: Schema.Types.Mixed,
        recaptcha: Schema.Types.Mixed,
        favacard: Schema.Types.Mixed,
    },
    scoring: {
        retry: Boolean,
        rescored: Boolean,
        history: [String],
        updatedAt: [Date],
    },
    firstUserModifier: {
        userId: String,
        userName: String,
        nameField: String,
        valueField: Schema.Types.Mixed,
        oldValueField: Schema.Types.Mixed,
        totalCompleteOld: Number,
        totalCompleteNew: Number,
    },
    lastUserModifier: {
        userId: String,
        userName: String,
        nameField: String,
        valueField: Schema.Types.Mixed,
        oldValueField: Schema.Types.Mixed,
        totalCompleteOld: Number,
        totalCompleteNew: Number,
    },
    totalCompleteUserAdmin: Number,
    activity: {
        type: Boolean,
        default: false,
    },
    managment: {
        owner: {
            _id: { type: String },
            name: { type: String },
            email: { type: String },
        },
        participants: [
            {
                _id: { type: String },
                name: { type: String },
            },
        ],
    },
    vouchers: Schema.Types.Mixed,
    configuration: {
        grid: {
            labels: Schema.Types.Mixed,
        },
    },
    accountNumber: Number,
    hidden: {
        type: Boolean,
        default: false,
    },
    lastActivityAt: {
        type: Date,
    },
    externalReference: String,
    products: Schema.Types.Mixed,
    linked: { type: Schema.Types.Mixed, default: {} },
    myAccount: {
        userId: String,
        productId: String,
        productHistoryId: String,
    },
    methods: {
        steps: { type: Schema.Types.Mixed, default: {} },
    },
    backoffice: Schema.Types.Mixed,
    biometric: {
        id_now: Schema.Types.Mixed,
        questions: Schema.Types.Mixed,
        code: {
            success: Boolean,
            data: {
                failed: Boolean,
                signedDocuments: [String],
            },
        },
    },
    navigator: Schema.Types.Mixed,
});

function createModel(connection?: Connection): Model<IDocument> {
    return connection
        ? connection.model<IDocument>('legajo', DocumentSchema)
        : mongoose.model<IDocument>('legajo', DocumentSchema);
}

export { createModel };
