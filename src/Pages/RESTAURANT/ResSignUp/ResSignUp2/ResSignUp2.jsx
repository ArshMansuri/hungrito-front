import React, { useEffect, useState } from "react";
import "./resSignUp2.css";
import { useNavigate } from "react-router-dom";
import ResSignUpFooter from "../../../../Components/ResSignUpFooter/ResSignUpFooter";
import { useDispatch, useSelector } from "react-redux";
import { removeResName } from "../../../../redux/slice/restaurant";
import axios from "axios";
import { resSignUpSecPage } from "../../../../redux/actions/restaurant";
import ResSignUpHeader from "../../../../Components/ResSignUpHeader/ResSignUpHeader";
import Loader from "../../../../Components/Loaders/Loader";

// const BASE_URL = "https://hungritobackend.onrender.com";
const BASE_URL = "http://localhost:6010";
const ResSignUp2 = ({ isRestuAuther, isResLoading = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allResType, setAllResType] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  const { restu } = useSelector((state) => state.restu);

  const [resType, setResType] = useState([]);
  const [resCategory, setResCategory] = useState([]);
  const [time, setTime] = useState({
    firstStartTime: "09:00",
    firstClosetime: "12:00",
    secondStartTime: "15:00",
    secondClosetime: "21:00",
  });
  const [days, setDays] = useState({
    sun: true,
    mon: true,
    tues: true,
    wed: true,
    thurs: true,
    fri: true,
    sat: true,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/restaurant/restypes`,
          { withCredentials: true }
        );
        setAllResType(data.resTypes);
        const data2 = await axios.get(
          `${BASE_URL}/api/v1/restaurant/categories`,
          { withCredentials: true }
        );
        setAllCategory(data2.data.categories);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (
      restu !== undefined &&
      restu?.resType?.length > 0 &&
      restu?.resCategory?.length > 0
    ) {
      navigate(`/res/signup/p3/${restu?.resEmail?.email}`);
    }

    if (
      restu !== undefined &&
      restu?.resType !== undefined &&
      restu?.resType?.length === 0
    ) {
      setResCategory(restu.resCategory);
      setTime({
        firstStartTime: restu?.resTime[0]?.startTime || "09:00",
        firstClosetime: restu?.resTime[0]?.endTime || "12:00",
        secondStartTime: restu?.resTime[1]?.startTime || "15:00",
        secondClosetime: restu?.resTime[1]?.endTime || "21:00",
      });
    }
  }, [navigate, restu]);

  const onSelectResType = (e) => {
    if (resType.includes(e.target.value)) {
      const temp = resType.filter((val, index) => val !== e.target.value);
      setResType(temp);
      return;
    }
    if (resType.length < 2) {
      setResType((p) => [...p, e.target.value]);
    }
  };

  const onSelectResCategory = (e) => {
    if (resCategory.includes(e.target.value)) {
      const temp = resCategory.filter((val, index) => val !== e.target.value);
      setResCategory(temp);
      return;
    }
    if (resCategory.length < 2) {
      setResCategory((p) => [...p, e.target.value]);
    }
  };

  const timeHendler = (e, str) => {
    if (str === "firstStart") {
      setTime({ ...time, firstStartTime: e.target.value });
      return;
    }
    if (str === "firstClose") {
      setTime({ ...time, firstClosetime: e.target.value });
      return;
    }
    if (str === "secondStart") {
      setTime({ ...time, secondStartTime: e.target.value });
      return;
    }
    if (str === "secondClose") {
      setTime({ ...time, secondClosetime: e.target.value });
      return;
    }
  };

  const onClickNext = () => {
    if (resCategory.length > 0 && resType.length > 0) {
      const restu = {
        resType,
        resCategory,
        resTime: [
          { startTime: time.firstStartTime, endTime: time.firstClosetime },
          { startTime: time.secondStartTime, endTime: time.secondClosetime },
        ],
        days,
      };
      dispatch(resSignUpSecPage({ restu }));
    } else {
      console.log("enter all fildddd");
    }
    // navigate("/ressignup3");
  };

  const onClickBack = () => {
    dispatch(removeResName());
  };

  return (
    <>
      <div className="res-signup-page">
        <ResSignUpHeader />
        {isResLoading ? (
          <Loader />
        ) : (
          <>
            {/* =======================    Restaurant Type  ===========================*/}
            <div className="res-detail-box d-flex justify-content-center mt-4">
              <div className="res-detail-width w-75 border p-4">
                <div className="heading">
                  <h4 className="text-dark">Restaurant Type</h4>
                  <p className="text-secondary">
                    Select which type of your restaurant
                  </p>
                </div>

                <div className="res-detail-width-2 w-75">
                  <div className="row ms-1">
                    {allResType.length > 0 &&
                    allResType[1].type !== undefined ? (
                      allResType.map((type, index) => {
                        return (
                          <div
                            className="form-check col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6 gy-2"
                            key={String(index)}
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={type._id}
                              id={type.type}
                              checked={
                                resType.includes(type._id) ? true : false
                              }
                              onChange={onSelectResType}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={type.type}
                            >
                              {type.type}
                            </label>
                          </div>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* =======================    Restaurant Foods Type  ===========================*/}
            <div className="res-detail-box d-flex justify-content-center mt-4">
              <div className="res-detail-width w-75 border p-4">
                <div className="heading">
                  <h4 className="text-dark">Restaurant Foods</h4>
                  <p className="text-secondary">
                    Select best foods of your restaurant
                  </p>
                </div>

                <div className="res-detail-width-2 w-75">
                  <div className="row ms-1">
                    {allCategory.length > 0 &&
                    allCategory[1].type !== undefined ? (
                      allCategory.map((type, index) => {
                        return (
                          <div
                            className="form-check col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6 gy-2"
                            key={String(index)}
                          >
                            <input
                              className="form-check-input cursor-pointer"
                              type="checkbox"
                              value={type._id}
                              id={index}
                              checked={
                                resCategory.includes(type._id) ? true : false
                              }
                              onChange={onSelectResCategory}
                            />
                            <label
                              className="form-check-label cursor-not-allowed"
                              htmlFor={index}
                            >
                              {type.type}
                            </label>
                          </div>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* =======================    Restaurant Time  ===========================*/}
            <div className="res-detail-box d-flex justify-content-center mt-4">
              <div className="res-detail-width w-75 border p-4">
                <div className="heading">
                  <h4 className="text-dark">Restaurant Time</h4>
                  <p className="text-secondary">
                    Set restaurant opening and closing time
                  </p>
                </div>

                <div className="res-detail-width-2 w-75 time-details">
                  <div className="d-flex align-items-center">
                    <div className="open-time">
                      <div className="text-secondary text-center">Opens at</div>
                      <div className="f-open-time cs-form">
                        <input
                          type="time"
                          className="form-control"
                          value={time.firstStartTime}
                          onChange={(e) => timeHendler(e, "firstStart")}
                        />
                      </div>
                    </div>
                    <div className="to text-secondary ms-3 mt-3">to</div>
                    <div className="open-time ms-3">
                      <div className="text-secondary text-center">
                        Closes at
                      </div>
                      <div className="f-open-time cs-form">
                        <input
                          type="time"
                          className="form-control"
                          value={time.firstClosetime}
                          onChange={(e) => timeHendler(e, "firstClose")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mt-4">
                    <div className="open-time">
                      {/* <div className="text-secondary text-center">Opens at</div> */}
                      <div className="f-open-time cs-form">
                        <input
                          type="time"
                          className="form-control"
                          value={time.secondStartTime}
                          onChange={(e) => timeHendler(e, "secondStart")}
                        />
                      </div>
                    </div>
                    <div className="to text-secondary ms-3 mt-1">to</div>
                    <div className="open-time ms-3">
                      {/* <div className="text-secondary text-center">Closes at</div> */}
                      <div className="f-open-time cs-form">
                        <input
                          type="time"
                          className="form-control"
                          value={time.secondClosetime}
                          onChange={(e) => timeHendler(e, "secondClose")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =======================    Restaurant Open days  ===========================*/}
            <div className="res-detail-box res-open-days-box d-flex justify-content-center mt-4 mb-5">
              <div className="res-detail-width w-75 border p-4">
                <div className="heading">
                  <h4 className="text-dark">Restaurant Open Days</h4>
                  <p className="text-secondary">Uncheck your off-day</p>
                </div>

                <div className="res-detail-width-2 w-75">
                  <div className="row ms-1">
                    <div className="form-check col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6 gy-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="Monday"
                        checked={days.mon === true ? true : false}
                        onChange={() =>
                          setDays((p) => [{ ...p, mon: !days.mon }])
                        }
                      />
                      <label className="form-check-label" htmlFor="Monday">
                        Monday
                      </label>
                    </div>
                    <div className="form-check col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6 gy-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="Tuesday"
                        checked={days.tues === true ? true : false}
                        onChange={() =>
                          setDays((p) => ({ ...p, tues: !days.tues }))
                        }
                      />
                      <label className="form-check-label" htmlFor="Tuesday">
                        Tuesday
                      </label>
                    </div>
                    <div className="form-check col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6 gy-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="Wednesday"
                        checked={days.wed === true ? true : false}
                        onChange={() =>
                          setDays((p) => ({ ...p, wed: !days.wed }))
                        }
                      />
                      <label className="form-check-label" htmlFor="Wednesday">
                        Wednesday
                      </label>
                    </div>
                    <div className="form-check col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6 gy-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="Thursday"
                        checked={days.thurs === true ? true : false}
                        onChange={() =>
                          setDays((p) => ({ ...p, thurs: !days.thurs }))
                        }
                      />
                      <label className="form-check-label" htmlFor="Thursday">
                        Thursday
                      </label>
                    </div>
                    <div className="form-check col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6 gy-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="Friday"
                        checked={days.fri === true ? true : false}
                        onChange={() =>
                          setDays((p) => ({ ...p, fri: !days.fri }))
                        }
                      />
                      <label className="form-check-label" htmlFor="Friday">
                        Friday
                      </label>
                    </div>
                    <div className="form-check col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6 gy-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="Saturday"
                        checked={days.sat === true ? true : false}
                        onChange={() =>
                          setDays((p) => ({ ...p, sat: !days.sat }))
                        }
                      />
                      <label className="form-check-label" htmlFor="Saturday">
                        Saturday
                      </label>
                    </div>
                    <div className="form-check col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6 gy-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="Sunday"
                        checked={days.sun === true ? true : false}
                        onChange={() =>
                          setDays((p) => ({ ...p, sun: !days.sun }))
                        }
                      />
                      <label className="form-check-label" htmlFor="Sunday">
                        Sunday
                      </label>
                    </div>
                  </div>
                </div>
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

export default ResSignUp2;
