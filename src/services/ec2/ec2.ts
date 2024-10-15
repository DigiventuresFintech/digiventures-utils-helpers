import {
  EC2Client,
  DescribeInstancesCommand,
  Filter,
} from '@aws-sdk/client-ec2';
import axios from 'axios';

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

export async function listInstanceIdsByTagExcluded(
  filters: Filter[],
): Promise<string[]> {
  const currentInstanceId = await getCurrentInstanceId();
  const instanceIds = await instance.listInstanceIdsByTag(filters);
  return instanceIds.filter(id => id !== currentInstanceId);
}

export async function getCurrentInstanceId(): Promise<string> {
  try {
    const token = await axios.put(
      'http://169.254.169.254/latest/api/token',
      null,
      {
        headers: { 'X-aws-ec2-metadata-token-ttl-seconds': '21600' },
      },
    );

    const response = await axios.get(
      'http://169.254.169.254/latest/meta-data/instance-id',
      {
        headers: { 'X-aws-ec2-metadata-token': token.data },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching current instance ID:', error);
    throw error;
  }
}
