import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class TabsStore extends EventEmitter {
	constructor(props) {
    	super(props);
		this.state = {
			tabs: []
		};
	}

	handleActions(action){
		console.log("TabsStore: Action", action);
		switch(action.type){
			case "ADD_TAB":{
				console.log("ADD tab");
			}


		}
	}
}

const tabsStore  = new TabsStore;
dispatcher.register(tabsStore.handleActions.bind(tabsStore));

//debug
//window.dispatcher = dispatcher;

export default tabsStore;

