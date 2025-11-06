import { useState } from 'react'
import { Send } from 'lucide-react'

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      {children}
    </label>
  )
}

function BookingForm({ room, picked, onCancel, onSubmitted }) {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    reason: '',
    organization: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!room || !picked) return null

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // In real app this posts to backend API. For now, simulate success.
      await new Promise((res) => setTimeout(res, 700))
      onSubmitted({ ...form, roomId: room.id, roomName: room.name, ...picked })
    } catch (err) {
      setError('Gagal mengirim pengajuan. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900">Formulir Pengajuan</h3>
      <p className="text-sm text-gray-500">Lengkapi data di bawah ini untuk mengirim pengajuan</p>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Nama Lengkap">
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Nama Anda"
          />
        </Field>
        <Field label="Kontak (Email/WhatsApp)">
          <input
            required
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="email@kampus.ac.id / 08xx"
          />
        </Field>
        <Field label="Organisasi/Penanggung Jawab">
          <input
            value={form.organization}
            onChange={(e) => setForm({ ...form, organization: e.target.value })}
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Himpunan/BEM/Unit"
          />
        </Field>
        <Field label="Alasan Pengajuan">
          <textarea
            required
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="w-full rounded-md border px-3 py-2 text-sm min-h-[96px]"
            placeholder="Tuliskan kebutuhan dan detail kegiatan"
          />
        </Field>

        <div className="sm:col-span-2 flex items-center justify-between pt-2">
          <p className="text-sm text-gray-600">
            {room.name} • {new Date(picked.date).toLocaleDateString('id-ID')} • {picked.timeRange}
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white text-sm font-medium disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              {loading ? 'Mengirim...' : 'Kirim Pengajuan'}
            </button>
          </div>
        </div>
        {error && <p className="sm:col-span-2 text-sm text-rose-600">{error}</p>}
      </form>
    </section>
  )
}

export default BookingForm
