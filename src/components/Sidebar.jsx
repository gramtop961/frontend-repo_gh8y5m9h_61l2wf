import React from 'react';
import { Home, Globe, LayoutGrid, CalendarDays } from 'lucide-react';

export default function Sidebar({ theme, setTheme, onNavigate, currentView }) {
  const isDark = theme === 'dark';
  return (
    <aside className={`h-full w-64 shrink-0 p-4 ${isDark ? 'bg-black/30 border-r border-white/10' : 'bg-white border-r border-gray-200'}`}>
      <div className="flex items-center justify-between mb-4">
        <span className={`${isDark ? 'text-white/80' : 'text-gray-700'} text-sm`}>Tema</span>
        <div className="flex gap-2">
          <button onClick={() => setTheme('light')} className={`text-xs rounded px-2 py-1 ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'} ${theme==='light' ? 'ring-2 ring-blue-500' : ''}`}>Light</button>
          <button onClick={() => setTheme('dark')} className={`text-xs rounded px-2 py-1 ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'} ${theme==='dark' ? 'ring-2 ring-fuchsia-500' : ''}`}>Futuristic</button>
        </div>
      </div>

      <nav className="space-y-2">
        <button onClick={() => onNavigate('home')} className={`w-full inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${currentView==='home' ? (isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900') : (isDark ? 'text-white/80 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100')}`}>
          <Home size={18} /> Home
        </button>
        <button onClick={() => onNavigate('book')} className={`w-full inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${currentView==='book' ? (isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900') : (isDark ? 'text-white/80 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100')}`}>
          <CalendarDays size={18} /> Peminjaman
        </button>
        <button onClick={() => onNavigate('admin')} className={`w-full inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${currentView==='admin' ? (isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900') : (isDark ? 'text-white/80 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100')}`}>
          <LayoutGrid size={18} /> Admin
        </button>
        <a href="https://www.google.com" target="_blank" rel="noreferrer" className={`w-full inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${isDark ? 'text-white/80 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}>
          <Globe size={18} /> Google
        </a>
      </nav>
    </aside>
  );
}
