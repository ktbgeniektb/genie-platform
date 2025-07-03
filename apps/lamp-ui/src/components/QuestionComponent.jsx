import React from "react";

const QuestionComponent = ({ index, question, choices, selectedValue, onSelect }) => {
  return (
    <div className="space-y-2">
      <p className="font-semibold">{index + 1}. {question}</p>
      <div className="flex flex-wrap gap-2">
        {choices.map((choice) => (
        <button
          key={choice.value}
          onClick={() => {
            onSelect(index, choice.value);
            console.log(`Q${index + 1} 選択中:`, choice.value);
          }}
            className={`px-4 py-2 rounded border transition
              ${
                selectedValue === choice.value
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {choice.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionComponent;
