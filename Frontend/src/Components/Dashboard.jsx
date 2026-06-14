import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  Heart, Activity, Droplet, Moon, Thermometer,
  TrendingUp, FileText, MessageSquare, Plus, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const MOCK_HEALTH = {
  heartRate:     { value: 72,   unit: 'bpm',    status: 'normal',  delta: -3 },
  bloodPressure: { systolic: 120, diastolic: 80, status: 'normal',  delta: -2 },
  bloodSugar:    { value: 95,   unit: 'mg/dL',  status: 'normal',  delta: +1 },
  steps:         { value: 8427, unit: 'steps',  status: 'good',    delta: +542 },
  hydration:     { value: 65,   unit: '%',      status: 'moderate',delta: +5 },
  sleepHours:    { value: 7.5,  unit: 'hrs',    status: 'good',    delta: +0.5 },
};

const TREND_DATA = {
  heartRate:  [68, 72, 75, 71, 69, 72, 70].map((v, i) => ({ day: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i], value: v })),
  bloodSugar: [92, 95, 98, 94, 93, 97, 95].map((v, i) => ({ day: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i], value: v })),
  steps:      [6500,7200,8100,9500,7800,8300,8427].map((v, i) => ({ day: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i], value: v })),
  calories:   [1750,1820,1950,1800,1900,2100,1650].map((v, i) => ({ day: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i], value: v })),
};

const ACTIVITY_DATA = [
  { name: 'Walking', value: 45 },
  { name: 'Running', value: 15 },
  { name: 'Cycling', value: 20 },
  { name: 'Swimming', value: 10 },
  { name: 'Other', value: 10 },
];

const PIE_COLORS = ['#0EA5E9', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];

const STATUS_BADGE = {
  normal:   'bg-emerald-100 text-emerald-700',
  good:     'bg-sky-100 text-sky-700',
  moderate: 'bg-amber-100 text-amber-700',
  high:     'bg-red-100 text-red-700',
};

const MetricCard = ({ icon, label, value, unit, status, delta, color }) => (
  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-2.5 rounded-xl ${color}`}>{icon}</div>
      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_BADGE[status] || STATUS_BADGE.normal}`}>
        {status}
      </span>
    </div>
    <div className="flex items-end gap-2">
      <span className="text-3xl font-bold text-gray-900">{typeof value === 'number' ? value.toLocaleString() : value}</span>
      <span className="text-sm text-gray-400 mb-1">{unit}</span>
    </div>
    <div className="flex items-center justify-between mt-2">
      <p className="text-sm text-gray-500">{label}</p>
      {delta !== undefined && (
        <span className={`flex items-center text-xs font-medium ${delta >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {delta >= 0 ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {Math.abs(delta)} {unit}
        </span>
      )}
    </div>
  </div>
);

const Dashboard = () => {
  const [activeMetric, setActiveMetric] = useState('heartRate');
  const [trendData, setTrendData] = useState(TREND_DATA.heartRate);

  useEffect(() => {
    setTrendData(TREND_DATA[activeMetric] || TREND_DATA.heartRate);
  }, [activeMetric]);

  const metricOptions = [
    { key: 'heartRate', label: 'Heart Rate' },
    { key: 'bloodSugar', label: 'Blood Sugar' },
    { key: 'steps', label: 'Steps' },
    { key: 'calories', label: 'Calories' },
  ];

  const metrics = [
    {
      icon: <Heart size={20} className="text-rose-500" />,
      label: 'Heart Rate',
      value: MOCK_HEALTH.heartRate.value,
      unit: MOCK_HEALTH.heartRate.unit,
      status: MOCK_HEALTH.heartRate.status,
      delta: MOCK_HEALTH.heartRate.delta,
      color: 'bg-rose-50',
    },
    {
      icon: <Activity size={20} className="text-sky-500" />,
      label: 'Daily Steps',
      value: MOCK_HEALTH.steps.value,
      unit: MOCK_HEALTH.steps.unit,
      status: MOCK_HEALTH.steps.status,
      delta: MOCK_HEALTH.steps.delta,
      color: 'bg-sky-50',
    },
    {
      icon: <Thermometer size={20} className="text-violet-500" />,
      label: 'Blood Sugar',
      value: MOCK_HEALTH.bloodSugar.value,
      unit: MOCK_HEALTH.bloodSugar.unit,
      status: MOCK_HEALTH.bloodSugar.status,
      delta: MOCK_HEALTH.bloodSugar.delta,
      color: 'bg-violet-50',
    },
    {
      icon: <Droplet size={20} className="text-blue-500" />,
      label: 'Hydration',
      value: MOCK_HEALTH.hydration.value,
      unit: MOCK_HEALTH.hydration.unit,
      status: MOCK_HEALTH.hydration.status,
      delta: MOCK_HEALTH.hydration.delta,
      color: 'bg-blue-50',
    },
    {
      icon: <Moon size={20} className="text-indigo-500" />,
      label: 'Sleep',
      value: MOCK_HEALTH.sleepHours.value,
      unit: MOCK_HEALTH.sleepHours.unit,
      status: MOCK_HEALTH.sleepHours.status,
      delta: MOCK_HEALTH.sleepHours.delta,
      color: 'bg-indigo-50',
    },
    {
      icon: <TrendingUp size={20} className="text-emerald-500" />,
      label: 'Blood Pressure',
      value: `${MOCK_HEALTH.bloodPressure.systolic}/${MOCK_HEALTH.bloodPressure.diastolic}`,
      unit: 'mmHg',
      status: MOCK_HEALTH.bloodPressure.status,
      color: 'bg-emerald-50',
    },
  ];

  const quickActions = [
    { icon: <FileText size={18} />, label: 'Upload Report', to: '/reports', color: 'bg-sky-50 text-sky-700 hover:bg-sky-100' },
    { icon: <MessageSquare size={18} />, label: 'Ask AI', to: '/chatbot', color: 'bg-violet-50 text-violet-700 hover:bg-violet-100' },
    { icon: <Activity size={18} />, label: 'Log Activity', to: '#', color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' },
    { icon: <Plus size={18} />, label: 'Add Metric', to: '#', color: 'bg-amber-50 text-amber-700 hover:bg-amber-100' },
  ];

  const insights = [
    { type: 'success', title: 'Great progress!', body: 'Your average heart rate has decreased by 3 bpm this week. Keep it up!' },
    { type: 'warning', title: 'Drink more water', body: 'Hydration is at 65%. Try to reach your 2L daily goal by evening.' },
    { type: 'info', title: 'Sleep quality improved', body: 'Sleep duration and quality improved by 15% compared to last month.' },
  ];

  const insightColors = {
    success: 'bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800',
    warning: 'bg-amber-50 border-l-4 border-amber-400 text-amber-800',
    info:    'bg-sky-50 border-l-4 border-sky-500 text-sky-800',
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Health Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's an overview of your health metrics.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {quickActions.map((a) => (
          <a
            key={a.label}
            href={a.to}
            className={`flex items-center justify-center gap-2 p-3.5 rounded-xl font-medium text-sm transition-colors ${a.color}`}
          >
            {a.icon} {a.label}
          </a>
        ))}
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {metrics.map((m) => <MetricCard key={m.label} {...m} />)}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Trend chart - spans 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <h2 className="text-base font-semibold text-gray-900">Weekly Trends</h2>
            <div className="flex flex-wrap gap-2">
              {metricOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setActiveMetric(opt.key)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                    activeMetric === opt.key
                      ? 'bg-sky-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0EA5E9"
                strokeWidth={2.5}
                dot={{ fill: '#0EA5E9', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Activity pie chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 mb-6">Activity Split</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={ACTIVITY_DATA}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                paddingAngle={3}
              >
                {ACTIVITY_DATA.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {ACTIVITY_DATA.map((a, i) => (
              <div key={a.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-gray-600">{a.name}</span>
                </div>
                <span className="font-medium text-gray-800">{a.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Health Insights */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Health Insights</h2>
        <div className="space-y-3">
          {insights.map((ins) => (
            <div key={ins.title} className={`p-4 rounded-xl ${insightColors[ins.type]}`}>
              <p className="font-semibold text-sm mb-0.5">{ins.title}</p>
              <p className="text-sm opacity-90">{ins.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
