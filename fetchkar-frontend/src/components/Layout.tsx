import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex h-screen p-6 gap-8 overflow-hidden bg-gradient-to-br from-[#e0c3fc] via-[#8ec5fc] to-[#e0c3fc]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative flex flex-col bg-white/60 backdrop-blur-3xl rounded-[2.5rem] shadow-[10px_10px_20px_rgba(163,177,198,0.2),-10px_-10px_20px_rgba(255,255,255,0.7)] border-4 border-white/60">
        <Outlet />
      </main>
    </div>
  );
}
