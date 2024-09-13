import { useState } from "react";
import { Blockchain, Transaction } from "./blockchain";
import EC from "elliptic";
import Input from "./components/Input";
import Button from "./components/Button";
import Block from "./components/Block";
import PendingTransactions from "./components/PendingTransaction";
import Transactions from "./components/Transactions";

const ec = new EC.ec("secp256k1");
const key = ec.genKeyPair();
const publicKey = key.getPublic("hex"); // Used as 'from' address

function App() {
  const [blockchain] = useState(new Blockchain());
  const [transactions, setTransactions] = useState([]);
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState(1);
  const [blocks, setBlocks] = useState(blockchain.chain);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [balance, setBalance] = useState(blockchain.getBalance(publicKey));

  const handleBlockClick = (block) => {
    setSelectedBlock(block);
  };

  const handleAddTransaction = () => {
    if (toAddress.length <= 0 || amount <= 0) {
      alert("To-Address and Amount is required to add a transaction");
      return;
    }
    if (toAddress && amount > 0) {
      const transaction = new Transaction(publicKey, toAddress, amount);
      transaction.signTransaction(key);
      setTransactions([...transactions, transaction]);
      setToAddress("");
      setAmount(1);
    }
  };

  const handleMineTransactions = () => {
    if (transactions.length === 0) {
      alert("Add a transaction first");
      return;
    }
    blockchain.addTransactions(transactions);
    blockchain.minePendingTransaction(publicKey);
    setBlocks([...blockchain.chain]);
    setTransactions([]);
    setBalance(blockchain.getBalance(publicKey));
  };

  return (
    <div className="custom-scrollbar flex h-screen w-full flex-col items-center overflow-hidden overflow-y-scroll bg-neutral-800 p-10 pt-5 text-slate-100">
      <div className="mb-16 flex w-full flex-col items-center justify-center gap-y-10 md:flex-row md:justify-between">
        <h1 className="font-serif text-5xl font-bold">BlockBits</h1>
        <div className="flex w-full flex-col gap-2 self-end rounded-md border border-gray-500 p-2 text-center text-lg font-semibold sm:w-max">
          <span>Wallet Balance</span>
          <span>{balance} Coins</span>
        </div>
      </div>
      <div className="mb-3 flex w-full flex-col p-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Input
            type="text"
            value={toAddress}
            placeholder="To Address"
            onChange={(e) => setToAddress(e.target.value)}
          />
          <Input
            min={1}
            type="number"
            value={amount}
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mt-10 flex w-full flex-wrap items-center justify-center gap-8">
          <Button text="Add Transaction" onClick={handleAddTransaction} />
          <Button text="Mine Block" onClick={handleMineTransactions} />
        </div>
      </div>
      {transactions.length > 0 && (
        <PendingTransactions pendingTransactions={transactions} />
      )}
      <Block blocks={blocks} onClick={(block) => handleBlockClick(block)} />

      {selectedBlock?.transactions.length > 0 && (
        <Transactions transactions={selectedBlock.transactions} />
      )}

      {selectedBlock && selectedBlock.transactions?.length <= 0 && (
        <div className="mt-3 text-xl">No transactions in this block</div>
      )}
    </div>
  );
}

export default App;
