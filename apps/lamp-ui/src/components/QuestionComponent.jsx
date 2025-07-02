import React from "react";

const QuestionComponent = ({ index, question, choices, selectedValue, onSelect }) => (
  <div className="border rounded p-4 shadow">
    <p className="mb-2 font-semibold">{question}</p>
    <div className="flex flex-wrap gap-2">
      {choices.map((choice) => (
        <button
          key={choice.value}
          className={`px-3 py-1 rounded border ${
            selectedValue === choice.value
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
          onClick={() => onSelect(index, choice.value)}
        >
          {choice.label}
        </button>
      ))}
    </div>
  </div>
);

export default QuestionComponent;
