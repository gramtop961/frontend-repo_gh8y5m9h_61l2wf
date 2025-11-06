import React, { useMemo, useState } from 'react';
import { CalendarDays, Clock, XCircle, CheckCircle2 } from 'lucide-react';

const ROOMS = [
  { id: 1, name: 'AULA ITSB', capacity: 200 },
  { id: 2, name: '201 (Lab Cerdas)', capacity: 40 },
  { id: 3, name: '202', capacity: 40 },
  { id: 4, name: '203', capacity: 40 },
  { id: 5, name: '204', capacity: 40 },
  { id: 6, name: '205', capacity: 40 },
  { id: 7, name: '206', capacity: 40 },
  { id: 8, name: '201 C', capacity: 40 },
  { id: 9, name: '202 C', capacity: 40 },
  { id: 10, name: '203 C', capacity: 40 },
  { id: 11, name: '204 C', capacity: 40 },
  { id: 12, name: '301', capacity: 40 },
  { id: 13, name: '302', capacity: 40 },
  { id: 14, name: '303', capacity: 40 },
  { id: 15, name: '304', capacity: 40 },
  { id: 16, name: '305', capacity: 40 },
  { id: 17, name: '306', capacity: 40 },
  { id: 18, name: '307', capacity: 40 },
  { id: 19, name: '308', capacity: 40 },
  { id: 20, name: '401', capacity: 40 },
  { id: 21, name: '402', capacity: 40 },
  { id: 22, name: '403', capacity: 40 },
  { id: 23, name: '404', capacity: 40 },
  { id: 24, name: '405', capacity: 40 },
  { id: 25, name: '406', capacity: 40 },
];

const SLOTS = [
  { label: '08:00 - 10:00', start: '08:00', end: '10:00' },
  { label: '10:00 - 12:00', start: '10:00', end: '12:00' },
  { label: '13:00 - 15:00', start: '13:00', end: '15:00' },
  { label: '15:00 - 17:00', start: '15:00', end: '17:00' },
];

export default function RoomBooking({ theme, submissions, onSubmit }) {
  const isDark = theme === 'dark';
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));
  const [selected, setSelected] = useState(null);
  const [slot, setSlot] = useState(null);
  const [form, setForm] = useState({ name: '', contact: '', organization: '', reason: '' });
  const [message, setMessage] = useState('');

  const activeBookings = useMemo(() => submissions.filter(s => s.status === 'approved'), [submissions]);

  const isRoomBlocked = (roomId) => {
    if (!date) return false;
    if (!slot) {
      // tanpa slot: jika ada persetujuan apapun di tanggal ini untuk ruangan tsb, tandai merah
      return activeBookings.some(b => b.roomId === roomId && b.date === date);
    }
    // dengan slot: cek overlap
    return activeBookings.some(b => b.roomId === roomId && b.date === date && !(slot.end <= b.startTime || slot.start >= b.endTime));
  };

  const visibleRooms = useMemo(() => {
    if (!slot) return ROOMS; // jika belum pilih slot, tampilkan semua (tapi merah jika sedang dipakai hari itu)
    return ROOMS.filter(r => !isRoomBlocked(r.id)); // saat sesi peminjaman: ruangan terpakai tidak muncul
  }, [slot, date, activeBookings]);

  const blockedCount = useMemo(() => {
    if (!slot) return 0;
    return ROOMS.reduce((acc, r) => acc + (isRoomBlocked(r.id) ? 1 : 0), 0);
  }, [slot, date, activeBookings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected || !slot) return;
    if (!form.name || !form.contact) return;
    onSubmit({
      roomId: selected.id,
      roomName: selected.name,
      date,
      startTime: slot.start,
      endTime: slot.end,
      ...form,
    });
    setMessage('Pengajuan terkirim. Silakan menunggu persetujuan admin.');
    setSelected(null);
    setSlot(null);
    setForm({ name: '', contact: '', organization: '', reason: '' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className={`lg:col-span-2 rounded-2xl p-4 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-4">
          <CalendarDays className={isDark ? 'text-cyan-400' : 'text-blue-600'} />
          <h3 className={isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}>Pilih Tanggal & Slot</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className={`rounded-lg px-3 py-2 ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`} />
          <div className="flex gap-2 flex-wrap">
            {SLOTS.map((s) => {
              const active = slot && slot.label === s.label;
              return (
                <button key={s.label} onClick={()=>{ setSlot(s); setSelected(null); }} className={`px-3 py-2 rounded-lg text-sm ${active ? (isDark ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white' : 'bg-blue-600 text-white') : (isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900')}`}>
                  <span className="inline-flex items-center gap-2"><Clock size={16} /> {s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {slot && blockedCount > 0 && (
          <div className={`mt-4 rounded-lg px-3 py-2 text-sm ${isDark ? 'bg-red-500/10 text-red-200 border border-red-500/30' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {blockedCount} ruangan sedang dipakai pada slot ini dan disembunyikan dari daftar.
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {(!slot ? ROOMS : visibleRooms).map((r) => {
            const blocked = isRoomBlocked(r.id);
            const hiddenBySlot = !!slot && blocked;
            const showCard = !slot || !hiddenBySlot;
            if (!showCard) return null;
            return (
              <button key={r.id} disabled={blocked && !slot} onClick={()=>setSelected(r)} className={`text-left rounded-xl p-3 border transition ${blocked && !slot ? (isDark ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-red-50 border-red-200 text-red-700') : (isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50')}`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{r.name}</span>
                  {blocked && !slot ? <XCircle className={isDark ? 'text-red-300' : 'text-red-600'} size={18} /> : <CheckCircle2 className={isDark ? 'text-cyan-400' : 'text-green-600'} size={18} />}
                </div>
                <div className={`text-xs mt-1 ${blocked && !slot ? '' : (isDark ? 'text-white/60' : 'text-gray-500')}`}>{blocked && !slot ? 'Sedang dipakai' : `Kapasitas ${r.capacity}`}</div>
              </button>
            );
          })}
          {slot && visibleRooms.length === 0 && (
            <div className={`rounded-lg p-3 text-sm ${isDark ? 'bg-white/5 border border-white/10 text-white/80' : 'bg-gray-50 border border-gray-200 text-gray-600'}`}>Tidak ada ruangan tersedia pada slot ini.</div>
          )}
        </div>
      </div>

      <div className={`rounded-2xl p-4 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-4">
          <Clock className={isDark ? 'text-fuchsia-400' : 'text-violet-600'} />
          <h3 className={isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}>Formulir Peminjaman</h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className={`block text-sm mb-1 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>Nama</label>
            <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} className={`w-full rounded-lg px-3 py-2 ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`} />
          </div>
          <div>
            <label className={`block text-sm mb-1 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>Kontak</label>
            <input value={form.contact} onChange={(e)=>setForm({...form, contact: e.target.value})} className={`w-full rounded-lg px-3 py-2 ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`} />
          </div>
          <div>
            <label className={`block text-sm mb-1 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>Organisasi</label>
            <input value={form.organization} onChange={(e)=>setForm({...form, organization: e.target.value})} className={`w-full rounded-lg px-3 py-2 ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`} />
          </div>
          <div>
            <label className={`block text-sm mb-1 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>Alasan</label>
            <textarea value={form.reason} onChange={(e)=>setForm({...form, reason: e.target.value})} className={`w-full rounded-lg px-3 py-2 ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`} />
          </div>
          <button disabled={!selected || !slot || !form.name || !form.contact} className={`w-full rounded-lg py-2 font-semibold ${isDark ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white disabled:opacity-50' : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'}`}>Kirim Pengajuan</button>
        </form>
        {message && <p className={`mt-3 text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>{message}</p>}
      </div>
    </div>
  );
}
