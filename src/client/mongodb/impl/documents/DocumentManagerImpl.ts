import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { IDocumentManager } from './IDocumentManager';
import { Connection, Schema } from 'mongoose';
import { createModel } from '../../common';
import { IDocument } from '../../models/Document';
import { nanoid } from 'nanoid';
import { aesDecrypt, aesEncrypt } from '../../../../utils/common';

export class DocumentManagerImpl
    extends BaseMongooseRepositoryImpl<IDocument>
    implements IDocumentManager
{
    constructor(connection?: Connection) {
        super(
            createModel(
                'legajos',
                encryption => {
                    return new Schema({
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
                        tenantId: String,
                        email: String,
                        idNumber: {
                            type: String,
                            get: (v: string) =>
                                aesDecrypt(
                                    encryption.key!,
                                    encryption.iv!,
                                    String(v),
                                ),
                            set: (v: string) =>
                                aesEncrypt(
                                    encryption.key!,
                                    encryption.iv!,
                                    String(v),
                                ),
                        },
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
                        notes: [
                            {
                                title: String,
                                content: String,
                                attached: String,
                            },
                        ],
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
                },
                connection,
            ),
        );
    }
}
