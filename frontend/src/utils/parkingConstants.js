// ค่าจอดรถ
export const PRICING_RATES = {
  REGULAR: {
    name: "ลูกค้าทั่วไป",
    firstHour: 20,
    perDay: 50,
    description: "ชั่วโมงที่ 1 คิดชั่วโมงละ 20 บาท, ชั่วโมงที่ 1 เป็นต้นไป คิดรายวัน 50 บาท/วัน",
  },
  MEMBER: {
    name: "สมาชิกแบบเหมาจ่าย",
    firstHour: 0,
    perDay: 1, // Credit
    description: "ชั่วโมงที่ 1 จอดฟรี, ชั่วโมงที่ 1 เป็นต้นไป คิดรายวัน 1 Credit/วัน",
  },
}

// พื้นที่จอด
export const PARKING_ZONES = [
  {
    id: 1,
    zoneName: "โซนเอ (ชั้น 1)",
    totalSpots: 50,
    availableSpots: 15,
    occupiedSpots: 35,
    location: "ชั้น 1",
  },
  {
    id: 2,
    zoneName: "โซนบี (ชั้น 2)",
    totalSpots: 45,
    availableSpots: 8,
    occupiedSpots: 37,
    location: "ชั้น 2",
  },
]

// การคำนวณค่าจอด
export const calculateParkingFee = (hours, customerType = "REGULAR") => {
  const rates = PRICING_RATES[customerType]
  
  if (hours <= 1) {
    return {
      amount: rates.firstHour,
      unit: "บาท",
      breakdown: `ชั่วโมงที่ 1: ${rates.firstHour} บาท`,
    }
  }
  
  const days = Math.ceil((hours - 1) / 24)
  const additionalFee = customerType === "MEMBER" 
    ? { amount: days, unit: "Credit" }
    : { amount: days * rates.perDay, unit: "บาท" }
  
  return {
    amount: (rates.firstHour || 0) + (additionalFee.amount || 0),
    unit: additionalFee.unit,
    breakdown: `ชั่วโมงที่ 1: ${rates.firstHour} ${rates.firstHour === 0 ? "บาท (ฟรี)" : "บาท"} + ${days} วัน: ${additionalFee.amount} ${additionalFee.unit}`,
  }
}
