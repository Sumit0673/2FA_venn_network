import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const AttackDashboard = ({ alerts }) => (
  <div className="attack-grid">
    <LineChart width={500} height={300} data={alerts}>
      <Line type="monotone" dataKey="profit" stroke="#8884d8" />
      <XAxis dataKey="timestamp" />
      <YAxis />
      <CartesianGrid stroke="#ccc" />
      <Tooltip />
    </LineChart>
    <RiskStatistics 
      totalDetections={alerts.length}
      falsePositiveRate={0.021} 
      avgProfit={alerts.reduce((a,b) => a + b.profit, 0)/alerts.length}
    />
  </div>
)
