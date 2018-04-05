import React from 'react';

export default class DriverSummary extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			driver: this.props.driver
		};
	}

	render() {

		if( this.state.driver == null ){
			return (<div> </div> ); 
		}
		return (
			<div>

			<div> Driver Summary </div>
			<div> Driver: {this.state.driver}</div>

			</div>
		);
	}
}
