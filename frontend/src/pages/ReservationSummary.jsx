import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchAllParkings } from "../redux/actions/ParkingAction"
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave"
import GarageIcon from "@mui/icons-material/Garage"
import NoCrashIcon from "@mui/icons-material/NoCrash"
import {
  CardContent,
  Card,
  Typography,
  Grid,
  Button,
  Pagination,
} from "@mui/material"

const ReservationSummary = () => {
  const dispatch = useDispatch()
  const { parkings } = useSelector((state) => state.parking)

  const [filterStartDate, setFilterStartDate] = useState("")
  const [filterEndDate, setFilterEndDate] = useState("")
  const [filterCustomerName, setFilterCustomerName] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const [summaryData, setSummaryData] = useState({
    totalReservations: 0,
    activeReservations: 0,
    completedReservations: 0,
    totalRevenue: 0,
    totalCredit: 0,
    todayReservations: 0,
    weeklyReservations: 0,
    monthlyReservations: 0,
  })

  useEffect(() => {
    dispatch(fetchAllParkings())
  }, [dispatch])

  useEffect(() => {
    if (parkings) {
      calculateSummary()
    }
  }, [parkings])

  const calculateSummary = () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    let totalRevenue = 0
    let totalCredit = 0
    let todayCount = 0
    let weeklyCount = 0
    let monthlyCount = 0

    parkings.forEach((parking) => {
      const checkInDate = new Date(parking.checkIn)
      if (parking.status === "FINISHED" && parking.totalPrice) {
        if (parking.customerId?.customerType === "GENERAL") {
          totalRevenue += parking?.totalPrice
        }
      }
      if (parking.status === "FINISHED") {
        if (parking?.customerId?.customerType === "MEMBER") {
          totalCredit += parking?.totalCredits
        }
      }

      if (checkInDate >= today) {
        todayCount++
      }
      if (checkInDate >= weekAgo) {
        weeklyCount++
      }
      if (checkInDate >= monthAgo) {
        monthlyCount++
      }
    })

    setSummaryData({
      totalReservations: parkings.length,
      activeReservations: parkings.filter((p) => p.status === "PARKING").length,
      completedReservations: parkings.filter((p) => p.status === "FINISHED")
        .length,
      totalRevenue,
      totalCredit,
      todayReservations: todayCount,
      weeklyReservations: weeklyCount,
      monthlyReservations: monthlyCount,
    })
  }

  const summaryCards = [
    {
      title: "การจองทั้งหมด",
      value: summaryData.totalReservations,
      color: "primary",
      icon: TimeToLeaveIcon,
    },
    {
      title: "การจองที่กำลังใช้งาน",
      value: summaryData.activeReservations,
      color: "warning",
      icon: GarageIcon,
    },
    {
      title: "การจองที่เสร็จสิ้น",
      value: summaryData.completedReservations,
      color: "success",
      icon: NoCrashIcon,
    },
  ]

  const filteredReservations = parkings.filter((parking) => {
    const checkInDate = new Date(parking.checkIn)

    const startDateMatch = filterStartDate
      ? checkInDate >= new Date(filterStartDate)
      : true

    const endDateMatch = filterEndDate
      ? checkInDate <= new Date(filterEndDate)
      : true

    const customerMatch = filterCustomerName
      ? parking.customerId?.name
          ?.toLowerCase()
          .includes(filterCustomerName.toLowerCase())
      : true

    return startDateMatch && endDateMatch && customerMatch
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const currentReservations = filteredReservations.slice(
    indexOfFirstItem,
    indexOfLastItem,
  )
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [filterStartDate, filterEndDate, filterCustomerName])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            สรุปรายการจอง
          </h1>
          <Grid container spacing={1} className="mb-6  justify-around ">
            {summaryCards.map((card, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 2 }} key={index}>
                <Card className="h-full ">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-around text-center">
                      <div>
                        <card.icon className="w-16 h-16 text-blue-600" />
                        <Typography
                          variant="h3"
                          component="div"
                          className="font-bold text-gray-800"
                        >
                          {card.value}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          className="mt-1"
                        >
                          {card.title}
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Card>
              <CardContent className="p-6">
                <Typography
                  variant="h6"
                  className="font-semibold text-gray-800 mb-2"
                >
                  สถิติการจอง
                </Typography>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">วันนี้:</span>
                    <span className="font-semibold">
                      {summaryData.todayReservations}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">สัปดาห์นี้:</span>
                    <span className="font-semibold">
                      {summaryData.weeklyReservations}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">เดือนนี้:</span>
                    <span className="font-semibold">
                      {summaryData.monthlyReservations}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Typography
                  variant="h6"
                  className="font-semibold text-gray-800 mb-2"
                >
                  รวมยอดทั้งหมด
                </Typography>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ได้เงิน:</span>
                    <span className="font-semibold">
                      {summaryData.totalRevenue}
                    </span>
                    <span className="text-gray-600">บาท</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">จำนวน Credits:</span>
                    <span className="font-semibold">
                      {summaryData?.totalCredit}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
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
          <Card>
            <CardContent className="p-6">
              <Typography
                variant="h6"
                className="font-semibold text-gray-800 mb-4"
              >
                การจองที่กำลังใช้งานล่าสุด
              </Typography>
              {currentReservations.length > 0 ? (
                <div className="space-y-3">
                  {currentReservations.map((parking) => (
                    <div
                      key={parking._id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-semibold text-gray-800">
                          {parking.customerId?.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          ป้ายทะเบียน: {parking.license_plate}
                        </div>
                        <div className="text-sm text-gray-600">
                          ช่อง: {parking.slotId?.slotNumber}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">
                          เข้าจอด:{" "}
                          {new Date(parking.checkIn).toLocaleString("th-TH")}
                        </div>
                        <div className="py-2">
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
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center mt-6">
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      variant="outlined"
                      color="secondary"
                      onChange={(e, value) => setCurrentPage(value)}
                      size="large"
                      showFirstButton
                      showLastButton
                    />
                  </div>
                </div>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  ไม่มีการจองที่กำลังใช้งาน
                </Typography>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ReservationSummary
