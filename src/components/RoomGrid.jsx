import { CalendarDays } from 'lucide-react'

const rooms = [
  { id: 'R101', name: 'Ruang 101', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R102', name: 'Ruang 102', capacity: 30, facilities: ['LCD', 'AC'] },
  { id: 'R201', name: 'Ruang 201', capacity: 50, facilities: ['LCD', 'AC', 'Sound System'] },
  { id: 'Aula', name: 'Aula Besar', capacity: 120, facilities: ['Stage', 'Sound System', 'LCD', 'AC'] },
]

function RoomCard({ room, onSelect }) {
  return (
    <button
      onClick={() => onSelect(room)}
      className="group w-full text-left rounded-xl border bg-white p-5 hover:shadow-md transition shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
          <p className="text-sm text-gray-500">Kapasitas {room.capacity} orang</p>
        </div>
        <div className="flex items-center gap-1 text-indigo-600">
          <CalendarDays className="h-5 w-5" />
          <span className="text-sm font-medium">Cek Jadwal</span>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {room.facilities.map((f) => (
          <span key={f} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
            {f}
          </span>
        ))}
      </div>
    </button>
  )
}

function RoomGrid({ onSelect }) {
  return (
    <section className="mt-6">
      <h2 className="text-xl font-semibold text-gray-900">Pilih Ruang Kelas</h2>
      <p className="text-sm text-gray-500">Klik salah satu ruangan untuk melihat ketersediaan</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} onSelect={onSelect} />
        ))}
      </div>
    </section>
  )
}

export default RoomGrid
