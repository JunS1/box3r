
import * as React from 'react';
const SHA256 = require('crypto-js/sha256')


export default class Block {

    constructor(date, location, prevHash) {
        console.log('test')
        console.log(prevHash)
        this.prevHash = prevHash;
        this.date = date;
        this.location = location; // {latitude: , longitude}
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.prevHash + JSON.stringify(this.date) + JSON.stringify(this.location)).toString();
    }
    

}