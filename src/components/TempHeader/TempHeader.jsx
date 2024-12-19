import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { message, Modal } from "antd";
import TempFormLogin from "../../pages/TempLoginPage/TempFormLogin";
import TempFormRegister from "../../pages/TempLoginPage/TempFormRegister";
import "@fortawesome/fontawesome-free/css/all.min.css";
import airbnbLogo from "../../assets/image/airbnb-1.aabeefedaf30b8c7011a022cdb5a6425.png";
import { setIsModalOpen, setModalContent } from "../../redux/slices/userSlice";
import DarkLightToggle from "../DarkLightToggle/DarkLightToggle";
export default function TempHeader() {
  const user = useSelector((state) => state.userSlice.loginData);
  const { isModalOpen, modalContent } = useSelector((state) => state.userSlice);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRefMobi = useRef(null);
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const userIconRef = useRef(null);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { themeMode } = useSelector((state) => state.darkModeSlice);
  const isRoomDetailPage = location.pathname.includes("/room-detail/");

  const handleLogout = () => {
    localStorage.removeItem("USER_LOGIN");
    message.success("Đăng xuất thành công!");
    setTimeout(() => {
      setShowDropdown(false);
      window.location.href = "/";
    }, 1000);
  };

  //   const handleScroll = () => {
  //     if (window.scrollY > 50) {
  //       setShowDropdown(false);
  //       setIsScrolled(true);
  //       setIsDropdownOpen(false);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };

  //   const handleClickOutside = (event) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target) &&
  //       userIconRef.current &&
  //       !userIconRef.current.contains(event.target)
  //     ) {
  //       setShowDropdown(false);
  //     }
  //   };

  //   // Gắn các sự kiện
  //   window.addEventListener("scroll", handleScroll);
  //   document.addEventListener("mousedown", handleClickOutside);

  //   // Dọn dẹp các sự kiện khi component unmount
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isRoomDetailPage]);

  // // ************
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       dropdownRefMobi.current &&
  //       !dropdownRefMobi.current.contains(event.target)
  //     ) {
  //       setIsDropdownOpen(false); // Đóng menu khi click bên ngoài
  //     }
  //   };

  //   const handleScroll = () => {
  //     setIsDropdownOpen(false); // Đóng menu khi cuộn trang
  //   };

  //   // Gắn sự kiện
  //   document.addEventListener("mousedown", handleClickOutside);
  //   window.addEventListener("scroll", handleScroll);

  //   // Dọn dẹp sự kiện khi component unmount
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // **************

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowDropdown(false); // Đóng dropdown trên desktop
        setIsScrolled(true);
        setIsDropdownOpen(false); // Đóng menu trên mobi
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      // Xử lý cho dropdown desktop
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userIconRef.current &&
        !userIconRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }

      // Xử lý cho dropdown mobi
      if (
        dropdownRefMobi.current &&
        !dropdownRefMobi.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // Gắn sự kiện
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isRoomDetailPage]);

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
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <header
      className={`${themeMode} fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled || isRoomDetailPage
          ? "bg-white shadow-md h-20"
          : "bg-transparent h-28"
      } flex items-center pb-2`}
    >
      <div className="container flex justify-center md:justify-between items-center mx-auto">
        <a
          onClick={handleGohome}
          className="flex items-center text-2xl self-center px-8 font-bold cursor-pointer"
        >
          <img
            src={airbnbLogo}
            alt="Airbnb logo"
            className="w-10 h-8 object-contain mr-2"
          />
          <span className="text-3xl text-primary">airbnb</span>
        </a>

        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              onClick={handleGohome}
              className="flex items-center px-4 font-normal transition cursor-pointer text-primary"
            >
              Home
            </NavLink>
          </li>
          <li className="flex">
            {themeMode === "dark" ? (
              <NavLink
                to="/rooms"
                className="flex items-center px-3 font-normal transition cursor-pointer text-white hover:text-red-600"
              >
                Rooms
              </NavLink>
            ) : (
              <NavLink
                to="/rooms"
                className={`flex items-center px-3 font-normal transition cursor-pointer ${
                  isScrolled || isRoomDetailPage ? "text-black" : "text-white"
                } hover:text-red-600`}
              >
                Rooms
              </NavLink>
            )}
          </li>
          <li className="flex">
            {themeMode === "dark" ? (
              <a
                onClick={() => handleScrollTo("listSection")}
                className="flex items-center px-3 font-normal transition cursor-pointer text-white hover:text-red-600"
              >
                List
              </a>
            ) : (
              <a
                onClick={() => handleScrollTo("listSection")}
                className={`flex items-center px-3 font-normal transition cursor-pointer ${
                  isScrolled || isRoomDetailPage ? "text-black" : "text-white"
                } hover:text-red-600`}
              >
                List
              </a>
            )}
          </li>
          <li className="flex">
            {themeMode === "dark" ? (
              <a
                onClick={() => handleScrollTo("locationSection")}
                className="flex items-center px-3 font-normal transition cursor-pointer text-white hover:text-red-600"
              >
                Favourite
              </a>
            ) : (
              <a
                onClick={() => handleScrollTo("locationSection")}
                className={`flex items-center px-3 font-normal transition cursor-pointer ${
                  isScrolled || isRoomDetailPage ? "text-black" : "text-white"
                } hover:text-red-600`}
              >
                Favourite
              </a>
            )}
          </li>
          <li className="flex">
            {themeMode === "dark" ? (
              <a
                onClick={() => handleScrollTo("contactSection")}
                className="flex items-center px-3 font-normal transition cursor-pointer text-white hover:text-red-600"
              >
                Contact
              </a>
            ) : (
              <a
                onClick={() => handleScrollTo("contactSection")}
                className={`flex items-center px-3 font-normal transition cursor-pointer ${
                  isScrolled || isRoomDetailPage ? "text-black" : "text-white"
                } hover:text-red-600`}
              >
                Contact
              </a>
            )}
          </li>
        </ul>

        <div className="gap-3 items-center flex-shrink-0 flex px-8 relative">
          <DarkLightToggle />
          {user ? (
            <>
              <div
                ref={userIconRef}
                className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer bg-gray-800 text-white transition-all duration-300 ${
                  showDropdown ? "ring-4 ring-red-400" : "ring-2 ring-gray-300"
                } hover:ring-4 hover:ring-red-400`}
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                {user.user.avatar ? (
                  <img
                    src={user.user.avatar}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <i className="fas fa-user text-xl"></i>
                )}
              </div>
              <p className="ml-3 hidden md:block text-primary text-lg uppercase">
                {user.user.name}
              </p>

              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 bg-white shadow-md rounded-lg overflow-hidden divide-y-2 space-y-2"
                  style={{
                    zIndex: 1000,
                    width: "250px",
                    top: "calc(100% + 8px)",
                  }}
                >
                  <ul>
                    <li className="px-4 py-2 text-black  ">{user.user.name}</li>
                    <li className="px-4  text-gray-500 ">{user.user.email}</li>
                  </ul>
                  <ul>
                    <li>
                      <a
                        href="/info-user"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        To Page User
                      </a>
                    </li>
                    {user.user.role === "ADMIN" ? (
                      <li>
                        <a
                          href="/admin/QuanLyNguoiDung"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          To Page Admin
                        </a>
                      </li>
                    ) : (
                      <></>
                    )}

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
              )}
            </>
          ) : (
            <>
              <div
                ref={userIconRef}
                className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer bg-gray-800 text-white transition-all duration-300 ${
                  showDropdown ? "ring-4 ring-red-400" : "ring-2 ring-gray-300"
                } hover:ring-4 hover:ring-red-400`}
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <i className="fas fa-user text-xl"></i>
              </div>
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full mt-2 right-0 bg-white shadow-md rounded-lg overflow-hidden"
                  style={{ zIndex: 1000, width: "200px" }}
                >
                  <ul>
                    <li>
                      <button
                        onClick={() => handleOpenModal("login")}
                        className="block w-full text-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Đăng nhập
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleOpenModal("register")}
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

        <div className="block lg:hidden" ref={dropdownRefMobi}>
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="text-gray-500 text-2xl focus:outline-none"
          >
            <i className="fa fa-align-justify"></i>
          </button>

          <div
            className={`absolute top-full left-0 w-[100vw] text-white  overflow-hidden transform transition-transform duration-1000 ${
              isDropdownOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0"
            }`}
          >
            {isDropdownOpen && (
              <ul className="container  bg-gray-700 rounded-lg">
                <li className="px-6 py-3 hover:bg-gray-600 border-b border-gray-600">
                  <NavLink
                    to="/"
                    className="block text-left text-red-400 font-semibold"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="px-6 py-3 hover:bg-gray-600 text-left">
                  <NavLink to="/rooms" className="block text-left">
                    Rooms
                  </NavLink>
                </li>
                <li className="px-6 py-3 hover:bg-gray-600 text-left">
                  <a
                    onClick={() => handleScrollTo("listSection")}
                    className="block text-left"
                  >
                    List
                  </a>
                </li>
                <li className="px-6 py-3 hover:bg-gray-600 text-left">
                  <a
                    onClick={() => handleScrollTo("locationSection")}
                    className="block text-left"
                  >
                    Favourite
                  </a>
                </li>
                <li className="px-6 py-3 hover:bg-gray-600 text-left">
                  <a
                    onClick={() => handleScrollTo("contactSection")}
                    className="block text-left"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onCancel={handleCloseModal} footer={null}>
        {modalContent === "login" ? (
          <TempFormLogin
            onLoginSuccess={() => {
              dispatch(setIsModalOpen(false));
              setShowDropdown(false);
            }}
            setModalContent={setModalContent}
          />
        ) : (
          <TempFormRegister
            onRegisterSuccess={() => {
              dispatch(setModalContent("login"));
              setShowDropdown(false);
            }}
            setModalContent={setModalContent}
          />
        )}
      </Modal>
    </header>
  );
}
