import React, {Component} from 'react';

import { 
  FormGroup, Label, InputGroup, 
  InputGroupAddon, InputGroupText, Input, 
  Button } from 'reactstrap';

import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Tooltip } from 'reactstrap';

import PhoneNumber from './PhoneNumber';

import * as PwrActions from '../PwrActions';

export default class OrderDetails extends Component{
     constructor(props){
          super(props);

          this.state= {
               uri: this.props.uri,
               loading:true,

               //data
               text: '',
               
               tip: this.props.order_data.tip,
               notes: this.props.order_data.notes || '',
               store_id: this.props.store_id || '',
               modal: true,
          }


          //console.log(this.props.order_data);
          //console.log(this.props.store.getOrderDetails());

          //console.log( props);
          this.toggle = this.toggle.bind(this);
          //this.save = this.save.bind(this);
          this.navigate = this.navigate.bind(this);
     }

    toggle() {

      this.setState({
        modal: !this.state.modal
      });
      
      PwrActions.showOrderDetails(null);
    }

    onChange(event){
        
        event.preventDefault();

        var updateWhat = event.target.placeholder;

        if( updateWhat == "Tip" ){ this.state.tip = event.target.value };
        if( updateWhat == "Price" ){ this.state.price = event.target.value };
        if( updateWhat == "Address" ){ this.state.address = event.target.value };
        if( updateWhat == "Phone" ){ this.state.phone = event.target.value };

        console.log("OrderDetails change", event.target.value);
    }

    navigate(){
      //https://tomchentw.github.io/react-google-maps/
      console.log("Navigate");

      var address = this.props.order_data.address;
      var url = "https://www.google.com/maps/dir/?api=1&destination=" + address;
      
      //if android do this
      //url = "google.navigation:q="+ address;
      var win = window.open(url, '_blank');
      win.focus();

    }

     renderLoadingView(){
          return(
               <div style={{justifyContent:'center',alignItems:'center',flex:1}}>
                   
                    Loading...
               </div>
          );
     }

     save(event){
          console.log( "Save clicked", event );
        PwrActions.updateDelivery(this.props.order_data.store_id, this.props.order_data.order_id, this.state.tip, this.state.notes);
        this.toggle();
     } 

     renderLoadedView(){

          var id = this.props.order_data.order_id.split("#")[1]
          return(
             <Modal isOpen={this.state.modal} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Order Details - {id}</ModalHeader>
              <ModalBody>
               <div>
          
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">Order Id</InputGroupAddon>
                      <Input placeholder="XXXXXX" value={this.props.order_data.order_id || ''}/>
                    </InputGroup>
                    
                    <br />
                    
                    <InputGroup>
                      <InputGroupAddon id="TooltipExample" addonType="prepend">
                        $
                      </InputGroupAddon>
                      <Input onChange={ (e) => this.onChange(e) } value={this.state.tip} placeholder="Tip" type="number" />
                      <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                      <Input placeholder="Price" type="number" value={this.props.order_data.price || ''} />
                    </InputGroup>

                    <br />

                    <PhoneNumber value={this.props.order_data.phone} />

                    <br />

                    <InputGroup>
                      <InputGroupAddon addonType="prepend">Time</InputGroupAddon>
                      <Input placeholder="Timestamp" value={this.props.order_data.timestamp || ''} disabled/>
                    </InputGroup>
                    
                    <br />

                     <InputGroup>
                      <InputGroupAddon addonType="prepend">Status</InputGroupAddon>
                      <Input placeholder="Status" value={this.props.order_data.status || ''} disabled />
                    </InputGroup>

                    <br />

                     <InputGroup>
                      <InputGroupAddon addonType="prepend">Address</InputGroupAddon>
                      <Input placeholder="Address" value={this.props.order_data.address || ''} />
                    </InputGroup>

                     <br />

                     <FormGroup>
                        <Label for="exampleSelectMulti">Select Multiple</Label>
                        <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    
                    <FormGroup>
                        <Label for="exampleText">Notes</Label>
                        <Input type="textarea" name="text" id="exampleText" value={this.props.order_data.notes || ''} />
                      </FormGroup>

                      <div className="float-left">
                        <Button color="info" onClick={this.navigate}>
                          Navigate
                        </Button>&nbsp;
                        <Button  color="info">Phone</Button>
                      </div>

                      <div className="float-right">
                        <Button onClick={this.toggle} color="danger">Cancel</Button>&nbsp;
                        <Button onClick={ (e) => this.save(e) } color="success" id="saveButton" >
                          Submit
                        </Button>
                      </div>
               </div>
               </ModalBody>
        </Modal>
          );
     }

     fetchData(){
          if( this.state.url != null ){

               fetch(this.state.uri)
                    .then((response) => response.json())
                    .then((result)=>{

                    })
               .done();

               this.setState({
                         loading:false
               });
               this.renderLoadedView();

               } else {
                    console.log("Order details: Need url for component");
                   
               }
     }

     componentDidMount(){
          this.fetchData();
     }

     render(){
          if(!this.state.loading){
               return(
                    this.renderLoadingView()
               );
          }

          else{

               return(
                    this.renderLoadedView()
               );
          }
     }
}
