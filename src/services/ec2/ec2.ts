import {
  EC2Client,
  DescribeInstancesCommand,
  Filter,
} from '@aws-sdk/client-ec2';

export class Ec2 {
  private readonly client: EC2Client;
  private readonly region = 'us-east-1';

  constructor() {
    this.client = new EC2Client({
      region: process.env.AWS_REGION || this.region,
    });
  }

  async listInstanceIdsByTag(filters: Filter[]) {
    const params = {
      Filters: filters,
    };

    try {
      const command = new DescribeInstancesCommand(params);
      const data = await this.client.send(command);

      const instanceIds: string[] = [];

      if (data && data.Reservations) {
        data.Reservations.forEach(reservation => {
          if (reservation.Instances) {
            reservation.Instances.forEach(instance => {
              if (instance.InstanceId) {
                instanceIds.push(instance.InstanceId);
              }
            });
          }
        });
      }

      return instanceIds;
    } catch (err) {
      console.error('Error fetching instance IDs:', err);
      throw err;
    }
  }
}

const instance = new Ec2();

export async function listInstanceIdsByTag(filters: Filter[]) {
  return instance.listInstanceIdsByTag(filters);
}
