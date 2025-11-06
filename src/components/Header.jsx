import { Home, Settings, Bell } from 'lucide-react'

function Header({ onToggleAdmin, isAdminOpen, pendingCount = 0 }) {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center">
            <Home className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Smart Room Management & Monitoring System
            </h1>
            <p className="text-sm text-gray-500 -mt-0.5">BEM Dirdikma Sarpras</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            {pendingCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-600 px-1.5 text-xs font-semibold text-white">
                {pendingCount}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onToggleAdmin}
            className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium ${isAdminOpen ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            <Settings className="h-4 w-4" />
            {isAdminOpen ? 'Tutup Admin' : 'Admin Area'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
