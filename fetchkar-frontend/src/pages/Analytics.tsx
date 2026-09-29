import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, FileText, Clock } from 'lucide-react';

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 8000 },
];

const completionData = [
  { name: 'Mon', completed: 12, pending: 5 },
  { name: 'Tue', completed: 15, pending: 8 },
  { name: 'Wed', completed: 18, pending: 3 },
  { name: 'Thu', completed: 10, pending: 6 },
  { name: 'Fri', completed: 25, pending: 4 },
  { name: 'Sat', completed: 8, pending: 2 },
  { name: 'Sun', completed: 5, pending: 1 },
];

const sourceData = [
  { name: 'Organic', value: 400 },
  { name: 'Direct', value: 300 },
  { name: 'Referral', value: 300 },
  { name: 'Social', value: 200 },
];

const COLORS = ['#7C3AED', '#A78BFA', '#C4B5FD', '#EDE9FE'];

export default function Analytics() {
  const stats = [
    { title: 'Total Revenue', value: '$45,231', change: '+20.1%', trend: 'up', icon: TrendingUp },
    { title: 'Active Clients', value: '34', change: '+4.5%', trend: 'up', icon: Users },
    { title: 'Requests Sent', value: '1,204', change: '-2.1%', trend: 'down', icon: FileText },
    { title: 'Avg. Completion Time', value: '2.4 days', change: '+12.5%', trend: 'up', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-background font-sans pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="md:flex md:items-center md:justify-between mb-10">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold leading-7 text-foreground sm:truncate tracking-tight mb-2">Analytics</h1>
            <p className="text-base text-muted-foreground font-medium">Track your performance, client engagement, and request metrics.</p>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0 gap-3">
            <select className="bg-white border border-border text-foreground text-sm font-bold rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-brand-500 shadow-sm cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
            <button className="btn-primary" onClick={() => alert('Report downloaded!')}>Download Report</button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-card rounded-[20px] p-6 border border-border shadow-card hover:-translate-y-1 hover:shadow-[0_20px_40px_-4px_rgba(124,58,237,0.12)] transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center group-hover:bg-accent transition-colors">
                  <stat.icon className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                </div>
                <span className={`inline-flex items-center gap-1 text-sm font-bold ${stat.trend === 'up' ? 'text-status-success' : 'text-status-danger'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {stat.change}
                </span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-card rounded-[20px] p-8 border border-border shadow-card">
            <h3 className="text-lg font-bold text-foreground mb-6">Revenue Overview</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDE9FE" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6D28D9', fontSize: 12, fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6D28D9', fontSize: 12, fontWeight: 600 }} tickFormatter={(val) => `$${val}`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px -5px rgba(124,58,237,0.15)' }}
                    itemStyle={{ color: '#1E1B4B', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card rounded-[20px] p-8 border border-border shadow-card flex flex-col">
            <h3 className="text-lg font-bold text-foreground mb-6">Client Sources</h3>
            <div className="flex-1 min-h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {sourceData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px -5px rgba(124,58,237,0.15)' }}
                    itemStyle={{ color: '#1E1B4B', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                <span className="text-3xl font-black text-foreground">1.2k</span>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {sourceData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">{item.name}</span>
                    <span className="text-xs font-semibold text-muted-foreground">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="bg-card rounded-[20px] p-8 border border-border shadow-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-foreground">Request Completion Trends</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent"></div>
                <span className="text-xs font-bold text-muted-foreground">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-200"></div>
                <span className="text-xs font-bold text-muted-foreground">Pending</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDE9FE" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6D28D9', fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6D28D9', fontSize: 12, fontWeight: 600 }} />
                <Tooltip 
                  cursor={{ fill: '#F8F6FA' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px -5px rgba(124,58,237,0.15)' }}
                  itemStyle={{ color: '#1E1B4B', fontWeight: 'bold' }}
                />
                <Bar dataKey="completed" stackId="a" fill="#7C3AED" radius={[0, 0, 4, 4]} />
                <Bar dataKey="pending" stackId="a" fill="#DDD6FE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
