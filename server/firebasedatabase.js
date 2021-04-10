import admin from 'firebase-admin';
import serviceKey from'./matdaanvihaan-firebase-adminsdk-pyv6r-bc86debb2d.json';
admin.initializeApp({
    credential: admin.credential.cert(serviceKey),
    databaseURL: 'https://matdaanvihaan-default-rtdb.firebaseio.com/'
});
var db = admin.database();
export default db;