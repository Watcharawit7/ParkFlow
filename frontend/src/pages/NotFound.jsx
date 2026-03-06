import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">ไม่พบหน้าที่ขอ</p>
        <Link
          to="/home"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          กลับไปหน้าหลัก
        </Link>
      </div>
    </div>
  )
}

export default NotFound
