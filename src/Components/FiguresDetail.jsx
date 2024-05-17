import React, { useEffect } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailAmiibo } from "../redux/actions/figureActions";
import { usePDF } from "react-to-pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const FiguresDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.figures.detail);
  const { toPDF, targetRef } = usePDF({ filename: `${data?.name}.pdf` });

  useEffect(() => {
    dispatch(DetailAmiibo());
  }, []);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token === null) {
      alert("please login first !");
      navigate("/Login");
    }
  }, []);

  return (
    <div className="">
      <div>
        <button
          className=" bg-slate-700 text-white sm:mt-4 sm:ml-5 max-sm:mt-2 max-sm:ml-2 rounded-3xl sm:py-2 mb-3 sm:px-8 sm:font-medium max-sm:px-5 max-sm:py-1 inline-block mr-4 hover:bg-transparent hover:border-black hover:text-black duration-300 hover:border border border-transparent"
          onClick={() => navigate("/Figures")}
        >
          <span className="">←</span>
        </button>
      </div>
      <div className="justify-center flex">
        <h1 className="text-5xl font-extrabold text-slate-600 max-sm:text-3xl">
          Figure Detail
        </h1>
      </div>

      {data && (
        <div
          ref={targetRef}
          className="container sm:mt-10 max-sm:mt-3 justify-between sm:px-40 sm:flex sm:w-[1000px] sm:h-[500px]   mx-auto  border-2 shadow-xl py-16 sm:shadow-slate-500 "
        >
          <div className="max-sm:ml-10">
            <img
              src={data?.image}
              alt=""
              className="sm:h-[300px] mt-5 sm:w-[250px] "
            />
          </div>
          <div className="flex flex-col max-sm:ml-5 max-sm:mt-5">
            <div className=" font-extrabold text-slate-600 sm:text-3xl max-sm:text-lg mt-2 mb-2">
              {data?.name}
            </div>
            <table>
              <tr className="font-extralight text-slate-500 items-start text-base ">
                <td className="mb-6 sm:text-lg max-sm:text-base font-normal">
                  Amiibo Series{" "}
                </td>
                <td className="py-1 px-4"> : </td>
                <td>{data?.amiiboSeries}</td>
              </tr>
              <tr className="font-extralight text-slate-500 items-start text-base ">
                <td className="mb-6 sm:text-lg max-sm:text-base font-normal">
                  Character{" "}
                </td>
                <td className="py-1 px-4"> : </td>
                <td>{data?.character}</td>
              </tr>
              <tr className="font-extralight text-slate-500 items-start text-base ">
                <td className="mb-6 sm:text-lg max-sm:text-base font-normal">
                  {" "}
                  Game Series{" "}
                </td>
                <td className="py-1 px-4"> : </td>
                <td>{data?.gameSeries}</td>
              </tr>
              <tr className="font-extralight text-slate-500 items-start text-base ">
                <td className="mb-6 sm:text-lg max-sm:text-base font-normal">
                  Type{" "}
                </td>
                <td className="py-1 px-4"> : </td>
                <td>{data?.type}</td>
              </tr>
            </table>
            <div className="font-extralight mt-5 text-slate-500 items-start text-base ">
              <div className=" font-extrabold text-slate-600 sm:text-3xl max-sm:text-lg mt-2 mb-2">
                {" "}
                Release Date
              </div>
              <table className="">
                <tr className="mb-6 sm:text-lg max-sm:text-base font-normal ">
                  au <td className="px-2">:</td>{" "}
                  <td className="sm:text-lg max-sm:text-base italic font-thin">
                    {data?.release?.au}
                  </td>
                </tr>
                <tr className="mb-6 sm:text-lg max-sm:text-base font-normal">
                  eu <td className="px-2">:</td>{" "}
                  <td className="sm:text-lg max-sm:text-base italic font-thin ">
                    {data?.release?.eu}
                  </td>
                </tr>
                <tr className="mb-6 sm:text-lg max-sm:text-base font-normal">
                  jp <td className="px-2">:</td>{" "}
                  <td className="sm:text-lg max-sm:text-base italic font-thin ">
                    {data?.release?.jp}
                  </td>
                </tr>
                <tr className="mb-6 sm:text-lg max-sm:text-base font-normal">
                  na <td className="px-2">:</td>{" "}
                  <td className=" sm:text-lg max-sm:text-base italic font-thin">
                    {data?.release?.na}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="mt-5 flex justify-end lg:mr-60">
        <button
          className=" bg-slate-700 text-white font-bold sm:mt-4 sm:ml-5 max-sm:mt-2 max-sm:ml-2 rounded-3xl sm:py-3 mb-3 sm:px-8 sm:font-medium max-sm:px-5 max-sm:py-1 inline-block mr-4 hover:bg-transparent hover:border-black hover:text-black duration-300 hover:border border border-transparent"
          onClick={() => toPDF()}
        >
          <FontAwesomeIcon
            icon={faDownload}
            className="sm:mr-2 max-sm:w-[14px]"
          />
          <span className="max-sm:hidden"> Download</span>
        </button>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default FiguresDetail;
