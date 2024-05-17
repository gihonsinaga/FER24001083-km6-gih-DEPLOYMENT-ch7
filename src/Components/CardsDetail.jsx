import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import { DetailCards } from "../redux/actions/cardActions";
import { useDispatch, useSelector } from "react-redux";
import { usePDF } from "react-to-pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const CardsDetail = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFrontButton, setShowFrontButton] = useState(true);
  const [showBackButton, setShowBackButton] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.cards.detail);
  const { toPDF: toPDFFront, targetRef: targetRefFront } = usePDF({
    filename: `${data?.name}_front.pdf`,
  });
  const { toPDF: toPDFBack, targetRef: targetRefBack } = usePDF({
    filename: `${data?.name}_back.pdf`,
  });

  useEffect(() => {
    dispatch(DetailCards());
  }, []);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token === null) {
      alert("please login first !");
      navigate("/Login");
    }
  }, []);

  function flipCard() {
    setIsFlipped(!isFlipped);
    setShowFrontButton(!showFrontButton);
    setShowBackButton(!showBackButton);
  }

  return (
    <div className="">
      <div>
        <button
          className=" bg-slate-700 text-white sm:mt-4 sm:ml-5 max-sm:mt-2 max-sm:ml-2 rounded-3xl sm:py-2 mb-3 sm:px-8 sm:font-medium max-sm:px-5 max-sm:py-1 inline-block mr-4 hover:bg-transparent hover:border-black hover:text-black duration-300 hover:border border border-transparent"
          onClick={() => navigate("/Cards")}
        >
          <span className="">←</span>
        </button>
      </div>
      <div className="justify-center flex">
        <h1 className="text-5xl font-extrabold text-slate-600 max-sm:text-3xl">
          Cards Detail
        </h1>
      </div>

      {/* Bagian details */}
      <div className="">
        <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
          <div className="card" ref={targetRefFront}>
            {data && (
              <div className="container sm:mt-10 max-sm:mt-3 justify-between sm:px-40 sm:flex sm:w-[1000px] sm:h-[500px]   mx-auto  border-2 shadow-xl py-16 sm:shadow-slate-500 ">
                {" "}
                <div className="max-sm:">
                  <img
                    src={data?.image}
                    alt=""
                    className="sm:h-[300px] sm:mt-5 sm:w-[250px] max-sm:w-[320px] "
                  />
                </div>
                <div className="flex flex-col max-sm:ml-5">
                  <div className=" font-extrabold text-slate-600 sm:text-3xl max-sm:text-lg mt-5 mb-2">
                    {data?.name}
                  </div>
                  <table className="max-w-[70px] ">
                    <tr className="font-extralight  text-slate-500 items-start text-base ">
                      <td className="mb-6 sm:text-lg max-sm:text-base font-normal">
                        Character{" "}
                      </td>
                      <td className="py-1 pl-5 pr-3"> : </td>
                      <td className="sm:text-lg max-sm:text-base  font-thin">
                        {data?.character}
                      </td>
                    </tr>

                    <tr className="font-extralight text-slate-500 items-start text-base ">
                      <td className="mb-6 sm:text-lg max-sm:text-base font-normal">
                        Type{" "}
                      </td>
                      <td className="py-1 pl-5 pr-3"> : </td>
                      <td className="sm:text-lg max-sm:text-base  font-thin">
                        {data?.type}
                      </td>
                    </tr>
                  </table>
                  <div className="font-extralight mt-5  text-slate-500 items-start text-base ">
                    <div className="font-extrabold text-slate-600 sm:text-3xl max-sm:text-lg mt-2 mb-2">
                      {" "}
                      Release Date
                    </div>
                    <table className="">
                      <tr className="mb-6 sm:text-lg max-sm:text-base font-normal">
                        au <td className=" pl-5 pr-3">:</td>{" "}
                        <td className="sm:text-lg max-sm:text-base italic font-thin">
                          {data?.release?.au}
                        </td>
                      </tr>
                      <tr className="mb-6 sm:text-lg max-sm:text-base font-normal">
                        eu <td className=" pl-5 pr-3">:</td>{" "}
                        <td className=" sm:text-lg max-sm:text-base italic font-thin">
                          {data?.release?.eu}
                        </td>
                      </tr>
                      <tr className="mb-6 sm:text-lg max-sm:text-base font-normal">
                        jp <td className="pl-5 pr-3">:</td>{" "}
                        <td className="sm:text-lg max-sm:text-base italic font-thin">
                          {data?.release?.jp}
                        </td>
                      </tr>
                      <tr className="mb-6 sm:text-lg max-sm:text-base font-normal ">
                        na <td className="pl-5 pr-3">:</td>{" "}
                        <td className=" sm:text-lg max-sm:text-base italic font-thin">
                          {data?.release?.na}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* bagian see more */}
          <div className="card " ref={targetRefBack}>
            {data && (
              <div className="container mt-10 sm:px-40 max-sm:px-10 flex justify-center sm:w-[1000px] sm:h-[max] mx-auto  border-2 shadow-xl py-16 shadow-slate-500 ">
                <div className="flex flex-col ">
                  <div className="font-extralight text-slate-500 items-start text-base ">
                    <div className="font-extrabold text-slate-600 text-3xl sm:mt-2 mb-5">
                      Nintendo 3DS™
                    </div>
                    <div className="">
                      <div className="mb-6 text-2xl font-medium">
                        {data?.games3DS[0]?.gameName}
                        <div className="text-lg italic font-thin">
                          {data?.games3DS[0]?.amiiboUsage[0]?.Usage}
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />

                  <div className="font-extralight text-slate-500 items-start text-base ">
                    <div className="font-extrabold text-slate-600 text-3xl mt-2 mb-5">
                      Nintendo Switch
                    </div>
                    <div className="">
                      <div className="mb-6 text-2xl font-medium">
                        {data?.gamesSwitch[0]?.gameName}
                        <div className="text-lg italic font-thin">
                          {data?.gamesSwitch[0]?.amiiboUsage[0]?.Usage}
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />

                  <div className="font-extralight text-slate-500 items-start text-base ">
                    <div className="font-extrabold text-slate-600 text-3xl mt-2 mb-5">
                      Wii U™ GamePad
                    </div>
                    <div className="">
                      <div className="mb-6 text-2xl font-medium">
                        {data?.gamesWiiU[0]?.gameName}
                        <div className="text-lg italic font-thin">
                          {data?.gamesWiiU[0]?.amiiboUsage[0]?.Usage}
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            )}
          </div>
        </ReactCardFlip>
      </div>

      <div className="mt-5 flex justify-end sm:mr-60">
        <button
          className=" bg-white text-slate-600 font-bold sm:mt-4 sm:ml-5 max-sm:mt-2 max-sm:ml-2 rounded-3xl sm:py-3 mb-3 sm:px-8 sm:font-medium max-sm:px-5 max-sm:py-1 inline-block  hover:bg-transparent hover:border-slate-700  hover:text-black duration-300 hover:border border border-slate-700"
          onClick={flipCard}
        >
          See More
        </button>

        {showFrontButton && (
          <button
            className=" bg-slate-700 text-white font-bold sm:mt-4 sm:ml-5 max-sm:mt-2 max-sm:ml-2 rounded-3xl sm:py-3 mb-3 sm:px-8 sm:font-medium max-sm:px-5 max-sm:py-1 inline-block mr-4 hover:bg-transparent hover:border-black hover:text-black duration-300 hover:border border border-transparent"
            onClick={() => toPDFFront()}
          >
            <FontAwesomeIcon
              icon={faDownload}
              className="sm:mr-2 max-sm:w-[14px]"
            />
            <span className="max-sm:hidden"> Download</span>
          </button>
        )}
        {showBackButton && (
          <button
            className=" bg-slate-700 text-white font-bold sm:mt-4 sm:ml-5 max-sm:mt-2 max-sm:ml-2 rounded-3xl sm:py-3 mb-3 sm:px-8 sm:font-medium max-sm:px-5 max-sm:py-1 inline-block mr-4 hover:bg-transparent hover:border-black hover:text-black duration-300 hover:border border border-transparent"
            onClick={() => toPDFBack()}
          >
            <FontAwesomeIcon
              icon={faDownload}
              className="sm:mr-2 max-sm:w-[14px]"
            />
            <span className="max-sm:hidden"> Download</span>
          </button>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CardsDetail;
