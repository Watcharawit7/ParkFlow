import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import {
  fetchAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../redux/actions/CustomerAction"
import CustomerForm from "../components/CustomerForm"

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Pagination,
} from "@mui/material"

const Customers = () => {
  const dispatch = useDispatch()
  const { customers, isLoading } = useSelector((state) => state.customer)
  const [showForm, setShowForm] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchPhone, setSearchPhone] = useState("")

  const [page, setPage] = useState(1)

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

  const customersPerPage = 6

  const indexOfLast = page * customersPerPage
  const indexOfFirst = indexOfLast - customersPerPage
  const currentCustomers = filteredCustomers.slice(indexOfFirst, indexOfLast)

  const handleChangePage = (event, value) => {
    setPage(value)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">ข้อมูลสมาชิก</h1>
          <Button
            onClick={() => setShowForm(true)}
            variant="contained"
            size="large"
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
              placeholder="พิมพ์เบอร์โทรศัพท์"
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
            {currentCustomers.length > 0 ? (
              currentCustomers.map((customer) => (
                <Card
                  key={customer?._id}
                  className="hover:shadow-lg transition"
                >
                  <CardContent>
                    <div className="flex justify-between items-center mb-3">
                      <Typography variant="h6">{customer?.id}</Typography>
                      <Chip
                        label={
                          customer?.customerType === "MEMBER"
                            ? "สมาชิก"
                            : "ทั่วไป"
                        }
                        color={
                          customer?.customerType === "MEMBER"
                            ? "secondary"
                            : "primary"
                        }
                        size="small"
                      />
                    </div>
                    <Typography variant="body2" color="text.secondary">
                      <strong>ชื่อ:</strong> {customer?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>เบอร์โทร:</strong> {customer?.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Credits:</strong> {customer?.credits}
                    </Typography>
                  </CardContent>
                  <CardActions className="flex justify-center gap-3 pb-4">
                    <Button
                      onClick={() => handleEditCustomer(customer)}
                      variant="outlined"
                      color="primary"
                    >
                      แก้ไข
                    </Button>
                    <Button
                      onClick={() => handleDeleteCustomer(customer)}
                      variant="outlined"
                      color="error"
                    >
                      ลบ
                    </Button>
                  </CardActions>
                </Card>
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
        <div className="flex justify-center mt-8">
          <Pagination
            count={Math.ceil(filteredCustomers.length / customersPerPage)}
            page={page}
            onChange={handleChangePage}
            size="large"
            variant="outlined"
            color="primary"
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    </div>
  )
}

export default Customers
