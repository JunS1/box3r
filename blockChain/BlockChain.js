import * as React from 'react';
import Block from "./Block";

export default class BlockChain {
    constructor(date) {
        
        createGenesisBlock = (date) => {
            return new Block(date, null, "0")
        }
        this.chain = [createGenesisBlock(date)];
    }

    currentDate() {
        let t = new Date();
        date = {
            year: t.setFullYear(),
            month: t.setMonth(),
            date: t.setDate()
        }
        return date
    }
    

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(date, location) {
        let newBlock = new Block(date, location, this.getLastBlock().hash);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i ++) {
            let currBlock = this.chain[i];
            let prevBlock = this.chain[i-1];
            if (currBlock.hash !== currBlock.calculateHash()) {
                return false
            }
            
            if (prevBlock.hash !== currBlock.prevHash) {
                return false
            }
        }
        return true
    }

}