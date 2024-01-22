import React, { useState } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import "./myCartBox.css";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQutInCart, increaseQutInCart, removeFromCart } from "../../redux/actions/user";
import { decreaseMyCartDetail, incresseMyCartDetail, updateMyCartDetail } from "../../redux/slice/user";

const MyCartBox = ({
  img="",name,price,subtotal,qut,foodId,resId
}) => {

  const dispatch = useDispatch()
  const [foodQut, setFoodQut] = useState(qut)

  const isIncrementLoading = useSelector((state)=> state.increaseQutInCart?.isLoading)
  const isDecrementLoading = useSelector((state)=> state.decreaseQutInCart?.isLoading)

  const removeCartHendler = () =>{
    const foodInfo={
      foodId, resId
    }
    dispatch(removeFromCart({foodInfo}))
    dispatch(updateMyCartDetail({...foodInfo, foodPrice: price, foodQut}))
  }

  const qutIncrementHendler = () =>{
    if(foodQut < 10 && !isDecrementLoading && !isIncrementLoading){
      const foodInfo={
        foodId, resId
      }
      dispatch(increaseQutInCart({foodInfo}))
      dispatch(incresseMyCartDetail({...foodInfo, foodPrice: price}))
      setFoodQut(foodQut+1)
    }
  }

  const qutDecrementHendler = () =>{
    if(foodQut > 0 && !isDecrementLoading && !isIncrementLoading){
      const foodInfo={
        foodId, resId
      }
      dispatch(decreaseQutInCart({foodInfo}))
      dispatch(decreaseMyCartDetail({...foodInfo,foodPrice: price}))
      setFoodQut(foodQut-1)
    }
  }

  return (
    <div className="my-cart-div d-flex px-2 my-3">
      <div className="img-div d-flex justify-content-center align-items-center">
        <img
          src={img}
          alt=""
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            height: "auto",
            width: "auto",
          }}
        />
      </div>
      <div className="d-flex flex-column w-100 ps-3">
        <div className="remove-icon text-end">
          <MdDeleteForever size={18} color="grey" className="cursor-pointer" onClick={removeCartHendler} />
        </div>
        <div className="food-name">{name}</div>
        <div className="food-price text-secondary">₹{price}/item</div>
        <div className="sub-total-all-btns-div d-flex justify-content-between align-items-center">
          <div className="sub-total">₹{subtotal}</div>
          <div className="cart-btn d-flex p-1 justify-content-between align-items-center">
            <button className="remove-icon cursor-pointer border-0 bg-transparent" onClick={qutDecrementHendler}>
              <IoMdRemove />
            </button>
            <div className="px-2">{foodQut}</div>
            <button className="add-icon cursor-pointer border-0 bg-transparent" onClick={qutIncrementHendler}>
              <IoMdAdd />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCartBox;
