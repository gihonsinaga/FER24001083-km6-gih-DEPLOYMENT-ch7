import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CharacterAmiibo, DetailCards } from "../redux/actions/cardActions";
import { setAmiibo } from "../redux/reducers/cardReducers";
// import { handleSearch } from "../redux/actions/functionActions";

const Character = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedBy, setSortedBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.cards.cards);

  useEffect(() => {
    dispatch(CharacterAmiibo());
  }, []);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token === null) {
      alert("silahkan login dulu");
      navigate("/Login");
    }
  }, []);

  const sortByName = () => {
    let sorted;
    if (sortedBy === "name") {
      sorted = [...data].reverse();
      setSortedBy(null);
    } else {
      sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
      setSortedBy("name");
    }
    dispatch(setAmiibo(sorted));
    setCurrentPage(1);
  };

  // Sort by series
  const sortByGames = () => {
    let sorted;
    if (sortedBy === "Games") {
      sorted = [...data].reverse();
      setSortedBy(null);
    } else {
      sorted = [...data].sort((a, b) => a.games.localeCompare(b.games));
      setSortedBy("Games");
    }
    dispatch(setAmiibo(sorted));
    setCurrentPage(1);
  };

  //search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    ? data
        .filter((e) => e.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = data
    ? Math.ceil(
        data.filter((e) =>
          e.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).length / itemsPerPage
      )
    : 0;

  let pageNumbers = [];
  if (totalPages <= 5) {
    pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    pageNumbers = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }
  return (
    <div className="">
      <div>
        <Nav />
      </div>

      <div className="sm:mt-36 max-sm:mt-20 2xl:container px-4 sm:px-6  lg:px-8 sm:mb-5 max-sm:mb-8">
        <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold leading-9 text-black">
          {" "}
          Amiibo Character Card
        </h1>
      </div>

      <div className="flex flex-wrap justify-between mx-4 lg:mx-12 mb-4">
        <div className="sm:flex items-center">
          <div className="font-bold sm:text-base  my-2 mr-4 max-sm:hidden">
            Sort By
          </div>
          <button
            onClick={sortByName}
            className="bg-black text-white rounded-3xl py-2 px-4 sm:py-2 sm:px-4 font-medium text-sm mr-4 hover:bg-transparent hover:border-black hover:text-black duration-300 border border-transparent"
          >
            Name <span className="ml-5">⇅</span>
          </button>
          <button
            onClick={sortByGames}
            className="bg-black text-white rounded-3xl py-2 px-4 sm:py-2 sm:px-4 font-medium text-sm mr-4 hover:bg-transparent hover:border-black hover:text-black duration-300 border border-transparent"
          >
            Games <span className="ml-5">⇅</span>
          </button>
        </div>
        <div className="sm:flex items-center">
          <div className="font-bold sm:text-base my-2 mr-4  max-sm:hidden ">
            Search
          </div>
          <input
            type="text"
            placeholder="Search ..."
            onChange={handleSearch}
            className="text-black  pl-4 pr-2 sm:pl-5 bg-slate-100 border-2 border-black rounded-full py-2 sm:py-2 sm:px-4 w-[280px] max-w-xs outline-none max-sm:mt-6 "
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center mx-4 lg:mx-12 mt-10 mb-5 gap-y-10 gap-x-6 sm:gap-x-10">
        {currentItems.map((e) => (
          <div
            key={e?.tail}
            className="flex flex-col max-sm:w-full  max-sm:h-[320px] sm:w-[300px] sm:h-[300px] border-2 shadow-xl shadow-slate-500 items-center cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            onClick={async () => {
              const dataBaru = await dispatch(DetailCards({ id: e?.tail }));
              console.log("dataBaru", dataBaru);
              navigate("/CardsDetail");
            }}
          >
            <div className="block">
              <img
                src={e?.image}
                alt=""
                className="max-h-[200px] mt-5 max-w-[500px] "
              />
            </div>
            <div className="font-bold text-slate-700 mt-5 text-base ">
              {e?.name}
            </div>
            <div className="font-extralight text-slate-500 text-sm ">
              {e?.games}
            </div>
          </div>
        ))}
      </div>

      {currentItems.length === 0 && (
        <div className="text-center  mt-10 text-lg text-gray-600">
          <img
            src="/assets/search2.png"
            width="200"
            height="100"
            className="mx-auto mb-5"
            alt=""
          />
          No amiibo character card found here . . .
        </div>
      )}

      <div>
        <ul className="flex justify-center sm:justify-end mx-4 sm:mr-12 mt-10 sm:mt-20">
          <li
            className={`max-sm:hidden cursor-pointer mx-1 py-2 px-4 sm:py-3 sm:px-5 bg-black text-white rounded-3xl font-medium hover:bg-transparent hover:border-black hover:text-black duration-300 border border-transparent ${
              currentPage === 1
                ? "pointer-events-none bg-white border-black text-slate-900 "
                : ""
            }`}
            onClick={() => {
              if (currentPage > 1) {
                paginate(currentPage - 1);
              }
            }}
          >
            Back
          </li>

          {pageNumbers.map((pageNumber, index) => (
            <li
              key={index}
              className={` sm:inline-block cursor-pointer mx-1 py-2 px-4 sm:py-3 sm:px-5 rounded-3xl font-medium duration-300 border-2 hover:bg-black hover:text-white ${
                pageNumber === currentPage ? "bg-black text-white" : ""
              }`}
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </li>
          ))}

          <li
            className={`max-sm:hidden cursor-pointer mx-1 py-2 px-4 sm:py-3 sm:px-5 bg-black text-white rounded-3xl font-medium hover:bg-transparent hover:border-black hover:text-black duration-300 border border-transparent ${
              currentPage === totalPages
                ? "pointer-events-none bg-white border-black text-slate-900"
                : ""
            }`}
            onClick={() => {
              if (currentPage < totalPages) {
                paginate(currentPage + 1);
              }
            }}
          >
            Next
          </li>
        </ul>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Character;
