import React from 'react';
import ReactDOM from 'react-dom';
import {
    InputGroup, Label,
    ListGroup, ListGroupItem,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupDropdown,
    Input, Modal, ModalHeader, ModalBody, ModalFooter,
    Button, ButtonGroup, FormGroup, 
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { ToastContainer, toast } from "react-toastify";
import { css } from 'glamor';
import UsersTable from './UsersTable';

export default class AdminPanel extends React.Component {

  

  render() {

    return (
      <div>
          <UsersTable  />
      </div>
    );
  }
}

if (document.getElementById('admin')) {
    ReactDOM.render(<AdminPanel />, document.getElementById('admin'));
}
