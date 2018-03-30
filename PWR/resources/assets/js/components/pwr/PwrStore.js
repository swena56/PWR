import { EventEmitter } from 'events';
import dispatcher from './dispatcher';

class PwrStore extends EventEmitter {
	constructor(props) {
    	super(props);
		this.state = {
			data: {
				table_data: [],
				order_data: [],
				settings: {
					zip_code: '56073'
				},
			},
			view: {	
				loading: true,
				show_order_details: false,
			}
		};
	}

    init(store_id){

    	//TODO check if store_id is valid
    	if( store_id != null ){
    		
    		let that = this;
	    	$.get( "delivery/" + store_id, function( data ) {

	    		//check to make sure logged in
				if( data == "Need to login" ){
					return;
				}    		

		        var results = JSON.parse(data);

		        if( results && results['results']){
		          
		          that.state.data.table_data = results['results'];
		          that.state.view.loading = false;
		          
		          console.log("Table data", results['results'], that);
		          that.emit("change");
		        }
	    	});
    	}
    }

    setOrderDetails(order_id){

    	//tmp data structure
    	var order_data = {};

    	for (var i = this.state.data.table_data.length - 1; i >= 0; i--) {

    		if( order_id == this.state.data.table_data[i]['order_id'] ){
    			//console.log( order_id, this.state.data.table_data[i]['order_id'] );
    			order_data = this.state.data.table_data[i];
    			break;
    		}
    	}

    	console.log("Set order details",this.state.data.table_data['order_id'], order_id );

    	//get from webserver
    	this.state.view.show_order_details = true;
    	this.state.data.order_data = order_data;
    	this.emit("change_order_details");
    }

    getOrderDetails(){
    	if( this.state.view.show_order_details ){
    		return this.state.data.order_data;	
    	} else {
    		return null;
    	}
    	
    }

    isLoading(){
    	return this.state.view.loading;
    }


	getAll(){
		return this.state.data.table_data;	
	}

	handleActions(action){
		console.log("PwrStore: Action", action);
		switch(action.type){
			case "GET_TABLE_DATA":{
				if( action.store_id != null ){
					this.init(action.store_id);	
				}
				break;			
			}

			case "SHOW_ORDER_DETAILS":{
				console.log( "Show SHOW_ORDER_DETAILS");
				this.setOrderDetails(action.order_id);			
				break;
			}

		}
	}
}

const pwrStore  = new PwrStore;
dispatcher.register(pwrStore.handleActions.bind(pwrStore));

//debug
//window.dispatcher = dispatcher;

export default pwrStore;

