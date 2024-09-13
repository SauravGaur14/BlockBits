export default function Transactions({ transactions }) {
  return (
    <div className="w-full">
      <div className="my-5 text-4xl font-semibold">Transactions</div>
      {transactions.length > 0 && (
        <div className="flex w-full flex-col rounded-md border border-gray-500 sm:p-2">
          <div className="mb-3 flex w-full border-b border-gray-500 p-3 sm:text-center">
            <span className="hidden w-1/6 sm:block">#</span>
            <span className="w-1/4 sm:w-1/6">To</span>
            <span className="w-1/4 sm:w-1/6">From</span>
            <span className="w-1/4 sm:w-1/6">Amount</span>
            <span className="w-1/4 overflow-hidden text-ellipsis sm:w-1/6">
              TimeStamp
            </span>
            <span className="hidden w-1/5 sm:block sm:w-1/6">Valid</span>
          </div>
          <div className="flex w-full flex-col gap-4">
            {transactions.map((tx, index) => (
              <div className="flex w-full p-3 sm:text-center" key={index}>
                <span className="hidden w-1/4 sm:block sm:w-1/6">
                  {index + 1}
                </span>
                <span className="w-1/4 overflow-hidden text-ellipsis sm:w-1/6">
                  {tx.from === null ? "SELF" : tx.to}
                </span>
                <span className="w-1/4 overflow-hidden text-ellipsis sm:w-1/6">
                  {tx.from === null ? "Mining Reward" : tx.from}
                </span>
                <span className="w-1/4 text-center sm:w-1/6">{tx.amount}</span>
                <span className="w-1/4 overflow-hidden text-ellipsis sm:w-1/6">
                  {tx.timestamp}
                </span>
                <span className="hidden w-1/4 overflow-hidden text-ellipsis sm:block sm:w-1/6">
                  {tx.isValid() ? "Yes" : "No"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
