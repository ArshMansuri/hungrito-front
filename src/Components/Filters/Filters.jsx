import React, { useEffect, useState } from "react";
import "./filter.css";
import { FaBowlFood } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getNearestRestus } from "../../redux/actions/user";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const Filters = ({userLocation}) => {

  const [filters, setFilters] = useState(undefined);
  const [selectedFilter, setSelectedFIlter] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData(){
      try {
        const {data} = await axios.get(`${BASE_URL}/api/v1/user/all/filters`, {withCredentials: true})
        if(data !== undefined && data.success === true){
          setFilters(data?.filters || [])
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, []);

  useEffect(()=>{
    try {
      const location={
        longitude: userLocation?.lan || 72.591759,
        latitude: userLocation?.lat || 23.01451
      }
      if(selectedFilter !== undefined && selectedFilter.length > 0){
      
        let category = undefined
        let price = undefined
        let veg = undefined
        const categoryIndex = selectedFilter.findIndex((obj)=>obj.type === 'category')
        const priceIndex = selectedFilter.findIndex((obj)=>obj.type === 'range')
        const vegIndex = selectedFilter.findIndex((obj)=>obj.type === 'veg-non')
        if(categoryIndex !== -1){
          category = selectedFilter[categoryIndex]
        }
        if(priceIndex !== -1){
          price = selectedFilter[priceIndex]
        }
        if(vegIndex !== -1){
          veg = selectedFilter[vegIndex]
        }
        // const data = {}
        console.log(category)
        dispatch(getNearestRestus({location, category, price, veg}))
      } else {
        dispatch(getNearestRestus({location}))
      }
    } catch (error) {
      
    }
  }, [selectedFilter])


  const onSelectFilter = (fId, type, name, access) => {
    const index = selectedFilter.findIndex((obj)=> obj?._id.toString() === fId.toString())
    if(index === -1){
      const newFilIndex = filters.findIndex((obj)=> obj._id.toString() === fId.toString())
      setSelectedFIlter([...selectedFilter, filters[newFilIndex]])
      let tempFIlters = [...filters]
      tempFIlters.splice(newFilIndex, 1)
      console.log(tempFIlters, "tempppp")
      setFilters(tempFIlters)
    } else {
      let tempSelectedFilters = [...selectedFilter]
      const removeFilter = tempSelectedFilters.splice(index,1)
      setSelectedFIlter([...tempSelectedFilters])
      setFilters([...filters, ...removeFilter])
    }
  };

  // const onSetFilter = async(fId)=>{
  //   const newFilIndex = filters.findIndex((obj)=> obj._id.toString() === fId.toString())
  //   setSelectedFIlter([...selectedFilter, filters[newFilIndex]])
  //   let tempFIlters = [...filters]
  //   tempFIlters.splice(newFilIndex, 1)
  //   setFilters([...tempFIlters])
  // }

  return (
    <div className="filter-com h-100 d-flex align-items-center ms-xl-5 ms-lg-5 ms-md-5 ms-sm-1 ms-1 w-100">
      <div className="d-flex align-items-center">
        <div className="main-filter filter d-flex align-items-center justify-content-start border border-secondary py-2 px-2 mx-1">
          {selectedFilter.length > 0 ? (
            <div className="no-of-filter d-flex justify-content-center align-items-center rounded-circle">
              {selectedFilter.length}
            </div>
          ) : (
            <></>
          )}
          <div
            className={`filter-text d-flex align-items-center ${
              selectedFilter.length > 0 ? "ps-1" : ""
            }`}
          >
            Filters
          </div>
          <div className="filter-icon ps-1 d-flex align-items-center">
            <FaBowlFood size={16} />
          </div>
        </div>

        {selectedFilter !== undefined && selectedFilter.length > 0 ? (
          selectedFilter.map((val, index) => {
            return (
              <div
                className="filter d-flex align-items-center justify-content-start p-2 mx-1 selected-filter"
                key={val._id}
                id={val._id}
                onClick={() => onSelectFilter(val?._id, val?.type, val?.name, val?.access)}
              >
                {val?.type === "range" ? (
                  <div className={`filter-text px-1 d-flex align-items-center`}>
                    {val?.access === "less"
                      ? `Less than Rs. ${val?.name}`
                      : `More than Rs. ${val?.name}`}
                  </div>
                ) : (
                  <div className={`filter-text px-1 d-flex align-items-center`}>
                    {val.name}
                  </div>
                )}
                {/* <div className={`filter-text px-1 d-flex align-items-center`}>
                  {val.name}
                </div> */}
                <div className="filter-icon ps-1 d-flex align-items-center">
                  <IoMdClose size={20} />
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}

        {filters !== undefined && filters.length > 0 ? (
          filters.map((val, index) => {
            return (
              <div
                className="filter d-flex align-items-center justify-content-start border border-secondary p-2 mx-1"
                key={val._id}
                id={val._id}
                onClick={() => onSelectFilter(val?._id, val?.type, val?.name, val?.access)}
              >
                {val?.type === "range" ? (
                  <div className={`filter-text px-1 d-flex align-items-center`}>
                    {val?.access === "less"
                      ? `Less than Rs. ${val?.name}`
                      : `More than Rs. ${val?.name}`}
                  </div>
                ) : (
                  <div className={`filter-text px-1 d-flex align-items-center`}>
                    {val.name}
                  </div>
                )}
                {/* <div className={`filter-text px-1 d-flex align-items-center`}>
                  {val.name}
                </div> */}
                {/* <div className="filter-icon ps-1 d-flex align-items-center">
                  <IoMdClose size={20} />
                </div> */}
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Filters;
