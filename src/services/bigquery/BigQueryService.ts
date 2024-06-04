import { BigQuery } from '@google-cloud/bigquery';

export class BigQueryService {
  private instance: BigQuery | undefined;

  init(projectId?: string): void {
    try {
      const credentials = JSON.parse(process.env.BIGQUERY_CREDENTIALS!);
      this.instance = new BigQuery({
        projectId: projectId || process.env.BIGQUERY_DEFAULT_PROJECT_ID,
        credentials,
      });
    } catch (e) {
      console.error(e);
      throw new Error(
        `BigQuery instance couldn't be created, please make sure you have defined 'BIGQUERY_CREDENTIALS_ARN' environment variable`,
      );
    }
  }

  async query(query: string, options?: any): Promise<any> {
    try {
      const [rows] = await this.instance!.query(query, options);
      return rows;
    } catch (e) {}
    return [];
  }
}
