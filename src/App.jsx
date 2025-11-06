import { useMemo, useState } from 'react'
import Header from './components/Header'
import RoomGrid from './components/RoomGrid'
import AvailabilityCalendar from './components/AvailabilityCalendar'
import BookingForm from './components/BookingForm'
import AdminDashboard from './components/AdminDashboard'
import LetterModal from './components/LetterModal'

function App() {
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [pickedSlot, setPickedSlot] = useState(null)
  const [submitted, setSubmitted] = useState(null)
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [submissions, setSubmissions] = useState([])
  const [letterData, setLetterData] = useState(null)

  const pendingCount = useMemo(() => submissions.filter(s => s.status === 'pending').length, [submissions])

  function computeAvailability(room, date, timeLabel) {
    // Mark as unavailable if a submission (approved or pending) overlaps same room+date+time
    return !submissions.some(s => s.roomId === room.id && s.date === date && `${s.startTime} - ${s.endTime}` === timeLabel && ['pending','approved'].includes(s.status))
  }

  function addSubmission(data) {
    const id = Math.random().toString(36).slice(2, 10)
    const record = { id, createdAt: Date.now(), status: 'pending', ...data }
    setSubmissions(prev => [...prev, record])
    setSubmitted(record)
  }

  function handleApprove(item) {
    setSubmissions(prev => prev.map(s => s.id === item.id ? { ...s, status: 'approved' } : s))
  }

  function handleReject(item) {
    setSubmissions(prev => prev.map(s => s.id === item.id ? { ...s, status: 'rejected' } : s))
  }

  function handleGenerateLetter(item) {
    if (item.status !== 'approved') return
    setLetterData(item)
  }

  function handleReset() {
    setSubmitted(null)
    setPickedSlot(null)
    setSelectedRoom(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Header onToggleAdmin={() => setIsAdminOpen(v => !v)} isAdminOpen={isAdminOpen} pendingCount={pendingCount} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          {!isAdminOpen && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">Peminjaman Ruang Kelas</h2>
                  <p className="text-gray-600">Pilih ruangan, cek ketersediaan, lalu ajukan peminjaman.</p>
                </div>
                {selectedRoom && !submitted && (
                  <button onClick={handleReset} className="text-sm text-indigo-600 hover:underline">Mulai Ulang</button>
                )}
              </div>

              {!selectedRoom && !submitted && (
                <RoomGrid onSelect={(room) => setSelectedRoom(room)} />
              )}

              {selectedRoom && !pickedSlot && !submitted && (
                <AvailabilityCalendar room={selectedRoom} computeAvailability={computeAvailability} onProceed={(picked) => setPickedSlot(picked)} />
              )}

              {selectedRoom && pickedSlot && !submitted && (
                <BookingForm
                  room={selectedRoom}
                  picked={pickedSlot}
                  onCancel={() => setPickedSlot(null)}
                  onSubmitted={(data) => addSubmission(data)}
                />
              )}

              {submitted && (
                <section className="mt-8">
                  <div className="rounded-xl border bg-emerald-50 p-6 text-emerald-800">
                    <h3 className="text-lg font-semibold">Pengajuan telah diterima!</h3>
                    <p className="mt-1 text-sm">Menunggu verifikasi admin. Anda akan menerima pemberitahuan keputusan.</p>
                    <div className="mt-4 grid gap-2 text-sm">
                      <span><strong>Ruang:</strong> {submitted.roomName}</span>
                      <span><strong>Tanggal:</strong> {new Date(submitted.date).toLocaleDateString('id-ID')}</span>
                      <span><strong>Waktu:</strong> {submitted.startTime} - {submitted.endTime}</span>
                      <span><strong>Nama:</strong> {submitted.name}</span>
                      <span><strong>Kontak:</strong> {submitted.contact}</span>
                      {submitted.organization && <span><strong>Organisasi:</strong> {submitted.organization}</span>}
                      <span><strong>Alasan:</strong> {submitted.reason}</span>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => setIsAdminOpen(true)}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-white text-sm font-medium"
                      >
                        Lihat Status di Dashboard
                      </button>
                      <button
                        onClick={handleReset}
                        className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-white/60"
                      >
                        Ajukan Lagi
                      </button>
                    </div>
                  </div>
                </section>
              )}
            </>
          )}

          {isAdminOpen && (
            <AdminDashboard
              submissions={submissions}
              onApprove={handleApprove}
              onReject={handleReject}
              onGenerateLetter={handleGenerateLetter}
            />
          )}
        </section>
      </main>

      <footer className="py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SRMMS — BEM Dirdikma Sarpras
      </footer>

      <LetterModal open={!!letterData} onClose={() => setLetterData(null)} data={letterData} />
    </div>
  )
}

export default App
