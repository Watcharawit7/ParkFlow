import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchAllParkingZones, fetchAllParkingSlots } from "../redux/actions"
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
} from "@mui/material"

const ParkingSlot = ({ zone }) => {
  const totalSpots = zone.totalSpots
  const occupiedSpots = zone.occupiedSpots
  const availableSpots = totalSpots - occupiedSpots

  const occupancyRate = totalSpots
    ? ((occupiedSpots / totalSpots) * 100).toFixed(0)
    : 0

  const isAvailable = availableSpots > 0

  const status = isAvailable ? "ว่าง" : "เต็ม"
  const statusColor = isAvailable ? "success" : "error"
  const bgColor = isAvailable ? "bg-green-50" : "bg-red-50"

  return (
    <Card
      sx={{
        border: "1px solid",
        borderColor: "divider",
        bgcolor: bgColor,
        borderRadius: 2,
        width: 500,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Typography variant="h6" fontWeight={600} color="text.primary">
            Zone: {zone.name}
          </Typography>
          <Chip
            label={status}
            size="small"
            color={statusColor}
            variant="outlined"
            sx={{
              fontWeight: 600,
              width: 50,
            }}
          />
        </Box>
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" fontWeight={600}>
              {occupancyRate}%
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={occupancyRate}
            sx={{
              height: 8,
              borderRadius: 5,
            }}
          />
        </Box>
        <Grid container spacing={2}>
          <Grid sx={4}>
            <Typography variant="caption" color="text.secondary">
              ช่องว่าง
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="success.main">
              {zone.availableSpots}
            </Typography>
          </Grid>

          <Grid sx={4}>
            <Typography variant="caption" color="text.secondary">
              จอง
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="warning.main">
              {zone.occupiedSpots}
            </Typography>
          </Grid>

          <Grid sx={4}>
            <Typography variant="caption" color="text.secondary">
              ทั้งหมด
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {zone.totalSpots}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

const ParkingZones = () => {
  const zones = useSelector((state) => state.parkingZone.parkingZones) || []
  const slots = useSelector((state) => state.parkingSlot.parkingSlots) || []
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllParkingZones())
    dispatch(fetchAllParkingSlots())
  }, [dispatch])

  const computeZoneStats = (zone) => {
    const totalSlots = zone.totalSlots
    const occupiedSlots = slots.filter((s) => s.status === "OCCUPIED").length

    const availableSlots = totalSlots - occupiedSlots
    return {
      ...zone,
      name: zone.zoneName,
      totalSpots: totalSlots,
      occupiedSpots: occupiedSlots,
      availableSpots: availableSlots,
    }
  }

  const enrichedZones = zones.map(computeZoneStats)
  const totalSpots = enrichedZones.reduce((sum, z) => sum + z.totalSpots, 0)
  const totalOccupied = enrichedZones.reduce(
    (sum, z) => sum + z.occupiedSpots,
    0,
  )

  const totalAvailable = totalSpots - totalOccupied
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold">
        พื้นที่จอดรถ
      </Typography>
      <Grid container spacing={3}>
        <Grid sx={12}>
          <Card elevation={3} sx={{ width: 300 }}>
            <CardContent>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                fontWeight="600"
                gutterBottom
              >
                ช่องว่างทั้งหมด
              </Typography>

              <Typography variant="h4" fontWeight="bold" color="success.main">
                {totalAvailable}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                จากทั้งหมด {totalSpots} ช่อง
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid sx={12}>
          <Card elevation={3} sx={{ width: 300 }}>
            <CardContent>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                fontWeight="600"
                gutterBottom
              >
                มีการจอง
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                {totalOccupied}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {((totalOccupied / totalSpots) * 100).toFixed(0)}% เต็ม
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid sx={12}>
          <Card elevation={3} sx={{ width: 300 }}>
            <CardContent>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                fontWeight="600"
                gutterBottom
              >
                ความพร้อม
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="info.main">
                {((totalAvailable / totalSpots) * 100).toFixed(0)}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                พร้อมให้บริการ
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {enrichedZones.length > 0 ? (
          enrichedZones.map((zone) => (
            <Grid sx={12} key={zone._id || zone.id} className="mt-6">
              <ParkingSlot zone={zone} />
            </Grid>
          ))
        ) : (
          <Grid sx={12}>
            <Typography textAlign="center" color="text.secondary">
              ไม่พบข้อมูลพื้นที่จอดรถ
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default ParkingZones
