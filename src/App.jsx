import { useState } from 'react'
import Header from './components/Header'
import RoomGrid from './components/RoomGrid'
import AvailabilityCalendar from './components/AvailabilityCalendar'
import BookingForm from './components/BookingForm'

function App() {
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [pickedSlot, setPickedSlot] = useState(null)
  const [submitted, setSubmitted] = useState(null)

  function handleReset() {
    setSubmitted(null)
    setPickedSlot(null)
    setSelectedRoom(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
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
            <AvailabilityCalendar room={selectedRoom} onProceed={(picked) => setPickedSlot(picked)} />
          )}

          {selectedRoom && pickedSlot && !submitted && (
            <BookingForm
              room={selectedRoom}
              picked={pickedSlot}
              onCancel={() => setPickedSlot(null)}
              onSubmitted={(data) => setSubmitted(data)}
            />
          )}

          {submitted && (
            <section className="mt-8">
              <div className="rounded-xl border bg-emerald-50 p-6 text-emerald-800">
                <h3 className="text-lg font-semibold">Pengajuan telah diterima!</h3>
                <p className="mt-1 text-sm">Admin BEM Dirdikma Sarpras akan meninjau ajuan Anda dan mengirim keputusan melalui kontak yang Anda berikan.</p>
                <div className="mt-4 grid gap-2 text-sm">
                  <span><strong>Ruang:</strong> {submitted.roomName}</span>
                  <span><strong>Tanggal:</strong> {new Date(submitted.date).toLocaleDateString('id-ID')}</span>
                  <span><strong>Waktu:</strong> {submitted.timeRange}</span>
                  <span><strong>Nama:</strong> {submitted.name}</span>
                  <span><strong>Kontak:</strong> {submitted.contact}</span>
                  {submitted.organization && <span><strong>Organisasi:</strong> {submitted.organization}</span>}
                  <span><strong>Alasan:</strong> {submitted.reason}</span>
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => window.print()}
                    className="rounded-md bg-emerald-600 px-4 py-2 text-white text-sm font-medium"
                  >
                    Cetak Bukti Pengajuan
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
        </section>
      </main>

      <footer className="py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SRMMS — BEM Dirdikma Sarpras
      </footer>
    </div>
  )
}

export default App
