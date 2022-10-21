import React,{useEffect} from "react";
import axios from "axios";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useAsyncDebounce,
  useFilters,
  useRowSelect,
} from "react-table";

// A great library for fuzzy filtering/sorting items
import { Table, Input, Label } from "reactstrap";
import { Button, Form } from "react-bootstrap";

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <Form.Group className="mb-0">
      <Form.Control
        onClick={(e) => e.stopPropagation()}
        type="search"
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      ></Form.Control>
    </Form.Group>
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <Input
      type="select"
      value={filterValue}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </Input>
  );
}


function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

//Select check box
const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);
  
      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} style={{transform: 'scale(1.3)'}}/>
        </>
      );
    }
  );

function TableStudent({ columns, data, selectedRows, setSelectedRows, handleOpenAdd, handleOpenDelete }) {
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );
  const props = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns
      ]);
    }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, globalFilter, selectedRowIds },
  } = props;
  
    useEffect(() => {
        setSelectedRows(selectedFlatRows.map(row => row.original.id));
    }, [setSelectedRows, selectedFlatRows]);
    
   
  return (
    <>
    <div className="d-flex align-items-center justify-content-between pb-3">
        <div className="mr-3 d-flex align-items-center">
        <Label className="mb-0" style={{marginRight: '5px'}}><b>Search: </b> </Label>
          <Input
            type="search"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            style={{width: '300px'}}
          />
        </div>
        <div>
          <Button
              className="btn-fill"
              variant="primary"
              style={{ minWidth: "140px", margin: '0 10px' }}
              onClick={handleOpenAdd}
          >
              <i className="fas fa-plus" style={{marginRight: '5px'}}></i>
              Add students 
          </Button>

          <Button
              className="btn-fill"
              variant="danger" 
              style={{ minWidth: "140px" }}
              onClick={handleOpenDelete}
          >
              <i className="fas fa-trash" style={{marginRight: '5px'}}></i>
              Delete {selectedRows.length} 
          </Button>
      </div>
    </div>
      <style>{`
      td,tr,th{
        text-align: center;
        border: none;
      }
      `}</style>
      <Table bordered striped hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps(), {
                  style: { minWidth: column.minWidth, width: column.width },
                })}>
                  <div
                    className="heading"
                    style={{
                      fontSize: "14px",
                      textTransform: "uppercase",
                      color: "black",
                      fontWeight: "bold",
                      borderTop: "none!important",
                      borderBottom: "none",
                      textAlign: "center"
                    }}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </div>
                  {/* Render the columns filter UI */}

                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps({
                      style: {
                        minWidth: cell.column.minWidth,
                        width: cell.column.width,
                      },
                    })}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="pagination d-flex align-items-center justify-content-center">
        <Button
          style={{marginRight: '10px'}}
          className="btn-fill mr-3 btn-sm"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </Button>
        <Button
          style={{marginRight: '10px'}}
          className="btn-fill mr-3 btn-sm"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </Button>
        <Button
          style={{marginRight: '10px'}}
          className="btn-fill mr-3 btn-sm"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </Button>
        <Button
          style={{marginRight: '10px'}}
          className="btn-fill mr-5 btn-sm"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </Button>
        <span className="mr-3 ml-5" style={{marginRight: '10px'}}>
          Page: 
          <strong>
            { pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span className="mr-3" > Go to page: </span>
        <Input
          type="number"
          className="mr-3"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          style={{ width: "100px", marginRight: '10px' }}
        />
        <div className="">
          <Input
            type="select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Input>
        </div>
      </div>
      <br />
    </>
  );
}

export {DefaultColumnFilter, SelectColumnFilter}
export default TableStudent;
