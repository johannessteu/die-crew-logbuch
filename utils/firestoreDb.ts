import * as atob from 'atob';
import * as admin from 'firebase-admin';

const credentials = atob(process.env.GCLOUD_CREDENTIALS);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(credentials)),
  });
}

const db = admin.firestore();

export default db;
