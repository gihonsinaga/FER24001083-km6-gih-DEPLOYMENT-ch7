import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Components/Footer";
import "./index.css";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [click, setClick] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

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
    dispatch(logout());
    navigate("/Login");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (token !== null) {
      alert("Please log out first before signing up again");
      navigate("/LandingPage");
    }
  }, []);

  //mobile web
  const content = (
    <div className="lg:hidden block absolute top-10 w-full pb-10 left-0 right-0 bg-gradient-to-l from-gray-700 to-gray-800 transition">
      <ul className="text-center text-base p-4">
        <li
          className="my-4 py-4 font-poppins border-b border-slate-600 hover:bg-slate-800 hover:rounded"
          onClick={() => navigate("/")}
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
    <div>
      <nav>
        <div className="nav flex bg-gradient-to-r from-gray-800 to-gray-700 fixed top-0 w-full justify-between  h-10vh z-50 text-slate-300 sm:px-20 py-4 flex-1 ">
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
                  style={isActive("/") ? activeStyle : null}
                  spy={true}
                  smooth={true}
                  onClick={() => navigate("/")}
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
                  <li className="font-poppins font-medium text-sm  transition border-b-2 border-transparent hover:border-white cursor-pointer">
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
                  <li className="font-poppins font-medium text-sm  transition border-b-2 border-transparent hover:border-white cursor-pointer">
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
                  <li className="font-poppins font-medium text-sm  transition border-b-2 border-transparent hover:border-white cursor-pointer">
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
                  <li className="font-poppins font-medium text-sm  transition border-b-2 border-transparent hover:border-white cursor-pointer">
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
                  <p
                    onClick={() => navigate("/Login")}
                    className="flex text-sm font-medium text-slate-100  italic cursor-pointer hover:text-primary hover:font-semibold"
                  >
                    Sign In
                    <img
                      src="/assets/icon_profile.png"
                      className="w-[20px] h-[20px] ml-3 "
                      alt=""
                    />
                  </p>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div class=" bg-gradient-to-r from-gray-800 to-gray-700 ">
        <div class="container flex flex-col justify-center p-6 mx-auto sm:py-12 sm:px-40 lg:py-20 lg:flex-row lg:justify-between">
          <div class="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h1 class="text-4xl max-sm:mt-10 tracking-wide text-slate-300 font-bold leading-none sm:text-5xl sm:mt-10 sm:pr-17">
              Welcome <br />{" "}
              <span className="line-clamp-5">To Amiibo Series</span>
            </h1>
            <p class="mt-6 mb-8 italic text-base font-medium sm:mb-7 text-slate-500">
              ' Welcome to the enchanting world of amiibo! Before you embark on
              your amiibo adventure, please Sign In to your account. By Signed
              in, you'll gain access to exclusive features, click the button
              below to sign in '
            </p>
            <div>
              <button
                className=" bg-slate-300 text-slate-800 text-base max-sm:text-sm max-sm:ml-2 rounded-3xl sm:py-2 mb-3 sm:px-8 font-bold max-sm:px-5 max-sm:py-1 inline-block mr-4 hover:bg-transparent hover:border-white hover:text-white duration-300 hover:border border border-transparent"
                onClick={() => navigate("/Login")}
              >
                <span className="">Sign In</span>
              </button>
            </div>
          </div>
          <div class="max-sm:hidden flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img src="/assets/giphy.gif" alt="" className="w-[450px]" />
          </div>
        </div>
      </div>

      <div className="2xl:mx-auto sm:mt-7 2xl:container 2xl:px-36 xl:px-12 sm:px-6 px-4 py-10">
        <h1 className="lg:text-4xl text-3xl font-semibold leading-9 text-gray-800">
          Unlock cool extras
        </h1>
        <p className="md:w-1/2 text-base leading-normal mt-4 sm:pr-10 text-gray-600">
          One amiibo may work with multiple games. Check out some of the fun
          stuff you can do.
        </p>

        <div className="md:flex items-start justify-between mt-12">
          <div className="md:w-1/2 lg:w-full">
            <div>
              <div className="relative">
                <img src="/assets/ac_cards.avif" alt="" />
              </div>

              <h1 className="text-2xl font-semibold leading-7 sm:pr-20 mt-2 text-gray-800">
                Add a character to the game
              </h1>
              <p className="text-base leading-normal mt-2 sm:pr-20 md:pr-10  text-gray-600">
                Invite characters to your island in the Animal Crossing™: New
                Horizons
                <br />
                game.
              </p>
              <button
                className="flex items-center justify-between w-72 mt-4 bg-gray-800 p-4 hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                onClick={() => navigate("/Figures")}
              >
                <p className="text-base font-medium leading-4 text-white">
                  Read more
                </p>

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.33203 8H12.6654"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 10.6667L12.6667 8"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 5.33344L12.6667 8.0001"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-20">
              <div className="relative">
                <img src="/assets/inkling.avif" alt="" />
              </div>

              <h1 className="text-xl font-semibold leading-7 sm:pr-20 mt-2 text-gray-800">
                Level up or customize your character
              </h1>
              <p className="text-sm leading-normal mt-2 sm:pr-20 md:pr-10 text-gray-600">
                Train and fight Figure Players in the Super Smash Bros.™ <br />
                Ultimate game.
              </p>
              <button
                onClick={() => navigate("/Games")}
                className="flex items-center justify-between w-72 mt-4 bg-gray-800 p-4 hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
              >
                <p className="text-base font-medium leading-4 text-white">
                  Read more
                </p>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.33203 8H12.6654"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 10.6667L12.6667 8"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 5.33344L12.6667 8.0001"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="md:w-1/2 md:ml-6 md:mt-0 mt-9 max-sm:mt-20 lg:w-full">
            <div>
              <div className="relative">
                <img src="/assets/cat_mario.avif" alt="" />
              </div>

              <h1 className="text-xl font-semibold leading-7 sm:pr-20 mt-2 text-gray-800">
                Get bonuses or special items
              </h1>
              <p className="text-sm leading-normal mt-2 sm:pr-20 md:pr-10 text-gray-600">
                Unlock power-ups and other in-game enhancements in the Super
                Mario™ <br /> 3D World + Bowser's Fury game.
              </p>
              <button
                onClick={() => navigate("/Series")}
                className="flex items-center justify-between w-72 mt-4 bg-gray-800 p-4 hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
              >
                <p className="text-base font-medium leading-4 text-white">
                  Read more
                </p>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.33203 8H12.6654"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 10.6667L12.6667 8"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 5.33344L12.6667 8.0001"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-20">
              <div className="relative">
                <img
                  src="/assets/ac_cards.avif"
                  className="h-[300px] max-sm:h-[150px]"
                  alt="stairs"
                />
              </div>

              <h1 className="text-xl font-semibold leading-7 sm:pr-20  text-gray-800">
                Interaction with user
              </h1>
              <p className="text-sm leading-normal mt-2 sm:pr-20 md:pr-10 text-gray-600">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
              <button
                onClick={() => navigate("/Cards")}
                className="flex items-center justify-between w-72 mt-4 bg-gray-800 p-4 hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
              >
                <p className="text-base font-medium leading-4 text-white">
                  Read more
                </p>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.33203 8H12.6654"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 10.6667L12.6667 8"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 5.33344L12.6667 8.0001"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:mt-6 text-xs border-b border-slate-300 py-4 sm:mx-32 max-sm:mx-7"></div>

      {/* many forms */}
      <div className="text-center font-bold font-poppins text-2xl sm:mt-20 max-sm:mt-7">
        <h2>Many forms of fun</h2>
        <p className="font-thin text-lg mt-3 max-sm:mx-7 ">
          From high-quality character figures to super-portable cards, amiibo
          can come in different shapes and sizes.
        </p>
      </div>

      <div className="container flex mx-auto sm:px-32 md:py-4 py-9">
        <div className=" bg-gray-50 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-10 md:gap-12 gap-14 lg:px-9 lg:py-12 py-10 md:px-12 px-4">
          {/* Nintendo Switch */}
          <div className="border-2 px-5 py-5 md:py-2 shadow-2xl sm:h-[450px]  cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
            <img src="/assets/nintendo_switch.png" alt="" />
            <h3 className=" text-lg leading-5 font-semibold text-gray-800 lg:mt-10 mt-8 ">
              Nintendo Switch
            </h3>
            <p className=" text-sm leading-6 font-normal text-gray-600 mt-4 lg:w-full md:w-9/12 w-full">
              You can tap your amiibo to the right Joy-Con™ controller's Right
              Stick or the NFC touchpoint on the Nintendo Switch Pro Controller.
            </p>
          </div>

          {/* Wii U™ GamePad*/}

          <div className="border-2 px-5 py-5 shadow-2xl  cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
            <img src="/assets/wiiu.png" alt="" />
            <h3 className="text-lg leading-5 font-semibold text-gray-800 lg:mt-10 mt-8">
              Wii U™ GamePad
            </h3>
            <p className="text-sm leading-6 font-normal text-gray-600 mt-4 lg:w-full md:w-9/12 w-full">
              Tap any amiibo accessory to the NFC reader on your Wii U™ GamePad
              controller.
            </p>
          </div>

          {/* New Nintendo 3DS™ XL */}

          <div className="border-2 px-5 py-5 shadow-2xl  cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
            <img src="/assets/nintendo_3dx_xl.png" alt="" />
            <h3 className=" text-lg leading-5 font-semibold text-gray-800 lg:mt-10 mt-8 ">
              New Nintendo 3DS™ XL
            </h3>
            <p className=" text-sm leading-6 font-normal text-gray-600 mt-4 lg:w-full md:w-9/12 w-full">
              The New Nintendo 2DS™ XL and New Nintendo 3DS™ XL come with
              built-in amiibo support. Just tap an amiibo to the NFC reader on
              the lower screen.
            </p>
          </div>

          {/* Nintendo 3DS™*/}

          <div className="border-2 px-5 py-5 shadow-2xl  cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
            <img src="/assets/nintendo_3ds.png" alt="" />
            <h3 className=" text-lg leading-5 font-semibold text-gray-800 lg:mt-10 mt-8 ">
              Nintendo 3DS™
            </h3>
            <p className=" text-sm leading-6 font-normal text-gray-600 mt-4 lg:w-full md:w-9/12 w-full">
              You can also use amiibo with Nintendo 3DS™, Nintendo 3DS™ XL, or
              Nintendo 2DS™ systems via the Nintendo 3DS NFC Reader/Writer
              accessory (sold separately).
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
