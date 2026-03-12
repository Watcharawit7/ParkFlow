import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchAllCustomers } from "../redux/actions/CustomerAction"
import { fetchAllParkingZones, fetchAllParkingSlots } from "../redux/actions"
import {
  createParking,
  fetchAllParkings,
  updateParking,
} from "../redux/actions/ParkingAction"

import {
  Button,
  CircularProgress,
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Grid,
} from "@mui/material"

const Reservations = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { customers } = useSelector((state) => state.customer)
  const { parkingZones } = useSelector((state) => state.parkingZone)
  const { parkingSlots } = useSelector((state) => state.parkingSlot)
  const { parkings } = useSelector((state) => state.parking)

  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [selectedZone, setSelectedZone] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [licensePlate, setLicensePlate] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchCustomer, setSearchCustomer] = useState("")
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false)
  const [filterStatus, setFilterStatus] = useState("PARKING")
  const [checkOutDates, setCheckOutDates] = useState({})
  const [filterStartDate, setFilterStartDate] = useState("")
  const [filterEndDate, setFilterEndDate] = useState("")
  const [filterCustomerName, setFilterCustomerName] = useState("")

  useEffect(() => {
    dispatch(fetchAllCustomers())
    dispatch(fetchAllParkingZones())
    dispatch(fetchAllParkingSlots())
    dispatch(fetchAllParkings())
  }, [dispatch])

  const filteredCustomers =
    customers?.filter(
      (customer) =>
        customer.name?.toLowerCase().includes(searchCustomer.toLowerCase()) ||
        customer.phone?.toLowerCase().includes(searchCustomer.toLowerCase()),
    ) || []

  const availableSlots =
    parkingSlots?.filter((slot) => slot.status === "AVAILABLE") || []

  const availableCount = parkingSlots.filter(
    (slot) => slot.status === "AVAILABLE",
  ).length

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer)
    setShowCustomerDropdown(false)
    setSearchCustomer("")
  }

  const handleSelectZone = (zone) => {
    setSelectedZone(zone)
    setSelectedSlot(null)
  }

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot)
  }

  const handleCreateReservation = async () => {
    if (!selectedCustomer || !selectedSlot) {
      alert("กรุณาเลือกสมาชิกและช่องจอดรถ")
      return
    }
    setIsSubmitting(true)
    try {
      const reservationData = {
        customerId: selectedCustomer._id,
        slotId: selectedSlot._id,
        checkIn: new Date(),
        status: "PARKING",
        license_plate: licensePlate,
      }
      await dispatch(createParking(reservationData))
      await dispatch(fetchAllParkings())
      await dispatch(fetchAllParkingSlots())
      setSelectedCustomer(null)
      setSelectedZone(null)
      setSelectedSlot(null)

      alert("จองเรียบร้อยแล้ว")
    } catch (error) {
      console.error("Error creating reservation:", error)
      alert("เกิดข้อผิดพลาดในการจอง")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFinishReservation = async (parking) => {
    const checkOutDate = checkOutDates[parking._id]
      ? new Date(checkOutDates[parking._id])
      : new Date()
    if (!window.confirm("ยืนยันการสิ้นสุดการจอดของรายการนี้?")) return
    setIsSubmitting(true)
    try {
      const updateData = {
        status: "FINISHED",
        checkOut: checkOutDate,
      }
      await dispatch(updateParking(parking._id, updateData))
      dispatch(fetchAllParkings())
      dispatch(fetchAllParkingSlots())
      setCheckOutDates((prev) => {
        const newDates = { ...prev }
        delete newDates[parking._id]
        return newDates
      })

      alert("รายการจอดสิ้นสุดแล้ว")
    } catch (error) {
      console.error("Error finishing reservation:", error)
      alert("ไม่สามารถสิ้นสุดรายการได้")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">รายการจอง</h1>
            <Button
              onClick={() => navigate("/reservation-summary")}
              variant="outlined"
              sx={{ px: 3, py: 1, borderRadius: 2 }}
            >
              📊 ดูสรุป
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              ข้อมูลการจอง
            </h2>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                เลือกสมาชิก *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={
                    selectedCustomer
                      ? `${selectedCustomer.name} (${selectedCustomer.phone})`
                      : searchCustomer
                  }
                  onChange={(e) => {
                    setSearchCustomer(e.target.value)
                    setShowCustomerDropdown(true)
                    if (selectedCustomer) setSelectedCustomer(null)
                  }}
                  onFocus={() => setShowCustomerDropdown(true)}
                  placeholder="ค้นหาสมาชิกโดยชื่อหรือเบอร์โทร..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                {showCustomerDropdown && filteredCustomers.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
                    {filteredCustomers.map((customer) => (
                      <div
                        key={customer._id}
                        onClick={() => handleSelectCustomer(customer)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-semibold">{customer?.name}</div>
                        <div className="text-sm text-gray-600">
                          {customer.phone}
                        </div>
                        <div className="text-sm text-blue-500">
                          {customer?.customerType}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                เลือกโซนจอดรถ
              </Typography>
              <Grid container spacing={2}>
                {parkingZones?.map((zone) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={zone._id}>
                    <Card
                      onClick={() => handleSelectZone(zone)}
                      sx={{
                        cursor: "pointer",
                        border:
                          selectedZone?._id === zone._id
                            ? "2px solid #1976d2"
                            : "1px solid #e0e0e0",
                        backgroundColor:
                          selectedZone?._id === zone._id ? "#f3f9ff" : "white",
                        "&:hover": {
                          borderColor: "#1976d2",
                          boxShadow: 2,
                        },
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="h6" fontWeight="bold">
                          Zone: {zone.zoneName}
                        </Typography>
                        <Typography variant="body2" color="success.main">
                          ว่าง: {availableCount}/{zone.totalSlots}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
            {selectedZone && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  เลือกช่องจอดรถ
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {availableSlots.map((slot) => (
                    <div
                      key={slot._id}
                      onClick={() => handleSelectSlot(slot)}
                      className={`border rounded-lg p-4 text-center cursor-pointer transition ${
                        selectedSlot?._id === slot._id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="font-semibold text-gray-800">
                        {slot.slotNumber}
                      </div>
                      <div className="text-sm text-green-600">ว่าง</div>
                    </div>
                  ))}
                </div>
                {availableSlots.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    ไม่มีช่องว่างในโซนนี้
                  </p>
                )}
              </div>
            )}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                ป้ายทะเบียนรถ *
              </Typography>
              <TextField
                fullWidth
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                placeholder="กรอกป้ายทะเบียน"
                variant="outlined"
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleCreateReservation}
                disabled={
                  !selectedCustomer ||
                  !selectedSlot ||
                  !licensePlate ||
                  isSubmitting
                }
                variant="contained"
                sx={{ px: 3, py: 1, borderRadius: 2, fontWeight: 600 }}
                startIcon={
                  isSubmitting ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : null
                }
              >
                {isSubmitting ? "กำลังจอง..." : "จองช่องจอดรถ"}
              </Button>
            </Box>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">รายการจอง</h2>
              <div className="flex gap-2">
                <Button
                  onClick={() => setFilterStatus("PARKING")}
                  variant={
                    filterStatus === "PARKING" ? "contained" : "outlined"
                  }
                  sx={{
                    px: 4,
                    py: 1,
                    borderRadius: "10px",
                    fontWeight: 600,
                    backgroundColor:
                      filterStatus === "PARKING" ? "#2563eb" : "#e5e7eb",
                    color: filterStatus === "PARKING" ? "#fff" : "#374151",
                    "&:hover": {
                      backgroundColor:
                        filterStatus === "PARKING" ? "#1d4ed8" : "#d1d5db",
                    },
                  }}
                >
                  รายการปัจจุบัน
                </Button>
                <Button
                  onClick={() => setFilterStatus("FINISHED")}
                  variant={
                    filterStatus === "FINISHED" ? "contained" : "outlined"
                  }
                  sx={{
                    px: 4,
                    py: 1,
                    borderRadius: "10px",
                    fontWeight: 600,
                    backgroundColor:
                      filterStatus === "FINISHED" ? "#2563eb" : "#e5e7eb",
                    color: filterStatus === "FINISHED" ? "#fff" : "#374151",
                    "&:hover": {
                      backgroundColor:
                        filterStatus === "FINISHED" ? "#1d4ed8" : "#d1d5db",
                    },
                  }}
                >
                  รายการที่เสร็จไปแล้ว
                </Button>
                <Button
                  onClick={() => setFilterStatus("ALL")}
                  variant={filterStatus === "ALL" ? "contained" : "outlined"}
                  sx={{
                    px: 4,
                    py: 1,
                    borderRadius: "10px",
                    fontWeight: 600,
                    backgroundColor:
                      filterStatus === "ALL" ? "#2563eb" : "#e5e7eb",
                    color: filterStatus === "ALL" ? "#fff" : "#374151",
                    "&:hover": {
                      backgroundColor:
                        filterStatus === "ALL" ? "#1d4ed8" : "#d1d5db",
                    },
                  }}
                >
                  ทั้งหมด
                </Button>
              </div>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                ตัวกรองขั้นสูง
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    วันที่เริ่มต้น
                  </label>
                  <input
                    type="date"
                    value={filterStartDate}
                    onChange={(e) => setFilterStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    วันที่สิ้นสุด
                  </label>
                  <input
                    type="date"
                    value={filterEndDate}
                    onChange={(e) => setFilterEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ชื่อลูกค้า
                  </label>
                  <input
                    type="text"
                    value={filterCustomerName}
                    onChange={(e) => setFilterCustomerName(e.target.value)}
                    placeholder="ค้นหาชื่อลูกค้า..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div className="mt-6 ml-2">
                  <Button
                    onClick={() => {
                      setFilterStartDate("")
                      setFilterEndDate("")
                      setFilterCustomerName("")
                    }}
                    variant="outlined"
                    sx={{ px: 3, py: 1, borderRadius: 2 }}
                  >
                    ล้างตัวกรอง
                  </Button>
                </div>
              </div>
            </div>
            {parkings?.filter((p) => {
              if (filterStatus !== "ALL" && p.status !== filterStatus)
                return false
              if (filterStartDate || filterEndDate) {
                const checkInDate = new Date(p.checkIn)
                if (filterStartDate && checkInDate < new Date(filterStartDate))
                  return false
                if (
                  filterEndDate &&
                  checkInDate > new Date(filterEndDate + "T23:59:59")
                )
                  return false
              }
              if (
                filterCustomerName &&
                !p.customerId?.name
                  ?.toLowerCase()
                  .includes(filterCustomerName.toLowerCase())
              )
                return false
              return true
            }).length > 0 ? (
              <div className="space-y-4">
                {parkings
                  .filter((p) => {
                    if (filterStatus !== "ALL" && p.status !== filterStatus)
                      return false
                    if (filterStartDate || filterEndDate) {
                      const checkInDate = new Date(p.checkIn)
                      if (
                        filterStartDate &&
                        checkInDate < new Date(filterStartDate)
                      )
                        return false
                      if (
                        filterEndDate &&
                        checkInDate > new Date(filterEndDate + "T23:59:59")
                      )
                        return false
                    }
                    if (
                      filterCustomerName &&
                      !p.customerId?.name
                        ?.toLowerCase()
                        .includes(filterCustomerName.toLowerCase())
                    )
                      return false
                    return true
                  })
                  .map((parking) => {
                    return (
                      <div key={parking._id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              รหัสสมาชิก: {parking?.customerId?.id}{" "}
                              {parking?.customerId?.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              ป้ายทะเบียน: {parking?.license_plate}
                            </p>
                            <p className="text-sm text-gray-600">
                              ช่อง: {parking?.slotId?.slotNumber}
                              {parking?.slotId?.zoneId?.name}
                            </p>

                            <p className="text-sm text-gray-600">
                              เบอร์โทร: {parking?.customerId?.phone}
                            </p>
                            <p className="text-sm text-gray-600">
                              เข้าจอด:
                              {new Date(parking.checkIn).toLocaleString(
                                "th-TH",
                              )}
                            </p>
                            {parking.status === "FINISHED" &&
                              parking.checkOut && (
                                <p className="text-sm text-gray-600">
                                  ออกจอด:
                                  {new Date(parking.checkOut).toLocaleString(
                                    "th-TH",
                                  )}
                                </p>
                              )}
                            {parking.status === "FINISHED" && (
                              <div className="mt-2 p-2 bg-gray-50 rounded">
                                <p className="text-sm font-semibold text-gray-700">
                                  ค่าใช้จ่าย: {parking.totalDays} วัน
                                </p>
                                {parking.customerId?.customerType ===
                                "GENERAL" ? (
                                  <p className="text-sm text-green-600 font-semibold">
                                    {parking.totalPrice} บาท
                                  </p>
                                ) : (
                                  <p className="text-sm text-blue-600 font-semibold">
                                    {parking.totalCredits} credits
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                parking.status === "PARKING"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {parking.status === "PARKING"
                                ? "กำลังจอด"
                                : "เสร็จสิ้น"}
                            </span>
                            {parking.status === "PARKING" && (
                              <>
                                <input
                                  type="datetime-local"
                                  value={
                                    checkOutDates[parking._id] ||
                                    new Date().toISOString().slice(0, 16)
                                  }
                                  onChange={(e) =>
                                    setCheckOutDates((prev) => ({
                                      ...prev,
                                      [parking._id]: e.target.value,
                                    }))
                                  }
                                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                                <Button
                                  onClick={() =>
                                    handleFinishReservation(parking)
                                  }
                                  variant="outlined"
                                  color="success"
                                >
                                  เสร็จสิ้น
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                ยังไม่มีรายการจอง
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reservations
