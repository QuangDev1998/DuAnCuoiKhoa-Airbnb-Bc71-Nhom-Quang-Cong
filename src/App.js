import "./App.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
          <Route
            path="/info-user"
            element={<Layout content={<InfoUserPage />} />}
          />
          <Route path="/room-detail/:id" element={<BookingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
