import React, { useMemo } from 'react';
import { Check, X, Download } from 'lucide-react';

export default function AdminDashboard({ theme, submissions, onApprove, onReject, onExport, onBackHome }) {
  const isDark = theme === 'dark';

  const pendingCount = useMemo(() => submissions.filter(s => s.status === 'pending').length, [submissions]);

  return (
    <div className={`rounded-2xl p-4 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold`}>Dashboard Admin</h3>
          <p className={`${isDark ? 'text-white/60' : 'text-gray-600'} text-sm`}>Menunggu: {pendingCount}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onExport} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}><Download size={16}/> Export CSV</button>
          <button onClick={onBackHome} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}>Kembali ke Home</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className={isDark ? 'text-white/70' : 'text-gray-600'}>
              <th className="text-left py-2 px-2">Waktu</th>
              <th className="text-left py-2 px-2">Pemohon</th>
              <th className="text-left py-2 px-2">Ruangan</th>
              <th className="text-left py-2 px-2">Tanggal</th>
              <th className="text-left py-2 px-2">Jam</th>
              <th className="text-left py-2 px-2">Status</th>
              <th className="text-left py-2 px-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.id} className={`${isDark ? 'text-white/90' : 'text-gray-800'} border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                <td className="py-2 px-2">{new Date(s.createdAt).toLocaleString()}</td>
                <td className="py-2 px-2">{s.name} · {s.organization}</td>
                <td className="py-2 px-2">{s.roomName}</td>
                <td className="py-2 px-2">{s.date}</td>
                <td className="py-2 px-2">{s.startTime} - {s.endTime}</td>
                <td className="py-2 px-2 capitalize">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${s.status==='approved' ? (isDark ? 'bg-green-500/10 text-green-300 border border-green-500/30' : 'bg-green-50 text-green-700 border border-green-200') : s.status==='rejected' ? (isDark ? 'bg-red-500/10 text-red-300 border border-red-500/30' : 'bg-red-50 text-red-700 border border-red-200') : (isDark ? 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/30' : 'bg-yellow-50 text-yellow-700 border border-yellow-200')}`}>
                    {s.status}
                  </span>
                </td>
                <td className="py-2 px-2">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onApprove(s.id)} className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}><Check size={14}/> Setujui</button>
                    <button onClick={() => onReject(s.id)} className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}><X size={14}/> Tolak</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
