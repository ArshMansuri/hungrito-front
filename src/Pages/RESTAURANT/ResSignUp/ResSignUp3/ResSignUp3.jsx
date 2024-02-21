import React, { useEffect, useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { GiCancel } from "react-icons/gi";
import "./resSignUp3.css";
import ResSignUpFooter from "../../../../Components/ResSignUpFooter/ResSignUpFooter";
import { useDispatch, useSelector } from "react-redux";
import { removeResType } from "../../../../redux/slice/restaurant";
import { resSignUpThirdPage } from "../../../../redux/actions/restaurant";
import { useNavigate } from "react-router-dom";
import ResSignUpHeader from "../../../../Components/ResSignUpHeader/ResSignUpHeader";
import Loader from "../../../../Components/Loaders/Loader";

const ResSignUp3 = ({isRestuAuther, isResLoading=true}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()  

  const imgRef = useRef();

  const [img, setImg] = useState("");
  const [isOffer, setIsOffer] = useState(false);
  const [offer, setOffer] = useState("");

  const { restu } = useSelector((state) => state.restu);

  useEffect(() => {
    if (
      restu !== undefined &&
      restu?.resFoodImage !== undefined &&
      restu?.resFoodImage?.publicUrl !== undefined &&
      restu?.resFoodImage?.publicUrl !== ""
    ) {
      return navigate('/')
    }
  }, [restu, navigate]);

  const openImgDilog = () => {
    if (imgRef.current) {
      imgRef.current.value = null;
      imgRef.current.click();
    }
  };

  const imgHendler = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImg(Reader.result);
      }
    };
  };

  const onClickNext = () => {
    if (img !== "" && img !== undefined) {
      const restu = {
        img,
        isOffer,
        offer,
      };
      if (isOffer) {
        if (offer !== "") {
          dispatch(resSignUpThirdPage({ restu }));
        } else {
          console.log("enter offer fild");
        }
      } else {
        dispatch(resSignUpThirdPage({ restu }));
      }
    } else {
      console.log("eneter all fild");
    }
  };

  const onClickBack = () => {
    dispatch(removeResType());
  };

  return (
    <>
      <div className="res-signup-page">

        <ResSignUpHeader />

        {/* =======================    Restaurant Food Image  ===========================*/}
        {
          isResLoading ? <Loader /> :
        <>
        <div className="res-detail-box d-flex justify-content-center mt-4">
          <div className="res-detail-width w-75 border p-4">
            <div className="heading">
              <h4 className="text-dark">Restaurant Food</h4>
              <p className="text-secondary">
                Upload Your Restaurant's Best Food Image
              </p>
            </div>

            <div className="res-detail-width-2 w-75">
              <div className="border img-div d-flex justify-content-center align-items-center position-relative">
                <img
                  src={img}
                  className={`${img !== "" ? "d-block" : "d-none"}`}
                  width={"100%"}
                  height={"230px"}
                  alt=""
                />
                {img === "" ? (
                  <LuImagePlus size={25} onClick={openImgDilog} />
                ) : (
                  <div className="position-absolute cancel-btn">
                    <GiCancel size={20} onClick={() => setImg("")} />
                  </div>
                )}
              </div>
            </div>

            <input
              type="file"
              name="img"
              id="img"
              className="d-none"
              onChange={imgHendler}
              ref={imgRef}
            />
            <div className="mt-3">
              <label
                className="form-check-label cursor-not-allowed"
                htmlFor={"isOffer"}
              >
                {"Any Offer From Your Restaurant"}
              </label>
              <input
                className="form-check-input cursor-pointer ms-3"
                type="checkbox"
                value="true"
                id={"isOffer"}
                checked={isOffer}
                onChange={() => {
                  setIsOffer(!isOffer);
                }}
              />
            </div>
            <div className="res-detail-width-2 w-75">
              <div className="input-filds">
                {isOffer !== undefined && isOffer ? (
                  <div>
                    <input
                      type="text"
                      placeholder="What Offer?"
                      className={`border w-100 input`}
                      value={offer}
                      onChange={(e) => setOffer(e.target.value)}
                    />
                  </div>
                ) : (
                  <></>
                )}
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
        }
      </div>
    </>
  );
};

export default ResSignUp3;
