import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { chartData } from '../assets/data'

// Custom Tooltip for theme consistency
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 border border-fuchsia-500 text-white p-3 rounded shadow-lg text-sm">
        <p className="font-semibold text-fuchsia-300">{label}</p>
        <p className="text-gray-200">Tasks: {payload[0].value}</p>
      </div>
    )
  }

  return null
}

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
        <XAxis dataKey="name" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{
            color: '#ccc',
            fontSize: '0.875rem',
          }}
        />
        <Bar
          dataKey="total"
          fill="url(#colorUv)"
          radius={[6, 6, 0, 0]}
        />
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff00ff" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#00ffff" stopOpacity={0.3} />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default Chart
