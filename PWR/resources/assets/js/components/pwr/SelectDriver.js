import React from 'react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupDropdown,
    Input, Modal, ModalHeader, ModalBody, ModalFooter,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { ToastContainer, toast } from "react-toastify";
import { css } from 'glamor';
import PwrActions from './PwrActions';


export default class SelectDriver extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
        dropdownOpen: false,
        splitButtonOpen: false,
        active_driver: null,
        drivers: this.props.drivers
    };
    
    console.log( "Drivers: ", this.props.drivers );
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
  }
  

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }

  setDriver(event){

      event.preventDefault();

      let value = event.currentTarget.value;

      if( value == "All"){
         
         this.setState({active_driver: null});
         this.props.actions.setDriver({driver:null});

         toast("No driver set!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: css({
            background: "black"
          })
        });
        return;
      }

      var driver = this.props.store.getDrivers().filter(function(d) {
          return d.driver === value
      })[0];
      
      if( driver  ){
          this.setState({active_driver: driver});
          this.props.actions.setDriver(driver.driver);

           toast("Set Driver: " + driver.driver, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: css({
              background: "black"
            })
          });
      }
  }

  render() {

    if( ! this.props.store ){
      return (<div> Need Store </div>);
    }
    var drivers = this.props.store.getDrivers();
    let dropDownItems = [];
    
    if( drivers == null || this.props.store.isLoading({type:'drivers'}) ){
      drivers = null;
      return (<InputGroup>
              <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                <DropdownToggle caret>
                  Select Driver
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem >Loading Drivers</DropdownItem>
                </DropdownMenu>
              </InputGroupButtonDropdown>
          </InputGroup>
      );
    }

    return (
      <div>
      <ToastContainer />
          
      <InputGroup>
          <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
            <DropdownToggle caret>
              { this.props.store.getDriver() || "Select Driver" }
            </DropdownToggle>
            <DropdownMenu>

              {
                  drivers.map(( d, index ) => {
                    if( d.driver != " ()" ){

                      var count = this.props.store.getOrderCountForDriver(d.driver);
                      if( count == 0 ){
                        return (
                          <DropdownItem disabled key={index} >{d.driver} - ({count})</DropdownItem>
                        );
                      } else {
                        return (
                          <DropdownItem key={index} value={d.driver} onClick={ (event) => this.setDriver(event) } >{d.driver} - ({count})</DropdownItem>
                        );  
                      }
                     }
                  })
              }
              
              <DropdownItem divider />
              <DropdownItem onClick={ (event) => this.setDriver(event) } >All</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
      </InputGroup>
      </div>
    );
  }
}
