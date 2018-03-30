import dispatcher from './dispatcher';

export function addTab(){
	dispatcher.dispatch({type: 'ADD_TAB' });
}
