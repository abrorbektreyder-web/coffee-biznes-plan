import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Coffee,
  DollarSign,
  TrendingUp,
  Wallet,
  ShoppingCart,
  PieChart,
  ArrowRight,
} from "lucide-react";

const App = () => {
  // --- STATE (O'zgarmadi) ---
  const [dailyCustomers, setDailyCustomers] = useState(101);
  const [coffeePrice, setCoffeePrice] = useState(1.6);
  const [rent, setRent] = useState(950);
  const [staffSalary, setStaffSalary] = useState(800);
  const [marketing, setMarketing] = useState(100);
  const [utilities, setUtilities] = useState(150);

  const cogsRate = 0.3;

  // --- HISOB-KITOB (O'zgarmadi) ---
  const monthlyRevenue = dailyCustomers * coffeePrice * 30;
  const monthlyCogs = monthlyRevenue * cogsRate;
  const totalFixedCosts = rent + staffSalary + marketing + utilities;
  const totalExpenses = monthlyCogs + totalFixedCosts;
  const netProfit = monthlyRevenue - totalExpenses;

  const chartData = useMemo(() => {
    const data = [];
    for (let i = 20; i <= 200; i += 20) {
      const revenue = i * coffeePrice * 30;
      const cogs = revenue * cogsRate;
      const profit = revenue - cogs - totalFixedCosts;
      data.push({
        customers: i,
        profit: Math.round(profit),
        revenue: Math.round(revenue),
      });
    }
    return data;
  }, [coffeePrice, totalFixedCosts]);

  return (
    // ASOSIY KONTEYNER: Desktopda "h-screen" (bitta ekran), Mobilda "min-h-screen" (scroll)
    <div className="min-h-screen md:h-screen flex flex-col bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* 1. HEADER QISMI */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-amber-100 p-2 rounded-lg">
            <Coffee className="text-amber-700" size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 leading-tight">
              Qahvaxona Biznes-Modeli
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              Interaktiv moliyaviy simulyator
            </p>
          </div>
        </div>
        <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-100 flex items-center gap-1">
          <DollarSign size={14} /> Markaziy Osiyo Bozori
        </div>
      </header>

      {/* 2. KPI (NATIJALAR) QATORI - EN TEPADA */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 py-4 shrink-0 bg-slate-50">
        {/* KPI CARD 1 */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">
            <TrendingUp size={14} className="text-blue-500" /> Tushum (Oy)
          </div>
          <div className="text-xl md:text-2xl font-black text-slate-800">
            ${monthlyRevenue.toLocaleString()}
          </div>
        </div>

        {/* KPI CARD 2 */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">
            <ShoppingCart size={14} className="text-amber-500" /> Xomashyo
          </div>
          <div className="text-xl md:text-2xl font-black text-slate-800">
            ${Math.round(monthlyCogs).toLocaleString()}
          </div>
        </div>

        {/* KPI CARD 3 */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">
            <Wallet size={14} className="text-red-500" /> Doimiy Xarajat
          </div>
          <div className="text-xl md:text-2xl font-black text-slate-800">
            ${totalFixedCosts.toLocaleString()}
          </div>
        </div>

        {/* KPI CARD 4 (SOF FOYDA) */}
        <div
          className={`p-3 rounded-xl border shadow-sm flex flex-col justify-center ${
            netProfit >= 0
              ? "bg-emerald-600 text-white border-emerald-600"
              : "bg-red-600 text-white border-red-600"
          }`}
        >
          <div className="text-xs font-bold uppercase flex items-center gap-1 mb-1 opacity-90">
            <PieChart size={14} /> Sof Foyda
          </div>
          <div className="text-xl md:text-2xl font-black">
            ${Math.round(netProfit).toLocaleString()}
          </div>
        </div>
      </div>

      {/* 3. ASOSIY HUDUD (2 Ustun) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* CHAP TOMON: SOZLAMALAR (Scroll bo'lishi mumkin) */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-slate-200 overflow-y-auto p-5 custom-scrollbar">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">
            Sozlamalar
          </h2>

          <div className="space-y-6">
            {/* Input Guruh 1 */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-700">
                <div className="flex justify-between mb-1">
                  <span>Kunlik Mijozlar</span>
                  <span className="text-blue-600 bg-blue-50 px-2 rounded">
                    {dailyCustomers}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  value={dailyCustomers}
                  onChange={(e) => setDailyCustomers(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                <div className="flex justify-between mb-1">
                  <span>Kofe Narxi ($)</span>
                  <span className="text-amber-600 bg-amber-50 px-2 rounded">
                    {coffeePrice}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={coffeePrice}
                  onChange={(e) => setCoffeePrice(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </label>
            </div>

            <hr className="border-slate-100" />

            {/* Input Guruh 2 */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-700">
                <div className="flex justify-between mb-1">
                  <span>Ijara Haqi ($)</span>
                  <span className="text-slate-500">{rent}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="50"
                  value={rent}
                  onChange={(e) => setRent(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-500"
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                <div className="flex justify-between mb-1">
                  <span>Xodimlar Maoshi ($)</span>
                  <span className="text-slate-500">{staffSalary}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="4000"
                  step="50"
                  value={staffSalary}
                  onChange={(e) => setStaffSalary(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-500"
                />
              </label>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">
                    Kommunal
                  </div>
                  <div className="font-bold text-slate-700">${utilities}</div>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">
                    Marketing
                  </div>
                  <div className="font-bold text-slate-700">${marketing}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* O'NG TOMON: GRAFIK VA TABLE (Moslashuvchan) */}
        <div className="flex-1 bg-slate-50 p-4 md:p-6 overflow-y-auto flex flex-col gap-4">
          {/* GRAFIK BOX */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex-1 min-h-[250px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-700 flex items-center gap-2">
                <TrendingUp size={18} className="text-emerald-500" />
                Sof Foyda Dinamikasi
              </h3>
              <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">
                Mijozlar soniga nisbatan
              </span>
            </div>
            <div className="w-full flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="customers"
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={(v) => `$${v}`}
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(val) => [`$${val}`, "Foyda"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#profitGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* BATAFSIL TABLE (Yangi Ixcham Ko'rinish) */}
          <div className="bg-slate-800 text-white p-4 rounded-2xl shadow-lg shrink-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              {/* 1. Kiruvchi */}
              <div className="flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-700 pb-4 md:pb-0">
                <span className="text-slate-400 text-xs font-bold uppercase mb-1">
                  Jami Kiruvchi Oqim
                </span>
                <div className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                  ${monthlyRevenue.toLocaleString()}{" "}
                  <ArrowRight size={16} className="text-slate-600" />
                </div>
                <span className="text-slate-500 text-xs mt-1">
                  Kuniga {dailyCustomers} mijoz x ${coffeePrice}
                </span>
              </div>

              {/* 2. Chiquvchi */}
              <div className="flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-700 pb-4 md:pb-0">
                <span className="text-slate-400 text-xs font-bold uppercase mb-1">
                  Jami Xarajatlar
                </span>
                <div className="text-xl font-bold text-red-400 flex items-center gap-2">
                  -${totalExpenses.toLocaleString()}{" "}
                  <ArrowRight size={16} className="text-slate-600" />
                </div>
                <div className="flex gap-3 text-xs text-slate-500 mt-1">
                  <span>Xomashyo: ${Math.round(monthlyCogs)}</span>
                  <span>Doimiy: ${totalFixedCosts}</span>
                </div>
              </div>

              {/* 3. Sof Foyda */}
              <div className="flex flex-col justify-center">
                <span className="text-slate-400 text-xs font-bold uppercase mb-1">
                  Oylik Sof Natija
                </span>
                <div
                  className={`text-2xl font-black ${
                    netProfit >= 0 ? "text-emerald-400" : "text-red-500"
                  }`}
                >
                  ${Math.round(netProfit).toLocaleString()}
                </div>
                <span className="text-slate-500 text-xs mt-1">
                  Marjinallik: {Math.round((netProfit / monthlyRevenue) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
