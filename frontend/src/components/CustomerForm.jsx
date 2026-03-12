import { useState, useEffect } from "react"
import { Button, Select, MenuItem, Input } from "@mui/material"

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
    customerType: "",
    credits: 0,
  })

  // useEffect(() => {
  //   if (initialData && isEditing) {
  //     setFormData({
  //       name: initialData.name || "",
  //       phone: initialData.phone || "",
  //       id: initialData.id || "",
  //       customerType: initialData.customerType || "",
  //       credits: initialData.credits || 0,
  //     })
  //   }
  // }, [initialData, isEditing])

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
              Id
            </label>
            <Input
              type="number"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="ระบุ id ของลูกค้า"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ชื่อ *
            </label>
            <Input
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
            <Input
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
              credits
            </label>
            <Input
              type="number"
              name="credits"
              value={formData.credits}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="ระบุ credits ของลูกค้า"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ประเภทลูกค้า
            </label>
            <Select
              name="customerType"
              displayEmpty
              value={formData.customerType}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">เลือกประเภทสมาชิก</MenuItem>
              <MenuItem value="GENERAL">ลูกค้าทั่วไป</MenuItem>
              <MenuItem value="MEMBER">สมาชิกแบบเหมาจ่าย</MenuItem>
            </Select>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              variant="outlined"
              color="success"
            >
              {isLoading
                ? "กำลังบันทึก..."
                : isEditing
                  ? "บันทึกการเปลี่ยนแปลง"
                  : "สร้าง"}
            </Button>
            <Button onClick={onCancel} variant="outlined" color="error">
              ยกเลิก
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CustomerForm
