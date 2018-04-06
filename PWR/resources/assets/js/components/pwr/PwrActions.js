import dispatcher from './dispatcher';

export function getTableData(store_id, date = null, driver = null){
	dispatcher.dispatch({type: 'GET_TABLE_DATA', store_id: store_id, date: date, driver: driver });
}

export function showOrderDetails(order_id){
	dispatcher.dispatch({type: 'SHOW_ORDER_DETAILS', order_id: order_id });
}

export function setDate(date){
	dispatcher.dispatch({type: 'SET_DATE', date: date });
}


export function updateDelivery(store_id,order_id,tip, notes){
	dispatcher.dispatch({type: 'UPDATE', order_id: order_id, store_id: store_id, tip: tip, notes: '' });
}

export function setDriver(driver){
	dispatcher.dispatch({type: 'SET_DRIVER', driver: driver });
}

export function refresh(){
	dispatcher.dispatch({type: 'REFRESH' });
}


