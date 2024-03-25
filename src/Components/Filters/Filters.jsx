import React, { useEffect, useState } from "react";
import "./filter.css";
import { FaBowlFood } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Filters = () => {
  const { filters: allFilter } = useSelector((state) => state.nearestRestus);

  const [filters, setFilters] = useState(undefined);
  const [selectedFilter, setSelectedFIlter] = useState([]);

  useEffect(() => {
    setFilters(allFilter);
  }, [allFilter]);


  const onSelectFilter = (fId, type, name, access) => {
    const index = selectedFilter.findIndex((obj)=> obj?._id.toString() === fId.toString())
    if(index === -1){
      const newFilIndex = filters.findIndex((obj)=> obj._id.toString() === fId.toString())
      setSelectedFIlter([...selectedFilter, filters[newFilIndex]])
      let tempFIlters = [...filters]
      tempFIlters.splice(newFilIndex, 1)
      setFilters([...tempFIlters])
    } else {
      let tempSelectedFilters = [...selectedFilter]
      const removeFilter = tempSelectedFilters.splice(index,1)
      setSelectedFIlter([...tempSelectedFilters])
      setFilters([...filters, ...removeFilter])
    }
  };

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
