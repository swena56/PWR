import React, {Component} from 'react';

import { 
  Form,  FormFeedback, FormText,
  FormGroup, Label, InputGroup, 
  InputGroupAddon, InputGroupText, Input, 
  Button } from 'reactstrap';

import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Tooltip } from 'reactstrap';
import './OrderDetails.css';
import PhoneNumber from './PhoneNumber';
import Map from '../Maps/Map';

import * as PwrActions from '../PwrActions';

export default class OrderDetails extends Component{
     constructor(props){
          super(props);

          let price = ( parseFloat(this.props.order_data.price) * .07875 ) + parseFloat(this.props.order_data.price);
          price = Math.round(price * 100 ) / 100;


          this.state= {
               uri: this.props.uri,
               loading:true,

               //data
               text: '',
               total: price + this.props.order_data.tip ,
               price: price,
               tax: ( this.props.order_data.price * .07875 ),
               tip: this.props.order_data.tip || '',
               notes: this.props.order_data.notes || '',
               store_id: this.props.store_id || '',
               modal: true,
               nestedModal: false,
               closeAll: false
          }


          //console.log(this.props.order_data);
          //console.log(this.props.store.getOrderDetails());

          //console.log( props);
          this.toggle = this.toggle.bind(this);
          //this.save = this.save.bind(this);
          this.navigate = this.navigate.bind(this);
           this.toggleNested = this.toggleNested.bind(this);
          this.toggleAll = this.toggleAll.bind(this);
     }

    toggle() {

      this.setState({
        modal: !this.state.modal
      });
      
      PwrActions.showOrderDetails(null);
    }

    toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

    onChange(event){
        
        //event.preventDefault();

        var updateWhat = event.target.placeholder;
        console.log( event.target );
        if( updateWhat == "Tip" ){ 
          this.setState({tip: event.target.value });
        }
        if( updateWhat == "Price" ){ 
          this.setState({price: event.target.value });
        }
        if( updateWhat == "Notes" ){ 
          this.setState({notes: event.target.value });
        }
        if( updateWhat == "Total" ){ 

          let total = event.target.value;

          this.setState({total: total });
          let price = this.props.order_data.price;
          console.log( "Updating Total: ", total, price,  isNaN(total),isNaN(price));

          if( isNaN(total) == false && isNaN(price) == false ){

            let tip = total - price;
            tip = Math.round( tip * 100 ) / 100;

            console.log( "Valid total and price: ", total, price, tip);
            //if total is larger than price, set the tip
            
            this.setState({tip: tip });  
          }
          
          
        };

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
             <Modal isOpen={this.state.modal} className={this.props.className} toggle={this.toggle} backdrop={true}>
              <ModalHeader toggle={this.toggle}>Order Details - {id}
              
              </ModalHeader>
              <ModalBody>

               <div>
                   
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">Order Id</InputGroupAddon>
                      <Input placeholder="XXXXXX" value={this.props.order_data.order_id || ''}/>
                    </InputGroup>
                    
                    <br />
                    
                    <InputGroup>
                      <InputGroupAddon id="TooltipExample" addonType="prepend">
                        Tip
                      </InputGroupAddon>

                      { 
                        ( this.state.tip ) ?
                        ( <Input valid onChange={ (e) => this.onChange(e) } value={this.state.tip} placeholder="Tip" /> ) 
                        :
                        ( <Input invalid onChange={ (e) => this.onChange(e) } value={this.state.tip} placeholder="Tip" /> ) 
                      }
                      
                      
                      <InputGroupAddon addonType="prepend">Price</InputGroupAddon>
                      <Input placeholder="Price" value={this.state.price} />

                      <InputGroupAddon addonType="prepend">Total</InputGroupAddon>
                      <Input placeholder="Total" onChange={ (e) => this.onChange(e) } value={this.state.total||''} />
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
                      <InputGroupAddon addonType="append"  >
                        <Button color="info" id="navigateButton" onClick={() => this.navigate() }>
                          Navigate
                        </Button>
                      </InputGroupAddon>
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
                      
                      
                      <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                        <ModalHeader>{this.props.order_data.address}</ModalHeader>
                        <ModalBody>
                          <Map />
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={this.toggleNested}>Done</Button>{' '}
                        </ModalFooter>
                      </Modal>
                      
                      <br />
                      
                      <div className="float-left">
                        <Button color="info" onClick={this.navigate}>
                          Navigate
                        </Button>&nbsp;
                        <Button  color="info">Phone</Button>
                        &nbsp;
                        <Button color="success" onClick={this.toggleNested}>Show Map</Button>
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
