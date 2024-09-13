export default function Button({ onClick, text }) {
  return (
    <button
      className="w-72 rounded-xl bg-neutral-950 py-3 text-center hover:bg-neutral-900 sm:w-48"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
