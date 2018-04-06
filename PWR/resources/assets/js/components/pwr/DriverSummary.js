import React from 'react';

export default class DriverSummary extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			driver: this.props.driver,
			date: this.props.date,
			stats: null,
		};
	}

	componentWillMount(){
		
	}

	getDriverStats(){

		// if( this.props.driver && this.props.date ){
		// 	$.ajax({
  //               type: "GET",
  //               url: '/get-driver-stats',
  //               data: { driver: this.props.driver, date: this.props.date },
  //               success: function (data) {
  //                  console.log("Got driver stats: ");
  //                  if(data != undefined){
  //                       let items = JSON.parse(data);
  //                       that.setState({ stats: items });
  //                        console.log("Got driver stats: ", items);
  //                     }
  //               },
  //               error: function (data, textStatus, errorThrown) {
  //                   console.log("Error");
  //               },
  //           });	
		// }
	}

	render() {

		if( this.props.driver == null || this.props.date == null ){
			return (<div> </div> ); 
		}
		this.getDriverStats();
		
		return (
			<div>
				<div> Driver Summary for  {this.props.driver} </div>
			</div>
		);
	}
}
