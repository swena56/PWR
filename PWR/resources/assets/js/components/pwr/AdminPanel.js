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

export default class AdminPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      users: null,
    };

    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount(){
    this.getUsers();
  }

  updateUser(event){

    //event.preventDefault();
    let user_id = event.target.id;
    let admin_status = event.target.value;

    let users = this.state.users;
    users[user_id].admin = ( admin_status == "on" ) ? 0: 1;
    
    this.setState({users:users})
  }

  getUsers(){

    let that = this;
     $.ajax({
                type: "GET",
                url: '/get-users',
                data: {},
                success: function (data) {
                   if(data != undefined){
                        let items = JSON.parse(data);
                        that.setState({ users: items });
                        console.log("Got users stats: ", items);
                      }
                },
                error: function (data, textStatus, errorThrown) {
                    console.log("Error");
                },
            });  
  }

  render() {

    if( this.state.users == null ){
      return (<div> No User data </div>);
    }

    let users = [];
    for (var i = this.state.users.length - 1; i >= 0; i--) {

      let isAdmin = this.state.users[i].admin;
      let toggle = null;
      if( isAdmin == 1 ){
        toggle = (<div>Admin<Input id={i} onClick={this.updateUser} type="checkbox" value="on" checked /></div>);
      } else {
        toggle = (<div>Admin<Input id={i} onClick={this.updateUser} type="checkbox" value="off"/></div>);
      }

      users.push(
        <ListGroupItem key={i} >
          <div>{this.state.users[i].name}
           
            {toggle}
             </div>
        </ListGroupItem>
      );
    }
    

    return (
      <div>
          
          <ListGroup>
            {users}
          </ListGroup>
      </div>
    );
  }
}

if (document.getElementById('admin')) {
    ReactDOM.render(<AdminPanel />, document.getElementById('admin'));
}
