import React from "react";
import { makeOrderData, Logo, Tips } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const onRowClick = (state, rowInfo, column, instance) => {
    return {
        onClick: e => {
            console.log('A Td Element was clicked!')
            console.log('it produced this event:', e)
            console.log('It was in this column:', column)
            console.log('It was in this row:', rowInfo)
            var data = rowInfo.original;
            console.log('It was in this table instance:', instance)
        }
    }
}


export default class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeOrderData()
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          getTrProps={onRowClick}
          columns={[
            {
              Header: "Order Id",
              columns: [
                {Header: "Order Id", accessor: "order_id"},
                {Header: "Address", accessor: "address"} 
              ]
            },
            {
              Header: "Info",
              columns: [
                {Header: "Status", accessor: "status"} ,
                {Header: "Price", accessor: "price"}
                ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}
