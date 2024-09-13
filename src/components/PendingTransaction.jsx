export default function PendingTransactions({ pendingTransactions = [] }) {
  return (
    <div>
      <div className="my-5 text-3xl font-semibold">Pending Transactions</div>
      {pendingTransactions.length > 0 && (
        <div className="flex w-full flex-col rounded-md border border-gray-400 p-2">
          <div className="mb-5 flex w-full border-b border-gray-500 p-3 text-center sm:border-b">
            <span className="w-1/3">Amount</span>
            <span className="w-1/3">To</span>
            <span className="w-1/3">From</span>
          </div>
          <div className="flex w-72 flex-col gap-4 sm:w-full">
            {pendingTransactions.map((tx, index) => (
              <div className="flex w-full flex-row p-3 text-center" key={index}>
                <span className="w-1/3">{tx.amount}</span>
                <span className="w-1/3">{tx.to}</span>
                <span className="w-1/3 overflow-hidden text-ellipsis">
                  {tx.from}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
