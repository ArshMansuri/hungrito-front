import React, { useEffect, useRef, useState } from "react";
import ResSignUpHeader from "../../../../Components/ResSignUpHeader/ResSignUpHeader";
import "./dbSignUp.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdGpsFixed } from "react-icons/md";
import ResSignUpFooter from "../../../../Components/ResSignUpFooter/ResSignUpFooter";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import axios from "axios";
import UserOtp from "../../../../Components/UserOtpVerify/UserOtp";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Components/Loaders/Loader";
import { dbMakePhoneOtp, dbSignUpFirstPage, dbVerifyPhoneOtp } from "../../../../redux/actions/delBoy";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const DbSignUp = ({isDbAuther=undefined, isDbLoading=true}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  const [dbName, setDbName] = useState("");
  const [password, setPassword] = useState("");
  const [dbAddress, setDbAddress] = useState("");
  const [dbComplateAddress, setDbComplateAddress] = useState({
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: null,
    latitude: null,
    longitude: null,
  });
  const [dbPhone, setDbPhone] = useState({ phone: "", isVerify: false });

  const [inpAddress, setInpAdress] = useState("");
  const [locatioShow, setLoactionShow] = useState(false);
  const [citys, setCitys] = useState([]);
  const [isDbModalShow, setIsDbModalShow] = useState(false);

  const isDbPhoneVerify = useSelector(
    (state) => state.delBoy?.delBoy?.dbPhone?.isVerify || false
  );
  const { delBoy } = useSelector((state) => state.delBoy);

  const MAP_API = "Hah9iiWdUd7fEtqmHB2sgS64Io0qoSmW";

  useEffect(() => {
    if (map.current) {
      map.current.off();
      map.current.remove();
      map.current = null;
    }

    if (mapContainer.current && !map.current) {
      map.current = L.map(mapContainer.current).setView(
        [23.03108310471535, 72.5736169583829],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map.current);

      map.current.on("click", async (event) => {
        const { lat, lng } = event.latlng;

        // Remove previous marker if exists
        if (marker.current) {
          map.current.removeLayer(marker.current);
        }

        // Set marker on the clicked location
        marker.current = L.marker([lat, lng]).addTo(map.current);
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
          );
          setInpAdress(response.data.display_name || "Address not found");
          setDbComplateAddress({
            address: response.data.display_name,
            country: response?.data?.address?.country,
            state: response?.data?.address?.state,
            city:
              response?.data?.address?.city ||
              response?.data?.address?.town ||
              response?.data?.address?.suburb,
            pincode: response?.data?.address?.postcode,
            latitude: lat,
            longitude: lng,
          });
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      });
    }
    return () => {
      // Remove the map instance and event listeners when the component is unmounted
      if (map.current) {
        map.current.off();
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapContainer, map, marker, mapContainer.current]);

  useEffect(() => {
    if (
      delBoy !== undefined &&
      delBoy?.dbName !== "" &&
      delBoy.dbName !== undefined
    ) {
      navigate(`/db/signup/p2/${delBoy?.dbEmail?.email}`);
    }

    if (
      delBoy !== undefined &&
      delBoy.dbName === "" &&
      delBoy.dbName !== undefined
    ) {
      if (delBoy?.dbComplateAddress?.latitude !== null) {
        setDbComplateAddress({
          address: delBoy?.dbComplateAddress?.address || "",
          country: delBoy.dbComplateAddress?.country || "",
          state: delBoy?.dbComplateAddress?.state || "",
          city: delBoy?.dbComplateAddress?.city || "",
          pincode: delBoy?.dbComplateAddress?.pincode || null,
          latitude: delBoy?.dbComplateAddress?.latitude || null,
          longitude: delBoy?.dbComplateAddress?.longitude || null,
        });
        setInpAdress(delBoy?.dbComplateAddress?.address || "");
      }
      setDbAddress(delBoy?.dbAddress || "");
      setDbPhone(delBoy?.dbPhone || { phone: "", isVerify: false });
    }
  }, [delBoy, navigate]);

  useEffect(() => {
    if (isDbPhoneVerify && isDbModalShow === true) {
      setDbPhone((p) => ({ ...p, isVerify: true }));
      setIsDbModalShow(false);
    }
  }, [
    isDbPhoneVerify,
    isDbModalShow,
  ]);


  // {/* =============== user click on location div from location popup =============== */}
  const onSetLocation = async (e) => {
    let index = e.currentTarget.id;
    setInpAdress(citys[index].address || "");
    setLoactionShow(false);
    if (citys[index].lat !== 0 && citys[index].lan !== undefined) {
      // Remove old marker if exists
      if (marker.current) {
        map.current.removeLayer(marker.current);
      }
      marker.current = L.marker([
        citys[index]?.lat || 0,
        citys[index]?.lan || 0,
      ]).addTo(map.current);
      map.current.setView([citys[index]?.lat || 0, citys[index]?.lan || 0], 14);
      setCitys([]);
      setDbComplateAddress({
        address: "",
        country: "",
        state: "",
        city: "",
        pincode: null,
        latitude: citys[index]?.lat || null,
        longitude: citys[index]?.lan || null,
      });
    }
  };

  function onModlaClose(value) {
    if (isDbModalShow === true) {
      setIsDbModalShow(value);
    }
  }

  const makeDbNumOtp = () => {
    if (dbPhone.phone.trim().length === 10) {
      dispatch(dbMakePhoneOtp({ dbPhone }));
      setIsDbModalShow(true);
    }
  };

  const dbLaoctionHendler = async (e) => {
    setDbComplateAddress({
      address: "",
      country: "",
      state: "",
      city: "",
      pincode: null,
      latitude: null,
      longitude: null,
    });

    setInpAdress(e.target.value);
    if (e.target.value.trim().length > 2) {
      setLoactionShow(true);
      try {
        const url = `https://api.tomtom.com/search/2/search/${e.target.value.trim()}.json?key=${MAP_API}&countrySet=IN&limit=5`;
        const data = await axios.get(url);
        setCitys([]);
        let temCitys = [];
        for (let i = 0; i < data?.data?.results?.length; i++) {
          const newCity = {
            address: data?.data?.results[i]?.address?.freeformAddress || "",
            subText:
              data?.data?.results[i]?.address?.countrySubdivisionName +
              " " +
              data?.data?.results[i]?.address?.country,
            lat: data?.data?.results[i]?.position?.lat || 0,
            lan: data?.data?.results[i]?.position?.lon || 0,
          };
          temCitys.push(newCity);
        }
        setCitys(temCitys);
      } catch (error) {
        console.log(error);
        setLoactionShow(false);
      }
    } else {
      setLoactionShow(false);
    }
  };

  const onDbNumOtpVerify = (otp) => {
    otp = Number.parseInt(otp);
    if (dbPhone.phone.trim().length === 10 && dbPhone.isVerify === false) {
        dispatch(dbVerifyPhoneOtp({ otp }));
    }
  };

  const onClickNext = () => {
    if (
      dbComplateAddress.address !== "" &&
      dbComplateAddress.city !== "" &&
      dbComplateAddress.state !== "" &&
      dbComplateAddress.latitude !== null &&
      dbComplateAddress.longitude !== null &&
      dbPhone.phone !== "" &&
      dbPhone.isVerify !== false &&
      isDbPhoneVerify &&
      dbName !== "" &&
      password !== ""
    ) {
      console.log("hmmm");
      const delBoy = {
        dbName,
        password,
        dbAddress,
        dbComplateAddress,
        dbPhone: dbPhone.phone,
      };
        dispatch(dbSignUpFirstPage({ delBoy }));
    } else {
      console.log("eneter all filddddd");
    }
  };

  const onClickBack = () => {
    console.log("hiiii");
  };

  return (
    <div className="res-signup-page">
      <ResSignUpHeader text={"job"} />
      {
        isDbLoading ? (
          <Loader />
        ) :
      <>
        <div className="res-detail-box d-flex justify-content-center mt-4">
          <div className="res-detail-width w-75 border p-4">
            <div className="heading">
              <h4 className="text-dark">Delivery Boy details</h4>
              <p className="text-secondary">Name, address and location</p>
            </div>

            <div className="res-detail-width-2 w-75">
              <div className="input-filds">
                <div>
                  <input
                    type="text"
                    placeholder="Delivery boy name"
                    className="border w-100 input"
                    value={dbName}
                    onChange={(e) => setDbName(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Delivery boy password"
                    className="border w-100 input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Delivery boy complete address"
                    className="border w-100 input"
                    value={dbAddress}
                    onChange={(e) => setDbAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="res-address mt-4">
                <div className="res-address-info">
                  <h5 className="text-dark">
                    Please select accurately location in the map
                  </h5>
                  <p>This will help delivry boy to locate your store</p>
                </div>
                <div>
                  <div className="address-input-box border w-100 d-flex align-items-center position-relative">
                    <div className="serach-logo pe-0 ps-2">
                      <IoSearchOutline size="22px" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your home locality"
                      className="input"
                      value={inpAddress}
                      onChange={dbLaoctionHendler}
                    />
                    <div className="gps-icon-btn border-start ps-2 d-flex align-items-center">
                      <MdGpsFixed />
                      <p className="text-secondary mb-0 ps-1">Detect</p>
                    </div>
                    {locatioShow && (
                      <div className="position-absolute border w-100 bg-white suggetion-pop-up">
                        <div className="position-relative cursor-pointer">
                          {citys.length > 0 && citys !== undefined ? (
                            citys.map((c, index) => {
                              return (
                                <div
                                  key={String(index)}
                                  id={index}
                                  className="position-relative cursor-pointer"
                                  onClick={onSetLocation}
                                >
                                  <div className="ms-4">
                                    <div>{c.address}</div>
                                    <div>{c.subText}</div>
                                  </div>
                                  <hr className="bg-secondary" />
                                </div>
                              );
                            })
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-100 res-address-map mt-3">
                    <div
                      ref={mapContainer}
                      style={{
                        width: "100%",
                        height: "100%",
                        zIndex: `${citys.length > 0 ? "-10" : 0}`,
                      }}
                    />
                  </div>

                  <div className="mt-3">
                    <div className="row">
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-0 col-0 d-xl-block d-lg-block d-md-block d-sm-none d-none">
                        <hr className="bg-secondary border border-1 border-secondary" />
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 text-center">
                        or directly enter the co-ordinates
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-0 col-0 d-xl-block d-lg-block d-md-block d-sm-none d-none">
                        <hr className="bg-secondary bg-secondary border border-1 border-secondary" />
                      </div>
                    </div>

                    <div className="row lati-long-box mt-3 gx-xl-5 gx-lg-4 gx-md-3 gx-sm-1 gx-1">
                      <div className="col-6 latitud-box">
                        <input
                          type="text"
                          placeholder="Latitud"
                          className="border w-100 input"
                          value={dbComplateAddress?.latitude}
                        />
                      </div>
                      <div className="col-6 longitud-box">
                        <input
                          type="text"
                          placeholder="Longitude"
                          className="border w-100 input"
                          value={dbComplateAddress?.longitude}
                        />
                      </div>
                    </div>
                    {dbComplateAddress?.city !== "" &&
                    dbComplateAddress?.state !== "" &&
                    dbComplateAddress?.pincode !== "" ? (
                      <>
                        <div className="row lati-long-box mt-2 gx-xl-5 gx-lg-4 gx-md-3 gx-sm-1 gx-1">
                          <div className="col-6 latitud-box">
                            <input
                              type="text"
                              placeholder="Contry"
                              className="border w-100 input"
                              disabled={true}
                              value={dbComplateAddress?.country}
                            />
                          </div>
                          <div className="col-6 longitud-box">
                            <input
                              type="text"
                              placeholder="State"
                              className="border w-100 input"
                              disabled={true}
                              value={dbComplateAddress?.state}
                            />
                          </div>
                        </div>
                        <div className="row lati-long-box mt-2 gx-xl-5 gx-lg-4 gx-md-3 gx-sm-1 gx-1">
                          <div className="col-6 latitud-box">
                            <input
                              type="text"
                              placeholder="City"
                              className="border w-100 input"
                              disabled={true}
                              value={dbComplateAddress?.city}
                            />
                          </div>
                          <div className="col-6 longitud-box">
                            <input
                              type="text"
                              placeholder="Pincode"
                              className="border w-100 input"
                              disabled={true}
                              value={dbComplateAddress?.pincode}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="res-contact-box d-flex justify-content-center mt-4"
          style={{ marginBottom: "70px" }}
        >
          <div className="res-contact-width w-75 border p-4">
            <div className="heading">
              <h4 className="text-dark">Contact number</h4>
              <p className="text-secondary">
                Your customers will call on this number for general enquiries
              </p>
            </div>

            <div className="res-contact-width-2 w-75">
              <div className="input-filds">
                <div className="contact-input-box w-100">
                  <div className="row w-100 gy-3">
                    <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">
                      <div className="w-100 border contact-box-main d-flex align-items-center">
                        <div className="ps-2 +91-text">+91</div>
                        <input
                          type="text"
                          placeholder="Mobile number of delivery boy"
                          className="w-100 input"
                          value={dbPhone?.phone}
                          onChange={(e) =>
                            setDbPhone({
                              phone: e.target.value,
                              isVerify: false,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div className="w-100">
                        <button
                          onClick={makeDbNumOtp}
                          disabled={dbPhone.isVerify}
                        >
                          {dbPhone.isVerify ? "Verified" : "Verify"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isDbModalShow && (
          <div className="position-absolute w-100 user-otp-modal bottom-0">
            <UserOtp
              onClickClose={onModlaClose}
              onOtpSubmit={onDbNumOtpVerify}
              sendOn={dbPhone?.phone}
              successUrl="/"
            />
          </div>
        )}
        <div className="res-signup-footer position-fixed bottom-0 start-0 end-0">
          <ResSignUpFooter
            goBack={true}
            onClickNext={onClickNext}
            onClickBack={onClickBack}
          />
        </div>
      </>
      }
    </div>
  );
};

export default DbSignUp;
