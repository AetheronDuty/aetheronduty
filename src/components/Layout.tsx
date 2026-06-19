import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useApp } from '@/hooks/useApp';

export default function Layout() {
  const { sidebarCollapsed } = useApp();

  return (
    <div className="flex min-h-screen bg-void">
      <Sidebar />
      <div 
        className="flex-1 flex flex-col transition-all duration-220"
        style={{ marginLeft: sidebarCollapsed ? 64 : 240 }}
      >
        <Navbar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
