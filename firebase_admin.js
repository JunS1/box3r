const admin = require("firebase-admin");
import BlockChain from './blockChain/BlockChain';
const generator = require('unique-names-generator');

let serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://box3r-f4d2d.firebaseio.com"
});
let config = {
    dictionaries: [generator.names],
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

function randomLoc() {
    return {latitude: getRandomInRange(-90, 90, 3), longitude: getRandomInRange(-180, 180, 3)}
}

// timestamp
// geo data
// boxId: {
// timesstamp:
// location: 
// prevhash
// }

boxChain = new BlockChain({year: 2018, month: 3, date: 10})
boxChain.addBlock({year: 2015, month: 6, date: 2}, randomLoc())
boxChain.addBlock({year: 2016, month: 2, date: 9}, randomLoc())
boxChain.addBlock({year: 2017, month: 12, date: 19}, randomLoc())
boxChain.addBlock({year: 2018, month: 8, date: 12}, randomLoc())
boxChain.addBlock({year: 2019, month: 1, date: 8}, randomLoc())
boxChain.addBlock({year: 2020, month: 1, date: 19}, randomLoc())

console.log(boxChain.chain)
admin.database().ref('boxes/').push()
    .set({
        name: generator.uniqueNamesGenerator(config),
        boxChain: boxChain.chain
    })