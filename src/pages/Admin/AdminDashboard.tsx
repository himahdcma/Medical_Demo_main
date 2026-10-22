import React from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Boxes,
  FileText,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../../components/common/Button';

const REVENUE_DATA = [
  { month: 'Apr', revenue: 240000, orders: 420 },
  { month: 'May', revenue: 310000, orders: 580 },
  { month: 'Jun', revenue: 280000, orders: 510 },
  { month: 'Jul', revenue: 390000, orders: 740 },
  { month: 'Aug', revenue: 450000, orders: 890 },
  { month: 'Sep', revenue: 482500, orders: 1040 },
];

const CATEGORY_SALES = [
  { name: 'Cardio & BP', value: 35, color: '#0284c7' },
  { name: 'Diabetes', value: 28, color: '#0d9488' },
  { name: 'Antibiotics', value: 16, color: '#f59e0b' },
  { name: 'Vitamins', value: 12, color: '#10b981' },
  { name: 'Devices', value: 9, color: '#8b5cf6' },
];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase text-medical-600 tracking-wider">
            Clinical Operations & Commerce
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Hospital Pharmacy Admin Console
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/prescriptions">
            <Button variant="teal" size="sm" className="flex items-center gap-1.5 shadow-xs">
              <FileText className="w-4 h-4" />
              <span>Review Prescriptions (4)</span>
            </Button>
          </Link>
          <Link to="/admin/products">
            <Button variant="primary" size="sm" className="flex items-center gap-1.5 shadow-xs">
              <Boxes className="w-4 h-4" />
              <span>Add Medicine</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Monthly Revenue</span>
          <div className="text-xl font-black text-slate-900">₹4,82,500</div>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +18.4% this month
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total Orders</span>
          <div className="text-xl font-black text-slate-900">1,280</div>
          <span className="text-[10px] text-emerald-600 font-bold">+120 this week</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Active Patients</span>
          <div className="text-xl font-black text-slate-900">940</div>
          <span className="text-[10px] text-slate-500 font-medium">Verified accounts</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Active Medicines</span>
          <div className="text-xl font-black text-slate-900">142</div>
          <span className="text-[10px] text-teal-600 font-bold">In stock catalog</span>
        </div>

        <div className="bg-white rounded-3xl border border-amber-200 p-4 shadow-2xs space-y-1 bg-amber-50/20">
          <span className="text-[11px] font-bold text-amber-700 uppercase">Pending Audits</span>
          <div className="text-xl font-black text-amber-800">4 Rx</div>
          <span className="text-[10px] text-amber-600 font-bold">Requires clinical check</span>
        </div>

        <div className="bg-white rounded-3xl border border-red-200 p-4 shadow-2xs space-y-1 bg-red-50/20">
          <span className="text-[11px] font-bold text-red-700 uppercase">Low Stock Alerts</span>
          <div className="text-xl font-black text-red-800">3 Items</div>
          <span className="text-[10px] text-red-600 font-bold">Augmentin, BP Cuffs</span>
        </div>
      </div>

      {/* Recharts Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Trend Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Hospital Pharmacy Revenue Trend</h3>
              <p className="text-xs text-slate-500">Monthly dispensing revenue (INR)</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              FY 2026-27 Active
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(val) => `₹${val / 1000}k`}
                />
                <Tooltip
                  formatter={(val: any) => [formatCurrency(val), 'Revenue']}
                  contentStyle={{ borderRadius: '1rem', border: '1px solid #e2e8f0' }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0284c7"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Chart */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Therapeutic Distribution</h3>
            <p className="text-xs text-slate-500">Volume share across categories</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_SALES}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                >
                  {CATEGORY_SALES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs pt-2 border-t border-slate-100">
            {CATEGORY_SALES.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-slate-600 font-medium">{cat.name}</span>
                </div>
                <span className="font-bold text-slate-900">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clinical Queue & Urgent Pharmacist Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Pending Prescription Audits</h3>
            <Link to="/admin/prescriptions" className="text-xs text-medical-600 font-bold hover:underline">
              Open Audit Console →
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/80 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Rx #rx-2026-002: Augmentin Duo</span>
                <span className="text-slate-500">Patient: Prabhas Gorusu • 5-day antibiotic course</span>
              </div>
              <Link to="/admin/prescriptions">
                <button className="px-2.5 py-1 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700">
                  Audit
                </button>
              </Link>
            </div>

            <div className="p-3 bg-yellow-50/60 rounded-2xl border border-yellow-200/80 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Rx #rx-2026-003: Skin Ointment</span>
                <span className="text-slate-500">Patient: Prabhas Gorusu • Awaiting clinic stamp clarification</span>
              </div>
              <Link to="/admin/prescriptions">
                <button className="px-2.5 py-1 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700">
                  Inspect
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Low Stock Dispensary Alerts</h3>
            <Link to="/admin/inventory" className="text-xs text-medical-600 font-bold hover:underline">
              Manage Batches →
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-red-50/60 rounded-2xl border border-red-200/80 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Augmentin Duo 625mg</span>
                <span className="text-red-700 font-semibold">Critical: Only 3 strips left in stock!</span>
              </div>
              <button
                onClick={() => alert('Procurement purchase order sent to supplier for 200 strips.')}
                className="px-2.5 py-1 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 cursor-pointer"
              >
                Restock
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Azithral 500mg (Batch AZT-2099)</span>
                <span className="text-slate-500 font-semibold">Status: 0 in stock (Sold Out)</span>
              </div>
              <button
                onClick={() => alert('Reorder request logged with hospital inventory team.')}
                className="px-2.5 py-1 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                Reorder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
