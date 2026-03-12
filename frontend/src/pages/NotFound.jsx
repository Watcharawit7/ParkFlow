import { Box, Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"

const NotFound = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
      }}
    >
      <Box textAlign="center">
        <ErrorOutlineIcon sx={{ fontSize: 80, color: "#1976d2" }} />
        <Typography variant="h1" fontWeight="bold">
          404
        </Typography>
        <Typography variant="h5" color="text.secondary" mb={3}>
          ไม่พบหน้าที่คุณกำลังค้นหา
        </Typography>
        <Button
          component={Link}
          to="/parking-zones"
          variant="contained"
          size="large"
        >
          กลับหน้าหลัก
        </Button>
      </Box>
    </Box>
  )
}

export default NotFound
