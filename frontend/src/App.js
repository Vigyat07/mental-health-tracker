import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import SentimentForm from "./components/SentimentForm";
import SentimentResult from "./components/SentimentResult";
import MoodTrendChart from "./components/MoodTrendChart";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);
  const [moodData, setMoodData] = useState([]);
  const [buttonText, setButtonText] = useState("Analyze"); // Button text state

  const handleAnalyze = async (text) => {
    try {
      const response = await axios.post("http://localhost:5000/analyze", {
        text,
        user_id: "user_123",
      });

      setResult(response.data);

      const newMoodEntry = {
        date: new Date().toLocaleDateString(),
        moodScore:
          response.data.confidence * (response.data.sentiment === "POSITIVE" ? 1 : -1),
      };
      setMoodData((prevMoodData) => [...prevMoodData, newMoodEntry]);

      // Change button text after the first analysis
      setButtonText("Continue Analyzing");
    } catch (error) {
      console.error("Error analyzing text:", error);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <div className="west-box">
          <h1 className="main-heading">Mental Health Tracker</h1>
          <p className="sub-heading">Track your mental health with ease</p>
          <SentimentForm onAnalyze={handleAnalyze} buttonText={buttonText} />
        </div>

        <div className="east-box">
          <h2 className="result-heading">Result</h2>
          {result && (
            <>
              <SentimentResult result={result} />
              <div className="chart-card">
                <h3 className="sub-heading">Your Mood Graph</h3>
                <MoodTrendChart moodData={moodData} />
              </div>
            </>
          )}
          {!result && <p className="interactive-text">Click "Analyze" to see your results!</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
