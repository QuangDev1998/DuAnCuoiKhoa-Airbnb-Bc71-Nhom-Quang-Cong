import logo from "./logo.svg";
import "./App.css";
import TempHeader from "./components/TempHeader/TempHeader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TempLoginPage from "./pages/TempLoginPage/TempLoginPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <TempHeader />
        <Routes>
          <Route path="/login" element={<TempLoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
