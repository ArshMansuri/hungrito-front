import React from "react";
import "./table.css";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useTable, useSortBy, usePagination, useGlobalFilter } from "react-table";
import { BiSortDown, BiSortUp } from "react-icons/bi";

const Table = ({data, columns}) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        state,
        pageCount,
        gotoPage,setGlobalFilter
      } = useTable(
        {
          columns,
          data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
      );
      const { globalFilter } = state;

  return (
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <div className="d-flex align-items-center justify-content-xl-end justify-content-lg-end justify-content-md-end justify-content-sm-center  justify-content-center">
          <div>
            <span>Search: </span>
            <input
              type="text"
              className="table-input px-2"
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div class="card-body w-100 overflow-scroll">
        <div class="table-responsive" style={{ width: "max-content" }}>
          <table
            class="table table-bordered"
            id="dataTable"
            width="100%"
            cellspacing="0"
            {...getTableProps()}
          >
            <thead className="text-secondary">
              {headerGroups.map((h) => (
                <tr {...h.getHeaderGroupProps()}>
                  {h.headers.map((header) => (
                    <th
                      {...header.getHeaderProps(header.getSortByToggleProps())}
                    >
                      {header.render("Headers")}
                      {header.isSorted ? (
                        <span>
                          {" "}
                          {header.isSortedDesc ? (
                            <BiSortDown />
                          ) : (
                            <BiSortUp />
                          )}{" "}
                        </span>
                      ) : (
                        <> </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tfoot className="text-secondary">
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
                <th>Salary</th>
              </tr>
            </tfoot>
            <tbody className="order-list-table-body" {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-footer bg-white py-3">
        <div className="d-flex align-items-center justify-content-center">
          <div className="mx-2">
            <button
              className="first-btn all-btn border-0"
              onClick={() => gotoPage(0)}
            >
              First
            </button>
          </div>
          <div className="mx-2">
            <button
              disabled={!canPreviousPage}
              className="all-btn border-0 d-flex justify-content-center align-items-center"
              onClick={previousPage}
            >
              <GrFormPrevious size={20} />
            </button>
          </div>
          <div className="mx-2">
            {/* <button className="all-btn border-0">1</button> */}
            <span>
              {state?.pageIndex + 1 || 1} of {pageCount}
            </span>
          </div>
          <div className="mx-2">
            <button
              disabled={!canNextPage}
              className="all-btn border-0 d-flex justify-content-center align-items-center"
              onClick={nextPage}
            >
              <GrFormNext color="#FF5B5B" size={20} />
            </button>
          </div>
          <div className="mx-2">
            <button
              className="last-btn all-btn border-0"
              onClick={() => gotoPage(pageCount - 1)}
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
