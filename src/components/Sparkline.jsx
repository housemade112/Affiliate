import { AreaChart, Area, ResponsiveContainer } from 'recharts'

export default function Sparkline({ data, color = '#4f46e5' }) {
  const chartData = data.map((v, i) => ({ i, v }))
  return (
    <ResponsiveContainer width="100%" height={40}>
      <AreaChart data={chartData}>
        <Area type="monotone" dataKey="v" stroke={color} fill={color} fillOpacity={0.15} strokeWidth={1.5} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
