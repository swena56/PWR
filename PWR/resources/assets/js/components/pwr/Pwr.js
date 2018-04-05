import React from 'react';
import ReactDOM from 'react-dom';

import PwrStore from './PwrStore';
import * as PwrActions from './PwrActions';

import PwrTable from './PwrTable';
import OrderDetails from './OrderDetails/OrderDetails';
import DatePicker from 'react-datepicker';

import {
    Input, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row,
} from 'reactstrap';

import moment from 'moment';
import SelectDriver from './SelectDriver';
import DriverSummary from './DriverSummary';
import SearchFilter from './SearchFilter';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';

export default class Pwr extends React.Component {
  constructor(props) {
    super(props);

    var date = moment();

    if( date.hours() < 7 ){
      date = date.subtract(1, "days");
    }

    this.state = {
         table_data: [],
         order_data: null,
         toggle_popup: false,
         startDate: date,
         drivers: null,
    };

    this.closeModal = this.closeModal.bind(this);
    this.dateChange = this.dateChange.bind(this);
  }
 
  componentWillMount(){
      PwrStore.on("change", () => {
        this.setState({
          table_data: PwrStore.getAll(),
          drivers: PwrStore.getDrivers(),
        });

        console.log( this.state.table_data );
      });

      PwrStore.on("change_order_details", () => {
        this.setState({
          order_data: PwrStore.getOrderDetails(),
          toggle_popup: true,
        });
      });
  }

  closeModal(){
     this.setState({
      toggle_popup: !this.state.toggle_popup
    });
  }

  componentDidMount() {

      PwrActions.getTableData(1953,this.state.startDate);
      //this.dateChange(moment());
  }

 dateChange(date){
      console.log(date);
      
      this.setState({
        startDate: date
      });

      PwrActions.setDate(date);
      PwrActions.getTableData(1953,date);
  }
 
  render() {

    if( PwrStore.needsLogin() ){
         window.location.replace("/login");
    }

    // if( PwrStore.isLoading() ){
    //   return(
    //     <div>Loading..</div>
    //   );
    // }

    var order_form = null;
    if( this.state.order_data != null ){

       order_form = (
            <OrderDetails order_data={this.state.order_data} store={PwrStore} />
      );
    } 
    
    return (
      <div> 
            <Row>
            <Col>
              <DatePicker
                      todayButton={"Today"}
                      selected={this.state.startDate}
                      onChange={this.dateChange}
                      dateFormat="YYYY-MM-DD"
                      dayClassName={date => date.date() < Math.random() * 31 ? 'available_date' : undefined}
                  />
              </Col>
              <Col>
                <SelectDriver drivers={this.state.drivers} store_id={ PwrStore.getStoreId() } actions={PwrActions} />
              </Col>
            </Row>
            <Row>
              <Col>
                <DriverSummary driver={PwrStore.getDriver()} />
              </Col>

            </Row>
            
            {order_form}
            
            {
              ( PwrStore.isLoading() ) ? (<div> Table Loading </div>): (<PwrTable table_data={PwrStore.getAll()} tax_rate={PwrStore.getTaxRate()} actions={PwrActions} />)

            }
      </div>
    );
  }
}

if (document.getElementById('pwr')) {
    ReactDOM.render(<Pwr />, document.getElementById('pwr'));
}
