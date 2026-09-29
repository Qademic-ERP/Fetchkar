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
    <div className="flex flex-col gap-y-5 overflow-y-auto px-6 w-[280px] shrink-0 font-sans h-screen border-r border-sidebar-border shadow-[4px_0_24px_rgba(46,16,101,0.1)] relative z-20" style={{ background: 'linear-gradient(180deg, #2E1065 0%, #1E0B42 100%)' }}>
      
      {/* Decorative top glow */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-accent/20 to-transparent pointer-events-none mix-blend-screen"></div>

      {/* Workspace Selector */}
      <div className="flex h-16 items-center">
        <div className="flex items-center gap-x-4">
          <div className="h-8 w-8 rounded-md bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
            AD
          </div>
          <span className="text-sm font-semibold leading-6 text-white">Aditi Design</span>
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
                          ? 'bg-white/10 text-white'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <item.icon
                        className={`h-6 w-6 shrink-0 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}
                        aria-hidden="true"
                      />
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
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings
                className={`h-6 w-6 shrink-0 ${location.pathname.startsWith('/settings') ? 'text-white' : 'text-white/60 group-hover:text-white'}`}
                aria-hidden="true"
              />
              Settings
            </Link>
          </li>
          <li className="mb-4">
            <button
              onClick={() => window.location.href = '/auth'}
              className="group -mx-2 flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-white/60 hover:text-white hover:bg-white/5"
            >
              <LogOut
                className="h-6 w-6 shrink-0 text-white/60 group-hover:text-white"
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
