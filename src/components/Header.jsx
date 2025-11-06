import { Home, Settings } from 'lucide-react'

function Header() {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
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
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Settings className="h-4 w-4" />
          Admin Area
        </button>
      </div>
    </header>
  )
}

export default Header
