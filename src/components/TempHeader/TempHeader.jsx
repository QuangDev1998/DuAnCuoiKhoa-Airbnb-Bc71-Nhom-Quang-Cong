import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { message, Modal } from "antd";

import TempFormLogin from "../../pages/TempLoginPage/TempFormLogin"; // Form đăng nhập
import TempFormRegister from "../../pages/TempLoginPage/TempFormRegister"; // Form đăng ký (nếu có)
import "@fortawesome/fontawesome-free/css/all.min.css";
import airbnbLogo from "../../assets/image/airbnb-1.aabeefedaf30b8c7011a022cdb5a6425.png";
import { setIsModalOpen, setModalContent } from "../../redux/slices/userSlice";

export default function TempHeader() {
  const user = useSelector((state) => state.userSlice.loginData);
  const { isModalOpen, modalContent } = useSelector((state) => state.userSlice); /// Kiểm tra trạng thái đăng nhập
  const [showDropdown, setShowDropdown] = useState(false); // Trạng thái hiển thị dropdown
  // const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái hiển thị Modal
  // const [modalContent, setModalContent] = useState("login"); // Nội dung Modal ("login" hoặc "register")
  const dropdownRef = useRef(null); // Tham chiếu đến dropdown để xử lý click ngoài
  const userIconRef = useRef(null); // Tham chiếu đến biểu tượng người dùng
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("USER_LOGIN"); // Xóa thông tin đăng nhập khỏi localStorage
    message.success("Đăng xuất thành công!"); // Hiển thị thông báo đăng xuất
    setTimeout(() => {
      setShowDropdown(false); // Ẩn dropdown sau khi logout
      window.location.href = "/"; // Reload lại trang
    }, 1000);
  };

  const handleGohome = () => {
    window.location.href = "/";
  };

  const handleOpenModal = (content) => {
    dispatch(setModalContent(content));
    dispatch(setIsModalOpen(true));
  };

  const handleCloseModal = () => {
    dispatch(setIsModalOpen(false));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userIconRef.current &&
        !userIconRef.current.contains(event.target)
      ) {
        setShowDropdown(false); // Ẩn dropdown khi click ra ngoài
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="container flex justify-between h-28 mx-auto">
        {/* Logo */}
        <a
          onClick={handleGohome}
          className="flex items-center text-2xl self-center px-8 font-bold  cursor-pointer"
        >
          <img
            src={airbnbLogo}
            alt="Airbnb logo"
            className="w-10 h-10 object-contain mr-2"
          />
          <span className="text-primary text-4xl">airbnb</span>
        </a>

        {/* Menu items for desktop view */}
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              onClick={handleGohome}
              className="flex items-center px-4 font-normal text-primary transition cursor-pointer"
            >
              Home
            </NavLink>
          </li>
          <li className="flex">
            <a className="flex items-center px-3 font-normal  text-white hover:text-red-600 transition cursor-pointer ">
              About
            </a>
          </li>
          <li className="flex">
            <a className="flex items-center px-3 font-normal  text-white hover:text-red-600 transition cursor-pointer">
              Services
            </a>
          </li>
          <li className="flex">
            <a className="flex items-center px-3 font-normal  text-white hover:text-red-600 transition cursor-pointer">
              Pricing
            </a>
          </li>
          <li className="flex">
            <a className="flex items-center px-3 font-normal  text-white hover:text-red-600 transition cursor-pointer">
              Contact
            </a>
          </li>
        </ul>

        {/* User information and dropdown */}
        <div className="items-center flex-shrink-0 hidden lg:flex px-8 relative">
          {user ? (
            <>
              {/* User info */}
              <div
                ref={userIconRef}
                className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer bg-gray-800 text-white transition-all duration-300 ${
                  showDropdown ? "ring-4 ring-red-400" : "ring-2 ring-gray-300"
                } hover:ring-4 hover:ring-red-400`}
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <i className="fas fa-user text-xl"></i>
              </div>

              {/* Dropdown menu */}
              <div
                ref={dropdownRef}
                className={`absolute right-0 mt-2 bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-700 ease-in-out ${
                  showDropdown
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-5 opacity-0"
                }`}
                style={{
                  zIndex: 1000,
                  width: "250px",
                  top: "calc(100% + 8px)",
                }}
              >
                <ul className="py-1">
                  <li>
                    <a
                      href="/info-user"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="/admin/QuanLyNguoiDung"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      To page Admin
                    </a>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* User Icon */}
              <div
                ref={userIconRef}
                className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer bg-gray-800 transition-all duration-300 ${
                  showDropdown ? "ring-4 ring-red-400" : "ring-2 ring-gray-300"
                } hover:ring-4 hover:ring-red-400`}
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <i className="fas fa-user text-white text-xl"></i>{" "}
                {/* Icon người dùng màu trắng */}
              </div>

              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className={`absolute top-full mt-2 right-0 bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-700 ease-in-out ${
                    showDropdown
                      ? "translate-y-0 opacity-100 scale-100"
                      : "-translate-y-5 opacity-0 scale-95"
                  }`}
                  style={{ zIndex: 1000, width: "200px" }}
                >
                  <ul>
                    <li>
                      <button
                        onClick={() => handleOpenModal("login")} // Hiển thị form đăng nhập
                        className="block w-full text-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Đăng nhập
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleOpenModal("register")} // Hiển thị form đăng ký
                        className="block w-full text-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Đăng ký
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal for Login/Register */}
      <Modal open={isModalOpen} onCancel={handleCloseModal} footer={null}>
        {modalContent === "login" ? (
          <TempFormLogin
            onLoginSuccess={handleCloseModal}
            setModalContent={setModalContent}
          />
        ) : (
          <TempFormRegister
            onRegisterSuccess={handleCloseModal}
            setModalContent={setModalContent}
          />
        )}
      </Modal>
    </header>
  );
}
