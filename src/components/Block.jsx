export default function Block({ blocks, onClick }) {
  return (
    <div className="self-start">
      <div className="mb-7 w-full mt-12 text-4xl font-semibold">Blockchain</div>
      <ul className="flex flex-wrap gap-8">
        {blocks.map((block, index) => (
          <li
            className="flex w-80 cursor-pointer gap-5 rounded-md border border-blue-500 p-6"
            key={index}
            onClick={() => onClick(block)}
          >
            <div className="flex w-1/2 flex-col gap-y-3 font-semibold">
              <span>Hash</span>
              <span>Previous Hash</span>
              <span>Timestamp</span>
              <span>Nonce</span>
            </div>
            <div className="flex w-1/2 flex-col gap-y-3 font-medium">
              <span className="overflow-hidden text-ellipsis">
                {block.hash}
              </span>
              <span className="overflow-hidden text-ellipsis">
                {block.previousHash}
              </span>
              <span className="overflow-hidden text-ellipsis">
                {block.timestamp}
              </span>
              <span>{block.nonce}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
