import React, { useEffect, useMemo, useState } from 'react';
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
  const [theme, setTheme] = useState('dark'); // default Futuristic Dark
  const isDark = theme === 'dark';

  const [view, setView] = useState('landing'); // landing | home | book | admin
  const [role, setRole] = useState(null); // 'student' | 'admin'

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
    // after submit, go back to home (as requested)
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
    const rows = submissions.map(s => headers.map(h => (s[h] ?? '').toString().replace(/"/g,'\"')));
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n');
    downloadText('data_pengajuan.csv', csv);
  };

  // Automatically hide approved rooms in selection while their time window is active
  // The RoomBooking component uses submissions to compute blocks

  const goHome = () => setView('home');

  useEffect(() => {
    // default to home after landing login
    if (view === 'landing' && role) setView('home');
  }, [role, view]);

  return (
    <div className={`${isDark ? 'bg-[#0a0b10] text-white' : 'bg-white text-gray-900'} min-h-screen`}> 
      <Header pendingCount={pendingCount} theme={theme} setTheme={setTheme} onHome={goHome} />

      {view === 'landing' ? (
        <Landing theme={theme} onStudentLogin={() => { setRole('student'); setView('home'); }} onAdminLogin={() => { setRole('admin'); setView('admin'); }} />
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-6">
          <Sidebar theme={theme} setTheme={setTheme} onNavigate={setView} currentView={view} />

          <main className="space-y-6">
            {view === 'home' && (
              <section className={`rounded-2xl p-6 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
                <h2 className="text-lg font-semibold">Selamat datang di SRMMS</h2>
                <p className={`${isDark ? 'text-white/70' : 'text-gray-600'} mt-2`}>Silakan pilih menu Peminjaman untuk mulai memesan ruangan. Mode tema dapat diubah di sidebar. Ruangan yang sudah disetujui akan otomatis tidak muncul di pilihan sampai waktunya selesai.</p>
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

      <footer className={`mt-8 ${isDark ? 'text-white/50' : 'text-gray-500'} text-center text-xs py-6`}>SRMMS — Smart Room Management & Monitoring System</footer>
    </div>
  );
}
