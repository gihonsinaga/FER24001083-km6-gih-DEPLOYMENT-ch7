import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe, logout } from "../redux/actions/authActions";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [click, setClick] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const handleClick = () => {
    setClick(!click);
  };

  const isActive = (pathname) => {
    return location.pathname === pathname;
  };

  const activeStyle = {
    borderBottom: "2px solid #cbd5e1",
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      dispatch(logout());
      navigate("/Login");
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  //mobile web
  const content = (
    <div className="lg:hidden block absolute top-10 w-full left-0 right-0 bg-gradient-to-l from-gray-700 to-gray-800 transition">
      <ul className="text-center text-base p-4">
        <li
          className="my-4 py-4 font-poppins border-b border-slate-600 hover:bg-slate-800 hover:rounded"
          onClick={() => navigate("/LandingPage")}
        >
          Home
        </li>
        <li
          className="my-4 py-4 font-poppins border-b border-slate-600 hover:bg-slate-800 hover:rounded"
          onClick={() => navigate("/Figures")}
        >
          Figures
        </li>
        <li
          className="my-4 py-4 font-poppins border-b border-slate-600 hover:bg-slate-800 hover:rounded"
          onClick={() => navigate("/Cards")}
        >
          Cards
        </li>
        <li
          className="my-4 py-4 font-poppins border-b border-slate-600 hover:bg-slate-800 hover:rounded"
          onClick={() => navigate("/Series")}
        >
          Series
        </li>
        <li
          className="my-4 py-4 font-poppins border-b border-slate-600 hover:bg-slate-800 hover:rounded"
          onClick={() => navigate("/Games")}
        >
          Games
        </li>
      </ul>
    </div>
  );
  return (
    // pc web

    <nav>
      <div className="nav flex bg-gradient-to-r  from-gray-800 to-gray-700 fixed top-0 w-full justify-between  h-10vh z-50 text-slate-300 sm:px-20 py-4 flex-1 ">
        <div>{click && content}</div>
        <button
          className="block pr-24 sm:hidden transition"
          onClick={handleClick}
        >
          {" "}
          ☰
        </button>
        <div className="my-2 lg:flex md:flex lg: flex-1 items-center justify-start font-normal hidden ">
          <div className="flex-10 font-poppins">
            <ul className="flex gap-10 mr-16 text-[18px]">
              <Link
                className="link"
                style={isActive("/LandingPage") ? activeStyle : null}
                spy={true}
                smooth={true}
                onClick={() => navigate("/LandingPage")}
              >
                <li className="font-poppins font-medium text-sm  transition cursor-pointer">
                  Home
                </li>
              </Link>
              <Link
                className="link"
                style={isActive("/Figures") ? activeStyle : null}
                spy={true}
                smooth={true}
                onClick={() => navigate("/Figures")}
              >
                <li
                  style={isActive("/") ? activeStyle : null}
                  className="font-poppins font-medium text-sm  transition border-b-2 border-transparent hover:border-white cursor-pointer"
                >
                  Figures
                </li>
              </Link>
              <Link
                className="link"
                style={isActive("/Cards") ? activeStyle : null}
                spy={true}
                smooth={true}
                onClick={() => navigate("/Cards")}
              >
                <li
                  style={isActive("/") ? activeStyle : null}
                  className="font-poppins font-medium text-sm  transition border-b-2 border-transparent hover:border-white cursor-pointer"
                >
                  Cards
                </li>
              </Link>
              <Link
                className="link"
                style={isActive("/Series") ? activeStyle : null}
                spy={true}
                smooth={true}
                onClick={() => navigate("/Series")}
              >
                <li
                  style={isActive("/") ? activeStyle : null}
                  className="font-poppins font-medium text-sm  transition border-b-2 border-transparent hover:border-white cursor-pointer"
                >
                  Series
                </li>
              </Link>
              <Link
                className="link"
                style={isActive("/Games") ? activeStyle : null}
                spy={true}
                smooth={true}
                onClick={() => navigate("/Games")}
              >
                <li
                  style={isActive("/") ? activeStyle : null}
                  className="font-poppins font-medium text-sm  transition border-b-2 border-transparent hover:border-white cursor-pointer"
                >
                  Games
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div className="flex sm:items-center mr-10">
          <div className="flex ">
            <Link className="relative">
              <a
                onClick={toggleDropdown}
                className="text-white cursor-pointer hover:text-primary"
              >
                {userData && (
                  <p className="flex text-sm font-medium text-slate-100 italic cursor-pointer hover:text-primary hover:font-semibold">
                    {userData?.data?.name}{" "}
                    <img
                      src="/assets/icon_profile.png"
                      className="w-[20px] h-[20px] ml-3 "
                      alt=""
                    />
                  </p>
                )}
              </a>

              {dropdownVisible && (
                <div className="absolute right-0 mt-5 w-48 cursor-pointer bg-white pt-2  pb-1 rounded-md shadow-lg z-10">
                  <a
                    onClick={() => navigate("/Profile")}
                    className="block px-4 py-2 text-xs cursor-pointer text-gray-700 rounded-md border-b-2 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-xs  rounded-md  text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
