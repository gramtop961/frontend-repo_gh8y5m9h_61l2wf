import { useMemo } from 'react'
import { Check, X, Download } from 'lucide-react'

function toCSV(rows) {
  const headers = [
    'id','nama','kontak','organisasi','ruangan','tanggal','mulai','selesai','alasan','status','dibuatPada'
  ]
  const escape = (v) => '"' + String(v ?? '').replaceAll('"', '""') + '"'
  const lines = [headers.join(',')]
  for (const r of rows) {
    lines.push([
      r.id,
      r.name,
      r.contact,
      r.organization || '',
      r.roomName,
      r.date,
      r.startTime,
      r.endTime,
      r.reason,
      r.status,
      new Date(r.createdAt).toISOString(),
    ].map(escape).join(','))
  }
  return lines.join('\n')
}

function AdminDashboard({ submissions, onApprove, onReject, onGenerateLetter }) {
  const pending = useMemo(() => submissions.filter(s => s.status === 'pending'), [submissions])

  function handleDownloadCSV() {
    const csv = toCSV(submissions)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `srmms-submissions-${new Date().toISOString().slice(0,10)}.csv`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Dashboard Admin</h2>
          <p className="text-sm text-gray-500">Kelola pengajuan peminjaman ruangan.</p>
        </div>
        <button onClick={handleDownloadCSV} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50">
          <Download className="h-4 w-4" /> Unduh CSV
        </button>
      </div>

      <div className="mt-4 rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="border-b px-4 py-3 text-sm text-gray-700">{pending.length} pengajuan menunggu persetujuan</div>
        <div className="max-h-[480px] overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">Pemohon</th>
                <th className="px-4 py-2 text-left">Ruangan</th>
                <th className="px-4 py-2 text-left">Tanggal & Waktu</th>
                <th className="px-4 py-2 text-left">Alasan</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>Belum ada data pengajuan.</td>
                </tr>
              )}
              {submissions.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{s.name}</div>
                    <div className="text-gray-500">{s.contact}{s.organization ? ` • ${s.organization}` : ''}</div>
                  </td>
                  <td className="px-4 py-3">{s.roomName}</td>
                  <td className="px-4 py-3">
                    <div>{new Date(s.date).toLocaleDateString('id-ID')}</div>
                    <div className="text-gray-500">{s.startTime} - {s.endTime}</div>
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <div className="line-clamp-3">{s.reason}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      s.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : s.status === 'rejected' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {s.status === 'approved' ? 'Disetujui' : s.status === 'rejected' ? 'Ditolak' : 'Menunggu'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onApprove(s)}
                        className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1.5 text-white hover:bg-emerald-700 disabled:opacity-50"
                        disabled={s.status !== 'pending'}
                      >
                        <Check className="h-4 w-4" /> Setujui
                      </button>
                      <button
                        onClick={() => onReject(s)}
                        className="inline-flex items-center gap-1 rounded-md bg-rose-600 px-2.5 py-1.5 text-white hover:bg-rose-700 disabled:opacity-50"
                        disabled={s.status !== 'pending'}
                      >
                        <X className="h-4 w-4" /> Tolak
                      </button>
                      <button
                        onClick={() => onGenerateLetter(s)}
                        className="rounded-md border px-2.5 py-1.5 text-gray-700 hover:bg-gray-50"
                        disabled={s.status !== 'approved'}
                      >
                        Surat
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard
