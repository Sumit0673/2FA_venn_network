import React from 'react';

const RiskStatistics = ({ totalDetections, falsePositiveRate, avgProfit }) => (
  <div className="risk-stats">
    <h3>Total Detections: {totalDetections}</h3>
    <h3>False Positive Rate: {falsePositiveRate*100}%</h3>
    <h3>Average Profit: {avgProfit} ETH</h3>
  </div>
)
