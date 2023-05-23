import { IElasticDocumentManager } from "./IElasticDocumentManager";
import { BaseElasticRepositoryImpl } from "../repository/BaseElasticRepositoryImpl";
import { Client } from "@elastic/elasticsearch";
import { ElasticSearch } from "../models/Document";
export declare class ElasticDocumentManagerImpl extends BaseElasticRepositoryImpl<ElasticSearch.Document> implements IElasticDocumentManager {
    constructor(client: Client);
    update(id: string, body: Record<string, any>): Promise<any>;
}
