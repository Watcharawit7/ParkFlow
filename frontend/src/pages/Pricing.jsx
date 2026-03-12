import { useState } from "react"
import {
  Container,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Box,
} from "@mui/material"
import { PRICING_RATES, calculateParkingFee } from "../utils/parkingConstants"

const Pricing = () => {
  const [selectedType, setSelectedType] = useState("REGULAR")
  const [hours, setHours] = useState(1)

  const fee = calculateParkingFee(hours, selectedType)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">อัตราค่าจอดรถ</h1>

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
      <Container>
        <Card sx={{ maxWidth: 600, mx: "auto" }}>
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              fontWeight="bold"
            >
              เครื่องคำนวณค่าจอด
            </Typography>
            <Box sx={{ mt: 3 }}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>ประเภทลูกค้า</InputLabel>
                <Select
                  value={selectedType}
                  label="ประเภทลูกค้า"
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {Object.entries(PRICING_RATES).map(([key, plan]) => (
                    <MenuItem key={key} value={key}>
                      {plan.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>
                  ระยะเวลาที่จอด: {hours} ชั่วโมง
                </Typography>
                <Slider
                  value={hours}
                  onChange={(e, newValue) => setHours(newValue)}
                  min={1}
                  max={72}
                  step={1}
                  marks={[
                    { value: 1, label: "1 ชม." },
                    { value: 24, label: "1 วัน" },
                    { value: 48, label: "2 วัน" },
                    { value: 72, label: "3 วัน" },
                  ]}
                  valueLabelDisplay="auto"
                  sx={{ mt: 2 }}
                />
              </Box>

              <Box sx={{ pt: 3, borderTop: 2, borderColor: "divider" }}>
                <Box
                  sx={{
                    bgcolor:
                      "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
                    p: 3,
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    รายละเอียด:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {fee.breakdown}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      ค่าที่จ่าย:
                    </Typography>
                    <Typography
                      variant="h3"
                      component="p"
                      color="primary"
                      fontWeight="bold"
                    >
                      {fee.amount}{" "}
                      <Typography
                        component="span"
                        variant="h5"
                        color="text.secondary"
                      >
                        {fee.unit}
                      </Typography>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}

export default Pricing
