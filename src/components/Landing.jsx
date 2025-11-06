import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Home, User, Shield } from 'lucide-react';

export default function Landing({ onStudentLogin, onAdminLogin, theme }) {
  const [studentUser, setStudentUser] = useState('');
  const [studentPass, setStudentPass] = useState('');
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [error, setError] = useState('');

  const handleStudent = (e) => {
    e.preventDefault();
    if (studentUser === '123' && studentPass === '123') {
      setError('');
      onStudentLogin();
    } else {
      setError('Akun mahasiswa salah. Gunakan username: 123, password: 123');
    }
  };

  const handleAdmin = (e) => {
    e.preventDefault();
    if (adminUser === 'admin123' && adminPass === 'admin 123') {
      setError('');
      onAdminLogin();
    } else {
      setError('Akun admin salah. username: admin123, password: "admin 123"');
    }
  };

  return (
    <div className={`relative w-full h-[calc(100vh-64px)] overflow-hidden ${theme === 'dark' ? 'bg-[#0a0b10]' : 'bg-white'}`}>
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/2nDzdEDzvDa7l5YI/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`rounded-2xl p-6 backdrop-blur-md ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white shadow'} `}>
          <div className="flex items-center gap-2 mb-4">
            <User className={`${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`} />
            <h2 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold`}>Masuk Mahasiswa</h2>
          </div>
          <form onSubmit={handleStudent} className="space-y-3">
            <input className={`w-full rounded-lg px-3 py-2 outline-none ${theme === 'dark' ? 'bg-white/10 text-white placeholder-white/60' : 'bg-gray-100 text-gray-900 placeholder-gray-500'}`} placeholder="Username" value={studentUser} onChange={(e)=>setStudentUser(e.target.value)} />
            <input className={`w-full rounded-lg px-3 py-2 outline-none ${theme === 'dark' ? 'bg-white/10 text-white placeholder-white/60' : 'bg-gray-100 text-gray-900 placeholder-gray-500'}`} type="password" placeholder="Password" value={studentPass} onChange={(e)=>setStudentPass(e.target.value)} />
            <button className={`w-full rounded-lg py-2 font-semibold transition ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>Masuk</button>
          </form>
        </div>

        <div className={`rounded-2xl p-6 backdrop-blur-md ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white shadow'} `}>
          <div className="flex items-center gap-2 mb-4">
            <Shield className={`${theme === 'dark' ? 'text-fuchsia-400' : 'text-violet-600'}`} />
            <h2 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold`}>Masuk Admin</h2>
          </div>
          <form onSubmit={handleAdmin} className="space-y-3">
            <input className={`w-full rounded-lg px-3 py-2 outline-none ${theme === 'dark' ? 'bg-white/10 text-white placeholder-white/60' : 'bg-gray-100 text-gray-900 placeholder-gray-500'}`} placeholder="Username" value={adminUser} onChange={(e)=>setAdminUser(e.target.value)} />
            <input className={`w-full rounded-lg px-3 py-2 outline-none ${theme === 'dark' ? 'bg-white/10 text-white placeholder-white/60' : 'bg-gray-100 text-gray-900 placeholder-gray-500'}`} type="password" placeholder="Password" value={adminPass} onChange={(e)=>setAdminPass(e.target.value)} />
            <button className={`w-full rounded-lg py-2 font-semibold transition ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white' : 'bg-violet-600 text-white hover:bg-violet-700'}`}>Masuk</button>
          </form>
        </div>

        {error && (
          <div className={`md:col-span-2 rounded-xl p-3 ${theme === 'dark' ? 'bg-red-500/10 text-red-300 border border-red-500/30' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {error}
          </div>
        )}

        <div className="md:col-span-2 text-center">
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <Home className={`${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`} size={18} />
            <span>Smart Room Management & Monitoring System</span>
          </div>
        </div>
      </div>
    </div>
  );
}
