"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const mongoose_1 = require("mongoose");
const nanoid_1 = require("nanoid");
const DocumentSchema = new mongoose_1.Schema({
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
        default: () => (0, nanoid_1.nanoid)(12),
    },
    userId: String,
    userIp: String,
    tenantId: String,
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
    userDeviceInfo: mongoose_1.Schema.Types.Mixed,
    /*
    location: {
        accuracy: Number,
        lat: Number,
        lng: Number,
    },

     */
    questionsAnswers: mongoose_1.Schema.Types.Mixed,
    questionsAnswers2: mongoose_1.Schema.Types.Mixed,
    amount: Number,
    pay1: String,
    pay1Back: String,
    installment: Number,
    dev: Boolean,
    monthlyIncome: Number,
    idCardFront: {
        quality: Number,
        qualityLicence: Number,
        rekognition: mongoose_1.Schema.Types.Mixed,
        retries: Number,
        dniRekognition: String,
        url: String,
        errors: mongoose_1.Schema.Types.Mixed,
        manual: Boolean,
        barcode: mongoose_1.Schema.Types.Mixed,
        electorCode: String,
        requestData: mongoose_1.Schema.Types.Mixed,
        date: Date,
    },
    idCardBack: {
        quality: Number,
        qualityLicence: Number,
        rekognition: mongoose_1.Schema.Types.Mixed,
        retries: Number,
        url: String,
        errors: mongoose_1.Schema.Types.Mixed,
        manual: Boolean,
        requestData: mongoose_1.Schema.Types.Mixed,
        ine: mongoose_1.Schema.Types.Mixed,
        nubariumOcr: mongoose_1.Schema.Types.Mixed,
        date: Date,
    },
    photo: {
        quality: Number,
        confidence: Number,
        retries: Number,
        url: String,
        renaper: mongoose_1.Schema.Types.Mixed,
        renaperTimestamp: Date,
        errors: mongoose_1.Schema.Types.Mixed,
        manual: Boolean,
        requestData: mongoose_1.Schema.Types.Mixed,
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
        errors: mongoose_1.Schema.Types.Mixed,
        manual: Boolean,
        date: Date,
    },
    videoValidation: mongoose_1.Schema.Types.Mixed,
    video: mongoose_1.Schema.Types.Mixed,
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
    legajoComplete: Number,
    typeScoring: String,
    statusScoring: Number,
    subStatusScoring: Number,
    completenessLegajo: Number,
    thirdParty: mongoose_1.Schema.Types.Mixed,
    verifiedSms: Boolean,
    smsTries: Number,
    customInputs: mongoose_1.Schema.Types.Mixed,
    data: mongoose_1.Schema.Types.Mixed,
    source: String,
    mailSent: Boolean,
    utms: String,
    arUtms: mongoose_1.Schema.Types.Mixed,
    historyUtms: mongoose_1.Schema.Types.Mixed,
    questionsAnswersClassification: mongoose_1.Schema.Types.Mixed,
    profileClassification: String,
    applicantParent: String,
    coApplicants: mongoose_1.Schema.Types.Mixed,
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
    outputUrls: mongoose_1.Schema.Types.Mixed,
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
            dataset: mongoose_1.Schema.Types.Mixed,
        },
        email: {
            validated: { type: Boolean, default: false },
            value: String,
            tries: Number,
            hash: String,
            link: String,
        },
    },
    simulation: mongoose_1.Schema.Types.Mixed,
    simulationTexts: mongoose_1.Schema.Types.Mixed,
    requestId: String,
    fingerprint: String,
    information: mongoose_1.Schema.Types.Mixed,
    notifications: {
        counters: mongoose_1.Schema.Types.Mixed,
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
        tracking: mongoose_1.Schema.Types.Mixed,
        loan: mongoose_1.Schema.Types.Mixed,
        mambu: mongoose_1.Schema.Types.Mixed,
        recaptcha: mongoose_1.Schema.Types.Mixed,
        favacard: mongoose_1.Schema.Types.Mixed,
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
        valueField: mongoose_1.Schema.Types.Mixed,
        oldValueField: mongoose_1.Schema.Types.Mixed,
        totalCompleteOld: Number,
        totalCompleteNew: Number,
    },
    lastUserModifier: {
        userId: String,
        userName: String,
        nameField: String,
        valueField: mongoose_1.Schema.Types.Mixed,
        oldValueField: mongoose_1.Schema.Types.Mixed,
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
    vouchers: mongoose_1.Schema.Types.Mixed,
    configuration: {
        grid: {
            labels: mongoose_1.Schema.Types.Mixed,
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
    products: mongoose_1.Schema.Types.Mixed,
    linked: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    myAccount: {
        userId: String,
        productId: String,
        productHistoryId: String,
    },
    methods: {
        steps: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    },
    backoffice: mongoose_1.Schema.Types.Mixed,
    biometric: {
        id_now: mongoose_1.Schema.Types.Mixed,
        questions: mongoose_1.Schema.Types.Mixed,
        code: {
            success: Boolean,
            data: {
                failed: Boolean,
                signedDocuments: [String],
            },
        },
    },
    navigator: mongoose_1.Schema.Types.Mixed,
});
exports.default = mongoose.model('legajo', DocumentSchema);
