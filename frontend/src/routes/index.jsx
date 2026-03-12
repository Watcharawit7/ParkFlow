import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import Customers from "../pages/Customers"
import ParkingZones from "../pages/ParkingZones"
import Pricing from "../pages/Pricing"
import Reservations from "../pages/Reservations"
import ReservationSummary from "../pages/ReservationSummary"
import NotFound from "../pages/NotFound"

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/parking-zones" replace />} />
        <Route
          path="/parking-zones"
          element={
            <MainLayout>
              <ParkingZones />
            </MainLayout>
          }
        />
        <Route
          path="/pricing"
          element={
            <MainLayout>
              <Pricing />
            </MainLayout>
          }
        />
        <Route
          path="/customers"
          element={
            <MainLayout>
              <Customers />
            </MainLayout>
          }
        />
        <Route
          path="/reservations"
          element={
            <MainLayout>
              <Reservations />
            </MainLayout>
          }
        />
        <Route
          path="/reservation-summary"
          element={
            <MainLayout>
              <ReservationSummary />
            </MainLayout>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
