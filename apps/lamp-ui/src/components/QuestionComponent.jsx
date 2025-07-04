import React from "react";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@mui/material";

const QuestionComponent = ({ index, question, choices, selectedValue, onSelect }) => {
  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10); // 数値に変換
    onSelect(index, value);
  };

  return (
    <div className="space-y-2">
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend" className="font-semibold mb-1">
          {index + 1}. {question}
        </FormLabel>
        <RadioGroup
          row
          value={selectedValue ?? ""}
          onChange={handleChange}
        >
          {choices.map((choice) => (
            <FormControlLabel
              key={choice.value}
              value={choice.value}
              control={<Radio />}
              label={choice.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default QuestionComponent;
