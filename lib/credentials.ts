import axios from 'axios';

interface AwsCredentials {
    SessionToken?: string
    AccessKeyId?: string
    SecretAccessKey?: string
    Expiration?: string
}

export default class CredentialManager {
    credentials: AwsCredentials;

    AwsRole: string;

    constructor() {
      this.AwsRole = process.env.AWS_ROLE_NAME as string;
      this.credentials = {};
    }

    async getCredentials(): Promise<AwsCredentials | undefined> {
      if (!(new Date(this.credentials.Expiration as string).getTime() > Date.now())) {
        await this.refreshCredentials();
      }
      return this.credentials;
    }

    async refreshCredentials(): Promise<void> {
      try {
        this.credentials = (await axios.get(`https://169.254.169.254/latest/meta-data/iam/security-credentials/${this.AwsRole}`)).data as AwsCredentials;
      } catch (e) {
        throw Error(`REFRESH ERROR: ${e}`);
      }
    }
}