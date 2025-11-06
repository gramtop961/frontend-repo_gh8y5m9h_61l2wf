import { CalendarDays } from 'lucide-react'

const rooms = [
  { id: 'AULA-ITSB', name: 'AULA ITSB', capacity: 200, facilities: ['Stage', 'Sound System', 'LCD', 'AC'] },
  { id: 'R201-LAB-CERDAS', name: 'Ruangan kelas 201 ( Lab Cerdas)', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R202', name: 'Ruangan kelas 202', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R203', name: 'Ruangan kelas 203', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R204', name: 'Ruangan kelas 204', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R205', name: 'Ruangan kelas 205', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R206', name: 'Ruangan kelas 206', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R201C', name: 'Ruangan kelas 201 C', capacity: 30, facilities: ['LCD', 'AC'] },
  { id: 'R202C', name: 'Ruangan kelas 202 C', capacity: 30, facilities: ['LCD', 'AC'] },
  { id: 'R203C', name: 'Ruangan kelas 203 C', capacity: 30, facilities: ['LCD', 'AC'] },
  { id: 'R204C', name: 'Ruangan kelas 204 C', capacity: 30, facilities: ['LCD', 'AC'] },
  { id: 'R301', name: 'Ruangan kelas 301', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R302', name: 'Ruangan kelas 302', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R303', name: 'Ruangan kelas 303', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R304', name: 'Ruangan kelas 304', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R305', name: 'Ruangan kelas 305', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R306', name: 'Ruangan kelas 306', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R307', name: 'Ruangan kelas 307', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R308', name: 'Ruangan kelas 308', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R401', name: 'Ruangan kelas 401', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R402', name: 'Ruangan kelas 402', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R403', name: 'Ruangan kelas 403', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R404', name: 'Ruangan kelas 404', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R405', name: 'Ruangan kelas405', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
  { id: 'R406', name: 'Ruangan kelas 406', capacity: 40, facilities: ['LCD', 'AC', 'Whiteboard'] },
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
