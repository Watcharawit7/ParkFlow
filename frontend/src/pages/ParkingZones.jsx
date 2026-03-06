import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchAllParkingZones, fetchAllParkingSlots } from "../redux/actions"

const ParkingSlot = ({ zone }) => {
  const totalSpots = zone.totalSpots || 0
  const occupiedSpots = zone.occupiedSpots || 0
  const availableSpots = totalSpots - occupiedSpots
  const occupancyRate = totalSpots
    ? ((occupiedSpots / totalSpots) * 100).toFixed(0)
    : 0
  const isAvailable = availableSpots > 0
  const status = isAvailable ? "ว่าง" : "เต็ม"
  const statusColor = isAvailable ? "text-green-600" : "text-red-600"
  const bgColor = isAvailable ? "bg-green-50" : "bg-red-50"

  return (
    <div className={`${bgColor} border rounded-lg p-6`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{zone.name}</h3>
          <p className="text-sm text-gray-600">{zone.location}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}
        >
          {status}
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">ความเต็มจำนวน</span>
            <span className="text-sm font-semibold">{occupancyRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${occupancyRate}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">ช่องว่าง</p>
            <p className="text-2xl font-bold text-green-600">
              {zone.availableSpots}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">ครอบครอง</p>
            <p className="text-2xl font-bold text-orange-600">
              {zone.occupiedSpots}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">ทั้งหมด</p>
            <p className="text-2xl font-bold text-gray-800">
              {zone.totalSpots}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ParkingZones = () => {
  const zones = useSelector((state) => state.parkingZone.parkingZones) || []
  const slots = useSelector((state) => state.parkingSlot.parkingSlots) || []

  // compute derived values
  const totalSpots = zones.reduce((sum, z) => sum + (z.totalSpots || 0), 0)
  const totalOccupied = zones.reduce(
    (sum, z) => sum + (z.occupiedSpots || 0),
    0,
  )
  const totalAvailable = totalSpots - totalOccupied

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllParkingZones())
    dispatch(fetchAllParkingSlots())
  }, [dispatch])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">พื้นที่จอดรถ</h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-semibold mb-2">
            ช่องว่างทั้งหมด
          </h3>
          <p className="text-3xl font-bold text-green-600">{totalAvailable}</p>
          <p className="text-xs text-gray-500 mt-2">
            จากทั้งหมด {totalSpots} ช่อง
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-semibold mb-2">
            ครอบครองแล้ว
          </h3>
          <p className="text-3xl font-bold text-orange-600">{totalOccupied}</p>
          <p className="text-xs text-gray-500 mt-2">
            {((totalOccupied / totalSpots) * 100).toFixed(0)}% เต็ม
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-semibold mb-2">
            ความพร้อม
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {((totalAvailable / totalSpots) * 100).toFixed(0)}%
          </p>
          <p className="text-xs text-gray-500 mt-2">พร้อมให้บริการ</p>
        </div>
      </div>

      {/* Parking Zones Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {zones.length > 0 ? (
          zones.map((zone) => (
            <ParkingSlot key={zone._id || zone.id} zone={zone} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            ไม่พบข้อมูลพื้นที่จอดรถ
          </p>
        )}
      </div>
    </div>
  )
}

export default ParkingZones
