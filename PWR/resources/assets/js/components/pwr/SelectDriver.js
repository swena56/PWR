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
        drivers: null,
        store_id: this.props.store_id,
        actions: this.props.actions,
    };
    
    //console.log( "Drivers: ", this.props.drivers );
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
  }
  componentDidMount(){

      if( this.state.store_id ){
        var that = this;
          $.ajax({
                type: "GET",
                url: '/get-drivers',
                data: { store_id: this.state.store_id },
                success: function (data) {
                   if(data != undefined){
                        let items = JSON.parse(data);
                        that.setState({ drivers: items });

                      }
                },
                error: function (data, textStatus, errorThrown) {
                    console.log("Error");
                },
            });
    }
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

      let value = event.currentTarget.innerHTML;

      if( value == "All"){
         
         this.setState({active_driver: null});
         this.state.actions.setDriver(null);

         toast("No driver set!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: css({
            background: "black"
          })
        });
        return;
      }

      var driver = this.state.drivers.filter(function(d) {
          return d.driver === value
      })[0];
      
      if( driver  ){

          this.setState({active_driver: driver});
          console.log( driver,this.state.actions);
          this.state.actions.setDriver(driver.driver);
           toast("Set Driver: " + driver.driver, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: css({
              background: "black"
            })
          });
      }
  }

  render() {

    let dropDownItems = [];
    if( this.state.drivers == null ){
         return (
          <div>
          <InputGroup>
              <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                <DropdownToggle caret>
                  Select Driver
                </DropdownToggle>
              </InputGroupButtonDropdown>
          </InputGroup>
          </div>
        );
    }

    if( this.state.drivers && this.state.drivers.length ){

      for (var i = this.state.drivers.length - 1; i >= 0; i--) {

        if( this.state.drivers[i] && this.state.drivers[i].driver != " ()" ){
          dropDownItems.push(<DropdownItem key={i} onClick={ (event) => this.setDriver(event) } >{this.state.drivers[i].driver}</DropdownItem>  );  
        }
      }
    }

    return (
      <div>
      <ToastContainer />
      <InputGroup>
          <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
            <DropdownToggle caret>
              { ( this.state.active_driver != null && this.state.active_driver['driver'] != null ) ? this.state.active_driver.driver : "Select Driver" }
            </DropdownToggle>
            <DropdownMenu>
              {dropDownItems}
              <DropdownItem divider />
              <DropdownItem onClick={ (event) => this.setDriver(event) } >All</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
      </InputGroup>
      </div>
    );
  }
}
