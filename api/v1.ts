import { Router } from 'express';
import CredentialManager from '../lib/credentials';

export default () => {
  const router = Router();
  const credentialsManager = new CredentialManager();
  router.get('/credentials', async (_, res) => {
    const credentials = await credentialsManager.getCredentials();
    res.send({
      AccessKeyId: credentials?.AccessKeyId,
      SecretAccessKey: credentials?.SecretAccessKey,
      Token: credentials?.SessionToken,
    });
  });

  router.get('/refresh', async (_, res) => {
    try {
      await credentialsManager.refreshCredentials();
      res.send('success');
    } catch (e) {
      res.status(500).send(e);
    }
  });

  return router;
};
