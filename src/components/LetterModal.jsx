function LetterModal({ open, onClose, data }) {
  if (!open || !data) return null

  const { name, organization, contact, roomName, date, startTime, endTime, reason } = data

  function handlePrint() {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-20 bg-black/40 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl rounded-xl bg-white shadow-xl print:shadow-none">
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Surat Bukti Persetujuan Peminjaman</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Tutup</button>
        </div>
        <div className="px-6 py-6 print:p-0">
          <div className="prose max-w-none">
            <h2 className="text-center text-xl font-bold">Bukti Persetujuan Peminjaman Ruangan</h2>
            <p className="mt-4">Dengan ini menyatakan bahwa pengajuan peminjaman ruangan berikut telah disetujui:</p>
            <ul className="mt-2 list-disc pl-5">
              <li>Nama Pemohon: <strong>{name}</strong>{organization ? ` (${organization})` : ''}</li>
              <li>Kontak: {contact}</li>
              <li>Ruangan: <strong>{roomName}</strong></li>
              <li>Tanggal & Waktu: {new Date(date).toLocaleDateString('id-ID')} • {startTime} - {endTime}</li>
              <li>Alasan/Kegiatan: {reason}</li>
            </ul>
            <p className="mt-4">Harap membawa surat ini saat penggunaan ruangan. Terima kasih.</p>
            <div className="mt-8 flex justify-end">
              <div className="text-right">
                <p>BEM Dirdikma Sarpras</p>
                <p className="mt-12">__________________________</p>
                <p className="text-sm text-gray-500">Tanda Tangan & Nama Jelas</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t px-6 py-4 flex items-center justify-end gap-3 print:hidden">
          <button onClick={handlePrint} className="rounded-md bg-indigo-600 px-4 py-2 text-white text-sm font-medium">Cetak</button>
          <button onClick={onClose} className="rounded-md border px-4 py-2 text-sm font-medium">Tutup</button>
        </div>
      </div>
    </div>
  )
}

export default LetterModal
