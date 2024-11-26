import mongoose, { Connection } from 'mongoose';

export class MongodbConnectionManager {
  private clusterPool: Map<string, Connection>;
  private dbClusterMap: Map<string, string>;
  private dbCredentials: Map<string, any>;

  constructor() {
    this.clusterPool = new Map();
    this.dbClusterMap = new Map();
    this.dbCredentials = new Map();
  }

  async init(clusters: string[], credentials: any = {}): Promise<void> {
    for (const cluster of clusters) {
      await this.generateDbClusterMapping(cluster);
    }
    for (const [key, value] of Object.entries(credentials)) {
      this.dbCredentials.set(key, value);
    }
  }

  async getConnection(dbName: string): Promise<Connection> {
    const clusterUri = this.dbClusterMap.get(dbName);
    if (!clusterUri) {
      throw new Error(`No cluster URI found for database: ${dbName}`);
    }

    const clusterConnection: Connection = await this.initClusterConnection(
      clusterUri,
    );
    const encryption = this.dbCredentials.get(dbName);
    if (encryption !== undefined) {
      clusterConnection.set('encryption', encryption);
    }

    return clusterConnection.useDb(dbName);
  }

  async closeAllConnections(): Promise<void> {
    const closePromises = Array.from(this.clusterPool.values()).map(
      connection => connection.close(),
    );

    await Promise.all(closePromises);
    this.clusterPool.clear();
    this.dbClusterMap.clear();
  }

  private async initClusterConnection(clusterUri: string): Promise<Connection> {
    if (this.clusterPool.has(clusterUri)) {
      return this.clusterPool.get(clusterUri)!;
    }

    try {
      const connection = await mongoose
        .createConnection(clusterUri)
        .asPromise();

      this.clusterPool.set(clusterUri, connection);
      return connection;
    } catch (e) {
      throw e;
    }
  }

  private async getDatabasesForCluster(clusterUri: string): Promise<string[]> {
    const clusterConnection = await this.initClusterConnection(clusterUri);

    const adminDb = clusterConnection.db.admin();
    const { databases } = await adminDb.listDatabases();

    return databases.map((db: { name: string }) => db.name);
  }

  private async generateDbClusterMapping(clusterUri: string): Promise<void> {
    const databases = await this.getDatabasesForCluster(clusterUri);

    databases.forEach(dbName => {
      this.dbClusterMap.set(dbName, clusterUri);
    });
  }
}

export namespace ConnectionManager {
  const instance = new MongodbConnectionManager();

  export async function init(
    clusters: string[],
    credentials: any = {},
  ): Promise<void> {
    return instance.init(clusters, credentials);
  }

  export async function getConnection(dbName: string): Promise<Connection> {
    return instance.getConnection(dbName);
  }

  export async function closeAllConnections(): Promise<void> {
    return instance.closeAllConnections();
  }
}
