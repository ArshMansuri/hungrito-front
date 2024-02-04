import React, { useRef, useState } from "react";
import ResSignUpHeader from "../../../../Components/ResSignUpHeader/ResSignUpHeader";
import ResSignUpFooter from "../../../../Components/ResSignUpFooter/ResSignUpFooter";
import Loader from "../../../../Components/Loaders/Loader";
import { LuImagePlus } from "react-icons/lu";
import { GiCancel } from "react-icons/gi";
import "./dbSignUp2.css";

const DbSignUp2 = () => {
  const dbImgRef = useRef();
  const dbVehicleImgRef = useRef();
  const dbLicenseImgRef = useRef();

  const [dbImg, setDbImg] = useState("");
  const [dbVehicleImg, setDbVehicleImg] = useState("");
  const [dbLicenseImg, setDbLicenseImg] = useState("");

  const openImgDilog = (type) => {
    console.log(type);
    if (dbImgRef.current && type === "dbImg") {
      dbImgRef.current.value = null;
      dbImgRef.current.click();
    }

    if (dbVehicleImgRef.current && type === "dbVehicleImg") {
      dbVehicleImgRef.current.value = null;
      dbVehicleImgRef.current.click();
    }

    if (dbLicenseImgRef.current && type === "dbLicenseImg") {
      dbLicenseImgRef.current.value = null;
      dbLicenseImgRef.current.click();
    }
  };

  const imgHendler = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        if (e.target.name === "dbImg") {
          setDbImg(Reader.result);
        }
        console.log(e.target);
        if (e.target.name === "dbVehicleImg") {
          console.log("inn");
          setDbVehicleImg(Reader.result);
        }
        if (e.target.name === "dbLicenseImg") {
          setDbLicenseImg(Reader.result);
        }
      }
    };
  };

  const onClickNext = () => {
    if (
      dbImg !== "" &&
      dbImg !== undefined &&
      dbVehicleImg !== "" &&
      dbVehicleImg !== undefined &&
      dbLicenseImg !== "" &&
      dbLicenseImg !== undefined
    ) {
      const delBoy = {
        dbImg,
        dbVehicleImg,
        dbLicenseImg,
      };
    } else {
      console.log("eneter all fild");
    }
  };

  const onClickBack = () => {
    // dispatch(removeResType());
  };
  return (
    <>
      <div className="res-signup-page">
        <ResSignUpHeader />

        {/* =======================    Restaurant Food Image  ===========================*/}
        {false ? (
          <Loader />
        ) : (
          <>
            <div className="res-detail-box d-flex justify-content-center mt-4">
              <div className="res-detail-width w-75 border p-4">
                <div className="heading">
                  <h4 className="text-dark">Delivery boy</h4>
                  <p className="text-secondary">Upload Your Image</p>
                </div>

                <div className="res-detail-width-2 w-75">
                  <div className="border img-div d-flex justify-content-center align-items-center position-relative">
                    <img
                      src={dbImg}
                      className={`${dbImg !== "" ? "d-block" : "d-none"}`}
                      width={"100%"}
                      height={"230px"}
                      alt=""
                    />
                    {dbImg === "" ? (
                      <LuImagePlus
                        size={25}
                        onClick={() => openImgDilog("dbImg")}
                      />
                    ) : (
                      <div className="position-absolute cancel-btn">
                        <GiCancel size={20} onClick={() => setDbImg("")} />
                      </div>
                    )}
                  </div>
                </div>

                <input
                  type="file"
                  name="dbImg"
                  id="dbImg"
                  className="d-none"
                  onChange={imgHendler}
                  ref={dbImgRef}
                />
              </div>
            </div>
            <div className="res-detail-box d-flex justify-content-center mt-4">
              <div className="res-detail-width w-75 border p-4">
                <div className="heading">
                  <h4 className="text-dark">Delivery boy vehicle</h4>
                  <p className="text-secondary">Upload Your Vehicle's Image</p>
                </div>

                <div className="res-detail-width-2 w-75">
                  <div className="border img-div d-flex justify-content-center align-items-center position-relative">
                    <img
                      src={dbVehicleImg}
                      className={`${
                        dbVehicleImg !== "" ? "d-block" : "d-none"
                      }`}
                      width={"100%"}
                      height={"230px"}
                      alt=""
                    />
                    {dbVehicleImg === "" ? (
                      <LuImagePlus
                        size={25}
                        onClick={() => openImgDilog("dbVehicleImg")}
                      />
                    ) : (
                      <div className="position-absolute cancel-btn">
                        <GiCancel
                          size={20}
                          onClick={() => setDbVehicleImg("")}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <input
                  type="file"
                  name="dbVehicleImg"
                  id="dbVehicleImg"
                  className="d-none"
                  onChange={imgHendler}
                  ref={dbVehicleImgRef}
                />
              </div>
            </div>
            <div
              className="res-detail-box d-flex justify-content-center mt-4"
              style={{ marginBottom: "70px" }}
            >
              <div className="res-detail-width w-75 border p-4">
                <div className="heading">
                  <h4 className="text-dark">Delivery boy License</h4>
                  <p className="text-secondary">Upload Your License's Image</p>
                </div>

                <div className="res-detail-width-2 w-75">
                  <div className="border img-div d-flex justify-content-center align-items-center position-relative">
                    <img
                      src={dbLicenseImg}
                      className={`${
                        dbLicenseImg !== "" ? "d-block" : "d-none"
                      }`}
                      width={"100%"}
                      height={"230px"}
                      alt=""
                    />
                    {dbLicenseImg === "" ? (
                      <LuImagePlus
                        size={25}
                        onClick={() => openImgDilog("dbLicenseImg")}
                      />
                    ) : (
                      <div className="position-absolute cancel-btn">
                        <GiCancel
                          size={20}
                          onClick={() => setDbLicenseImg("")}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <input
                  type="file"
                  name="dbLicenseImg"
                  id="dbLicenseImg"
                  className="d-none"
                  onChange={imgHendler}
                  ref={dbLicenseImgRef}
                />
              </div>
            </div>
            <div className="res-signup-footer position-fixed bottom-0 start-0 end-0">
              <ResSignUpFooter
                goBack={true}
                onClickNext={onClickNext}
                onClickBack={onClickBack}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DbSignUp2;
