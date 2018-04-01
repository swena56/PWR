import React, { Component, PropTypes } from 'react';
import * as PwrActions from './PwrActions';
import { Table } from 'reactstrap';

import { Container, Row, Col } from 'reactstrap';
import { createScrollContainer } from 'react-scroll-view';


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
        this.state = {
            table_data: this.props.table_data,
            sort_dir_is_asc: true,
            column_sort: 'order_id',
        };

        this.getSortDirSymbol = this.getSortDirSymbol.bind(this);
    }

    onClick(index){
        if( this.props.actions ){
            //console.log("Pwr clicked", this.props.actions); 
            this.props.actions.showOrderDetails(index);   
        } else {
            console.log("Actions needs to be passed");
        }
    }

    sortByColumn(column){
        
        //TODO need to properly sort
        this.setState({column_sort: column});
        //check if we have data
        console.log("Sort By Column", column);
        let tmp = this.state.table_data;
        
        this.setState({sort_dir_is_asc: !this.state.sort_dir_is_asc});

        if( column == "order_id" ){
            
            tmp.sort(function(obj1, obj2) {
                if (obj1.order_id < obj2.order_id)
                    return -1;
                  if (obj1.order_id > obj2.order_id)
                    return 1;
                  return 0;
            });

            console.log(this.state.table_data, tmp);
            this.state.table_data = tmp;    
        }

        if( column == "address" ){

            tmp.sort(function(obj1, obj2) {
                // Ascending: first age less than the previous
                return obj2.address - obj1.address;
            });

            console.log(this.state.table_data, tmp);
            this.state.table_data = tmp;    
        }
    }

    getSortDirSymbol(){
        if( this.state.sort_dir_is_asc ){
            return (<span className="glyphicon glyphicon-triangle-bottom"></span>);
        } else {
            return (<span className="glyphicon glyphicon-triangle-top"></span>);
        }


    }


    render() {

    	if( ! this.state.table_data ){
    		return (
            	<div>Need table Data</div>
        	);	
    	}

        var number_orders = 0;
        number_orders = this.state.table_data.length;

        var tax_rate = this.props.tax_rate;
        console.log( "tax_rate", tax_rate);
        return (   
                 <div>
                    
                  <table className="table table-hover table-striped table-condensed table-scrollable" >
                  <thead>
                    <tr>
                        <th onClick={ () => this.sortByColumn('order_id') }>Order Id ({number_orders})  { ( this.state.column_sort == 'order_id' ) ? this.getSortDirSymbol() : null } </th>
                        <th onClick={ () => this.sortByColumn('status') }>Status { ( this.state.column_sort == 'status' ) ? this.getSortDirSymbol() : null } </th>
                        <th onClick={ () => this.sortByColumn('address') }>Address { ( this.state.column_sort == 'address' ) ? this.getSortDirSymbol() : null }</th>
                        <th onClick={ () => this.sortByColumn('price') }>Price { ( this.state.column_sort == 'price' ) ? this.getSortDirSymbol() : null }</th>
                    </tr>

                    </thead>
                    
                    <tbody className="bodycontainer scrollable">
                {
                     
                    this.state.table_data.map(( listValue, index ) => {
                        let stat = "table_status_"+ listValue.status;
            			let tip = null;
            			if( listValue.tip ){
            				tip = (<div>${listValue.tip}</div>)
            			}

                      return (
                        <tr key={index} onClick={ () => this.onClick(index) }>
                          <th scope="row">{listValue.order_id.split("#")[1]}</th>
                          <td> <div className={stat} >{listValue.status}</div><div>{listValue.timestamp}</div></td>
                          <td className="table_column_address">{listValue.address}</td>
                          <td><div><div>${listValue.price}</div>{tip}</div></td>
                        </tr>
                      );
                    })
                     
                }
                </tbody>
                
                </table>
                </div>
        );
    }
}

