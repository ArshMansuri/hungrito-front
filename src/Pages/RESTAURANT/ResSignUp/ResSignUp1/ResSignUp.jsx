import React, { useRef, useEffect, useState } from "react";
import "./resSignUp.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdGpsFixed } from "react-icons/md";
import ResSignUpFooter from "../../../../Components/ResSignUpFooter/ResSignUpFooter";
import {useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import axios from "axios";
import UserOtp from "../../../../Components/UserOtpVerify/UserOtp";
import { useDispatch, useSelector } from "react-redux";
import {
  resMakePhoneOtp,
  resOwnerMakePhoneOtp,
  resOwnerVerifyPhoneOtp,
  resSignUpFirstPage,
  resVerifyPhoneOtp,
} from "../../../../redux/actions/restaurant";
import ResSignUpHeader from "../../../../Components/ResSignUpHeader/ResSignUpHeader";
import Loader from "../../../../Components/Loaders/Loader";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const ResSignUp = ({isRestuAuther, isResLoading=true}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  const [resName, setResName] = useState("");
  const [password, setPassword] = useState("");
  const [resAddress, setResAddress] = useState("");
  const [resComplateAddress, setResComplateAddress] = useState({
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: null,
    latitude: null,
    longitude: null,
  });
  const [resPhone, setResPhone] = useState({ phone: "", isVerify: false });
  const [resOwnerPhone, setResOwnerPhone] = useState({
    phone: "",
    isVerify: false,
  });
  const [resOwnerName, setResOwnerName] = useState("");
  const [resOwnerEmail, setResOwnerEmail] = useState("");

  const [inpAddress, setInpAdress] = useState("");
  const [locatioShow, setLoactionShow] = useState(false);
  const [citys, setCitys] = useState([]);
  const [isResModalShow, setIsResModalShow] = useState(false);
  const [isResOwnerModalShow, setIsResOwnerModalShow] = useState(false);

  const isResPhoneVerify = useSelector(
    (state) => state.restu?.restu?.resPhone?.isVerify || false
  );
  const isResOwnerPhoneVerify = useSelector(
    (state) => state.restu?.restu?.resOwnerPhone?.isVerify || false
  );
  const {restu} = useSelector((state)=> state.restu)
  const MAP_API = "Hah9iiWdUd7fEtqmHB2sgS64Io0qoSmW";

  useEffect(() => {

    if(map.current){
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
          setResComplateAddress({
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

  useEffect(()=>{

    if (restu !== undefined && restu?.resName !== "" && restu.resName !== undefined) {
      navigate(`/res/signup/p2/${restu?.resEmail?.email}`);
    }

    if(restu !== undefined && restu.resName === "" && restu.resName !== undefined){
      if(restu?.resCompletAddress?.latitude !== null){
        setResComplateAddress({   
        address: restu?.resCompletAddress?.address || "",
        country: restu.resCompletAddress?.country || "",
        state: restu?.resCompletAddress?.state || "",
        city: restu?.resCompletAddress?.city || "",
        pincode: restu?.resCompletAddress?.pincode || null,
        latitude: restu?.resCompletAddress?.latitude || null,
        longitude: restu?.resCompletAddress?.longitude || null})
        setInpAdress(restu?.resCompletAddress?.address || "")
      }
      setResAddress(restu?.resAddress || "")
      setResPhone(restu?.resPhone || { phone: "", isVerify: false })
      setResOwnerPhone(restu?.resOwnerPhone || { phone: "", isVerify: false })
      setResOwnerName(restu?.resOwnerName || "")
      setResOwnerEmail(restu?.resOwnerEmail?.email || "")
    }
  }, [restu, navigate ])


  const resLaoctionHendler = async (e) => {
    setResComplateAddress({
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
      setResComplateAddress({
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
    if (isResModalShow === true) {
      setIsResModalShow(value);
    }
    if (isResOwnerModalShow === true) {
      setIsResOwnerModalShow(false);
    }
  }

  const makeResNumOtp = (type) => {
    if (type === "resPhone" && resPhone.phone.trim().length === 10) {
      dispatch(resMakePhoneOtp({ resPhone }));
      setIsResModalShow(true);
    } else if (
      type === "resOwnerPhone" &&
      resOwnerPhone.phone.trim().length === 10
    ) {
      dispatch(resOwnerMakePhoneOtp({ resOwnerPhone }));
      setIsResOwnerModalShow(true);
    }
  };

  const onResNumOtpVerify = (otp) => {
    otp = Number.parseInt(otp);
    if (resPhone.phone.trim().length === 10 && resPhone.isVerify === false) {
      dispatch(resVerifyPhoneOtp({ otp }));
    }
  };

  const onResOwnerNumOtpVerify = (otp) => {
    otp = Number.parseInt(otp);
    if (
      resOwnerPhone.phone.trim().length === 10 &&
      resOwnerPhone.isVerify === false
    ) {
      dispatch(resOwnerVerifyPhoneOtp({ otp }));
    }
  };

  useEffect(() => {
    if (isResPhoneVerify && isResModalShow === true) {
      setResPhone((p) => ({ ...p, isVerify: true }));
      setIsResModalShow(false);
    }

    if (isResOwnerPhoneVerify && isResOwnerModalShow === true) {
      setResOwnerPhone((p) => ({ ...p, isVerify: true }));
      setIsResOwnerModalShow(false);
    }
  }, [
    isResPhoneVerify,
    isResOwnerPhoneVerify,
    isResModalShow,
    isResOwnerModalShow,
  ]);

  const onClickNext = () => {
    if (
      resComplateAddress.address !== "" &&
      resComplateAddress.city !== "" &&
      resComplateAddress.state !== "" &&
      resComplateAddress.latitude !== null &&
      resComplateAddress.longitude !== null &&
      resPhone.phone !== "" &&
      resPhone.isVerify !== false &&
      resOwnerPhone.phone !== "" &&
      resOwnerPhone.isVerify !== false &&
      isResPhoneVerify &&
      isResOwnerPhoneVerify &&
      resName !== "" && password !== ""
    ) {
      const restu = {
        resName,
        password,
        resAddress,
        resComplateAddress,
        resPhone: resPhone.phone,
        resOwnerPhone: resOwnerPhone.phone,
        resOwnerEmail,
        resOwnerName,
      };
      dispatch(resSignUpFirstPage({ restu }));
    } else {
      console.log("eneter all filddddd");
    }
  };

  const onClickBack = () =>{
    console.log("hiiii")
  }

  return (
    <>
      <div className="res-signup-page">
        <ResSignUpHeader />
    {
      isResLoading ? <Loader /> :
      <>
        <div className="res-detail-box d-flex justify-content-center mt-4">
          <div className="res-detail-width w-75 border p-4">
            <div className="heading">
              <h4 className="text-dark">Restaurant details</h4>
              <p className="text-secondary">Name, address and location</p>
            </div>

            <div className="res-detail-width-2 w-75">
              <div className="input-filds">
                <div>
                  <input
                    type="text"
                    placeholder="Restaurant name"
                    className="border w-100 input"
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Restaurant password"
                    className="border w-100 input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  </div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Restaurant complete address"
                    className="border w-100 input"
                    value={resAddress}
                    onChange={(e) => setResAddress(e.target.value)}
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
                      placeholder="Enter your restaurant locality"
                      className="input"
                      value={inpAddress}
                      onChange={resLaoctionHendler}
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
                          value={resComplateAddress?.latitude}
                        />
                      </div>
                      <div className="col-6 longitud-box">
                        <input
                          type="text"
                          placeholder="Longitude"
                          className="border w-100 input"
                          value={resComplateAddress?.longitude}
                        />
                      </div>
                    </div>
                    {resComplateAddress?.city !== "" &&
                    resComplateAddress?.state !== "" &&
                    resComplateAddress?.pincode !== "" ? (
                      <>
                        <div className="row lati-long-box mt-2 gx-xl-5 gx-lg-4 gx-md-3 gx-sm-1 gx-1">
                          <div className="col-6 latitud-box">
                            <input
                              type="text"
                              placeholder="Contry"
                              className="border w-100 input"
                              disabled={true}
                              value={resComplateAddress?.country}
                            />
                          </div>
                          <div className="col-6 longitud-box">
                            <input
                              type="text"
                              placeholder="State"
                              className="border w-100 input"
                              disabled={true}
                              value={resComplateAddress?.state}
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
                              value={resComplateAddress?.city}
                            />
                          </div>
                          <div className="col-6 longitud-box">
                            <input
                              type="text"
                              placeholder="Pincode"
                              className="border w-100 input"
                              disabled={true}
                              value={resComplateAddress?.pincode}
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

        <div className="res-contact-box d-flex justify-content-center mt-4">
          <div className="res-contact-width w-75 border p-4">
            <div className="heading">
              <h4 className="text-dark">Contact number at restaurant</h4>
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
                          placeholder="Mobile number at restaurant"
                          className="w-100 input"
                          value={resPhone?.phone}
                          onChange={(e) =>
                            setResPhone({
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
                          onClick={() => makeResNumOtp("resPhone")}
                          disabled={resPhone.isVerify}
                        >
                          {resPhone.isVerify ? "Verified" : "Verify"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="res-contact-box d-flex justify-content-center mt-4" style={{marginBottom: "70px"}} >
          <div className="res-contact-width w-75 border p-4">
            <div className="heading">
              <h4 className="text-dark">Restaurant owner details</h4>
              <p className="text-secondary">
                These will be used to share revenue related communications
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
                          type="tel"
                          placeholder="Mobile number at restaurant"
                          className="w-100 input"
                          value={resOwnerPhone?.phone}
                          onChange={(e) =>
                            setResOwnerPhone({
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
                          onClick={() => makeResNumOtp("resOwnerPhone")}
                          disabled={resOwnerPhone.isVerify}
                        >
                          {resOwnerPhone.isVerify ? "Verified" : "Verify"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="row w-100 gy-2">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <input
                        type="text"
                        placeholder="Restaurant owner full name"
                        className="border w-100 input"
                        value={resOwnerName}
                        onChange={(e) => setResOwnerName(e.target.value)}
                      />
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <input
                        type="email"
                        placeholder="Restaurant owner email"
                        className="border w-100 input"
                        value={resOwnerEmail}
                        onChange={(e) => setResOwnerEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isResModalShow && (
          <div className="position-absolute w-100 user-otp-modal bottom-0">
            <UserOtp
              onClickClose={onModlaClose}
              onOtpSubmit={onResNumOtpVerify}
              sendOn={resPhone?.phone}
              successUrl="/"
            />
          </div>
        )}
        {isResOwnerModalShow && (
          <div className="position-absolute w-100 user-otp-modal bottom-0">
            <UserOtp
              onClickClose={onModlaClose}
              onOtpSubmit={onResOwnerNumOtpVerify}
              sendOn={resOwnerPhone?.phone}
              successUrl="/"
            />
          </div>
        )}
        <div className="res-signup-footer position-fixed bottom-0 start-0 end-0">
          <ResSignUpFooter goBack={true} onClickNext={onClickNext} onClickBack={onClickBack} />
        </div>
        </>
    }
      </div>
    </>
  );
};

export default ResSignUp;
