import { Card, CardContent, TextField, Button } from "@mui/material"

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-8">
          <div className="flex flex-col gap-4">
            <TextField label="รหัสสมาชิก" variant="outlined" fullWidth />
            <Button variant="contained" color="primary" className="!py-3">
              เข้าสู่ระบบ
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home
