import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Typography } from "@mui/material";

const MoodTrendChart = ({ moodData }) => {
  if (moodData.length === 0) return null;

  return (
    <div style={{ marginTop: "40px" }}>
      <Typography variant="h5">Mood Trend</Typography>
      <LineChart width={500} height={300} data={moodData}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="moodScore" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default MoodTrendChart;
