import React from "react";
import "./table.css";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Table = ({ data, columns, isAdd = false, url = "/" }) => {
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
    gotoPage,
    setGlobalFilter,
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

   return function TableHOC() {
    return (
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="d-flex align-items-center justify-content-between ">
            <div>
              <span>Search: </span>
              <input
                type="text"
                className="table-input px-2"
                value={globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>
            {isAdd && (
              <NavLink
                to={url}
                className="rounded-circle d-fle justify-content-center align-items-center"
                style={{ color: "#FF5B5B", border: "1px solid #FF5B5B" }}
              >
                <IoMdAdd size={26} />
              </NavLink>
            )}
          </div>
        </div>
        <div className="card-body w-100 overflow-scroll">
          <div className="table-responsive" style={{ width: "max-content" }}>
            <table
              className="table table-bordered align-middle text-center table-striped table-hover"
              id="dataTable"
              width="100%"
              cellSpacing="0"
              {...getTableProps()}
            >
              <thead className="text-secondary" >
                {headerGroups.map((h) => (
                  <tr {...h.getHeaderGroupProps()}>
                    {h.headers.map((header) => (
                      <th className="text-center"
                        {...header.getHeaderProps(
                          header.getSortByToggleProps()
                        )}
                        style={{fontWeight: "500", width: '140px', cursor: 'pointer'}}
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
                {headerGroups.map((h) => (
                  <tr {...h.getHeaderGroupProps()}>
                    {h.headers.map((header) => (
                      <th className="text-center"
                        {...header.getHeaderProps(
                          header.getSortByToggleProps()
                        )}
                        style={{fontWeight: "500"}}
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
              </tfoot>
              <tbody className="order-list-table-body" {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps() }>
                      {row.cells.map((cell) => (
                        <td className="align-center" {...cell.getCellProps()} style={{height: '70px'}} >{
                          // cell.value.length < 20 ? (cell.render("Cell")) : cell.render("Cell")
                          // console.log(cell.value.length, cell.value)
                          cell.value.length === undefined  ? cell.render("Cell") :cell.value.length < 20 ? (cell.render("Cell")) : (cell.value.slice(0, 20) + '...')
                        }</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer bg-white py-3">
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
  }()
};

export default Table;
