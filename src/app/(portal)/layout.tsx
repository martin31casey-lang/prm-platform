"use client";

import { useState, useEffect } from "react";
import { 
  Bell, 
  Search,
  Menu,
  X,
  HeartPulse
} from "lucide-react";
import { Sidebar } from "~/components/layout/Sidebar";
import { usePathname } from "next/navigation";
import { PLATFORM_CONFIG } from "~/config/platform";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isOnboarding = pathname === "/onboarding";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Cerrar el sidebar automáticamente cuando cambia la ruta (navegación en mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Sidebar Component - Hidden on mobile unless toggled */}
      {!isOnboarding && (
        <>
          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          
          <div className={`
            fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}>
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-background w-full">
        {/* Header */}
        {!isOnboarding && (
          <header className="h-20 lg:h-24 flex items-center justify-between px-4 lg:px-12 bg-white/40 backdrop-blur-3xl z-30 border-b border-slate-100">
              <div className="flex items-center gap-4 lg:gap-10">
                {/* Hamburger Menu Button */}
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="lg:hidden p-2.5 rounded-xl bg-white border border-slate-100 shadow-sm text-slate-600 active:scale-95 transition-all"
                >
                  {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>

                <div className="flex flex-col">
                    <h1 className="text-[9px] lg:text-[10px] font-black text-slate-800 uppercase tracking-[0.3em] lg:tracking-[0.4em] mb-0.5 lg:mb-1">
                        {PLATFORM_CONFIG.institutionName}
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] lg:text-xs font-bold text-slate-900 font-serif italic">Access</span>
                        <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                        <span className="text-[8px] lg:text-[10px] font-black text-blue-600 uppercase tracking-widest">v1.2.4</span>
                    </div>
                </div>
                
                <div className="hidden lg:flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus-within:bg-white focus-within:border-blue-200 transition-all duration-500 group">
                  <Search className="h-4 w-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search health records, doctors..." 
                    className="bg-transparent border-none outline-none text-xs text-slate-900 w-64 placeholder:text-slate-300 font-medium"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3 lg:gap-8">
                  <div className="hidden sm:flex items-center gap-2.5 text-[9px] font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 uppercase tracking-widest shadow-sm">
                     <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                     Live Sync
                  </div>
                  
                  <button className="relative p-2.5 lg:p-3 rounded-xl lg:rounded-2xl hover:bg-white transition-all border border-transparent hover:border-slate-100 hover:shadow-xl hover:shadow-slate-100 group">
                      <Bell className="h-5 w-5 lg:h-6 lg:w-6 text-slate-400 lg:text-slate-300 group-hover:text-slate-900 transition-all duration-300" />
                      <span className="absolute top-2.5 right-2.5 lg:top-3 lg:right-3 h-2 w-2 bg-indigo-500 rounded-full border-2 border-white shadow-lg"></span>
                  </button>
              </div>
          </header>
        )}

        {/* Page Content */}
        <section className="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar scroll-smooth">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
        </section>
      </main>
    </div>
  );
}

