import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, Settings, LogOut, Activity, MonitorSmartphone, Heart } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Requests', path: '/requests', icon: MonitorSmartphone },
    { name: 'Templates', path: '/templates', icon: FileText },
    { name: 'Clients', path: '/clients', icon: Users },
    { name: 'Walls of Love', path: '/walls', icon: Heart },
    { name: 'Analytics', path: '/analytics', icon: Activity },
  ];

  return (
    <div className="flex flex-col gap-y-5 overflow-y-auto px-6 w-[280px] shrink-0 font-sans h-full bg-white/60 backdrop-blur-3xl shadow-[10px_10px_20px_rgba(163,177,198,0.2),-10px_-10px_20px_rgba(255,255,255,0.7)] rounded-[2.5rem] border-4 border-white/60 relative z-20 py-6" >
      
      {/* Decorative top glow */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-brand-300/20 to-transparent pointer-events-none"></div>

      {/* Workspace Selector */}
      <div className="flex h-16 items-center">
        <div className="flex items-center gap-x-4">
          <div className="h-10 w-10 rounded-[12px] shadow-clay-btn bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
            AD
          </div>
          <span className="text-lg font-black leading-6 text-slate-800 tracking-tight">Aditi Design</span>
        </div>
      </div>
      
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                        isActive
                          ? 'bg-white shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-2xl text-slate-800 scale-105'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-white/80 shadow-[4px_4px_8px_rgba(163,177,198,0.2),-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-2xl'
                      }`}
                    >
                      <div className={`p-2 rounded-xl shadow-sm mr-2 ${isActive ? "bg-white text-brand-500" : "bg-white/50 text-slate-400"}`}><item.icon className="h-5 w-5" aria-hidden="true" /></div>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          
          <li className="mt-auto">
            <Link
              to="/settings"
              className={`group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
                location.pathname.startsWith('/settings')
                  ? 'bg-white shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-2xl text-slate-800 scale-105'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/80 shadow-[4px_4px_8px_rgba(163,177,198,0.2),-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-2xl'
              }`}
            >
              <Settings
                className={`h-6 w-6 shrink-0 ${location.pathname.startsWith('/settings') ? 'text-slate-800' : 'text-slate-500 group-hover:text-slate-800'}`}
                aria-hidden="true"
              />
              Settings
            </Link>
          </li>
          <li className="mb-4">
            <button
              onClick={() => window.location.href = '/auth'}
              className="group -mx-2 flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-slate-500 hover:text-slate-800 hover:bg-white/50 text-brand-600 shadow-sm"
            >
              <LogOut
                className="h-6 w-6 shrink-0 text-slate-500 group-hover:text-slate-800"
                aria-hidden="true"
              />
              Log out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
