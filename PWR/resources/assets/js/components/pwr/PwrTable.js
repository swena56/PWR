import React, { Component, PropTypes } from 'react';
import * as PwrActions from './PwrActions';

import './Table.css';
// CSR:"Mallory  (8779)"
// address"1217 N SPRING ST"
// created_atnull
// description"1 P12IPAZA Pepperoni↵1 12SCREEN↵1 12SCREEN Pepperoni↵1 20BCOKE↵"
// driver"DEREK (7649)"
// order_id"2018-03-28#348085"
// phone"5077667066"
// price"24.25"
// service"Phone"
// source"Delivery"
// status"Complete"
// store_id"1953"
// timestamp"3/28/2018 16 PM"
// tip:''

export default class PwrTable extends Component {

    constructor(props) {
        super(props);
    }

    onClick(order_id){
        if( this.props.actions ){
            //console.log("Pwr clicked", this.props.actions); 
            this.props.actions.showOrderDetails(order_id);   
        } else {
            console.log("Actions needs to be passed");
        }
    }

    render() {

    	if( ! this.props.table_data ){
    		return (
            	<div>Need table Data</div>
        	);	
    	}

        return (
            <div>
                  <table className="paleBlueRows">
                  <thead>
                    <tr>
                    <th>order_id</th>
                    <th>Status</th>
                    <th>Address</th>
                    </tr>
                </thead>
                {
                    this.props.table_data.map(( listValue, index ) => {
                  return (
                    <tr key={index} onClick={ () => this.onClick(listValue.order_id) }>
                      <td>{listValue.order_id}</td>
                      <td>{listValue.status}</td>
                      <td>{listValue.address}</td>
                    </tr>
                  );
                })
                }
                </table>
            </div>
        );
    }
}
