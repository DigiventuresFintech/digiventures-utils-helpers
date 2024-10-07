import mongoose, { Connection } from 'mongoose';

export class MongodbConnectionManager {
  private clusterPool: Map<string, Connection>;
  private dbClusterMap: Map<string, string>;

  constructor() {
    this.clusterPool = new Map();
    this.dbClusterMap = new Map();
  }

  async init(clusters: string[]): Promise<void> {
    for (const cluster of clusters) {
      await this.generateDbClusterMapping(cluster);
    }
  }

  async getConnection(dbName: string): Promise<Connection> {
    const clusterUri = this.dbClusterMap.get(dbName);
    if (!clusterUri) {
      throw new Error(`No cluster URI found for database: ${dbName}`);
    }

    const clusterConnection = await this.initClusterConnection(clusterUri);

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

  export async function init(clusters: string[]): Promise<void> {
    return instance.init(clusters);
  }

  export async function getConnection(dbName: string): Promise<Connection> {
    return instance.getConnection(dbName);
  }

  export async function closeAllConnections(): Promise<void> {
    return instance.closeAllConnections();
  }
}
