import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./redux/actions/authActions";

const Profile = () => {
  const navigate = useNavigate();

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token === null) {
      alert("");
      navigate("/Login");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  const IMAGES = {
    image1: new URL("/assets/bg_profile.png", import.meta.url).href,
  };

  return (
    <>
      <div>
        <div>
          <button
            className=" bg-slate-700 text-white sm:mt-4 sm:ml-5 max-sm:mt-2 max-sm:ml-2 rounded-3xl sm:py-2 mb-3 sm:px-8 sm:font-medium max-sm:px-5 max-sm:py-1 inline-block mr-4 hover:bg-transparent hover:border-black hover:text-black duration-300 hover:border border border-transparent"
            onClick={() => navigate("/LandingPage")}
          >
            <span className="">←</span>
          </button>
        </div>
        <div className="justify-center flex">
          <h1 className="text-5xl font-extrabold text-slate-600 max-sm:text-3xl mb-10">
            Profile Detail
          </h1>
        </div>
        <div className="bg-gray-100 flex flex-col lg:flex-row justify-center mx-auto shadow-2xl shadow-gray-800 sm:w-full max-sm:w-[300px] max-sm:h-[500px] max-w-6xl h-full lg:h-[500px] items-center max-lg:w-[700px] max-md:w-[350px] max-md:h-[700px]">
          <div className="hidden lg:flex lg:mr-10 w-full lg:w-1/2 justify-center items-center bg-slate-600 h-[500px]">
            {/* <img
              src="/assets/profile.png"
              className="h-[350px] w-[350px]"
              alt="Profile"
            /> */}
          </div>
          <div className="w-full lg:w-1/2 px-8 lg:px-16 py-8 lg:py-0">
            <p className="text-base text-gray-800">Name</p>
            {userData && (
              <h2 className="font-bold text-start text-xl lg:text-2xl text-slate-600">
                {userData.data.name}
              </h2>
            )}
            <p className="mt-6 lg:mt-12 text-base text-gray-800">Email</p>
            {userData && (
              <h2 className="font-bold text-start  text-xl lg:text-2xl text-slate-600">
                {userData.data.email}
              </h2>
            )}
            <div className="flex flex-col lg:flex-row justify-between mt-6  lg:mt-14">
              <div>
                <p className="text-base text-gray-800">Created at</p>
                {userData && (
                  <h2 className="font-bold text-start  text-xl lg:text-2xl text-slate-600">
                    {formatDate(userData.data.createdAt)}
                  </h2>
                )}
              </div>
              <div className="mt-6 lg:mt-0">
                <p className="text-base text-gray-800">Type</p>
                {userData && (
                  <h2 className="font-bold text-start text-xl pr-24 lg:text-2xl text-slate-600">
                    {userData.data.type}
                  </h2>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
