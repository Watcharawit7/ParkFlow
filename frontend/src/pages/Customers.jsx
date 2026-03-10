import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  fetchAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../redux/actions/CustomerAction"
import CustomerForm from "../components/CustomerForm"

import Button from "@mui/material/Button"
import Badge from "@mui/material/Badge"

const Customers = () => {
  const dispatch = useDispatch()
  const { customers, isLoading } = useSelector((state) => state.customer)
  const [showForm, setShowForm] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchPhone, setSearchPhone] = useState("")

  useEffect(() => {
    dispatch(fetchAllCustomers())
  }, [dispatch])

  const handleCreateCustomer = async (formData) => {
    console.log("Creating customer with data:", formData)
    setIsSubmitting(true)
    try {
      await dispatch(createCustomer(formData))
      setShowForm(false)
      dispatch(fetchAllCustomers())
    } catch (error) {
      console.error("Error creating customer:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer)
    setShowForm(true)
  }

  const handleDeleteCustomer = async (customer) => {
    if (window.confirm("คุณต้องการลบสมาชิกนี้หรือไม่?")) {
      try {
        await dispatch(deleteCustomer(customer._id))
      } catch (error) {
        console.error("Error deleting customer:", error)
      }
    }
  }

  const handleUpdateCustomer = async (formData) => {
    console.log("Updating customer with data:", formData)

    setIsSubmitting(true)
    try {
      await dispatch(updateCustomer(editingCustomer._id, formData))
      setShowForm(false)
      setEditingCustomer(null)
      dispatch(fetchAllCustomers())
    } catch (error) {
      console.error("Error updating customer:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingCustomer(null)
  }

  const filteredCustomers =
    customers?.filter((customer) =>
      customer.phone?.toLowerCase().includes(searchPhone.toLowerCase()),
    ) || []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">ข้อมูลสมาชิก</h1>
          <Button
            onClick={() => setShowForm(true)}
            variant="contained"
            size="large"
            // className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
          >
            + เพิ่มสมาชิกใหม่
          </Button>
        </div>

        <div className="mb-6">
          <div className="max-w-md">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ค้นหาโดยเบอร์โทร
            </label>
            <input
              type="text"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              placeholder="พิมพ์เบอร์โทรศัพท์..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>

        {showForm && (
          <CustomerForm
            onSubmit={
              editingCustomer ? handleUpdateCustomer : handleCreateCustomer
            }
            onCancel={handleCancel}
            isLoading={isSubmitting}
            initialData={editingCustomer}
            isEditing={!!editingCustomer}
          />
        )}

        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <div
                  key={customer._id}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {customer.id}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        customer.customerType === "MEMBER"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {customer.customerType === "MEMBER" ? "สมาชิก" : "ทั่วไป"}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">ชื่อ:</span>
                    {customer.name}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">เบอร์โทร:</span>
                    {customer.phone}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">Credits:</span>
                    {customer.credits}
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={() => handleEditCustomer(customer)}
                      variant="outlined"
                      size="medium"
                      color="primary"
                    >
                      แก้ไข
                    </Button>
                    <Button
                      onClick={() => handleDeleteCustomer(customer)}
                      variant="outlined"
                      color="error"
                      size="medium"
                    >
                      ลบ
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchPhone
                    ? "ไม่พบสมาชิกที่มีเบอร์โทรนี้"
                    : "ไม่มีข้อมูลสมาชิก"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Customers
