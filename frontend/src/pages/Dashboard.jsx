import { useState } from "react"
import { Link } from "react-router-dom"
import { PARKING_ZONES } from "../utils/parkingConstants"

const Dashboard = () => {
  const [stats] = useState({
    totalParking: PARKING_ZONES.reduce((sum, zone) => sum + zone.totalSpots, 0),
    availableSpots: PARKING_ZONES.reduce(
      (sum, zone) => sum + zone.availableSpots,
      0,
    ),
    todayRevenue: "฿4,500",
  })

  const occupancyRate = (
    ((stats.totalParking - stats.availableSpots) / stats.totalParking) *
    100
  ).toFixed(0)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">แดชบอร์ด</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-semibold mb-2">
            จำนวนที่จอดรถทั้งหมด
          </h3>
          <p className="text-3xl font-bold text-gray-800">
            {stats.totalParking}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-semibold mb-2">
            ช่องว่างที่พร้อม
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {stats.availableSpots}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-semibold mb-2">
            อัตราการครอบครอง
          </h3>
          <p className="text-3xl font-bold text-orange-600">{occupancyRate}%</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-semibold mb-2">
            รายได้วันนี้
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats.todayRevenue}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">สรุปการใช้งาน</h2>
        <div className="text-gray-600 mb-6">
          <p>ข้อมูลสรุปการใช้งานระบบจอดรถในช่วงวันนี้</p>
        </div>
        <div className="flex gap-4">
          <Link
            to="/parking-zones"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            ดูพื้นที่จอดรถ
          </Link>
          <Link
            to="/pricing"
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            ดูอัตราค่าจอด
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
