import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const SentimentForm = ({ onAnalyze, buttonText }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAnalyze(text);
      setText(""); // Clear the text after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sentiment-form">
      <TextField
        label={buttonText === "Analyze" ? "How are you feeling today?" : "Continue analyzing your thoughts of the day"}
        multiline
        rows={4}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <Button
        variant="contained"
        className="sentiment-button"
        type="submit"
        fullWidth
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default SentimentForm;
