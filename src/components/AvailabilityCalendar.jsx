import { useState } from 'react'
import { Clock, CheckCircle2, XCircle } from 'lucide-react'

// Simple mocked availability slots for demo purpose
const defaultSlots = {
  morning: { label: '08:00 - 10:00', available: true },
  mid: { label: '10:00 - 12:00', available: false },
  noon: { label: '13:00 - 15:00', available: true },
  evening: { label: '15:00 - 17:00', available: true },
}

function Slot({ id, slot, selected, onSelect }) {
  const state = slot.available ? (selected ? 'selected' : 'available') : 'unavailable'
  const styles = {
    available: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
    selected: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    unavailable: 'border-rose-200 bg-rose-50 text-rose-600 cursor-not-allowed',
  }
  const Icon = slot.available ? (selected ? CheckCircle2 : Clock) : XCircle

  return (
    <button
      disabled={!slot.available}
      onClick={() => onSelect(id)}
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${styles[state]}`}
    >
      <Icon className="h-4 w-4" />
      {slot.label}
    </button>
  )
}

function AvailabilityCalendar({ room, onProceed }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [slots, setSlots] = useState(defaultSlots)
  const [selected, setSelected] = useState(null)

  function handleSelect(id) {
    setSelected(id)
  }

  function handleContinue() {
    if (!selected) return
    const picked = { date, timeRange: slots[selected].label }
    onProceed(picked)
  }

  if (!room) return null

  return (
    <section className="mt-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Ketersediaan {room.name}</h3>
          <p className="text-sm text-gray-500">Pilih tanggal dan jam yang masih kosong</p>
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {Object.entries(slots).map(([id, slot]) => (
          <Slot key={id} id={id} slot={slot} selected={selected === id} onSelect={handleSelect} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {selected ? `Dipilih: ${slots[selected].label} pada ${new Date(date).toLocaleDateString('id-ID')}` : 'Silakan pilih salah satu waktu yang tersedia.'}
        </p>
        <button
          onClick={handleContinue}
          disabled={!selected}
          className="rounded-md bg-indigo-600 px-4 py-2 text-white text-sm font-medium disabled:opacity-50"
        >
          Ajukan Peminjaman Ruangan
        </button>
      </div>
    </section>
  )
}

export default AvailabilityCalendar
