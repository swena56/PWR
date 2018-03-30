import dispatcher from './dispatcher';

export function getTableData(store_id){
	dispatcher.dispatch({type: 'GET_TABLE_DATA', store_id: store_id });
}

export function showOrderDetails(order_id){
	dispatcher.dispatch({type: 'SHOW_ORDER_DETAILS', order_id: order_id });
}
