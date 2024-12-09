import "./App.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import TempHeader from "./components/TempHeader/TempHeader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TempLoginPage from "./pages/TempLoginPage/TempLoginPage";
import AdminLayout from "./templates/AdminLayout";
import QuanLyNguoiDungPage from "./pages/QuanLyNguoiDungPage/QuanLyNguoiDungPage";
import QuanLyViTriPage from "./pages/QuanLyViTriPage/QuanLyViTriPage";
import QuanLyPhongPage from "./pages/QuanLyPhongPage/QuanLyPhongPage";
import QuanLyBookingPage from "./pages/QuanLyBookingPage/QuanLyBookingPage";
import InfoUserPage from "./pages/InfoUserPage/InfoUserPage";
import BookingPage from "./pages/BookingPage/BookingPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <TempHeader />
        <Routes>
          <Route path="/login" element={<TempLoginPage />} />
          <Route path="/info-user" element={<InfoUserPage />} />
          <Route
            path="/admin/QuanLyNguoiDung"
            element={<AdminLayout content={<QuanLyNguoiDungPage />} />}
          />
          <Route
            path="/admin/QuanLyViTri"
            element={<AdminLayout content={<QuanLyViTriPage />} />}
          />
          <Route
            path="/admin/QuanLyPhong"
            element={<AdminLayout content={<QuanLyPhongPage />} />}
          />
          <Route
            path="/admin/QuanLyBooking"
            element={<AdminLayout content={<QuanLyBookingPage />} />}
          />
          <Route path="/room-booking/:id" element={<BookingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
