import "./App.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import AOS from "aos";
import "aos/dist/aos.css";
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
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./templates/Layout";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import RoomsVitri from "./pages/RoomsPage/RoomsVitri";

AOS.init();
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout content={<HomePage />} />} />
          <Route path="/rooms" element={<Layout content={<RoomsPage />} />} />
          <Route
            path="/rooms/:id"
            element={<Layout content={<RoomsVitri />} />}
          />
          <Route path="/" element={<TempLoginPage />} />
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
