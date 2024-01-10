import React from "react";
import "./orderList.css";
import Table from "../../../Components/Table/Table";
import Loader from "../../../Components/Loaders/Loader";

const data = [
  {
    Name: "Tiger Nixon",
    Position: "System Architec",
    Office: "Edinburgh",
    Age: "60",
    Start_date: "2011/04/25",
    Salary: "$320,800",
  },
  {
    Name: "Tiger Nixon",
    Position: "System Architec",
    Office: "Edinburgh",
    Age: "61",
    Start_date: "2011/04/25",
    Salary: "$20,800",
  },
  {
    Name: "Arsh Nixon",
    Position: "System Architec",
    Office: "Edinburgh",
    Age: "61",
    Start_date: "2011/04/25",
    Salary: "$120,800",
  },
  {
    Name: "Tiger Nixon",
    Position: "Kuchbhi Architec",
    Office: "Edinburgh",
    Age: "98",
    Start_date: "2011/04/25",
    Salary: "$30,800",
  },
  {
    Name: "Tiger Nixon",
    Position: "System Good",
    Office: "Edinburgh",
    Age: "18",
    Start_date: "2011/04/25",
    Salary: "$620,800",
  },
  {
    Name: "Tiger Nixon",
    Position: "System Architec",
    Office: "Edinburgh",
    Age: "60",
    Start_date: "2011/04/25",
    Salary: "$320,800",
  },
  {
    Name: "Tiger Nixon",
    Position: "System Architec",
    Office: "Edinburgh",
    Age: "61",
    Start_date: "2011/04/25",
    Salary: "$20,800",
  },
  {
    Name: "Tiger Nixon",
    Position: "System Architec",
    Office: "Edinburgh",
    Age: "61",
    Start_date: "2011/04/25",
    Salary: "$120,800",
  },
  {
    Name: "Tiger Nixon",
    Position: "System Architec",
    Office: "Edinburgh",
    Age: "98",
    Start_date: "2011/04/25",
    Salary: "$30,800",
  },
  {
    Name: "Tiger Nixon",
    Position: "System Architec",
    Office: "Edinburgh",
    Age: "18",
    Start_date: "2011/04/25",
    Salary: "$620,800",
  },
  {
    Name: "Tiger Nixon",
    Position: "System Architec",
    Office: "Edinburgh",
    Age: "60",
    Start_date: "2011/04/25",
    Salary: "$320,800",
  },
  {
    Name: "Tiger Nixon",
    Position: "System Architec",
    Office: "Edinburgh",
    Age: "61",
    Start_date: "2011/04/25",
    Salary: "$20,800",
  },
  {
    Name: "Tiger Nixon",
    Position: "System Architec",
    Office: "Edinburgh",
    Age: "61",
    Start_date: "2011/04/25",
    Salary: "$120,800",
  },
  {
    Name: "Tiger Nixon",
    Position: "System Architec",
    Office: "Edinburgh",
    Age: "98",
    Start_date: "2011/04/25",
    Salary: "$30,800",
  },
  {
    Name: "Konho Nixon",
    Position: "System Architec",
    Office: "Edinburgh",
    Age: "18",
    Start_date: "2011/04/25",
    Salary: "$620,800",
  },
];

const columns = [
  {
    Headers: "Name",
    accessor: "Name",
  },
  {
    Headers: "Position",
    accessor: "Position",
  },
  {
    Headers: "Office",
    accessor: "Office",
  },
  {
    Headers: "Age",
    accessor: "Age",
  },
  {
    Headers: "Start_date",
    accessor: "Start_date",
  },
  {
    Headers: "Salary",
    accessor: "Salary",
  },
];

const OrderList = ({isRestuAuther, isResLoading}) => {
 
  return (
    <>
    {
      isResLoading ? <Loader  /> :
    <div className="order-list-table">
      <Table data={data} columns={columns} />
    </div>
    }
    </>
  );
};

export default OrderList;
