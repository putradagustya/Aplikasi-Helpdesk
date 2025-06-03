'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import Topbar from '@/components/topbar';

export default function DashboardLayout({ title, children }: { title: string; children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function toggleSidebar() {
    setSidebarOpen((prev) => !prev);
  }

  useEffect(() => {
    if (window.innerWidth < 1024) setSidebarOpen(false);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />

      <div className="border flex flex-col flex-1 rounded-2xl m-2 bg-white shadow transition-all duration-300 overflow-hidden">
        <Topbar onToggleSidebar={toggleSidebar} title={title} />
        
        <main className="md:margin-5 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
