import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class Map extends Component {
  constructor(props) 
  {
    super(props);
    this.state = {
    	center: { lat: 40.7446790, lng: -73.9485420 },
    	zoom: 11
    };
  }
  render() {
  	const apiUrl = process;
  	console.log( apiUrl );
  	return (<div style={{ height: '60vh', width: '100%', backgroundColor:'white' }}>
  		<GoogleMapReact
  		  bootstrapURLKeys={{ key: '' }}
          defaultCenter={ this.state.center }
          defaultZoom={ this.state.zoom }>
        </GoogleMapReact>
  		</div>);

   
  }
}

export default Map;