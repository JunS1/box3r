const admin = require("firebase-admin");

let serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://box3r-f4d2d.firebaseio.com"
});

// timestamp
// geo data
// boxId: {
// timesstamp:
// location: 
// prevhash
// }

// admin.database().ref('boxes/').once('value').then