import React from 'react';
import ReactDOM from 'react-dom';

import PwrStore from './PwrStore';
import * as PwrActions from './PwrActions';

import PwrTable from './PwrTable';
import OrderDetails from './OrderDetails/OrderDetails';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class Pwr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         table_data: [],
         order_data: null,
         toggle_popup: false,
    };

    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount(){
      PwrStore.on("change", () => {
        this.setState({
          table_data: PwrStore.getAll(),
        });
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
      PwrActions.getTableData(1953);
  }

  render() {

    if( PwrStore.isLoading() ){
      return(
        <div>Loading..</div>
      );
    }

    var order_form = null;
    if( this.state.order_data != null ){

      order_form = (
        <Modal isOpen={this.state.toggle_popup} className={this.props.className}>
          <ModalHeader toggle={this.closeModal}>Order Details</ModalHeader>
          <ModalBody>
            <OrderDetails actions={PwrActions} />
          </ModalBody>
        </Modal>
      );

       order_form = (
            <OrderDetails order_data={this.state.order_data} store={PwrStore} />
      );

    }

    return (
      <div>

            {order_form}
            <PwrTable table_data={this.state.table_data} actions={PwrActions} />
      </div>
    );
  }
}

if (document.getElementById('pwr')) {
    ReactDOM.render(<Pwr />, document.getElementById('pwr'));
}
