import * as admin from 'firebase-admin';
import { firebaseServiceAccountKey } from './firebaseServiceAccountKey';

admin.initializeApp({
  credential: admin.credential.cert(
    firebaseServiceAccountKey as admin.ServiceAccount,
  ),
});

export default admin;
