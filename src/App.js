import logo from "./logo.svg";
import "./App.css";
import TempHeader from "./components/TempHeader/TempHeader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TempLoginPage from "./pages/TempLoginPage/TempLoginPage";
import AdminLayout from "./templates/AdminLayout";
import QuanLyNguoiDungPage from "./pages/QuanLyNguoiDungPage/QuanLyNguoiDungPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <TempHeader />
        <Routes>
          <Route path="/login" element={<TempLoginPage />} />
          <Route
            path="/admin/QuanLyNguoiDung"
            element={<AdminLayout content={<QuanLyNguoiDungPage />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
