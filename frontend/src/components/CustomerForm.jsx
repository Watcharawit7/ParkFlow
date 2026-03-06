import { useState, useEffect } from "react"

const CustomerForm = ({
  onSubmit,
  onCancel,
  isLoading,
  initialData = null,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    id: "",
    customerType: "REGULAR",
  })

  useEffect(() => {
    if (initialData && isEditing) {
      setFormData({
        name: initialData.name || "",
        phone: initialData.phone || "",
        id: initialData.id || "",
        customerType: initialData.customerType || "REGULAR",
      })
    }
  }, [initialData, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.phone) {
      onSubmit(formData)
      if (!isEditing) {
        setFormData({
          name: "",
          phone: "",
          customerType: "REGULAR",
          id: "",
        })
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEditing ? "แก้ไขข้อมูลลูกค้า" : "เพิ่มสมาชิกใหม่"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ชื่อ *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="ชื่อลูกค้า"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              เบอร์โทร *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="เบอร์โทรศัพท์"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ประเภทลูกค้า
            </label>
            <select
              name="customerType"
              value={formData.customerType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="REGULAR">ลูกค้าทั่วไป</option>
              <option value="MEMBER">สมาชิกแบบเหมาจ่าย</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Id
            </label>
            <input
              type="number"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="ระบุ id ของลูกค้า"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isLoading
                ? "กำลังบันทึก..."
                : isEditing
                  ? "บันทึกการเปลี่ยนแปลง"
                  : "สร้าง"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-400"
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CustomerForm
