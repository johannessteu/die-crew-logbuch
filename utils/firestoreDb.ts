import * as atob from 'atob';
import * as admin from 'firebase-admin';
import debugData from '../credentials.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      '/Users/stolle/Sites/github.com/johannessteu/die-crew-logbuch/credentials.json'
    ),
  });
}

const db = admin.firestore();

export default db;
