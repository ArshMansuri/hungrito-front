import React, { useState } from "react";
import "./filter.css";
import { FaBowlFood } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Filters = () => {
  const [filters, setFilters] = useState([
    { id: 1, name: "Afgan" },
    { id: 2, name: "Rating 4.0+" },
    { id: 3, name: "Pure Veg" },
    { id: 4, name: "Pure Veg" },
    { id: 5, name: "Pure Veg" },
  ]);
  const [selectedFilter, setSelectedFIlter] = useState([]);

  const onSelectFilter = (name) => {
    if (selectedFilter.some((item) => item.name === name)) {
      console.log("have");
      const tempFilters = selectedFilter.filter((item) => item.name !== name);
      setSelectedFIlter(tempFilters);
      setFilters((p) => [{ id: 100 + filters.length, name: name }, ...p]);
    } else {
      console.log("not have");
      setSelectedFIlter((p) => [
        ...p,
        { id: selectedFilter.length, name: name },
      ]);
      const tempFilter = filters.filter((item) => item.name !== name);
      setFilters(tempFilter);
    }
  };

  return (
    <div className="filter-com h-100 d-flex align-items-center ms-xl-5 ms-lg-5 ms-md-5 ms-sm-1 ms-1 w-100">
      <div className="d-flex align-items-center">
        <div className="main-filter filter d-flex align-items-center justify-content-start border border-secondary py-2 px-2 mx-1">
            {
                selectedFilter.length > 0 ?
                <div className="no-of-filter d-flex justify-content-center align-items-center rounded-circle">
                {selectedFilter.length}
              </div> : <></>
            }
          <div className={`filter-text d-flex align-items-center ${selectedFilter.length> 0 ? 'ps-1' : ''}`}>
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
                key={val.id}
                id={val.id}
                onClick={() => onSelectFilter(val.name)}
              >
                <div className={`filter-text px-1 d-flex align-items-center`}>
                  {val.name}
                </div>
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
                key={val.id}
                id={val.id}
                onClick={() => onSelectFilter(val.name)}
              >
                <div className={`filter-text px-1 d-flex align-items-center`}>
                  {val.name}
                </div>
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
