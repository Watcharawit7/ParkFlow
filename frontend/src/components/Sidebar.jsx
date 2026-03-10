import { Link, useLocation } from "react-router-dom"

const Sidebar = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
      ? "bg-blue-600 text-white"
      : "text-gray-700 hover:bg-gray-100"
  }

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-600">ParkFlow</h1>
      </div>

      <nav className="space-y-2">
        <Link
          to="/parking-zones"
          className={`block px-4 py-2 rounded-lg transition ${isActive("/parking-zones")}`}
        >
          🅿️ พื้นที่จอด
        </Link>
        <Link
          to="/reservations"
          className={`block px-4 py-2 rounded-lg transition ${isActive("/reservations")}`}
        >
          📝 จองที่จอดรถ
        </Link>
        <Link
          to="/pricing"
          className={`block px-4 py-2 rounded-lg transition ${isActive("/pricing")}`}
        >
          💰 อัตราค่าจอด
        </Link>
        <Link
          to="/customers"
          className={`block px-4 py-2 rounded-lg transition ${isActive("/customers")}`}
        >
          👥 ข้อมูลลูกค้า
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar
