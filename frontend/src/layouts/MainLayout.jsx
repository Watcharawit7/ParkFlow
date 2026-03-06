import Sidebar from "../components/Sidebar"

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
