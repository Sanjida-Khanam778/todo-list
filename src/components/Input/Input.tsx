import { useState } from "react";

type InputProps = {
  onSubmit: (title: string) => void;
};

const Input = ({ onSubmit }: InputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;

    onSubmit(input.trim());
    setInput("");
  };

  return (
    <div className="flex gap-2">
      <input
        className="border rounded p-2 flex-1"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a new task..."
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </div>
  );
};

export default Input;
