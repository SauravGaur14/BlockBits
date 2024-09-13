import SHA256 from "crypto-js/sha256";
import EC from "elliptic";

const ec = new EC.ec("secp256k1");

class Transaction {
  constructor(from, to, amount) {
    this.to = to;
    this.from = from;
    this.amount = amount;
    this.timestamp = Date.now();
  }

  calculateHash() {
    return SHA256(this.from + this.to + this.amount).toString();
  }

  signTransaction(signinkey) {
    const hashTx = this.calculateHash();
    const sig = signinkey.sign(hashTx, "base64");
    this.signature = sig.toDER("hex");
  }

  isValid() {
    if (this.from === null) return true;

    if (!this.signature || this.signature.length === 0) {
      throw new Error("Transaction is not signed");
    }

    const publicKey = ec.keyFromPublic(this.from, "hex");
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.previousHash +
        this.timestamp +
        this.nonce +
        JSON.stringify(this.transactions),
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }

  hasValidTransactions() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) return false;
    }
    return true;
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 3;
    this.pendingTransactions = [];
    this.miningReward = 10;
    this.initialBalance = 100;
  }

  createGenesisBlock() {
    return new Block(Date.now(), [], "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransaction(miningRewardAddress) {
    // Add the mining reward transaction to the list of pending transactions
    const rewardTransaction = new Transaction(
      null,
      miningRewardAddress,
      this.miningReward,
    );
    this.pendingTransactions.push(rewardTransaction);

    // Create a new block with the current list of pending transactions
    let block = new Block(
      Date.now(),
      this.pendingTransactions,
      this.getLatestBlock().hash,
    );
    block.mineBlock(this.difficulty);

    // Add the newly mined block to the chain
    this.chain.push(block);

    // Reset the pending transactions for the next block
    this.pendingTransactions = [];
  }

  addTransactions(transactions) {
    for (const transaction of transactions) {
      if (!transaction.from || !transaction.to) {
        throw new Error("Transaction must have to and from addresses");
      }
      if (!transaction.isValid()) {
        throw new Error("Can't add invalid transaction to chain");
      }
    }
    this.pendingTransactions = [...this.pendingTransactions, ...transactions];
  }

  getBalance(address) {
    let balance = this.initialBalance;

    for (let block of this.chain) {
      for (let t of block.transactions) {
        if (t.from === address) {
          balance -= t.amount;
        }
        if (t.to === address) {
          balance += t.amount;
        }
      }
    }
    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (!currentBlock.hasValidTransactions()) return false;

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

export { Block, Blockchain, Transaction };
