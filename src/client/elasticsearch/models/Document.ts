export namespace ElasticSearch {
  export interface Document {
    dev: boolean;
    name: string;
    nameSanitized: string;
    email: string;
    idNumber: string,
    statusScoring: number,
    subStatusScoring: number,
    completenessLegajo: number,
    totalComplete: number,
    status: string,
    tenantId: string,
    mailSent: boolean,
    updatedAt: string,
    createdAt: string,
    mobilePhone: string,
    phone: string,
    activity: boolean,
    managment: any,
    typeScoring: string,
    hidden: boolean,
    lastActivityAt: Date,
  }
}
