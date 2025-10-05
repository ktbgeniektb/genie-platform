// src/components/QuestionCard.tsx
import { motion } from "framer-motion";
import { Button } from "../../../atlas-ui/src/components/ui/button";
import { useState } from "react";

interface QuestionCardProps {
  question: {
    id: number;
    text: string;
    choices: { label: string; value: number }[];
  };
  onAnswer: (value: number) => void;
}

const QuestionCard = ({ question, onAnswer }: QuestionCardProps) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleSelect = (value: number) => {
    setSelectedValue(value);
    setTimeout(() => onAnswer(value), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto px-6"
    >
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl font-light text-gray-800 mb-8 leading-relaxed"
        >
          {question.text}
        </motion.h2>

        <div className="space-y-3">
          {question.choices.map((choice, index) => (
            <motion.div
              key={choice.value}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <Button
                variant={selectedValue === choice.value ? "default" : "outline"}
                className={`w-full justify-start text-base py-3 px-5 rounded-xl transition-all ${
                  selectedValue === choice.value
                    ? "bg-primary text-white shadow-sm"
                    : "hover:bg-muted hover:border-primary/50"
                }`}
                onClick={() => handleSelect(choice.value)}
              >
                {choice.label}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
