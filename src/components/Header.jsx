import React from 'react';
import { Bell, Settings, Moon, Sun } from 'lucide-react';

export default function Header({ pendingCount = 0, theme, setTheme, onHome }) {
  const isDark = theme === 'dark';
  return (
    <header className={`sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 ${isDark ? 'bg-[#0a0b10]/70 border-b border-white/10' : 'bg-white/70 border-b border-gray-200'}`}>
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-9 w-9 rounded-xl ${isDark ? 'bg-gradient-to-br from-cyan-500 to-fuchsia-600' : 'bg-gradient-to-br from-blue-600 to-violet-600'}`} />
          <div className="flex flex-col">
            <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-500'}`}>SRMMS</span>
            <strong className={`${isDark ? 'text-white' : 'text-gray-900'}`}>Smart Rooms</strong>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onHome} className={`hidden md:inline-flex items-center rounded-lg px-3 py-1.5 text-sm ${isDark ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>Home</button>

          <div className="relative">
            <button className={`relative inline-flex items-center gap-2 rounded-lg px-3 py-1.5 ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}>
              <Bell size={18} />
              <span className="text-sm">Notifikasi</span>
              {pendingCount > 0 && (
                <span className={`absolute -top-2 -right-2 h-5 min-w-[20px] px-1 rounded-full text-xs flex items-center justify-center ${isDark ? 'bg-cyan-500 text-white' : 'bg-blue-600 text-white'}`}>{pendingCount}</span>
              )}
            </button>
          </div>

          <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}>
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            <span className="text-sm">{isDark ? 'Light' : 'Dark'}</span>
          </button>

          <button className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <Settings size={18} />
            <span className="text-sm">Pengaturan</span>
          </button>
        </div>
      </div>
    </header>
  );
}
