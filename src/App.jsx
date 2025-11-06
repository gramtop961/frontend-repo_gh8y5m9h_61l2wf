import React, { useMemo, useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Landing from './components/Landing';
import RoomBooking from './components/RoomBooking';
import AdminDashboard from './components/AdminDashboard';

function downloadText(filename, text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function App() {
  // Persisted theme
  const [theme, setTheme] = useState(() => localStorage.getItem('srmms_theme') || 'dark');
  const isDark = theme === 'dark';
  useEffect(() => {
    localStorage.setItem('srmms_theme', theme);
  }, [theme]);

  // Persisted view and role to avoid flicker on reload
  const [view, setView] = useState(() => localStorage.getItem('srmms_view') || 'landing'); // landing | home | book | admin
  const [role, setRole] = useState(() => localStorage.getItem('srmms_role')); // 'student' | 'admin' | null

  useEffect(() => {
    localStorage.setItem('srmms_view', view);
  }, [view]);
  useEffect(() => {
    if (role) localStorage.setItem('srmms_role', role);
    else localStorage.removeItem('srmms_role');
  }, [role]);

  // Persisted submissions
  const [submissions, setSubmissions] = useState(() => {
    const raw = localStorage.getItem('srmms_submissions');
    return raw ? JSON.parse(raw) : [];
  });
  useEffect(() => {
    localStorage.setItem('srmms_submissions', JSON.stringify(submissions));
  }, [submissions]);

  const pendingCount = useMemo(() => submissions.filter(s => s.status === 'pending').length, [submissions]);

  const createSubmission = (payload) => {
    const id = Math.random().toString(36).slice(2);
    const createdAt = new Date().toISOString();
    setSubmissions(prev => [{ id, createdAt, status: 'pending', ...payload }, ...prev]);
    setView('home');
  };

  const approveSubmission = (id) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'approved' } : s));
  };
  const rejectSubmission = (id) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'rejected' } : s));
  };

  const exportCSV = () => {
    const headers = ['id','createdAt','status','roomId','roomName','date','startTime','endTime','name','contact','organization','reason'];
    const rows = submissions.map(s => headers.map(h => (s[h] ?? '').toString().replace(/"/g,'"')));
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n');
    downloadText('data_pengajuan.csv', csv);
  };

  const goHome = () => setView('home');

  // Explicit login handlers to avoid side effects that cause flicker
  const handleStudentLogin = () => {
    setRole('student');
    setView('home');
  };
  const handleAdminLogin = () => {
    setRole('admin');
    setView('admin');
  };

  return (
    <div className={`${isDark ? 'bg-[#0a0b10] text-white' : 'bg-white text-gray-900'} min-h-screen`}>
      <Header pendingCount={pendingCount} theme={theme} setTheme={setTheme} onHome={goHome} />

      {view === 'landing' ? (
        <Landing theme={theme} onStudentLogin={handleStudentLogin} onAdminLogin={handleAdminLogin} />
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-6">
          <Sidebar theme={theme} setTheme={setTheme} onNavigate={setView} currentView={view} />

          <main className="space-y-6">
            {view === 'home' && (
              <section className={`rounded-2xl p-6 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
                <h2 className="text-lg font-semibold">Selamat datang di SRMMS</h2>
                <p className={`${isDark ? 'text-white/70' : 'text-gray-600'} mt-2`}>
                  Silakan pilih menu Peminjaman untuk mulai memesan ruangan. Mode tema dapat diubah di sidebar. Ruangan yang sudah disetujui akan otomatis tidak muncul di pilihan sampai waktunya selesai.
                </p>
              </section>
            )}

            {view === 'book' && (
              <RoomBooking theme={theme} submissions={submissions} onSubmit={createSubmission} />
            )}

            {view === 'admin' && (
              <AdminDashboard theme={theme} submissions={submissions} onApprove={approveSubmission} onReject={rejectSubmission} onExport={exportCSV} onBackHome={goHome} />
            )}
          </main>
        </div>
      )}

      <footer className={`mt-8 ${isDark ? 'text-white/50' : 'text-gray-500'} text-center text-xs py-6`}>
        SRMMS — Smart Room Management & Monitoring System
      </footer>
    </div>
  );
}
