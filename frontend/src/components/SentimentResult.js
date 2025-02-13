import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const SentimentResult = ({ result }) => {
  if (!result) return null;

  return (
    <Card style={{ marginTop: "20px" }}>
      <CardContent>
        <Typography variant="h5">Sentiment Analysis Result:</Typography>
        <Typography>Sentiment: {result.sentiment}</Typography>
        <Typography>Confidence: {result.confidence.toFixed(2)}</Typography>
      </CardContent>
    </Card>
  );
};

export default SentimentResult;