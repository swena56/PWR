import { EventEmitter } from 'events';
import dispatcher from './dispatcher';
import moment from 'moment';

class PwrStore extends EventEmitter {
	constructor(props) {
    	super(props);
		this.state = {
			data: {
				table_data: null,
				order_data: null,
				drivers: [],
				settings: {
					driver: null,
					zip_code: '56073',
					start_date: moment(),
					store_id: 1953,
					tax_rate: .07875,
				},
			},
			loading:{
				drivers: true,
			},
			view: {	
				loading: true,
				needs_login: false,
				show_order_details: false,
			}
		};
	}



    init(store_id, date, driver = null ){

    	//TODO check if store_id is valid
    	if( store_id != null && date != null ){
    		
    		let that = this;
    		var date_str = date.format("YYYY-MM-DD");

			 // $.ajax({
			 //      type: "GET",
			 //      url: 'get-drivers',
			 //      data: { store_id: store_id, driver: driver },
			 //      success: function (data) {
			 //        that.state.data.drivers = data;
			 //        that.state.loading.drivers = false;
			 //      },
			 //      error: function (data, textStatus, errorThrown) {
			 //          console.log(data);
			 //      },

			 //  });

			  $.ajax({
			      type: "GET",
			      url: 'delivery',
			      data: { store_id: store_id, date: date_str, driver: driver },
			      success: function (data) {
			       //check to make sure logged in
					if( data == "Need to login" ){
						console.log("Need to login");
						that.state.view.needs_login = true;
						that.emit("change");
						return;
					}    		

			        var results = JSON.parse(data);

			        if( results && results['results']){
			          
			          that.state.data.table_data = results['results'];
			          that.state.view.loading = false;
			          
			          //console.log("Table data", results['results'], that);
			          that.emit("change");
			        }
			      },
			      error: function (data, textStatus, errorThrown) {
			          console.log(data);
			      },

			  });

	   //  	$.get( "delivery/" + store_id + "/" + date_str, function( data ) {

	   //  		//check to make sure logged in
				// if( data == "Need to login" ){
				// 	console.log("Need to login");
				// 	that.state.view.needs_login = true;
				// 	that.emit("change");
				// 	return;
				// }    		

		  //       var results = JSON.parse(data);

		  //       if( results && results['results']){
		          
		  //         that.state.data.table_data = results['results'];
		  //         that.state.view.loading = false;
		          
		  //         //console.log("Table data", results['results'], that);
		  //         that.emit("change");
		  //       }
	   //  	});
    	}
    }

    getDriver(){
    	return this.state.data.settings.driver;
    }

    getTaxRate(){
    	return this.state.data.settings.tax_rate;
    }

    getStoreId(){
    	return this.state.data.settings.store_id;
    }

    setOrderDetails(index){

    	if( index != null ){
    		//tmp data structure
	    	var order_data = {};
	    	order_data = this.state.data.table_data[index];
	    	// for (var i = this.state.data.table_data.length - 1; i >= 0; i--) {

	    	// 	if( order_id == this.state.data.table_data[i]['order_id'] ){
	    	// 		//console.log( order_id, this.state.data.table_data[i]['order_id'] );
	    	// 		order_data = this.state.data.table_data[i];
	    	// 		break;
	    	// 	}
	    	// }

	    	console.log("Set order details",this.state.data.table_data[index], index );

	    	//get from webserver
	    	this.state.view.show_order_details = true;
	    	this.state.data.order_data = order_data;
    	} else {
    		this.state.view.show_order_details = false;
    		this.state.data.order_data = null;
    	}
    	
    	this.emit("change_order_details");
    }

    getOrderDetails(){
    		return this.state.data.order_data;	
    }

    getDate(){
    	return this.state.data.settings.start_date;
    }

    updateDelivery(store_id, order_id,tip, notes){

    	let that = this;
		  $.ajax({
			    type: "GET",
			    url: 'order-details-update',
			    data: { store_id: store_id, order_id: order_id, tip: tip, notes: notes },
			    success: function (data) {
			    	console.log("PwrStore: Update", data);
			    	window.location.reload();
			  //   	that.state.data.table_data = null;
					// that.state.view.loading = true;
					// that.getDrivers(that.state.data.settings.store_id);
					// that.init(that.state.data.settings.store_id, that.state.data.settings.start_date);	
			    	that.emit("change");
			    },
			    error: function (data, textStatus, errorThrown) {
			        console.log(data);

			    },
			});
    }

    getDrivers(check){

    	if( check ){
    		return this.state.loading.drivers;
    	}

    	return this.state.data.drivers;
    }
   

    dateChange(date){
      console.log(date);
      this.state.data.settings.start_date = date;
  	}

    needsLogin(){
    	return this.state.view.needs_login;
    }

    isLoading(){
    	return this.state.view.loading;
    }

    toggleLoading(){
    	this.state.view.loading = true;
    	this.emit("change");
    }

	getAll(){
		return this.state.data.table_data;	
	}

	handleActions(action){
		console.log("PwrStore: Action", action);
		switch(action.type){

			case "REFRESH":{
				this.state.data.table_data = null;
				this.state.view.loading = true;
				this.getDrivers(this.state.data.settings.store_id);
				this.emit("change");
				this.init(this.state.data.settings.store_id, this.state.data.settings.start_date);	
				break;			
			}

			case "GET_TABLE_DATA":{
				if( action.store_id != null && action.date != null ){
					this.state.data.table_data = null;
					this.state.view.loading = true;
					this.getDrivers(action.store_id);
					this.emit("change");
					this.init(action.store_id, action.date);	
				}
				break;			
			}

			case "SHOW_ORDER_DETAILS":{
				console.log( "Show SHOW_ORDER_DETAILS");

				if( action.order_id != null ){
					
					this.setOrderDetails(action.order_id);
				} else {
					this.setOrderDetails(null);
				}
				break;
			}

			case "SET_DATE":{
				

				if( action.date != null ){
					console.log( "SET_DATE", action.date );
					this.dateChange(action.date);
				} else {
					console.log( "SET_DATE - missing date");
				}
				break;
			}

			case "UPDATE":{
				
				if( action.order_id && action.store_id ){
					console.log( "UPDATE", action );
					this.updateDelivery(action.store_id, action.order_id,action.tip, action.notes);

				} else {
					console.log( "UPDATE - missing data");
				}
				break;
			}

			case "SET_DRIVER":{
				console.log( "SET_DRIVER", action );
				if( action.driver ){
					
					this.state.data.settings.driver = action.driver;
					console.log( "SET_DRIVER", this.state.data.settings.store_id, this.state.data.settings.start_date, action.driver );
					this.toggleLoading();
					this.init(this.state.data.settings.store_id, this.state.data.settings.start_date, action.driver);
					
				} else {
					console.log( "SET_DRIVER - missing driver");
					this.state.data.settings.driver = null;
					this.toggleLoading();
					this.init(this.state.data.settings.store_id, this.state.data.settings.start_date, null);
				}
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

