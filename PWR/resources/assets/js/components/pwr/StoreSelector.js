import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class StoreSelector extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      selected_index: 0,
      stores: [
        {store_id: 1907, city: 'Minnetonka' },
        {store_id: 1953, city: 'New Ulm' },
      ]
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  selectStore(event){

    //console.log( "Selected Store: ", this.state.stores[event.target.value].store_id );
    this.setState({selected_index: event.target.value});

    //set active store in PwrStore
    this.props.actions.getTableData(this.state.stores[event.target.value].store_id);
  }

  render() {

    var store_options = [];

    for (var i = this.state.stores.length - 1; i >= 0; i--) {
      store_options.push(
        <DropdownItem key={i} value={i} onClick={(event) => this.selectStore(event) }>
          {this.state.stores[i].store_id} - {this.state.stores[i].city} 
        </DropdownItem>
      );
    }

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.state.stores[this.state.selected_index].store_id} - {this.state.stores[this.state.selected_index].city}
        </DropdownToggle>
        <DropdownMenu>
          {store_options}
        </DropdownMenu>
      </Dropdown>
    );
  }
}