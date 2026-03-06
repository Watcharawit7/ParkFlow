import { useState } from "react"
import { PRICING_RATES, calculateParkingFee } from "../utils/parkingConstants"

const Pricing = () => {
  const [selectedType, setSelectedType] = useState("REGULAR")
  const [hours, setHours] = useState(1)

  const fee = calculateParkingFee(hours, selectedType)
  const rate = PRICING_RATES[selectedType]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">อัตราค่าจอดรถ</h1>

      {/* Pricing Plans Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {Object.entries(PRICING_RATES).map(([key, plan]) => (
          <div
            key={key}
            className={`border-2 rounded-lg p-6 cursor-pointer transition ${
              selectedType === key
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 bg-gray-50"
            }`}
            onClick={() => setSelectedType(key)}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {plan.name}
            </h2>
            <p className="text-gray-600 mb-6">{plan.description}</p>

            <div className="space-y-4 mb-6">
              <div className="bg-white rounded p-4">
                <p className="text-sm text-gray-500 mb-1">ชั่วโมงที่ 1</p>
                <p className="text-2xl font-bold text-gray-800">
                  {plan.firstHour === 0 ? "ฟรี" : `${plan.firstHour} บาท`}
                </p>
              </div>

              <div className="bg-white rounded p-4">
                <p className="text-sm text-gray-500 mb-1">
                  ชั่วโมงที่ 1 เป็นต้นไป
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {key === "REGULAR"
                    ? `${plan.perDay} บาท/วัน`
                    : `${plan.perDay} Credit/วัน`}
                </p>
              </div>
            </div>

            <button
              className={`w-full py-2 rounded-lg font-semibold transition ${
                selectedType === key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {selectedType === key ? "✓ เลือกแล้ว" : "เลือกแผน"}
            </button>
          </div>
        ))}
      </div>

      {/* Fee Calculator */}
      <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          เครื่องคำนวณค่าจอด
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ประเภทลูกค้า
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              {Object.entries(PRICING_RATES).map(([key, plan]) => (
                <option key={key} value={key}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ระยะเวลาที่จอด: {hours} ชั่วโมง
            </label>
            <input
              type="range"
              min="1"
              max="72"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>1 ชั่วโมง</span>
              <span>72 ชั่วโมง</span>
            </div>
          </div>

          <div className="pt-4 border-t-2">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-2">รายละเอียด:</p>
              <p className="text-sm text-gray-700 mb-4">{fee.breakdown}</p>

              <div className="flex justify-between items-end">
                <span className="text-sm text-gray-600">ค่าที่จ่าย:</span>
                <p className="text-4xl font-bold text-blue-600">
                  {fee.amount}{" "}
                  <span className="text-xl text-gray-600">{fee.unit}</span>
                </p>
              </div>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            ไปที่ระบบชำระเงิน
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pricing
